import { json, err, requireAdmin } from '../_utils.js';

export async function onRequestPost({ request, env }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);

  // Fetch existing funder+program pairs to deduplicate
  const { results: existing } = await env.LAB_OS_DB
    .prepare('SELECT funder, program FROM lab_os_grants')
    .all();
  const existingSet = new Set(existing.map(r => `${r.funder}||${r.program}`.toLowerCase()));

  const prompt = `You are a grant research assistant for Polarity Lab, an independent environmental therapeutics research lab in Providence, RI.

Search for 6–10 current grant opportunities across these areas:

LAB-LEVEL:
- Independent research labs, no university affiliation required
- Health innovation, environmental health, emerging science
- Providence RI / New England arts and science programs
- Small and emerging research organizations

PROJECT-LEVEL:
- Integrity Delta (clinical AI sycophancy, radiology, AI safety, patient safety, medical ethics)
- AVDP — A Very Distant Perspective (documentary film, arts and health, end-of-life care, humanities)
- WAXFEED (music and cognition, music tech, cognitive science, consumer health)
- PolarityGPS (civic tech, community health, public health, urban research, participatory research)

CRITICAL: Only include grants that do NOT require a PI (Principal Investigator) or university/hospital institutional affiliation. Independent researchers and small organizations must be eligible.

For each grant you find, return a JSON array. Each item must have these exact keys:
{
  "funder": "Foundation name",
  "program": "Specific program name",
  "amount": "e.g. up to $25,000 or varies",
  "deadline": "YYYY-MM-DD or null if unknown",
  "fit_score": 1-5 integer,
  "projects": "comma-separated Polarity project names this fits",
  "notes": "1-2 sentences on fit and eligibility",
  "url": "direct URL to the grant page"
}

Fit score guide: 5=near-perfect, 4=strong, 3=moderate, 2=weak (skip unless amount >$50k), 1=skip.

After searching, return ONLY a valid JSON array with no surrounding text or markdown. Start your response with [ and end with ].`;

  let responseText;
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 4096,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    // Find the final text block (may come after tool_use blocks)
    const textBlock = data.content?.findLast(b => b.type === 'text');
    responseText = textBlock?.text || '';
  } catch {
    return err('Search failed — Anthropic API error', 502);
  }

  // Parse JSON from response
  let candidates = [];
  try {
    const match = responseText.match(/\[[\s\S]*\]/);
    if (match) candidates = JSON.parse(match[0]);
  } catch {
    return err('Failed to parse grant results from search', 502);
  }

  // Insert non-duplicate grants
  const added = [];
  for (const g of candidates) {
    if (!g.funder || !g.program) continue;
    const key = `${g.funder}||${g.program}`.toLowerCase();
    if (existingSet.has(key)) continue;

    const { results } = await env.LAB_OS_DB.prepare(
      `INSERT INTO lab_os_grants (funder, program, amount, deadline, fit_score, projects, stage, notes, url)
       VALUES (?, ?, ?, ?, ?, ?, 'identified', ?, ?) RETURNING *`
    ).bind(
      g.funder, g.program, g.amount || null, g.deadline || null,
      g.fit_score || null, g.projects || null,
      g.notes || null, g.url || null
    ).all();

    if (results[0]) {
      added.push(results[0]);
      existingSet.add(key);
    }
  }

  return json({ added: added.length, grants: added });
}
