import { json, err, requireAdmin } from './_utils.js';

export async function onRequestGet({ request, env }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);

  const [grantsResult, leadsResult, believersResult] = await Promise.all([
    env.LAB_OS_DB.prepare('SELECT stage, COUNT(*) as count FROM lab_os_grants GROUP BY stage').all(),
    env.LAB_OS_DB.prepare('SELECT stage, COUNT(*) as count FROM lab_os_leads GROUP BY stage').all(),
    env.LAB_OS_DB.prepare('SELECT stage, COUNT(*) as count, SUM(amount) as total FROM lab_os_believers GROUP BY stage').all(),
  ]);

  const grantsByStage = Object.fromEntries(grantsResult.results.map(r => [r.stage, r.count]));
  const leadsByStage = Object.fromEntries(leadsResult.results.map(r => [r.stage, r.count]));
  const believersByStage = Object.fromEntries(believersResult.results.map(r => [r.stage, { count: r.count, total: r.total || 0 }]));

  const totalGrants = grantsResult.results.reduce((s, r) => s + r.count, 0);
  const totalLeads = leadsResult.results.reduce((s, r) => s + r.count, 0);
  const totalBelievers = believersResult.results.reduce((s, r) => s + r.count, 0);
  const believersValue = believersResult.results.reduce((s, r) => s + (r.total || 0), 0);
  const activeGrants = (grantsByStage['researching'] || 0) + (grantsByStage['drafting'] || 0);
  const activeLeads = (leadsByStage['contacted'] || 0) + (leadsByStage['replied'] || 0) + (leadsByStage['in_conversation'] || 0);

  return json({
    grants: { total: totalGrants, active: activeGrants, by_stage: grantsByStage },
    leads: { total: totalLeads, active: activeLeads, by_stage: leadsByStage },
    believers: { total: totalBelievers, pipeline_value: believersValue, by_stage: believersByStage },
  });
}
