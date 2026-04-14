# Site Evolution Agent — Design Doc
_2026-04-13_

## Problem

Lab OS chat can read and write pipeline data (grants, leads, believers, content) but has zero awareness of the site itself. The site has been iterating heavily on copy and thesis framing (see commit log), but that direction lives only in git history — the chat can't see it, learn from it, or act on it.

The missing piece: an agent that reads the site as a living document, understands where it's been, and can evolve it — copy, layout, structure — on prompt. Same autonomy as Claude Code, but accessible from the admin UI.

---

## Phase 0: Infrastructure Migration (Pre-requisite)

Current state: repo lives on Shadrack's personal GitHub (`sh6drack/POLARITY-SITE`), Cloudflare Pages on Shadrack's account. Requires his 2FA for any repo or deploy action — blocks autonomous operation.

**Migration steps:**
1. Create GitHub account at `team@polarity-lab.com` (or a GitHub org `polarity-lab`)
2. Transfer `sh6drack/POLARITY-SITE` to the new account/org
3. Create new Cloudflare account at `team@polarity-lab.com`
4. Transfer Polarity Pages project to new Cloudflare account
5. Create fine-grained GitHub PAT (`Contents: read+write` on the transferred repo)
6. Add as `GITHUB_TOKEN` env secret in Cloudflare Pages project settings

Until Phase 0 is complete, the write-back path cannot be wired up.

---

## Design

### New Surface

- **Page:** `/admin/site.html` — dedicated site evolution chat
- **Function:** `functions/api/lab-os/site-chat.js` — agentic backend
- **Sidebar:** "Site" link added under Intelligence section on all admin pages

### Architecture

Same agentic loop pattern as `chat.js` (up to 6 iterations), but:
- Site-focused system prompt (see below)
- 6 site-specific tools
- `max_tokens: 8192` (site rewrites need headroom vs pipeline chat's 1024)
- Write-back via GitHub Contents API to `main`

---

## Tools

### `list_pages`
Returns static inventory of all editable files: public pages, admin pages, CSS files, key function files. No external call — hardcoded manifest kept in sync with the repo.

### `read_page_text`
Fetches a live page URL and strips HTML to readable text. Used for understanding what a page *communicates* — what the visitor reads. Faster context than raw HTML.

Input: `{ url: string }` (e.g. `"https://polarity-lab.com/"`)

### `read_file`
GitHub Contents API: `GET /repos/{owner}/{repo}/contents/{path}`. Returns base64-decoded content and the file's SHA. The SHA is required for any subsequent write.

Input: `{ path: string }` (e.g. `"public/index.html"`)

### `write_file`
GitHub Contents API: `PUT /repos/{owner}/{repo}/contents/{path}`. Commits updated content directly to `main`. Returns the commit URL.

Input: `{ path: string, content: string, message: string, sha: string }`

Commit message convention follows existing style: `reframe:`, `refine:`, `feat:`, `fix:`, `chore:`.

### `get_commit_log`
GitHub Commits API: last 20 commits with message, date, author. Claude calls this first when asked to suggest improvements — understanding the direction before proposing.

Input: `{ limit?: number }` (default 20)

### `get_diff`
GitHub Commits API: `GET /repos/{owner}/{repo}/commits/{sha}`. Returns files changed and patches for a specific commit. Used to understand what a particular iteration actually changed.

Input: `{ sha: string }`

---

## System Prompt

The system prompt embeds four layers of context:

### 1. Brand and Thesis
- Polarity Lab: independent research institute for the human condition, no fixed location
- Core thesis: systems act on human variance through compliance apparatuses
- Four projects: Integrity Delta, AVDP, WAXFEED, Polarity GPS
- Tone register: spare, precise, no filler, no pleasantries

### 2. Design System
**Void palette (CSS vars):**
- `--void-pure` through `--void-elevated` (dark background scale)
- `--teal` (#4ECDC4), `--coral` (#FF8A65), `--purple` (#BB8FCE) brand colors
- `--teal-subtle`, `--teal-glow` etc. for states

**Typography:**
- Display: Space Grotesk (headings, labels, buttons)
- Body: Inter
- Mono: JetBrains Mono (labels, tags, metadata)

**Admin CSS patterns:** `.stat-card`, `.sidebar-link`, `.section-label`, `.void-elevated`, `.border-ghost`, `.text-tertiary` — agent uses existing classes, does not invent new ones.

### 3. UI/UX Component Taxonomy
Full component selection guides from the project's established UI system:

**Overlay selection:**
- Tooltip: hover, non-interactive, brief description
- Popover: click, can contain interactive elements
- Modal: blocks all interaction, requires response
- Drawer: slides from edge, good for secondary nav/detail
- Toast: auto-appearing, auto-dismissing notification
- Alert: inline prominent notification (not an overlay)

**Loading states:**
- Spinner: unknown duration, no layout hint
- Skeleton: known layout, perceived-faster, maintains spatial context
- Progress Bar: known %, continuous task
- Progress Indicator: discrete steps in multi-step flow

**Input selection:**
- Select: many predefined options, single select, no custom input
- Combobox: many options + free text filtering
- Radio: 2-5 options, single select, all visible
- Checkbox: multi-select or single binary toggle
- Toggle: binary on/off, immediate effect
- Segmented Control: 2-5 view-switching options

**Accessibility essentials:**
- Accordions: `aria-expanded`, `aria-controls`
- Popovers: `aria-haspopup="dialog"`, Esc to close + return focus
- Modals: focus trap required

### 4. Behavioral Rules
- Always call `get_commit_log` first when asked to suggest improvements — understand direction before proposing
- Always call `read_file` before `write_file` — needs the SHA
- When editing HTML: preserve all existing CSS vars, class names, and script structure unless explicitly asked to change them
- Commit messages match the existing convention (`reframe:`, `refine:`, `feat:`, `fix:`)
- Be specific about what changed and why in commit messages
- After writing a file, report the commit URL so the user can verify

---

## Page Inventory (for `list_pages`)

**Public pages:**
- `public/index.html` — homepage, hero + thesis + project cards
- `public/work.html` — work/projects page
- `public/join.html` — join/contributor page
- `public/fund.html` — fund/believers page
- `public/legal.html` — legal
- `public/research/avdp.html` — AVDP project page
- `public/research/wax-feed.html` — WAXFEED project page
- `public/research/polaritygps.html` — Polarity GPS project page
- `public/research/integrity-delta.html` — Integrity Delta project page

**Admin pages:**
- `public/admin/dashboard.html` — Lab OS dashboard
- `public/admin/chat.html` — pipeline intelligence chat
- `public/admin/site.html` — site evolution chat (this feature)
- `public/admin/grants.html` — grants pipeline
- `public/admin/outreach.html` — outreach leads
- `public/admin/believers.html` — financial believers
- `public/admin/content.html` — content drafts
- `public/admin/docs.html` — doc generator

**CSS:**
- `public/admin/css/admin.css` — admin design system

**Key functions:**
- `functions/api/lab-os/chat.js` — pipeline chat backend
- `functions/api/lab-os/site-chat.js` — site evolution backend (this feature)
- `functions/api/lab-os/_utils.js` — shared auth + utilities

---

## UI: `/admin/site.html`

Same shell as other admin pages. Suggested prompts tuned to site evolution:
- "What has the homepage been trying to say lately?"
- "Review the work page and suggest tightening the copy"
- "What's changed most in the last 10 commits?"
- "Rewrite the hero headline — it's too flat"
- "Update the join page CTA to match the current thesis"

After a write, the agent reports back the commit URL and a brief summary of what changed.

---

## Dependencies

| Dependency | Status |
|---|---|
| `GITHUB_TOKEN` env secret in Cloudflare Pages | Requires Phase 0 |
| GitHub account at `team@polarity-lab.com` | Requires Phase 0 |
| Repo transferred from `sh6drack/POLARITY-SITE` | Requires Phase 0 |
| `ANTHROPIC_API_KEY` already in Cloudflare env | Present |
| `LAB_OS_DB` D1 binding | Present (not used by this feature) |

---

## What This Is Not

- Not a staging/PR workflow — commits go straight to `main` (same as manual edits)
- Not a design tool — proposes copy and structure changes in HTML, not visual mockups
- Not autonomous — only acts on explicit prompts from the admin
