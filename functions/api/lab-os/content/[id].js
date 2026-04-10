import { json, err, requireAdmin } from '../_utils.js';

export async function onRequestGet({ params, request, env }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);

  const { results } = await env.LAB_OS_DB
    .prepare('SELECT * FROM lab_os_content WHERE id = ?')
    .bind(params.id).all();
  if (!results[0]) return err('Not found', 404);
  return json(results[0]);
}

export async function onRequestPut({ params, request, env }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);

  const body = await request.json().catch(() => null);
  if (!body) return err('Invalid body');

  const { results } = await env.LAB_OS_DB.prepare(
    `UPDATE lab_os_content
     SET type=?, project=?, title=?, body=?, status=?, updated_at=CURRENT_TIMESTAMP
     WHERE id=? RETURNING *`
  ).bind(
    body.type || 'linkedin_post',
    body.project || null,
    body.title || null,
    body.body,
    body.status || 'draft',
    params.id
  ).all();

  if (!results[0]) return err('Not found', 404);
  return json(results[0]);
}

export async function onRequestDelete({ params, request, env }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);

  await env.LAB_OS_DB
    .prepare('DELETE FROM lab_os_content WHERE id = ?')
    .bind(params.id).run();
  return json({ ok: true });
}
