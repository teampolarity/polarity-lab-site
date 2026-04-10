import { json, err, requireAdmin, PROJECTS } from '../_utils.js';

export async function onRequestPost({ request, env }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);
  const body = await request.json().catch(() => null);
  if (!body?.lead_id) return err('lead_id is required');

  const { results } = await env.LAB_OS_DB
    .prepare('SELECT * FROM lab_os_leads WHERE id=?')
    .bind(body.lead_id)
    .all();
  const lead = results[0];
  if (!lead) return err('Lead not found', 404);

  const projectContext = PROJECTS[lead.project] || lead.project || 'Polarity Lab research';
  const prompt = `You are writing a cold outreach email on behalf of Polarity Lab, an environmental therapeutics research lab.

Lead details:
Name: ${lead.name}
Organization: ${lead.organization || 'Unknown'}
Role: ${lead.role || 'Unknown'}
Project: ${lead.project || 'General'}

Project context: ${projectContext}

${body.context ? `Additional context: ${body.context}` : ''}

Write a concise, warm, and specific cold email (under 200 words). Reference their likely role and why this project is relevant to them. No fluff. End with a clear, low-friction ask. Do not use em dashes.`;

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
        max_tokens: 512,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    return json({ text: data.content[0].text });
  } catch {
    return err('Generation failed', 502);
  }
}
