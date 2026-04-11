import { json, err, requireAdmin, PROJECTS } from '../_utils.js';

const PROJECT_ORDER = ['Integrity Delta', 'AVDP', 'WAXFEED', 'PolarityGPS', 'Polarity Lab'];

function getISOWeek(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

async function generateContentCommentary(env, added, spotlightProject, week, format, pipelineSummary) {
  try {
    const pieceList = added.map(p => `- ${p.type}: "${p.title}"`).join('\n');

    const prompt = `You are the content intelligence layer for Polarity Lab. You just completed a weekly content generation run. Write a short internal memo for the lab director.

WEEK: ${week}
SPOTLIGHT PROJECT: ${spotlightProject}
FORMAT USED: ${format}
PIECES GENERATED:
${pieceList}

PIPELINE CONTEXT THAT SHAPED THIS:
${pipelineSummary}

Write two paragraphs:
1. Summary: what was generated, which project was spotlighted, why that format was used.
2. What to review: which piece to prioritize reviewing first and why, any pipeline item worth acting on this week.

Tone: direct, specific, no filler. Internal note. Max 120 words total.`;

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
  // Accept either a user JWT or the scheduled agent key
  const auth = request.headers.get('Authorization') || '';
  const agentKey = env.CONTENT_AGENT_KEY;
  const isAgentCall = agentKey && auth === `Bearer ${agentKey}`;
  if (!isAgentCall) {
    const claims = await requireAdmin(request, env);
    if (!claims) return err('Unauthorized', 401);
  }

  const now = new Date();
  const week = getISOWeek(now);

  // Rotate spotlight project by week number so each project gets its turn
  const weekNum = parseInt(week.split('-W')[1]);
  const spotlightProject = PROJECT_ORDER[weekNum % PROJECT_ORDER.length];

  // Pull recent pipeline activity (last 30 days + any active applications)
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const { results: recentGrants } = await env.LAB_OS_DB.prepare(
    `SELECT funder, program, amount, fit_score, projects, stage, notes
     FROM lab_os_grants
     WHERE created_at >= ? OR stage IN ('submitted', 'awarded', 'drafting')
     ORDER BY created_at DESC LIMIT 15`
  ).bind(thirtyDaysAgo).all();

  // Story format if there's real pipeline movement; insight format for quiet weeks
  const hasHighActivity = recentGrants.some(g =>
    (g.fit_score >= 4) || ['submitted', 'awarded', 'drafting'].includes(g.stage)
  );

  const pipelineSummary = recentGrants.length > 0
    ? recentGrants.map(g =>
        `- ${g.funder}: ${g.program} (stage: ${g.stage}, fit: ${g.fit_score}/5)${g.notes ? ` — ${g.notes}` : ''}`
      ).join('\n')
    : 'No recent grant activity.';

  const linkedInInstruction = hasHighActivity
    ? `This week has significant pipeline activity. Use the STORYTELLING format (250–350 words): narrative arc — here is the problem, here is our approach, here is why it matters. Reference the pipeline momentum without sounding promotional.`
    : `This is a quieter week. Use the INSIGHT format (120–160 words): one sharp observation from the research, no fluff. Builds reputation as a thinker. Start with the most interesting thing about the project.`;

  const prompt = `You are the content writer for Polarity Lab, an independent research institute for the human condition in Providence, RI. The lab's thesis: how humans interact with AI, media, and discovery systems represents a new class of harm to human cognition. Measurement reveals what design can change.

Today is ${now.toISOString().split('T')[0]}. This week's spotlight project: ${spotlightProject}.

Project description:
${PROJECTS[spotlightProject]}

Recent grant pipeline activity:
${pipelineSummary}

Write three pieces of content. Return ONLY valid JSON — no markdown, no code fences, no surrounding text. Start your response with { and end with }.

${linkedInInstruction}

Tone: clear, precise, intellectually serious without being cold. Polarity is not a startup — it is a research institute doing real measurement work. Avoid: buzzwords like "revolutionary", "game-changing", "disruptive", "AI-powered". Write as a researcher who cares about the problem. Use plain language.

Return exactly this JSON structure:
{
  "linkedin_post": {
    "title": "one-line hook or framing (max 12 words, no hashtags)",
    "body": "full post text — write it ready to paste, no placeholders"
  },
  "newsletter_blurb": {
    "title": "brief section header (4–6 words)",
    "body": "2–3 sentence update for a weekly newsletter (50–80 words). Mention the project by name."
  },
  "short_update": {
    "title": "brief label (e.g. 'This week' or project name)",
    "body": "one sentence, max 30 words, suitable for a status update or social post"
  }
}`;

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
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    const textBlock = data.content?.find(b => b.type === 'text');
    responseText = textBlock?.text || '';
  } catch {
    return err('Generation failed — Anthropic API error', 502);
  }

  let generated;
  try {
    const match = responseText.match(/\{[\s\S]*\}/);
    if (match) generated = JSON.parse(match[0]);
  } catch {
    return err('Failed to parse generated content', 502);
  }

  if (!generated) return err('No content generated', 502);

  const contentTypes = [
    { key: 'linkedin_post', type: 'linkedin_post' },
    { key: 'newsletter_blurb', type: 'newsletter_blurb' },
    { key: 'short_update', type: 'short_update' }
  ];

  const added = [];
  for (const { key, type } of contentTypes) {
    const piece = generated[key];
    if (!piece?.body) continue;

    const { results } = await env.LAB_OS_DB.prepare(
      `INSERT INTO lab_os_content (type, project, title, body, status, week)
       VALUES (?, ?, ?, ?, 'draft', ?) RETURNING *`
    ).bind(type, spotlightProject, piece.title || null, piece.body, week).all();

    if (results[0]) added.push(results[0]);
  }

  const format = hasHighActivity ? 'storytelling' : 'insight';
  const commentary = await generateContentCommentary(env, added, spotlightProject, week, format, pipelineSummary);
  if (commentary) {
    await env.LAB_OS_DB.prepare(
      `INSERT INTO lab_os_commentary (agent, body) VALUES ('content_engine', ?)`
    ).bind(commentary).run();
  }

  return json({ added: added.length, week, project: spotlightProject, content: added, commentary: commentary || null });
}
