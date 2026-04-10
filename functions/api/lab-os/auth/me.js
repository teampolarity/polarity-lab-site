import { json, err, requireAdmin } from '../_utils.js';

export async function onRequestGet({ request, env }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);
  return json({ role: claims.role });
}
