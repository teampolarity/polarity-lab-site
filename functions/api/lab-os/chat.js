import { json, err, requireAdmin, PROJECTS } from './_utils.js';

const TOOLS = [
  {
    name: 'get_pipeline_summary',
    description: 'Get a summary of the full pipeline: grant counts by stage, lead counts by stage, believer totals, and content status.',
    input_schema: { type: 'object', properties: {}, required: [] }
  },
  {
    name: 'get_grants',
    description: 'List grants from the pipeline. Optionally filter by stage or project.',
    input_schema: {
      type: 'object',
      properties: {
        stage: { type: 'string', description: 'Filter by stage: identified, researching, drafting, submitted, awarded, rejected, archived' },
        project: { type: 'string', description: 'Filter by project name' },
        upcoming_days: { type: 'number', description: 'Only return grants with deadlines in the next N days' }
      },
      required: []
    }
  },
  {
    name: 'update_grant',
    description: 'Update a grant record. Use to move a grant to a new stage, add notes, update deadline, etc.',
    input_schema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Grant ID' },
        stage: { type: 'string', description: 'New stage' },
        notes: { type: 'string', description: 'Updated notes (replaces existing)' },
        deadline: { type: 'string', description: 'Updated deadline (YYYY-MM-DD)' },
        fit_score: { type: 'number', description: 'Fit score 1-5' }
      },
      required: ['id']
    }
  },
  {
    name: 'get_leads',
    description: 'List outreach leads. Optionally filter by stage or project.',
    input_schema: {
      type: 'object',
      properties: {
        stage: { type: 'string', description: 'Filter by stage: new, contacted, replied, in_conversation, won, lost' },
        project: { type: 'string', description: 'Filter by project name' }
      },
      required: []
    }
  },
  {
    name: 'get_believers',
    description: 'List financial believers. Optionally filter by stage or project.',
    input_schema: {
      type: 'object',
      properties: {
        stage: { type: 'string', description: 'Filter by stage: lead, conversation_scheduled, agreement_drafting, signed, active' },
        project: { type: 'string', description: 'Filter by project name' }
      },
      required: []
    }
  },
  {
    name: 'get_content',
    description: 'List content drafts and published pieces. Optionally filter by status.',
    input_schema: {
      type: 'object',
      properties: {
        status: { type: 'string', description: 'Filter by status: draft, approved, published' },
        limit: { type: 'number', description: 'Max number of items to return (default 10)' }
      },
      required: []
    }
  },
  {
    name: 'update_lead',
    description: 'Update a lead record. Use to move a lead to a new stage, add notes, etc.',
    input_schema: {
      type: 'object',
      properties: {
        id: { type: 'number', description: 'Lead ID' },
        stage: { type: 'string', description: 'New stage' },
        notes: { type: 'string', description: 'Updated notes' },
        last_contact: { type: 'string', description: 'Date of last contact (YYYY-MM-DD)' }
      },
      required: ['id']
    }
  },
  {
    name: 'add_grant',
    description: 'Add a new grant opportunity to the pipeline.',
    input_schema: {
      type: 'object',
      properties: {
        funder: { type: 'string', description: 'Funder name' },
        program: { type: 'string', description: 'Program or grant name' },
        amount: { type: 'number', description: 'Award amount in dollars' },
        deadline: { type: 'string', description: 'Deadline (YYYY-MM-DD)' },
        fit_score: { type: 'number', description: 'Fit score 1-5' },
        projects: { type: 'string', description: 'Relevant projects (comma-separated)' },
        stage: { type: 'string', description: 'Initial stage (default: identified)' },
        notes: { type: 'string', description: 'Notes' },
        url: { type: 'string', description: 'Grant URL' }
      },
      required: ['funder']
    }
  }
];

async function executeTool(name, input, env) {
  switch (name) {
    case 'get_pipeline_summary': {
      const [grants, leads, believers, content] = await Promise.all([
        env.LAB_OS_DB.prepare(`SELECT stage, COUNT(*) as count FROM lab_os_grants WHERE stage != 'archived' GROUP BY stage`).all(),
        env.LAB_OS_DB.prepare(`SELECT stage, COUNT(*) as count FROM lab_os_leads GROUP BY stage`).all(),
        env.LAB_OS_DB.prepare(`SELECT stage, COUNT(*) as count, SUM(amount) as total FROM lab_os_believers GROUP BY stage`).all(),
        env.LAB_OS_DB.prepare(`SELECT status, COUNT(*) as count FROM lab_os_content GROUP BY status`).all()
      ]);
      const upcomingRes = await env.LAB_OS_DB.prepare(
        `SELECT id, funder, program, deadline, stage FROM lab_os_grants WHERE deadline IS NOT NULL AND deadline >= date('now') AND deadline <= date('now', '+30 days') AND stage != 'archived' ORDER BY deadline ASC`
      ).all();
      return {
        grants_by_stage: grants.results,
        leads_by_stage: leads.results,
        believers_by_stage: believers.results,
        content_by_status: content.results,
        upcoming_deadlines: upcomingRes.results
      };
    }

    case 'get_grants': {
      let query = `SELECT * FROM lab_os_grants WHERE 1=1`;
      const binds = [];
      if (input.stage) { query += ` AND stage = ?`; binds.push(input.stage); }
      if (input.project) { query += ` AND projects LIKE ?`; binds.push(`%${input.project}%`); }
      if (input.upcoming_days) {
        query += ` AND deadline IS NOT NULL AND deadline >= date('now') AND deadline <= date('now', '+${Math.floor(input.upcoming_days)} days')`;
      }
      query += ` ORDER BY deadline ASC, created_at DESC LIMIT 50`;
      const { results } = await env.LAB_OS_DB.prepare(query).bind(...binds).all();
      return { grants: results, count: results.length };
    }

    case 'update_grant': {
      const fields = [];
      const binds = [];
      if (input.stage !== undefined) { fields.push('stage = ?'); binds.push(input.stage); }
      if (input.notes !== undefined) { fields.push('notes = ?'); binds.push(input.notes); }
      if (input.deadline !== undefined) { fields.push('deadline = ?'); binds.push(input.deadline); }
      if (input.fit_score !== undefined) { fields.push('fit_score = ?'); binds.push(input.fit_score); }
      if (!fields.length) return { error: 'No fields to update' };
      fields.push('updated_at = datetime(\'now\')');
      binds.push(input.id);
      const { results } = await env.LAB_OS_DB.prepare(
        `UPDATE lab_os_grants SET ${fields.join(', ')} WHERE id = ? RETURNING *`
      ).bind(...binds).all();
      return { updated: results[0] || null };
    }

    case 'get_leads': {
      let query = `SELECT * FROM lab_os_leads WHERE 1=1`;
      const binds = [];
      if (input.stage) { query += ` AND stage = ?`; binds.push(input.stage); }
      if (input.project) { query += ` AND project LIKE ?`; binds.push(`%${input.project}%`); }
      query += ` ORDER BY created_at DESC LIMIT 50`;
      const { results } = await env.LAB_OS_DB.prepare(query).bind(...binds).all();
      return { leads: results, count: results.length };
    }

    case 'get_believers': {
      let query = `SELECT * FROM lab_os_believers WHERE 1=1`;
      const binds = [];
      if (input.stage) { query += ` AND stage = ?`; binds.push(input.stage); }
      if (input.project) { query += ` AND project LIKE ?`; binds.push(`%${input.project}%`); }
      query += ` ORDER BY created_at DESC LIMIT 50`;
      const { results } = await env.LAB_OS_DB.prepare(query).bind(...binds).all();
      return { believers: results, count: results.length };
    }

    case 'get_content': {
      const limit = Math.min(input.limit || 10, 50);
      let query = `SELECT * FROM lab_os_content WHERE 1=1`;
      const binds = [];
      if (input.status) { query += ` AND status = ?`; binds.push(input.status); }
      query += ` ORDER BY created_at DESC LIMIT ?`;
      binds.push(limit);
      const { results } = await env.LAB_OS_DB.prepare(query).bind(...binds).all();
      return { content: results, count: results.length };
    }

    case 'update_lead': {
      const fields = [];
      const binds = [];
      if (input.stage !== undefined) { fields.push('stage = ?'); binds.push(input.stage); }
      if (input.notes !== undefined) { fields.push('notes = ?'); binds.push(input.notes); }
      if (input.last_contact !== undefined) { fields.push('last_contact = ?'); binds.push(input.last_contact); }
      if (!fields.length) return { error: 'No fields to update' };
      fields.push('updated_at = datetime(\'now\')');
      binds.push(input.id);
      const { results } = await env.LAB_OS_DB.prepare(
        `UPDATE lab_os_leads SET ${fields.join(', ')} WHERE id = ? RETURNING *`
      ).bind(...binds).all();
      return { updated: results[0] || null };
    }

    case 'add_grant': {
      const { results } = await env.LAB_OS_DB.prepare(
        `INSERT INTO lab_os_grants (funder, program, amount, deadline, fit_score, projects, stage, notes, url)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`
      ).bind(
        input.funder, input.program || null, input.amount || null, input.deadline || null,
        input.fit_score || null, input.projects || null,
        input.stage || 'identified', input.notes || null, input.url || null
      ).all();
      return { created: results[0] };
    }

    default:
      return { error: `Unknown tool: ${name}` };
  }
}

const SYSTEM_PROMPT = `You are Lab OS, the operational intelligence layer for Polarity Lab — an independent research institute for the human condition in Providence, RI.

You have real-time access to the lab's pipeline data: grants, outreach leads, financial believers, and content. You can read and update records directly.

ABOUT THE LAB:
${PROJECTS['Polarity Lab']}

THE FOUR PROJECTS:
- Integrity Delta: ${PROJECTS['Integrity Delta']}
- AVDP: ${PROJECTS['AVDP']}
- WAXFEED: ${PROJECTS['WAXFEED']}
- Polarity GPS: ${PROJECTS['Polarity GPS']}

YOUR ROLE:
You help the lab director move the lab forward. You can answer questions about pipeline status, flag things that need attention, suggest next actions, and take actions when asked (updating stages, adding records, etc.).

Be direct and specific. You have the data — use it. When something needs attention (deadline approaching, stale lead, etc.), say so unprompted. When asked to do something, do it, then confirm what you did.

Tone: same register as the lab itself — serious, specific, no filler. Skip pleasantries. Get to the point.`;

export async function onRequestPost({ request, env }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);

  const body = await request.json().catch(() => null);
  if (!body?.messages || !Array.isArray(body.messages)) return err('messages array required');

  const messages = body.messages.slice(-20); // cap history at 20 messages
  const toolCalls = [];

  // Agentic loop: run until Claude stops calling tools
  let loopMessages = [...messages];
  for (let i = 0; i < 4; i++) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        tools: TOOLS,
        messages: loopMessages
      })
    });

    const data = await res.json();
    if (!data.content) return err('LLM error', 502);

    // Collect assistant turn
    loopMessages.push({ role: 'assistant', content: data.content });

    if (data.stop_reason !== 'tool_use') {
      // Done — return final text + tool call log
      const text = data.content.find(b => b.type === 'text')?.text || '';
      return json({ reply: text, tool_calls: toolCalls });
    }

    // Execute all tool calls in this turn
    const toolResults = [];
    for (const block of data.content) {
      if (block.type !== 'tool_use') continue;
      const result = await executeTool(block.name, block.input, env);
      toolCalls.push({ name: block.name, input: block.input, result });
      toolResults.push({
        type: 'tool_result',
        tool_use_id: block.id,
        content: JSON.stringify(result)
      });
    }

    loopMessages.push({ role: 'user', content: toolResults });
  }

  return err('Agent loop exceeded', 500);
}
