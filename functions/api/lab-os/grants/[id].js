import { json, err, requireAdmin } from '../_utils.js';

export async function onRequestPut({ request, env, params }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);
  const body = await request.json().catch(() => null);
  if (!body?.funder) return err('funder is required');
  const { results } = await env.LAB_OS_DB.prepare(
    `UPDATE lab_os_grants
     SET funder=?, program=?, amount=?, deadline=?, fit_score=?, projects=?, stage=?, notes=?, url=?, updated_at=datetime('now')
     WHERE id=? RETURNING *`
  ).bind(
    body.funder, body.program || null, body.amount || null, body.deadline || null,
    body.fit_score || null, body.projects || null,
    body.stage || 'identified', body.notes || null, body.url || null,
    params.id
  ).all();
  if (!results.length) return err('Not found', 404);
  return json(results[0]);
}

export async function onRequestDelete({ request, env, params }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);
  await env.LAB_OS_DB.prepare('DELETE FROM lab_os_grants WHERE id=?').bind(params.id).run();
  return json({ ok: true });
}
