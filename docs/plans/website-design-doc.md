# Polarity Lab Public Website — Design Document

**Version:** April 2026 — internal, not for external distribution
**Status:** Approved design, pending implementation
**Stack:** Astro (static output), Cloudflare Pages

---

## Purpose

Replace the current cinematic static HTML site with a public-facing Polarity Lab website grounded in the documentation ecosystem. The docs are the ground truth. The site presents what is actually true about the lab's work, evidence, and thesis -- no overclaimed results, no generated scores, no founding story as public evidence.

---

## Narrative Structure

Every page of the site applies the Pledge/Turn/Prestige structure. This is not just a homepage device -- it is the governing logic of the entire site.

- **Pledge:** The thing the visitor takes for granted. The ambient assumption that goes unexamined.
- **Turn:** It is not what you think. The mechanism of suppression made visible.
- **Prestige:** The work. Counter-environments, diagnostic instruments, honest evidence.

---

## Technical Architecture

**Stack:** Astro with static output. Zero JS by default. Deploys to Cloudflare Pages via wrangler.

```
polarity-site/
├── src/
│   ├── layouts/
│   │   ├── Base.astro          # Shell: nav, footer, design tokens, head
│   │   ├── Project.astro       # Project page shell (extends Base)
│   │   └── Research.astro      # Research/instrument pages (extends Base)
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── ProjectCard.astro   # Used on homepage and /projects index
│   │   └── EvidenceBar.astro   # Honest evidence state per project
│   ├── content/
│   │   ├── instruments/        # Markdown collection: one file per instrument
│   │   └── config.ts
│   ├── data/
│   │   └── projects.ts         # Single source of truth for project metadata
│   └── pages/
│       ├── index.astro
│       ├── projects/
│       │   ├── integrity-delta/
│       │   │   ├── index.astro
│       │   │   └── assess.astro
│       │   ├── polarity-gps.astro
│       │   ├── waxfeed.astro
│       │   └── avdp.astro
│       ├── research/
│       │   ├── index.astro
│       │   └── [instrument].astro
│       ├── fund.astro
│       └── join.astro
├── public/
├── astro.config.mjs
└── package.json
```

---

## Content Model

### Hardcoded in `.astro` files
Design-sensitive copy that is co-located with layout. Changes with thesis evolution. Includes homepage sections, project page narrative, fund and join framing.

### Content collections (`src/content/instruments/`)
One markdown file per instrument. Schema:

```typescript
// src/content/config.ts
const instruments = defineCollection({
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    project: z.string(),
    status: z.enum(['observability-pilot', 'platform-live-study-pending', 'design-iteration', 'concept']),
    evidence: z.string(),
    version: z.string(),
  })
});
```

### Project data (`src/data/projects.ts`)
Single source for the four active projects. Homepage cards and the research layer both pull from it. Adding a fifth project = one entry.

### Evidence states

| Project | State | Display label |
|---|---|---|
| Integrity Delta | `observability-pilot` | "Observability confirmed, validation study designed" |
| Polarity GPS | `platform-live-study-pending` | "Platform live, formal study pending" |
| WAXFEED | `design-iteration` | "Counter-environment in development" |
| AVDP | `design-iteration` | "Counter-format in development" |

No project claims more than it has. The EvidenceBar component renders these states consistently across all project cards and project pages.

---

## Page Designs

### Homepage (`/`)

**Pledge (above fold)**
Single headline. No subheadline. No statistics.

> "Every platform you use has a model of you. That model was built from your engagement history. Engagement history is not you. The gap between the model and the person is measurable. We measure it."

One CTA: "See the work" → anchors to Prestige section.

**Turn (first scroll)**
Plain-language explanation of the suppression mechanism: how optimization for engagement metrics diverges from authentic capacity over time. Sparse diagrammatic visual (concept only, no data chart). No generated numbers.

**Prestige (second scroll)**
Four project cards. Each card: name, one-line thesis, honest evidence state, link to project page. No hero images. No "coming soon" language for design-iteration projects -- they show their thesis and counter-environment concept.

Footer: wordmark only ("Polarity Lab"). No navigation links, no location. Nav handles all primary navigation.

**Nav links:** Integrity Delta, Polarity GPS, WAXFEED, AVDP, Fund, Join. No Research link until research layer is reinstated.

The Pledge section serves as the lab's about statement -- no separate about section on the homepage.

---

### Integrity Delta project page (`/projects/integrity-delta`)

IΔ is the primary institutional buyer pathway. This page carries more weight than the other three.

**Pledge**
> "AI reads the scan. The clinician confirms it. That's the workflow."

**Turn**
> "Confirmation is not independent evaluation. When AI confidence shapes how clinicians look, the gap between what the system flagged and what is actually present isn't caught -- it's inherited. IΔ makes that gap visible before it propagates."

**IΔ framing: domain-agnostic methodology**
IΔ is a gap measurement methodology for clinical AI. It measures the divergence between what a deployed AI system produces and independently verifiable ground truth -- the gap that standard workflow review does not surface. The initial observability study was conducted in diagnostic radiology. The measurement logic applies wherever clinical AI produces outputs against which ground truth can be established.

Do not frame IΔ as a radiology tool. Radiology is the credibility anchor and first proof-of-concept. The institutional buyer pathway is open to any health system deploying clinical AI.

**Evidence block**
> "Observability confirmed in initial diagnostic radiology study. IΔ detected divergence between AI-assigned labels and ground truth in cases not surfaced by standard workflow review. Prevalence study designed and pre-registerable. Validation protocol available on request."

No internal case identifiers (UID-1013, UID-1014). These are paper-internal labels that add no signal to a public reader and make n=5 appear smaller than what was shown.

**CTA**
Leads to `/projects/integrity-delta/assess`.

---

### Assessment subpage (`/projects/integrity-delta/assess`)

Institutional conversion page. Not in top navigation. Discoverable through the project page and through guided institutional outreach.

No Pledge/Turn -- visitors arriving here have already accepted the premise.

Three sections:
1. **What the assessment produces:** A scored IΔ report on a deployed clinical AI system. Scoped per engagement.
2. **What the process looks like:** Scope conversation, ground truth standard established jointly, IΔ measurement, findings report. Timeline and what the institution provides.
3. **Contact / initiation:** Form that routes to Director of Strategy. Not founder inbox.

---

### GPS project page (`/projects/polarity-gps`)

**Pledge:** "Discovery platforms surface what's around you."

**Turn:** "They surface what's popular around you. Popularity is not the same as presence. What exists at the neighborhood scale -- the store that's been there for twenty years, the church that anchors the block -- is not what recommendation surfaces, because it does not optimize for engagement. That gap is what GPS is being built to measure."

**The question section:** Is the gap between what recommendation surfaces and what actually exists in a neighborhood measurable? Platform live at polaritygps.com. Community partnerships established (MUSEOFRI, GOODhumanz). Formal measurement study is the next step.

**Evidence block:** Platform live. Community partnerships established. Formal scored study not yet run.

Note: Do not name the Proximity Index on this page. Instrument name is not confirmed and direction may change.

---

### WAXFEED project page (`/projects/waxfeed`)

**Pledge:** "The platform knows what you want to hear."

**Turn:** "It knows your engagement history. Engagement was shaped by what it showed you, when it showed it, how it framed it. Over years of use, the model trained on your engagement diverges from your genuine musical identity. WAXFEED is the counter-environment designed to surface what the recommendation system has suppressed."

**The question section:** Is the gap between what a recommendation system predicts and what a listener actually prefers measurable at the individual level? That is what WAXFEED is being built to test.

**Evidence block:** Counter-environment in development. No formal study has been run yet. Measurement approach being designed concurrently with the platform.

Note: Do not name the CGM on this page. Instrument name is not confirmed and direction may change.

---

### AVDP project page (`/projects/avdp`)

**Pledge:** "Interview formats capture who people are."

**Turn:** "They capture what people are willing to say under production pressure, with phones visible, with a clock running. That is not the same thing. Every design element of AVDP is a hypothesis about the specific mechanism by which conventional formats suppress authentic expression."

**The question section:** Does the same person express more authentically when production pressure is removed? That is what AVDP is being designed to test. Proof-of-concept footage exists.

**Evidence block:** Counter-format in development. Proof-of-concept footage exists. No formal study has been run yet.

Note: Do not name the FEM on this page. Instrument name is not confirmed and direction may change.

---

### Research (`/research`)

**Currently offline -- not linked from anywhere on the site.** Pages exist in the codebase but are undiscoverable until instrument names and directions are confirmed.

When reinstated: for academic partners and grant reviewers only. Index of measurement approaches with status. Each page rendered from content collection. Instrument names (CGM, FEM, Proximity Index) appear here only -- not on public project pages -- because this audience understands concept vs. validated instrument.

---

### Fund (`/fund`)

Financial believers section. Lab economics, how contribution works, who this is for. Directed at early believers, not foundations seeking deliverable accountability.

---

### Join (`/join`)

For contributors and collaborators. Role types, what the lab is building toward, how to get involved.

---

## Design Principles

**Honest evidence throughout.** No project claims more than it has. Evidence states are consistent across all surfaces: homepage cards, project pages, research layer.

**Radiology as proof-of-concept, not product boundary.** IΔ is a clinical AI gap measurement methodology. The radiology study is the first validation. All public copy reflects this.

**No internal identifiers on public surfaces.** Case IDs, internal labels, and working draft version numbers belong in specs and papers, not on the website.

**No Cosmos on the public site.** Evidence is founder self-report only. Does not meet the site's evidence standard.

**Pledge/Turn/Prestige governs the whole site.** Not just the homepage -- every project page, every section. These labels are internal framing only -- they do not appear as visible headings on any public page.

**The research layer is for experts and is currently offline.** When reinstated, `/research` exists for academic partners and grant reviewers only. Instrument names live here, not on public project pages.

---

## Migration Notes

The current site is a single static HTML file (~5,000 lines). The Astro build replaces it. The existing `public/` directory stays in place during migration. Cloudflare Pages deploys from the Astro build output (`dist/`).

Deploy command:
```
npm run deploy
```
Which runs: `astro build && CLOUDFLARE_API_TOKEN=... npx wrangler pages deploy dist/ --project-name polarity-site`

Cloudflare Pages project: `polarity-site` on team@polarity-lab.com account. Contact email for all CTAs: team@polarity-lab.com.
