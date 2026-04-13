import { json, err, requireAdmin } from './_utils.js';

const OWNER = 'teampolarity';
const REPO = 'polarity-lab-site';
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
        url: { type: 'string', description: 'Full URL to fetch, e.g. "https://polarity-site-deb.pages.dev/" or "https://polarity-lab.com/"' }
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
      const text = html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ').trim();
      return { url: input.url, text: text.slice(0, 8000) };
    }

    case 'read_file': {
      const res = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/contents/${input.path}?ref=${BRANCH}`,
        { headers: ghHeaders }
      );
      if (!res.ok) return { error: `GitHub API error: ${res.status}` };
      const data = await res.json();
      const content = atob(data.content.replace(/\n/g, ''));
      return { path: input.path, content, sha: data.sha };
    }

    case 'write_file': {
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
          patch: (f.patch || '').slice(0, 3000)
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
  for (let i = 0; i < 6; i++) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        tools: TOOLS,
        messages: loopMessages
      })
    });

    const data = await res.json();
    if (!data.content) return err(`LLM error: ${JSON.stringify(data?.error || data)}`, 502);

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
