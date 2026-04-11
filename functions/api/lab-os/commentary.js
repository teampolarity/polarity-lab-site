import { json, err, requireAdmin } from './_utils.js';

export async function onRequestGet({ request, env }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);

  const agent = new URL(request.url).searchParams.get('agent');

  let query = 'SELECT * FROM lab_os_commentary';
  const binds = [];
  if (agent) {
    query += ' WHERE agent = ?';
    binds.push(agent);
  }
  query += ' ORDER BY created_at DESC LIMIT 10';

  const { results } = await env.LAB_OS_DB.prepare(query).bind(...binds).all();
  return json(results);
}
