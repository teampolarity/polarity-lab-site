import { json, err, requireAdmin } from './_utils.js';

export async function onRequestGet({ request, env }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);

  const url = new URL(request.url);
  const status = url.searchParams.get('status');
  const week = url.searchParams.get('week');

  let query = 'SELECT * FROM lab_os_content';
  const conditions = [];
  const bindings = [];

  if (status) { conditions.push('status = ?'); bindings.push(status); }
  if (week) { conditions.push('week = ?'); bindings.push(week); }

  if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
  query += ' ORDER BY created_at DESC';

  const { results } = await env.LAB_OS_DB.prepare(query).bind(...bindings).all();
  return json(results);
}

export async function onRequestPost({ request, env }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);

  const body = await request.json().catch(() => null);
  if (!body?.body) return err('body is required');

  const { results } = await env.LAB_OS_DB.prepare(
    `INSERT INTO lab_os_content (type, project, title, body, status, week)
     VALUES (?, ?, ?, ?, ?, ?) RETURNING *`
  ).bind(
    body.type || 'linkedin_post',
    body.project || null,
    body.title || null,
    body.body,
    body.status || 'draft',
    body.week || null
  ).all();

  return json(results[0], 201);
}
