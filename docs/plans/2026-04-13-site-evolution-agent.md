# Site Evolution Agent Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a `/admin/site.html` chat page backed by `site-chat.js` that can read all site files via GitHub API, understand commit history, and write changes directly to `main` — giving the Lab OS admin Claude-Code-level site editing capability from the browser.

**Architecture:** New Cloudflare Pages Function (`site-chat.js`) with 6 tools wired to the GitHub Contents API and live site fetching. Same agentic loop pattern as `chat.js`. New admin page uses the same chat shell as `chat.html`. System prompt embeds design system, UI/UX taxonomy, brand thesis, and page inventory.

**Tech Stack:** Cloudflare Pages Functions, GitHub Contents API, Anthropic claude-sonnet-4-5, vanilla JS (no framework)

---

## Phase 0: Infrastructure Migration (Manual — Do First)

No code. These are manual steps required before the GitHub token can be set up.

**Step 1:** Create a GitHub account at `team@polarity-lab.com` (or a GitHub org named `polarity-lab`)

**Step 2:** Transfer `sh6drack/POLARITY-SITE` to the new account. In GitHub: Settings → Danger Zone → Transfer repository. New path: `polarity-lab/POLARITY-SITE` (adjust if using a personal account).

**Step 3:** Create a Cloudflare account at `team@polarity-lab.com`

**Step 4:** Recreate the Cloudflare Pages project on the new account. Connect to the transferred GitHub repo. Re-add all env secrets: `LAB_OS_JWT_SECRET`, `LAB_OS_ADMIN_PASS`, `ANTHROPIC_API_KEY`, `LAB_OS_DB` D1 binding.

**Step 5:** Create a GitHub fine-grained PAT on the new account:
- Settings → Developer settings → Fine-grained tokens → Generate new token
- Resource owner: the new account/org
- Repository access: `POLARITY-SITE` only
- Permissions: `Contents: Read and write`
- Name it: `lab-os-site-agent`

**Step 6:** Add `GITHUB_TOKEN` to the Cloudflare Pages project env secrets (same place as `ANTHROPIC_API_KEY`).

**Step 7:** Update the `OWNER` and `REPO` constants in `site-chat.js` (Task 1 below) to match the new account name.

---

## Task 1: Create `site-chat.js` with system prompt, tool definitions, and agentic loop

**Files:**
- Create: `functions/api/lab-os/site-chat.js`

Reference `functions/api/lab-os/chat.js` for the agentic loop pattern. This task creates the skeleton with the system prompt and `list_pages` tool working. The remaining tools (Tasks 2-5) slot in afterward.

**Step 1: Create the file**

```javascript
import { json, err, requireAdmin } from './_utils.js';

const OWNER = 'sh6drack'; // Update to new account after Phase 0 migration
const REPO = 'POLARITY-SITE';
const BRANCH = 'main';

const PAGE_INVENTORY = [
  // Public pages
  { path: 'public/index.html', label: 'Homepage', description: 'Hero, thesis statement, project cards' },
  { path: 'public/work.html', label: 'Work', description: 'Projects and active work overview' },
  { path: 'public/join.html', label: 'Join', description: 'Contributor and collaborator page' },
  { path: 'public/fund.html', label: 'Fund', description: 'Financial believers and lab fund page' },
  { path: 'public/legal.html', label: 'Legal', description: 'Legal information' },
  { path: 'public/research/avdp.html', label: 'AVDP', description: 'A Very Distant Perspective project page' },
  { path: 'public/research/wax-feed.html', label: 'WAXFEED', description: 'WAXFEED project page' },
  { path: 'public/research/polaritygps.html', label: 'Polarity GPS', description: 'Polarity GPS project page' },
  { path: 'public/research/integrity-delta.html', label: 'Integrity Delta', description: 'Integrity Delta project page' },
  // Admin pages
  { path: 'public/admin/dashboard.html', label: 'Admin: Dashboard', description: 'Lab OS dashboard — stats, attention, agent notes' },
  { path: 'public/admin/chat.html', label: 'Admin: Chat', description: 'Pipeline intelligence chat' },
  { path: 'public/admin/site.html', label: 'Admin: Site', description: 'Site evolution chat (this page)' },
  { path: 'public/admin/grants.html', label: 'Admin: Grants', description: 'Grants pipeline' },
  { path: 'public/admin/outreach.html', label: 'Admin: Outreach', description: 'Outreach leads' },
  { path: 'public/admin/believers.html', label: 'Admin: Believers', description: 'Financial believers pipeline' },
  { path: 'public/admin/content.html', label: 'Admin: Content', description: 'Content drafts' },
  { path: 'public/admin/docs.html', label: 'Admin: Docs', description: 'Doc generator' },
  // CSS
  { path: 'public/admin/css/admin.css', label: 'Admin CSS', description: 'Admin design system — all admin page styles' },
  // Key functions
  { path: 'functions/api/lab-os/chat.js', label: 'Pipeline chat function', description: 'Pipeline intelligence backend' },
  { path: 'functions/api/lab-os/site-chat.js', label: 'Site chat function', description: 'Site evolution backend' },
  { path: 'functions/api/lab-os/_utils.js', label: 'Utils', description: 'Shared auth and project data' },
];

const TOOLS = [
  {
    name: 'list_pages',
    description: 'List all editable files in the site: public pages, admin pages, CSS, and key function files.',
    input_schema: { type: 'object', properties: {}, required: [] }
  },
  {
    name: 'read_page_text',
    description: 'Fetch a live page from the site and return its readable text content (HTML stripped). Use this to understand what a page communicates to visitors before proposing changes.',
    input_schema: {
      type: 'object',
      properties: {
        url: { type: 'string', description: 'Full URL to fetch, e.g. "https://polarity-site.pages.dev/" or "https://polarity-lab.com/"' }
      },
      required: ['url']
    }
  },
  {
    name: 'read_file',
    description: 'Read a file from the GitHub repo. Returns the file content and its SHA (required for write_file). Always call this before write_file.',
    input_schema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'File path relative to repo root, e.g. "public/index.html"' }
      },
      required: ['path']
    }
  },
  {
    name: 'write_file',
    description: 'Write a file to the GitHub repo, committing directly to main. Always call read_file first to get the SHA. Returns the commit URL.',
    input_schema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'File path relative to repo root' },
        content: { type: 'string', description: 'Full new file content (not a diff — the complete file)' },
        message: { type: 'string', description: 'Commit message. Follow existing convention: "reframe:", "refine:", "feat:", "fix:", "chore:"' },
        sha: { type: 'string', description: 'SHA from read_file — required to update an existing file' }
      },
      required: ['path', 'content', 'message', 'sha']
    }
  },
  {
    name: 'get_commit_log',
    description: 'Get the recent commit history for the site repo. Call this first when asked to suggest improvements — understanding direction before proposing is required.',
    input_schema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Number of commits to return (default 20, max 50)' }
      },
      required: []
    }
  },
  {
    name: 'get_diff',
    description: 'Get the files changed and diff for a specific commit SHA.',
    input_schema: {
      type: 'object',
      properties: {
        sha: { type: 'string', description: 'Commit SHA' }
      },
      required: ['sha']
    }
  }
];

const SYSTEM_PROMPT = `You are the Site Agent for Polarity Lab — you read, understand, and evolve the lab's website and admin interface. You have direct read/write access to every file in the repo via GitHub API.

## THE LAB

Polarity Lab is an independent research institute for the human condition, based in Providence RI. Thesis: how humans interact with AI, media, and discovery systems represents a new class of measurable harm to human cognition. Measurement reveals what design can change.

The four active projects:
- Integrity Delta: AI systems suppressing correct internal reasoning. IΔ measures the signed gap between internal correctness (logit-lens) and final output. Clinical risk: diagnostic AI that agrees when it shouldn't.
- AVDP (A Very Distant Perspective): long-form video as a measurable restorative intervention. Format IS the methodology — no phones, ambient soundscapes, post-session measurement.
- WAXFEED: music response as cognitive proxy. Song ratings train a model to predict unheard music; prediction gaps become cognitive signal. Relationship formation tracked at 30 and 90 days.
- Polarity GPS: proximity-based discovery to surface civic infrastructure hidden by platform design. Proximity Index measures the gap between cultural output in a radius and what platforms surface.

Tone register: spare, precise, no filler, no pleasantries. The site uses declarative statements, not marketing language. "Systems manipulate what makes you human. We study it." — not "We're passionate about human-centered research."

## SITE DESIGN SYSTEM

CSS custom properties (defined in public/index.html and admin.css):
- Void palette: --void-pure (#000000), --void-deep (#020204), --void-space (#050508), --void-nebula (#080810), --void-surface (#0c0c14), --void-elevated (#12121c)
- Brand: --teal (#4ECDC4), --teal-bright (#5EEEE4), --teal-subtle (rgba(78,205,196,0.12)), --teal-glow
- Accent: --coral (#FF8A65), --purple (#BB8FCE)
- Text: --text-primary, --text-secondary, --text-tertiary
- Borders: --border-ghost, --border-subtle

Typography:
- Display/headings: Space Grotesk (font-family: var(--font-display))
- Body: Inter (var(--font-body))
- Mono/labels/metadata: JetBrains Mono (var(--font-mono))

Admin CSS class patterns (do not invent new ones — use existing):
- Layout: .shell, .sidebar, .main, .topbar
- Nav: .sidebar-logo, .sidebar-label, .sidebar-link, .sidebar-link.active
- Cards: .stat-card, .stat-label, .stat-value, .stat-sub, .agent-card
- Labels: .section-label (mono, uppercase, tertiary)
- Stage bars: .stage-row, .stage-bar-wrap, .stage-bar, .stage-count
- Status: .dot, .dot-teal, .attention-row, .attention-dot
- Commentary: .commentary-card, .commentary-agent, .commentary-body

## UI/UX COMPONENT TAXONOMY

When proposing or implementing UI changes, select components precisely:

OVERLAY SELECTION:
- Tooltip: hover-triggered, non-interactive, brief description only
- Popover: click-triggered, can contain interactive elements, non-critical info
- Modal: blocks ALL interaction, requires user response before returning — use sparingly
- Drawer: slides from screen edge, good for secondary nav or detail panels
- Toast: auto-appearing, auto-dismissing — for confirmations (e.g. "Committed.")
- Alert: inline prominent notification, not an overlay

LOADING STATES:
- Spinner: unknown duration, no layout hint (used in chat thinking indicator)
- Skeleton: known layout, perceived-faster, maintains spatial context
- Progress Bar: known completion %, continuous task
- Progress Indicator: discrete steps in multi-step flow

INPUT SELECTION:
- Select: many predefined options, single selection, no custom input
- Combobox: many options + free text filtering
- Radio: 2-5 options, single select, all visible
- Checkbox: multi-select or single binary toggle
- Toggle: binary on/off, immediate effect
- Segmented Control: 2-5 view-switching options

ACCESSIBILITY:
- Accordions: aria-expanded on trigger, aria-controls linking to content ID
- Popovers: aria-haspopup="dialog", Esc to close + return focus
- Modals: focus trap required, Esc to dismiss
- Build without JS first, enhance interactively

## BEHAVIORAL RULES

1. When asked to suggest improvements: ALWAYS call get_commit_log first. The commit history shows direction. Do not propose changes that contradict the arc of recent work.
2. When editing a file: ALWAYS call read_file first to get the SHA. write_file will fail without it.
3. When writing back a file: write the COMPLETE file, not a diff or partial update.
4. Commit messages follow existing convention: "reframe:", "refine:", "feat:", "fix:", "chore:" — match the style of recent commits.
5. After a write_file, report: what changed, why, and the commit URL.
6. Preserve all existing CSS custom properties, class names, and script structure unless explicitly asked to change them.
7. When editing admin pages: maintain sidebar parity — all admin pages must have the same sidebar links.

## WHAT YOU CAN EDIT

All public-facing pages, all admin pages, CSS files, and Cloudflare Function files. You have full write access. When in doubt, read_file first and reason about the change before committing.`;

async function executeTool(name, input, env) {
  const ghHeaders = {
    'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'polarity-lab-os'
  };

  switch (name) {
    case 'list_pages':
      return { pages: PAGE_INVENTORY };

    case 'read_page_text': {
      const res = await fetch(input.url, { headers: { 'User-Agent': 'polarity-lab-os' } });
      if (!res.ok) return { error: `Fetch failed: ${res.status}` };
      const html = await res.text();
      // Strip tags, collapse whitespace
      const text = html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ').trim();
      return { url: input.url, text: text.slice(0, 8000) }; // cap at 8k chars
    }

    case 'read_file': {
      const res = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/contents/${input.path}?ref=${BRANCH}`,
        { headers: ghHeaders }
      );
      if (!res.ok) return { error: `GitHub API error: ${res.status}` };
      const data = await res.json();
      // GitHub returns base64 with newlines — strip them before decoding
      const content = atob(data.content.replace(/\n/g, ''));
      return { path: input.path, content, sha: data.sha };
    }

    case 'write_file': {
      // Encode content to base64 (handle Unicode)
      const encoded = btoa(unescape(encodeURIComponent(input.content)));
      const res = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/contents/${input.path}`,
        {
          method: 'PUT',
          headers: { ...ghHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: input.message,
            content: encoded,
            sha: input.sha,
            branch: BRANCH
          })
        }
      );
      if (!res.ok) {
        const errBody = await res.text();
        return { error: `GitHub write failed: ${res.status} — ${errBody}` };
      }
      const result = await res.json();
      return {
        success: true,
        commit_url: result.commit?.html_url,
        commit_sha: result.commit?.sha,
        message: input.message
      };
    }

    case 'get_commit_log': {
      const limit = Math.min(input.limit || 20, 50);
      const res = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/commits?sha=${BRANCH}&per_page=${limit}`,
        { headers: ghHeaders }
      );
      if (!res.ok) return { error: `GitHub API error: ${res.status}` };
      const commits = await res.json();
      return {
        commits: commits.map(c => ({
          sha: c.sha.slice(0, 7),
          full_sha: c.sha,
          message: c.commit.message.split('\n')[0],
          date: c.commit.author.date,
          author: c.commit.author.name
        }))
      };
    }

    case 'get_diff': {
      const res = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/commits/${input.sha}`,
        { headers: ghHeaders }
      );
      if (!res.ok) return { error: `GitHub API error: ${res.status}` };
      const data = await res.json();
      return {
        sha: input.sha,
        message: data.commit?.message,
        files: (data.files || []).map(f => ({
          path: f.filename,
          status: f.status,
          additions: f.additions,
          deletions: f.deletions,
          patch: (f.patch || '').slice(0, 3000) // cap patch size
        }))
      };
    }

    default:
      return { error: `Unknown tool: ${name}` };
  }
}

export async function onRequestPost({ request, env }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);

  const body = await request.json().catch(() => null);
  if (!body?.messages || !Array.isArray(body.messages)) return err('messages array required');

  const messages = body.messages.slice(-20);
  const toolCalls = [];

  let loopMessages = [...messages];
  for (let i = 0; i < 6; i++) { // 6 iterations — site edits need more tool calls than pipeline ops
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 8192,
        system: SYSTEM_PROMPT,
        tools: TOOLS,
        messages: loopMessages
      })
    });

    const data = await res.json();
    if (!data.content) return err('LLM error', 502);

    loopMessages.push({ role: 'assistant', content: data.content });

    if (data.stop_reason !== 'tool_use') {
      const text = data.content.find(b => b.type === 'text')?.text || '';
      return json({ reply: text, tool_calls: toolCalls });
    }

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
```

**Step 2: Verify the file exists**

Check: `ls functions/api/lab-os/site-chat.js` — should exist.

**Step 3: Commit**

```bash
git add functions/api/lab-os/site-chat.js
git commit -m "feat: add site evolution agent function"
```

---

## Task 2: Create `/admin/site.html`

**Files:**
- Create: `public/admin/site.html`

The page is structurally identical to `chat.html` — same shell, same chat layout, same JS. Only differences: title, page subtitle, API endpoint (`/api/lab-os/site-chat`), and suggested prompts.

**Step 1: Create the file**

Copy `public/admin/chat.html` as the base. Make these targeted changes:

1. `<title>`: change to `Site — Lab OS`
2. `.page-sub` text: change to `Read, understand, and evolve any page. Changes commit directly to main.`
3. Suggestions div — replace all 6 `<button class="suggestion">` elements with:

```html
<button class="suggestion" onclick="sendSuggestion(this)">What has the site been trying to say lately?</button>
<button class="suggestion" onclick="sendSuggestion(this)">Review the homepage and suggest copy improvements</button>
<button class="suggestion" onclick="sendSuggestion(this)">What changed in the last 10 commits?</button>
<button class="suggestion" onclick="sendSuggestion(this)">Tighten the work page copy</button>
<button class="suggestion" onclick="sendSuggestion(this)">Update the join page CTA to match the current thesis</button>
<button class="suggestion" onclick="sendSuggestion(this)">List all the pages I can edit</button>
```

4. `fetch` URL in `sendMessage()`: change `/api/lab-os/chat` to `/api/lab-os/site-chat`

5. Sidebar: change `chat.html` link from `active` to plain, add Site link as active:

```html
<div class="sidebar-label" style="margin-top:16px">Intelligence</div>
<a href="/admin/chat.html" class="sidebar-link">Chat</a>
<a href="/admin/site.html" class="sidebar-link active">Site</a>
```

6. Tool label map in `toolLabel()` — add site-specific labels:

```javascript
function toolLabel(name) {
  const labels = {
    list_pages: 'page inventory',
    read_page_text: 'reading page',
    read_file: 'reading file',
    write_file: 'writing file',
    get_commit_log: 'commit history',
    get_diff: 'reading diff'
  };
  return labels[name] || name;
}
```

7. Placeholder text in `<textarea>`: change to `Ask about any page, or tell it what to change...`

8. `clearChat()` — update the suggestions HTML to match the new prompts (same 6 as above).

**Step 2: Commit**

```bash
git add public/admin/site.html
git commit -m "feat: add /admin/site.html page"
```

---

## Task 3: Add "Site" to sidebar on all other admin pages

**Files:**
- Modify: `public/admin/dashboard.html`
- Modify: `public/admin/chat.html`
- Modify: `public/admin/grants.html`
- Modify: `public/admin/outreach.html`
- Modify: `public/admin/believers.html`
- Modify: `public/admin/content.html`
- Modify: `public/admin/docs.html`

In each file, find the Intelligence sidebar section. It currently looks like:

```html
<div class="sidebar-label" style="margin-top:16px">Intelligence</div>
<a href="/admin/chat.html" class="sidebar-link">Chat</a>
```

Replace with:

```html
<div class="sidebar-label" style="margin-top:16px">Intelligence</div>
<a href="/admin/chat.html" class="sidebar-link">Chat</a>
<a href="/admin/site.html" class="sidebar-link">Site</a>
```

(On `chat.html` specifically, `chat.html` keeps its `active` class, `site.html` gets no active class. On `site.html` it's the reverse — already handled in Task 2.)

**Step 1: Edit each file** — same find/replace in all 7 files.

**Step 2: Commit**

```bash
git add public/admin/dashboard.html public/admin/chat.html public/admin/grants.html public/admin/outreach.html public/admin/believers.html public/admin/content.html public/admin/docs.html
git commit -m "feat: add Site link to admin sidebar"
```

---

## Task 4: Add GITHUB_TOKEN to Cloudflare and deploy

**Step 1: Add the secret**

In Cloudflare Pages dashboard → `polarity-site` project → Settings → Environment variables → Add variable:
- Name: `GITHUB_TOKEN`
- Value: the fine-grained PAT from Phase 0
- Environment: Production (and Preview if desired)

**Step 2: Deploy**

```bash
npx wrangler pages deploy public --project-name polarity-site
```

**Step 3: Smoke test**

1. Log into `/admin/index.html`
2. Navigate to `/admin/site.html` — page should load, sidebar should show "Site" link as active
3. Send the prompt: `List all the pages I can edit`
4. Expected: agent responds with the page inventory (no GitHub token needed for this tool)
5. Send: `What changed in the last 5 commits?`
6. Expected: agent calls `get_commit_log`, returns recent commits — confirms GitHub token is wired
7. Send: `Read the homepage and tell me what the hero says`
8. Expected: agent calls `read_page_text` then `read_file`, returns the hero copy

**Step 4: Test write-back**

Send: `Make a trivial change to public/legal.html — add a comment at the top of the file`

Expected:
- Agent calls `read_file` (gets SHA)
- Agent calls `write_file` (commits)
- Response includes commit URL
- Verify commit appears in GitHub repo

---

## Update OWNER after Phase 0

After the Phase 0 migration is complete, update `site-chat.js`:

```javascript
const OWNER = 'polarity-lab'; // or whatever the new account/org name is
```

Commit:
```bash
git commit -m "chore: update GitHub owner to team account"
```

---

## Notes

- `max_tokens: 8192` is intentional — full HTML file rewrites can be large
- The agentic loop runs up to 6 iterations (vs 4 in `chat.js`) — a site edit may require: get_commit_log → read_page_text → read_file → write_file (4 tool calls before the final response)
- `read_page_text` caps at 8000 chars. For very long pages (index.html has a huge CSS block), `read_file` is better for editing and `read_page_text` is better for understanding copy
- `get_diff` caps patch output at 3000 chars per file — sufficient for context, avoids blowing the context window on large diffs
- The system prompt is long (~1400 tokens) by design — the design system and UI taxonomy are load-bearing for quality suggestions
