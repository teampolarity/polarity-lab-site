# Agent Commentary Design
Date: 2026-04-10

## Overview

Both scheduled agents (grant search, content engine) currently run silently — they insert records into D1 and return a count. Agent commentary adds a final step to each agent run: after completing its main task, the agent reflects on what it just did and writes a short memo (summary + recommendations) stored to D1. Commentary surfaces on the dashboard and is queryable via the Lab OS chat.

## Requirements

- Separate commentary per agent (grant search and content engine each produce their own)
- Two parts: summary of what ran, then what needs attention / recommended next action
- Persisted to D1 so the dashboard can show it and chat can query it
- Generated at end of each agent run, no separate trigger needed

## Data Layer

New D1 table:

```sql
CREATE TABLE IF NOT EXISTS lab_os_commentary (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent TEXT NOT NULL, -- 'grant_search' | 'content_engine'
  body TEXT NOT NULL,
  created_at DATETIME DEFAULT (datetime('now'))
);
```

No foreign keys. Commentary is a standalone memo, not linked to specific grant or content rows. Old commentary is retained for history — dashboard shows latest per agent, chat can show recent history.

## API Layer

### GET /api/lab-os/commentary

Returns latest commentary entries. Supports optional `?agent=grant_search` or `?agent=content_engine` filter. Dashboard calls this without filter to get both; chat tool can filter by agent.

Response:
```json
[
  { "id": 1, "agent": "grant_search", "body": "...", "created_at": "..." },
  { "id": 2, "agent": "content_engine", "body": "...", "created_at": "..." }
]
```

## Agent Changes

### search-grants.js

After inserting new grants, make one additional Claude call (sonnet) with:
- Count of new grants inserted vs skipped (already existed)
- Full list of newly inserted grants (funder, program, amount, deadline, fit_score, projects, notes)
- Current upcoming deadlines across all grants (next 30 days) pulled from D1

Prompt asks for:
1. Summary paragraph: what ran, how many found, key opportunities
2. "What needs attention" closer: specific deadlines, highest fit scores, recommended next action

Result inserted into `lab_os_commentary` with `agent = 'grant_search'`.

### generate-content.js

After generating and inserting content drafts, make one additional Claude call (sonnet) with:
- Which project was spotlighted this week
- What format was used (storytelling vs insight) and why
- Titles of the three pieces generated
- Pipeline activity that influenced the content

Prompt asks for:
1. Summary paragraph: what was generated, spotlight project, format rationale
2. "What to review" closer: which piece to prioritize, any pipeline items worth acting on

Result inserted into `lab_os_commentary` with `agent = 'content_engine'`.

Both commentary calls use `claude-sonnet-4-5` (summarizing known data, not searching) with `max_tokens: 512`.

## Dashboard Changes

New **"Agent notes"** section inserted between the Attention section and the Agents grid. Two cards side by side, one per agent. Each card shows:
- Agent label ("Grant Search" / "Content Engine")
- Commentary body (full text, scrollable if long)
- Relative timestamp ("Monday · 9:04am")
- Subtle empty state if no commentary has run yet ("No notes yet — runs Monday 9am")

## Chat Changes

New tool added to `/api/lab-os/chat.js`:

```js
{
  name: 'get_commentary',
  description: 'Get the latest commentary memo from the grant search or content agent.',
  input_schema: {
    type: 'object',
    properties: {
      agent: { type: 'string', description: 'grant_search or content_engine. Omit for both.' }
    }
  }
}
```

## Implementation Order

1. D1 migration — create `lab_os_commentary` table
2. `/api/lab-os/commentary.js` — GET endpoint
3. `search-grants.js` — add commentary generation + insert
4. `generate-content.js` — add commentary generation + insert
5. `chat.js` — add `get_commentary` tool + executor
6. `dashboard.html` — add Agent notes section
