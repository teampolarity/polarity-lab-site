# Agent Commentary Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** After each agent run, generate a short memo (summary + recommendations) stored to D1 and surfaced on the dashboard and in chat.

**Architecture:** New `lab_os_commentary` D1 table. Each agent makes one final sonnet call after its main task completes, writes the memo to the table. A GET endpoint serves commentary to dashboard and chat. Dashboard gets an "Agent notes" section. Chat gets a `get_commentary` tool.

**Tech Stack:** Cloudflare Pages Functions (V8 isolate, no Node), Cloudflare D1 (SQLite via `env.LAB_OS_DB`), Anthropic API (claude-sonnet-4-5), vanilla JS frontend.

---

### Task 1: D1 migration — create lab_os_commentary table

**Files:**
- No file to create — run SQL directly against D1

**Step 1: Run the migration**

```bash
npx wrangler d1 execute lab-os-db --remote --command "CREATE TABLE IF NOT EXISTS lab_os_commentary (id INTEGER PRIMARY KEY AUTOINCREMENT, agent TEXT NOT NULL, body TEXT NOT NULL, created_at DATETIME DEFAULT (datetime('now')))"
```

Expected output: `Successfully executed 1 command`

**Step 2: Verify the table exists**

```bash
npx wrangler d1 execute lab-os-db --remote --command "SELECT name FROM sqlite_master WHERE type='table' AND name='lab_os_commentary'"
```

Expected: row with `name = "lab_os_commentary"`

**Step 3: Commit**

```bash
git commit --allow-empty -m "chore: create lab_os_commentary D1 table (migration run)"
```

---

### Task 2: GET /api/lab-os/commentary endpoint

**Files:**
- Create: `functions/api/lab-os/commentary.js`

**Step 1: Create the file**

```js
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
```

**Step 2: Verify by deploying and hitting the endpoint**

```bash
curl -H "Authorization: Bearer <token>" https://polarity-os.vercel.app/api/lab-os/commentary
```

Expected: `[]` (empty array — table is empty until an agent runs)

**Step 3: Commit**

```bash
git add functions/api/lab-os/commentary.js
git commit -m "feat: add GET /api/lab-os/commentary endpoint"
```

---

### Task 3: Add commentary generation to search-grants.js

**Files:**
- Modify: `functions/api/lab-os/agent/search-grants.js` — add after line 173 (after `added` array is built, before `return json(...)`)

**Step 1: Add the commentary helper function**

Add this async function before `onRequestPost`:

```js
async function generateCommentary(env, added, skipped) {
  // Pull upcoming deadlines for context
  const { results: upcoming } = await env.LAB_OS_DB.prepare(
    `SELECT funder, program, deadline, fit_score, stage
     FROM lab_os_grants
     WHERE deadline IS NOT NULL AND deadline >= date('now') AND deadline <= date('now', '+30 days')
     AND stage != 'archived'
     ORDER BY deadline ASC LIMIT 10`
  ).all();

  const newList = added.length > 0
    ? added.map(g => `- ${g.funder}: ${g.program} (fit ${g.fit_score}/5, deadline: ${g.deadline || 'TBD'}, projects: ${g.projects || 'lab-level'})\n  ${g.notes || ''}`).join('\n')
    : 'No new grants added this run.';

  const deadlineList = upcoming.length > 0
    ? upcoming.map(g => `- ${g.funder}: ${g.program} — ${g.deadline} (fit ${g.fit_score}/5, stage: ${g.stage})`).join('\n')
    : 'No deadlines in the next 30 days.';

  const prompt = `You are the grant intelligence layer for Polarity Lab. You just completed a grant prospecting run. Write a short internal memo for the lab director.

NEW GRANTS ADDED (${added.length} new, ${skipped} already existed):
${newList}

UPCOMING DEADLINES ACROSS FULL PIPELINE:
${deadlineList}

Write two paragraphs:
1. Summary: what the run found, how many were added, any standouts by fit score or amount.
2. What needs attention: specific deadlines approaching, which to prioritize and why, any recommended next action.

Tone: direct, specific, no filler. This is an internal note, not a press release. Max 150 words total.`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 512,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    return data.content?.find(b => b.type === 'text')?.text || null;
  } catch {
    return null;
  }
}
```

**Step 2: Call it and store the result**

Replace the final `return json(...)` line with:

```js
  // Generate and store agent commentary
  const commentary = await generateCommentary(env, added, candidates.length - added.length);
  if (commentary) {
    await env.LAB_OS_DB.prepare(
      `INSERT INTO lab_os_commentary (agent, body) VALUES ('grant_search', ?)`
    ).bind(commentary).run();
  }

  return json({ added: added.length, grants: added, commentary: commentary || null });
```

**Step 3: Deploy and trigger manually to verify**

```bash
git add functions/api/lab-os/agent/search-grants.js
git push origin main
```

Then hit the endpoint and check that `commentary` appears in the response and a row exists in `lab_os_commentary`:

```bash
npx wrangler d1 execute lab-os-db --remote --command "SELECT agent, substr(body,1,100), created_at FROM lab_os_commentary"
```

**Step 4: Commit**

```bash
git commit -m "feat: add commentary generation to grant search agent"
```

---

### Task 4: Add commentary generation to generate-content.js

**Files:**
- Modify: `functions/api/lab-os/agent/generate-content.js` — add after content is inserted, before `return json(...)`

**Step 1: Add the commentary helper function**

Add before `onRequestPost`:

```js
async function generateContentCommentary(env, added, spotlightProject, week, format, pipelineSummary) {
  const pieceList = added.map(p => `- ${p.type}: "${p.title}"`).join('\n');

  const prompt = `You are the content intelligence layer for Polarity Lab. You just completed a weekly content generation run. Write a short internal memo for the lab director.

WEEK: ${week}
SPOTLIGHT PROJECT: ${spotlightProject}
FORMAT USED: ${format}
PIECES GENERATED:
${pieceList}

PIPELINE CONTEXT THAT SHAPED THIS:
${pipelineSummary}

Write two paragraphs:
1. Summary: what was generated, which project was spotlighted, why that format was used.
2. What to review: which piece to prioritize reviewing first and why, any pipeline item worth acting on this week.

Tone: direct, specific, no filler. Internal note. Max 120 words total.`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 512,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    return data.content?.find(b => b.type === 'text')?.text || null;
  } catch {
    return null;
  }
}
```

**Step 2: Call it and store the result**

Replace the final `return json(...)` line with:

```js
  const format = hasHighActivity ? 'storytelling' : 'insight';
  const commentary = await generateContentCommentary(env, added, spotlightProject, week, format, pipelineSummary);
  if (commentary) {
    await env.LAB_OS_DB.prepare(
      `INSERT INTO lab_os_commentary (agent, body) VALUES ('content_engine', ?)`
    ).bind(commentary).run();
  }

  return json({ added: added.length, week, project: spotlightProject, content: added, commentary: commentary || null });
```

Note: `hasHighActivity` and `pipelineSummary` are already defined earlier in `onRequestPost` — no need to recompute.

**Step 3: Commit**

```bash
git add functions/api/lab-os/agent/generate-content.js
git commit -m "feat: add commentary generation to content engine agent"
```

---

### Task 5: Add get_commentary tool to chat.js

**Files:**
- Modify: `functions/api/lab-os/chat.js`

**Step 1: Add tool definition to TOOLS array**

Append to the `TOOLS` array:

```js
{
  name: 'get_commentary',
  description: 'Get the latest commentary memo written by the grant search or content engine agent after their most recent run. Returns what the agent found/generated and what it recommended.',
  input_schema: {
    type: 'object',
    properties: {
      agent: {
        type: 'string',
        description: 'Filter by agent: "grant_search" or "content_engine". Omit to get latest from both.'
      }
    },
    required: []
  }
}
```

**Step 2: Add executor case to executeTool switch**

```js
case 'get_commentary': {
  let query = 'SELECT * FROM lab_os_commentary';
  const binds = [];
  if (input.agent) {
    query += ' WHERE agent = ?';
    binds.push(input.agent);
  }
  query += ' ORDER BY created_at DESC LIMIT 4';
  const { results } = await env.LAB_OS_DB.prepare(query).bind(...binds).all();
  return { commentary: results };
}
```

**Step 3: Commit**

```bash
git add functions/api/lab-os/chat.js
git commit -m "feat: add get_commentary tool to Lab OS chat"
```

---

### Task 6: Add Agent notes section to dashboard.html

**Files:**
- Modify: `public/admin/dashboard.html`

**Step 1: Add CSS for commentary cards**

Inside the `<style>` block, add:

```css
.commentary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 40px; }
.commentary-card { background: var(--void-elevated); border: 1px solid var(--border-ghost); border-radius: 8px; padding: 18px; }
.commentary-agent { font-family: var(--font-mono); font-size: 10px; color: var(--text-tertiary); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
.commentary-time { font-size: 10px; color: var(--text-tertiary); }
.commentary-body { font-size: 13px; color: var(--text-secondary); line-height: 1.65; white-space: pre-wrap; }
.commentary-empty { font-size: 12px; color: var(--text-tertiary); font-style: italic; }
```

**Step 2: Add HTML section**

Insert between the closing `</div>` of the Attention section and `<!-- Agents -->`:

```html
<!-- Agent notes -->
<div class="section-label">Agent notes</div>
<div class="commentary-grid" id="commentary-grid">
  <div class="commentary-card">
    <div class="commentary-agent">Grant Search <span class="commentary-time" id="commentary-grants-time"></span></div>
    <div id="commentary-grants"><span class="commentary-empty">No notes yet — runs Monday 9am</span></div>
  </div>
  <div class="commentary-card">
    <div class="commentary-agent">Content Engine <span class="commentary-time" id="commentary-content-time"></span></div>
    <div id="commentary-content"><span class="commentary-empty">No notes yet — runs Wednesday 9am</span></div>
  </div>
</div>
```

**Step 3: Add JS to fetch and populate commentary**

Inside the `loadStats` or equivalent data-loading function, add a parallel fetch:

```js
const commentaryRes = await apiGet('/api/lab-os/commentary');
if (commentaryRes) {
  const grants = commentaryRes.find(c => c.agent === 'grant_search');
  const content = commentaryRes.find(c => c.agent === 'content_engine');

  if (grants) {
    document.getElementById('commentary-grants').innerHTML =
      `<div class="commentary-body">${grants.body}</div>`;
    document.getElementById('commentary-grants-time').textContent = relativeTime(grants.created_at);
  }
  if (content) {
    document.getElementById('commentary-content').innerHTML =
      `<div class="commentary-body">${content.body}</div>`;
    document.getElementById('commentary-content-time').textContent = relativeTime(content.created_at);
  }
}
```

You'll also need a `relativeTime` helper if not already present:

```js
function relativeTime(iso) {
  const d = new Date(iso + 'Z');
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  return `${days[d.getDay()]} · ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}
```

**Step 4: Commit and push**

```bash
git add public/admin/dashboard.html
git commit -m "feat: add Agent notes section to dashboard"
git pull --rebase origin main && git push origin main
```

---

### Final verification

1. Trigger the grant search agent manually via the admin panel or curl
2. Check the response includes a `commentary` field
3. Check `lab_os_commentary` table has a row: `npx wrangler d1 execute lab-os-db --remote --command "SELECT * FROM lab_os_commentary"`
4. Reload the dashboard — Agent notes section should show the memo
5. Open Lab OS chat, ask "what did the grant agent find?" — should use `get_commentary` tool and return the memo
