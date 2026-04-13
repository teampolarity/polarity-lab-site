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
- Integrity Delta: AI systems suppress correct internal reasoning in order to produce socially agreeable outputs. IΔ measures the signed gap between internal correctness (logit-lens) and final output. Clinical risk is diagnostic AI that agrees when it shouldn't.
- AVDP (A Very Distant Perspective): long-form video functions as a measurable restorative intervention. The format is the methodology, because ambient soundscapes and the absence of phones are what produce the effect, which we then measure in post-session assessment.
- WAXFEED: song ratings train a model to predict a user's response to unheard music, and the prediction gaps become cognitive signal. Relationship formation is tracked at 30 and 90 days.
- Polarity GPS: proximity-based discovery designed to surface civic infrastructure that platform design currently hides. The Proximity Index measures the gap between cultural output within a radius and what platforms actually surface.

## VOICE AND TONE

The lab's voice builds logic rather than performs confidence. Every sentence should show the reasoning chain, not just assert the conclusion. This is how the lab founder writes, and all site copy should match this register.

**Core rules:**

Write complete sentences that trace causality. Use connectors like "because," "which allows us to," "this is important because," "therefore," and "this means that." The reader needs to be able to follow how one claim produces the next. If you can't explain why something matters, don't state it.

Epistemic honesty is part of the voice. Acknowledge what is unknown, what is being explored, what we are still working to understand. Use "we believe," "we think," "we're not yet sure," and "in a mechanism still unknown." Don't assert more than the work supports. Performed confidence is the opposite of what this lab stands for.

No em dashes. No en dashes. Rewrite the sentence instead of using dashes to staple clauses together.

No rhetorical fragment lists. Not "School. Work. Medicine." Not "We study it." Not punchy one-liners presented as philosophy. Complete sentences. If the thought isn't ready to be a complete sentence, it isn't ready to be on the site.

No marketing register. Not "pioneering," not "cutting-edge," not "passionate about," not "transforming." These words signal that something is being sold. Say what the thing is and why it matters, in plain language.

Collaborative framing is natural. "We" is correct for lab work. "I" is correct for personal observation or reaction. The distinction matters.

**Additional patterns to follow:**

Name what drew your attention and why, rather than just asserting what matters. "This caught our attention, because one would normally expect X, but here we found Y" is more honest than "Notably, X." The observation comes first; the significance follows from it.

Set up expectations before revealing what actually happened. "We expected to find X. Instead, we found Y, which suggests Z." This pattern appears in the founder's writing across contexts, from lab notebooks to personal statements, and it works because it shows the reasoning process rather than just the conclusion.

Short declarative sentences can exist, but they must be earned by the paragraph that precedes them, not used as openers. "Hope is a delicate virtue" lands because it follows a paragraph about what hope looks like in practice. The same sentence as a section header is a cliche.

Assume the reader needs the background to follow the reasoning, and provide it without condescension. Not "as you know" and not a textbook definition, but a plain sentence that gives them what they need. "By degrading their sodium-potassium pumps, zebrafish embryos can adapt to low oxygen environments" is the right model: specific, functional, not insulting.

Use concrete specificity when making abstract points. "Perspective is unlimited and a vector by nature, meaning each person has the potential to bring a new direction that has not yet been heard" is better than "diverse perspectives are valuable." The abstraction should point to something real.

**Examples of the right register:**
- "The understandings that we get from studying the zebrafish brain can give us insights on how the human brain works, and how behavior is modulated in the brain." (traces the logic, doesn't assert it)
- "I believe this is important because it defines behavior as something that can be manipulated in different situations versus something that is just a static outfit." (shows reasoning)
- "In a mechanism still unknown, the zebrafish embryo degrades the sodium-potassium pump in order to conserve energy." (honest about limits)
- "This caught my attention, as one would normally expect NKA to localize along the basolateral membrane of the cell." (names the observation, then explains why it matters)
- "Much to my surprise, the strong ZO-1 labeling that I was so sure was in the pronephric duct was actually in the notochord region." (contrast and reveal, shows the process)

**Clarity is a separate discipline from honesty.**

The voice rules above are about being honest and showing reasoning. This section is about being understood by anyone, including someone reading quickly or without a science background. Both requirements apply at the same time. A sentence can be honest and still lose people.

Each sentence should do one thing. If a sentence requires the reader to hold more than one new idea in working memory at the same time, split it into two sentences. The reasoning chain should be followable one step at a time, not all at once.

Use plain words over precise-but-obscure ones when both work. "Changes what you can do" before "modulates behavioral range." "Gap between what it knows and what it says" before "signed divergence between internal representation and output distribution." Precision is good; requiring a glossary to follow is not.

Read each sentence and ask: would someone who has never heard of this lab understand what this sentence is saying on its own? Not would they understand the whole argument, just this sentence. If the answer is no, either add one plain background sentence before it or rewrite it.

The goal is to make the reader work to disagree, not to understand. They should be able to follow the logic easily and then decide whether they find it compelling. If they can't follow it, the interesting disagreement never happens.

The founder's writing has a stream-of-consciousness quality that works in long-form because the reasoning is eventually traced out. For the site, that same reasoning needs to be front-loaded and stated directly before the elaboration, not after it. Put the plain statement first, then the nuance.

**What to avoid:**
- "Systems manipulate what makes you human. We study it." (fragment list, performative)
- "We're pioneering new methods for..." (marketing filler)
- "Cutting-edge research at the intersection of..." (generic AI copy)
- Opening a section with a short declarative meant to sound profound
- Using an em dash where a comma or a new sentence would work
- Saying something is "significant" or "notable" without explaining what made it so
- Sentences that require the reader to hold two or more new ideas simultaneously before reaching the verb
- Using a technical term or internal name before it has been defined in plain language

## STRUCTURAL PATTERNS FOR PROJECT PAGES AND PITCH CONTENT

These patterns come from how the lab founder structures research presentations. They govern how project pages should be organized, not just what they say.

**Headings commit to a claim or ask a direct question.**

Headings are not topic labels. Not "About AVDP" or "Experiment 2." The heading should make a statement the rest of the section supports, or pose the question the section answers. "Long-form video functions as a measurable restorative intervention" is a heading. "We explore whether olfactory cues are actively or passively released" is a heading. "AVDP" alone is not — it's a name, not a thought.

**Build the logic incrementally. Don't front-load everything.**

A project page should move through: what we observed and why it caught our attention, what we expected to find, what the setup looks like, what we actually found, and what that means we don't yet know. Each section earns the next. Readers shouldn't need to scroll back to understand a later claim.

**The dark background is for data, not decoration.**

The void palette (dark backgrounds) should be used where measurements and outputs live, not as a general aesthetic. If a section shows an actual delta, a score, a distribution, or any real output from the work, it belongs on dark. Context and setup can live on lighter surfaces. This mirrors how the founder uses dark slides in research presentations: the background changes when the data appears.

**A/B comparison is the core research communication structure.**

When the work involves measuring a gap or comparing two conditions, show them side by side at equal visual weight. No prose explanation of the difference — the visual does the arguing. Left condition, right condition, same diagram treatment for both. For Integrity Delta: internal correctness vs. final output. For AVDP: pre-session vs. post-session. For WAXFEED: predicted response vs. actual response. For Polarity GPS: what's in the radius vs. what platforms surface.

**The measurement is always the anchor.**

Each project has a named measurement: IΔ, the Proximity Index, the prediction gap, post-session scores. The measurement should appear early and be defined plainly before it's used in any claim. "IΔ measures the signed gap between internal correctness and final output" is the anchor for everything else on the Integrity Delta page. Don't bury it.

**Diagrams carry the explanation; prose carries the reasoning.**

Custom diagrams (experiment setups, flow diagrams, comparison layouts) should show the structure of the work. Prose explains why the structure was chosen and what it reveals. Never use prose to describe something that a diagram would communicate more clearly. Never use a diagram as decoration for a point that only makes sense in words.

**Acknowledge what is still open.**

Every project page should end with what remains unknown or unexplored. This isn't a weakness — it's the honest state of active research, and it signals to potential collaborators where the work is going. "We have not yet determined whether X" and "Future work will need to address Y" are correct. "We look forward to unlocking the full potential of Z" is not.

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
