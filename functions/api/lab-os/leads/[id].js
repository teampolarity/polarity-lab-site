import { json, err, requireAdmin } from '../_utils.js';

export async function onRequestPut({ request, env, params }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);
  const body = await request.json().catch(() => null);
  if (!body?.name) return err('name is required');
  const { results } = await env.LAB_OS_DB.prepare(
    `UPDATE lab_os_leads
     SET name=?, organization=?, role=?, email=?, project=?, source=?, stage=?, notes=?, last_contact=?, updated_at=datetime('now')
     WHERE id=? RETURNING *`
  ).bind(
    body.name, body.organization || null, body.role || null, body.email || null,
    body.project || null, body.source || null,
    body.stage || 'new', body.notes || null, body.last_contact || null,
    params.id
  ).all();
  if (!results.length) return err('Not found', 404);
  return json(results[0]);
}

export async function onRequestDelete({ request, env, params }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);
  await env.LAB_OS_DB.prepare('DELETE FROM lab_os_leads WHERE id=?').bind(params.id).run();
  return json({ ok: true });
}
