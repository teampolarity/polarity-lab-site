import { json, err, requireAdmin } from '../_utils.js';

// Fetch a grant page, strip HTML, return readable text (max 10k chars)
async function fetchPageContent(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' },
      signal: AbortSignal.timeout(8000)
    });
    if (!res.ok) return `Page returned ${res.status}`;
    const html = await res.text();
    return html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 10000);
  } catch (e) {
    return `Failed to fetch: ${e.message}`;
  }
}

async function generateCommentary(env, added, skipped) {
  try {
    const { results: upcoming } = await env.LAB_OS_DB.prepare(
      `SELECT funder, program, deadline, fit_score, stage
       FROM lab_os_grants
       WHERE deadline IS NOT NULL AND deadline >= date('now') AND deadline <= date('now', '+30 days')
       AND stage != 'archived'
       ORDER BY deadline ASC LIMIT 10`
    ).all();

    const newList = added.length > 0
      ? added.map(g => `- ${g.funder}: ${g.program} (fit ${g.fit_score}/5, deadline: ${g.deadline || 'TBD'}, projects: ${g.projects || 'lab-level'})\n  ${g.notes || ''}`).join('\n')
      : 'No new grants added this run.';

    const deadlineList = upcoming.length > 0
      ? upcoming.map(g => `- ${g.funder}: ${g.program} — ${g.deadline} (fit ${g.fit_score}/5, stage: ${g.stage})`).join('\n')
      : 'No deadlines in the next 30 days.';

    const prompt = `You are the grant intelligence layer for Polarity Lab. You just completed a grant prospecting run. Write a short internal memo for the lab director.

NEW GRANTS ADDED (${added.length} new, ${skipped} already existed):
${newList}

UPCOMING DEADLINES ACROSS FULL PIPELINE:
${deadlineList}

Write two paragraphs:
1. Summary: what the run found, how many were added, any standouts by fit score or amount.
2. What needs attention: specific deadlines approaching, which to prioritize and why, any recommended next action.

Tone: direct, specific, no filler. This is an internal note, not a press release. Max 150 words total.`;

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 512,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    return data.content?.find(b => b.type === 'text')?.text || null;
  } catch {
    return null;
  }
}

export async function onRequestPost({ request, env }) {
  const auth = request.headers.get('Authorization') || '';
  const agentKey = env.GRANTS_AGENT_KEY;
  const isAgentCall = agentKey && auth === `Bearer ${agentKey}`;
  if (!isAgentCall) {
    const claims = await requireAdmin(request, env);
    if (!claims) return err('Unauthorized', 401);
  }

  const { results: existing } = await env.LAB_OS_DB
    .prepare('SELECT funder, program FROM lab_os_grants')
    .all();
  const existingSet = new Set(existing.map(r => `${r.funder}||${r.program}`.toLowerCase()));

  const tools = [
    { type: 'web_search_20250305', name: 'web_search' },
    {
      name: 'fetch_page',
      description: 'Fetch the full text of a grant program page. Use this after finding a grant via web_search to: (1) discover sub-programs, cycles, or tracks only listed on the page itself, not in search snippets, (2) verify eligibility requirements, (3) confirm exact deadlines. Always fetch the page for any program that looks relevant.',
      input_schema: {
        type: 'object',
        properties: {
          url: { type: 'string', description: 'The URL to fetch and read' }
        },
        required: ['url']
      }
    }
  ];

  const prompt = `You are a grant research assistant for Polarity Lab, an independent research institute for the human condition in Providence, RI. The lab's thesis: how humans interact with AI, media, and discovery systems represents a new class of harm to human cognition.

Search for 6–10 current grant opportunities across these areas:

LAB-LEVEL:
- Independent research institutes without university affiliation (Providence RI)
- Cognitive harm from AI, media, and discovery system design
- New England arts and science, human-centered technology, community-based research infrastructure

PROJECT-LEVEL:
- Integrity Delta: AI systems suppressing correct internal reasoning ("Polite Malpractice"). IΔ measures gap between model's internal correctness (logit-lens) and final output. Pilot confirmed on Llama 3.1 8B with chest radiographs. Relevant funders: AI safety, patient safety, clinical informatics, medical ethics, NIH, Wellcome Trust.
- AVDP — A Very Distant Perspective: experimental long-form video interview format testing whether watching authentic human connection is measurably restorative. Format is the methodology — removes phones, ambient soundscapes, post-session surveys. English and Mandarin. Relevant funders: arts and health, narrative medicine, documentary film, Ford Foundation, Robert Wood Johnson, Sundance, Tribeca.
- WAXFEED: music platform where how you rate music reveals cognitive profile. Does musical response predict lasting friendships? Early detection angle for neurological disease. Relevant funders: music and health, cognitive science, Mozilla, MacArthur, Wellcome Collection.
- Polarity GPS: location-based game surfacing civic/cultural infrastructure invisible on standard platforms. Providence pilot confirmed gap. Relevant funders: civic tech, community health, Knight Foundation, Kresge, NEA.

CRITICAL: Only include grants that do NOT require a PI or university/hospital affiliation.

IMPORTANT WORKFLOW: After finding a grant program via web_search, always use fetch_page on its URL before writing up the result. Grant pages often list multiple sub-programs, funding tracks, or application cycles that are invisible in search snippets. Treat each sub-program as a separate entry. A single foundation page may yield 2–4 distinct opportunities.

For each grant or sub-program, return a JSON array with these exact keys:
{
  "funder": "Foundation name",
  "program": "Specific program or sub-program name",
  "amount": "e.g. up to $25,000 or varies",
  "deadline": "YYYY-MM-DD or null if unknown",
  "fit_score": 1-5 integer,
  "projects": "comma-separated Polarity project names",
  "notes": "1-2 sentences on fit and eligibility",
  "url": "direct URL to the grant page"
}

Fit score: 5=near-perfect, 4=strong, 3=moderate, 2=weak (skip unless >$50k), 1=skip.

After all searching and reading, return ONLY a valid JSON array. Start with [ and end with ].`;

  let messages = [{ role: 'user', content: prompt }];
  let fetchCount = 0;
  const MAX_FETCHES = 8;
  let responseText = '';

  try {
    while (true) {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          model: 'claude-opus-4-5',
          max_tokens: 8192,
          tools,
          messages
        })
      });

      const data = await res.json();

      // web_search is handled server-side by Anthropic — only fetch_page needs our executor
      const fetchCalls = (data.content || []).filter(
        b => b.type === 'tool_use' && b.name === 'fetch_page'
      );

      if (fetchCalls.length === 0 || fetchCount >= MAX_FETCHES) {
        const textBlock = data.content?.findLast(b => b.type === 'text');
        responseText = textBlock?.text || '';
        break;
      }

      // Execute all fetch_page calls, respecting the cap
      const toolResults = [];
      for (const call of fetchCalls) {
        const content = fetchCount < MAX_FETCHES
          ? await fetchPageContent(call.input.url)
          : 'Fetch limit reached — stop fetching and return results now.';
        toolResults.push({ type: 'tool_result', tool_use_id: call.id, content });
        fetchCount++;
      }

      messages = [
        ...messages,
        { role: 'assistant', content: data.content },
        { role: 'user', content: toolResults }
      ];
    }
  } catch {
    return err('Search failed — Anthropic API error', 502);
  }

  let candidates = [];
  try {
    const match = responseText.match(/\[[\s\S]*\]/);
    if (match) candidates = JSON.parse(match[0]);
  } catch {
    return err('Failed to parse grant results from search', 502);
  }

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

  // Generate and store agent commentary
  const commentary = await generateCommentary(env, added, candidates.length - added.length);
  if (commentary) {
    await env.LAB_OS_DB.prepare(
      `INSERT INTO lab_os_commentary (agent, body) VALUES ('grant_search', ?)`
    ).bind(commentary).run();
  }

  return json({ added: added.length, grants: added, commentary: commentary || null });
}
