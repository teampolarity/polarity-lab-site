import { json, err, requireAdmin } from './_utils.js';

export async function onRequestGet({ request, env }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);
  const url = new URL(request.url);
  const project = url.searchParams.get('project');
  const { results } = project
    ? await env.LAB_OS_DB.prepare('SELECT * FROM lab_os_believers WHERE project=? ORDER BY created_at DESC').bind(project).all()
    : await env.LAB_OS_DB.prepare('SELECT * FROM lab_os_believers ORDER BY created_at DESC').all();
  return json(results);
}

export async function onRequestPost({ request, env }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);
  const body = await request.json().catch(() => null);
  if (!body?.name) return err('name is required');
  const { results } = await env.LAB_OS_DB.prepare(
    `INSERT INTO lab_os_believers (name, project, amount, stage, email, notes, last_contact)
     VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING *`
  ).bind(
    body.name, body.project || null, body.amount || null,
    body.stage || 'lead', body.email || null, body.notes || null, body.last_contact || null
  ).all();
  return json(results[0], 201);
}
