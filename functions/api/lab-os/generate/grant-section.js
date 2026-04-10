import { json, err, requireAdmin, PROJECTS, GRANT_SECTION_INSTRUCTIONS } from '../_utils.js';

export async function onRequestPost({ request, env }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);
  const body = await request.json().catch(() => null);
  if (!body?.grant_id) return err('grant_id is required');
  if (!body?.section || !GRANT_SECTION_INSTRUCTIONS[body.section]) {
    return err(`section must be one of: ${Object.keys(GRANT_SECTION_INSTRUCTIONS).join(', ')}`);
  }

  const { results } = await env.LAB_OS_DB
    .prepare('SELECT * FROM lab_os_grants WHERE id=?')
    .bind(body.grant_id)
    .all();
  const grant = results[0];
  if (!grant) return err('Grant not found', 404);

  const projectList = grant.projects || 'Polarity Lab';
  const projectContexts = projectList.split(',')
    .map(p => p.trim())
    .filter(p => PROJECTS[p])
    .map(p => `${p}: ${PROJECTS[p]}`)
    .join('\n');

  const prompt = `You are writing a grant application section for Polarity Lab, an independent research institute for the human condition in Providence, RI. Lab thesis: how humans interact with AI, media, and discovery systems represents a new class of measurable harm to human cognition. Measurement reveals what design can change.

GRANT CONTEXT
Funder: ${grant.funder}
Program: ${grant.program || 'General'}
Amount: ${grant.amount || 'Not specified'}
Deadline: ${grant.deadline || 'Not specified'}
Projects covered: ${projectList}
${grant.notes ? `Funder notes: ${grant.notes}` : ''}

PROJECT DESCRIPTIONS
${projectContexts || projectList}

SECTION TO WRITE: ${body.section.replace(/_/g, ' ').toUpperCase()}

${GRANT_SECTION_INSTRUCTIONS[body.section]}

Tone: precise, credible, intellectually serious. Write for a ${grant.funder} reviewer. No fluff, no buzzwords, no em dashes. Every claim should be grounded in what Polarity has already done or can specifically commit to doing.`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    return json({ text: data.content[0].text });
  } catch {
    return err('Generation failed', 502);
  }
}
