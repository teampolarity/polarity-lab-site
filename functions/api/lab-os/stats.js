import { json, err, requireAdmin } from './_utils.js';

export async function onRequestGet({ request, env }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);

  const in30Days = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const today = new Date().toISOString().slice(0, 10);

  const [grantsResult, leadsResult, believersResult, deadlinesResult, contentResult] = await Promise.all([
    env.LAB_OS_DB.prepare("SELECT stage, COUNT(*) as count FROM lab_os_grants GROUP BY stage").all(),
    env.LAB_OS_DB.prepare("SELECT stage, COUNT(*) as count FROM lab_os_leads GROUP BY stage").all(),
    env.LAB_OS_DB.prepare("SELECT stage, COUNT(*) as count, SUM(amount) as total FROM lab_os_believers GROUP BY stage").all(),
    env.LAB_OS_DB.prepare(
      "SELECT id, funder, program, deadline, stage, url FROM lab_os_grants WHERE deadline IS NOT NULL AND deadline >= ? AND deadline <= ? AND stage NOT IN ('archived','rejected','awarded') ORDER BY deadline ASC"
    ).bind(today, in30Days).all(),
    env.LAB_OS_DB.prepare("SELECT status, COUNT(*) as count FROM lab_os_content GROUP BY status").all(),
  ]);

  const grantsByStage = Object.fromEntries(grantsResult.results.map(r => [r.stage, r.count]));
  const leadsByStage  = Object.fromEntries(leadsResult.results.map(r => [r.stage, r.count]));
  const believersByStage = Object.fromEntries(believersResult.results.map(r => [r.stage, { count: r.count, total: r.total || 0 }]));
  const contentByStatus = Object.fromEntries(contentResult.results.map(r => [r.status, r.count]));

  // Exclude archived from totals — they're not active pipeline
  const activeStages = ['identified','researching','drafting','submitted','awarded','rejected'];
  const totalGrants  = activeStages.reduce((s, st) => s + (grantsByStage[st] || 0), 0);
  const totalLeads   = leadsResult.results.reduce((s, r) => s + r.count, 0);
  const totalBelievers  = believersResult.results.reduce((s, r) => s + r.count, 0);
  const believersValue  = believersResult.results.reduce((s, r) => s + (r.total || 0), 0);
  const activeGrants = (grantsByStage['researching'] || 0) + (grantsByStage['drafting'] || 0);
  const activeLeads  = (leadsByStage['contacted'] || 0) + (leadsByStage['replied'] || 0) + (leadsByStage['in_conversation'] || 0);

  return json({
    grants:    { total: totalGrants, active: activeGrants, by_stage: grantsByStage },
    leads:     { total: totalLeads,  active: activeLeads,  by_stage: leadsByStage  },
    believers: { total: totalBelievers, pipeline_value: believersValue, by_stage: believersByStage },
    upcoming_deadlines: deadlinesResult.results,
    content:   { by_status: contentByStatus, drafts_pending: contentByStatus['draft'] || 0 },
  });
}
