import { json, err, requireAdmin } from './_utils.js';

export async function onRequestGet({ request, env }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);
  const { results } = await env.LAB_OS_DB
    .prepare('SELECT * FROM lab_os_grants ORDER BY created_at DESC')
    .all();
  return json(results);
}

export async function onRequestPost({ request, env }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);
  const body = await request.json().catch(() => null);
  if (!body?.funder) return err('funder is required');
  const { results } = await env.LAB_OS_DB.prepare(
    `INSERT INTO lab_os_grants (funder, program, amount, deadline, fit_score, projects, stage, notes, url)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`
  ).bind(
    body.funder, body.program || null, body.amount || null, body.deadline || null,
    body.fit_score || null, body.projects || null,
    body.stage || 'identified', body.notes || null, body.url || null
  ).all();
  return json(results[0], 201);
}
