# Polarity Lab Website — Astro Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate the current static HTML site to an Astro project that outputs the same static HTML but with shared components, a content collection for research instruments, and honest evidence framing across all four projects.

**Architecture:** Astro with static output. All pages are `.astro` files or markdown content collections. Zero client-side JS. Deploys to Cloudflare Pages via wrangler. The design system (void palette, Space Grotesk/Inter/JetBrains) is preserved from the existing site via CSS custom properties in `Base.astro`.

**Tech Stack:** Astro 4.x, TypeScript, Zod (content schema), wrangler (deploy)

**Design doc:** `docs/plans/website-design-doc.md` — read this before starting.

---

## Reference: Evidence States

| Project | State constant | Display label |
|---|---|---|
| Integrity Delta | `observability-pilot` | "Observability confirmed, validation study designed" |
| Polarity GPS | `platform-live-study-pending` | "Platform live, formal study pending" |
| WAXFEED | `design-iteration` | "Counter-environment in development" |
| AVDP | `design-iteration` | "Counter-format in development" |

## Reference: IΔ Framing Rule

IΔ is a **domain-agnostic clinical AI gap methodology**. Radiology was the first proof-of-concept because the founder had domain knowledge and dataset access -- not a product boundary decision. Never call IΔ a radiology tool. Never cite UID-1013 or UID-1014 on public-facing pages.

---

## Task 1: Initialize Astro

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/env.d.ts`

**Step 1: Check for existing package.json**
```bash
cat package.json 2>/dev/null || echo "no package.json"
```

**Step 2: Initialize Astro**
```bash
npm create astro@latest . -- --template minimal --typescript strict --no-install --no-git
```
Choose: minimal template, TypeScript strict, skip install, skip git init (already a repo).

**Step 3: Install dependencies**
```bash
npm install
```

**Step 4: Replace astro.config.mjs with static output config**
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: {
    assets: 'assets',
  },
});
```

**Step 5: Verify build works**
```bash
npm run build
```
Expected: `dist/` created with no errors.

**Step 6: Commit**
```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/env.d.ts
git commit -m "feat: initialize astro project with static output"
```

---

## Task 2: Base Layout with Design Tokens

**Files:**
- Create: `src/layouts/Base.astro`

**Step 1: Create the base layout**
```astro
---
// src/layouts/Base.astro
interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Polarity Lab — counter-environments for authentic capacity' } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title} | Polarity Lab</title>
    <meta name="description" content={description} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
  <body>
    <slot name="nav" />
    <main>
      <slot />
    </main>
    <slot name="footer" />
  </body>
</html>

<style is:global>
  :root {
    /* Void palette */
    --void-pure: #000000;
    --void-deep: #020204;
    --void-space: #050508;
    --void-nebula: #080810;
    --void-surface: #0c0c14;
    --void-elevated: #12121c;

    /* Brand Colors */
    --teal: #4ECDC4;
    --teal-bright: #5EEEE4;
    --teal-light: #7EFFF5;
    --teal-deep: #2BA89F;
    --teal-glow: rgba(78, 205, 196, 0.5);
    --teal-subtle: rgba(78, 205, 196, 0.12);

    --coral: #FF8A65;
    --coral-bright: #FFA07A;
    --coral-glow: rgba(255, 138, 101, 0.5);

    --purple: #BB8FCE;
    --purple-bright: #D4A5E8;
    --purple-glow: rgba(187, 143, 206, 0.5);

    /* Text hierarchy */
    --text-pure: #ffffff;
    --text-primary: rgba(255, 255, 255, 0.95);
    --text-secondary: rgba(255, 255, 255, 0.65);
    --text-tertiary: rgba(255, 255, 255, 0.4);
    --text-ghost: rgba(255, 255, 255, 0.2);

    /* Borders */
    --border-ghost: rgba(255, 255, 255, 0.06);
    --border-subtle: rgba(255, 255, 255, 0.1);
    --border-medium: rgba(255, 255, 255, 0.18);

    /* Typography */
    --font-display: 'Space Grotesk', -apple-system, sans-serif;
    --font-body: 'Inter', -apple-system, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;

    /* Motion */
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-family: var(--font-body);
    background: var(--void-deep);
    color: var(--text-primary);
    -webkit-font-smoothing: antialiased;
  }

  body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }

  a {
    color: var(--teal);
    text-decoration: none;
  }

  a:hover {
    color: var(--teal-bright);
  }
</style>
```

**Step 2: Verify build**
```bash
npm run build
```
Expected: no errors.

**Step 3: Commit**
```bash
git add src/layouts/Base.astro
git commit -m "feat: add base layout with void palette design tokens"
```

---

## Task 3: Nav Component

**Files:**
- Create: `src/components/Nav.astro`

**Step 1: Create Nav**
```astro
---
// src/components/Nav.astro
const navLinks = [
  { href: '/projects/integrity-delta', label: 'Integrity Delta' },
  { href: '/projects/polarity-gps', label: 'Polarity GPS' },
  { href: '/projects/waxfeed', label: 'WAXFEED' },
  { href: '/projects/avdp', label: 'AVDP' },
  { href: '/fund', label: 'Fund' },
];

const currentPath = Astro.url.pathname;
---
<nav>
  <a href="/" class="wordmark">Polarity Lab</a>
  <ul>
    {navLinks.map(link => (
      <li>
        <a
          href={link.href}
          class:list={['nav-link', { active: currentPath.startsWith(link.href) }]}
        >
          {link.label}
        </a>
      </li>
    ))}
  </ul>
</nav>

<style>
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--border-ghost);
    position: sticky;
    top: 0;
    background: rgba(2, 2, 4, 0.92);
    backdrop-filter: blur(12px);
    z-index: 100;
  }

  .wordmark {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--text-pure);
    letter-spacing: -0.01em;
  }

  .wordmark:hover {
    color: var(--text-pure);
  }

  ul {
    display: flex;
    gap: 2rem;
    list-style: none;
  }

  .nav-link {
    font-family: var(--font-body);
    font-size: 0.875rem;
    color: var(--text-secondary);
    transition: color 0.2s var(--ease-smooth);
    letter-spacing: 0.01em;
  }

  .nav-link:hover,
  .nav-link.active {
    color: var(--text-primary);
  }

  @media (max-width: 768px) {
    ul { display: none; }
  }
</style>
```

**Step 2: Update Base.astro to use Nav**

In `src/layouts/Base.astro`, add the import and Nav slot:
```astro
---
import Nav from '../components/Nav.astro';
// ... existing props
---
<!DOCTYPE html>
<!-- ... head ... -->
<body>
  <Nav />
  <main>
    <slot />
  </main>
  <slot name="footer" />
</body>
```
Remove the `<slot name="nav" />` -- Nav is now always included in Base.

**Step 3: Verify build**
```bash
npm run build
```

**Step 4: Commit**
```bash
git add src/components/Nav.astro src/layouts/Base.astro
git commit -m "feat: add nav component with project links"
```

---

## Task 4: Footer Component

**Files:**
- Create: `src/components/Footer.astro`

**Step 1: Create Footer**
```astro
---
// src/components/Footer.astro
---
<footer>
  <div class="footer-inner">
    <span class="lab-name">Polarity Lab</span>
    <nav class="footer-links">
      <a href="/research">Research</a>
      <a href="/fund">Fund</a>
      <a href="/join">Join</a>
    </nav>
    <span class="location">Providence, RI</span>
  </div>
</footer>

<style>
  footer {
    border-top: 1px solid var(--border-ghost);
    padding: 2rem;
    margin-top: auto;
  }

  .footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
  }

  .lab-name {
    font-family: var(--font-display);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .footer-links {
    display: flex;
    gap: 1.5rem;
  }

  .footer-links a {
    font-size: 0.875rem;
    color: var(--text-tertiary);
    transition: color 0.2s var(--ease-smooth);
  }

  .footer-links a:hover {
    color: var(--text-secondary);
  }

  .location {
    font-size: 0.8125rem;
    color: var(--text-ghost);
    font-family: var(--font-mono);
  }
</style>
```

**Step 2: Add Footer to Base.astro**
```astro
---
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
---
<body>
  <Nav />
  <main><slot /></main>
  <Footer />
</body>
```
Remove the `<slot name="footer" />`.

**Step 3: Verify build**
```bash
npm run build
```

**Step 4: Commit**
```bash
git add src/components/Footer.astro src/layouts/Base.astro
git commit -m "feat: add footer component"
```

---

## Task 5: Content Collection Schema + Instrument Files

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/instruments/integrity-delta.md`
- Create: `src/content/instruments/proximity-index.md`
- Create: `src/content/instruments/cognitive-gap-measure.md`
- Create: `src/content/instruments/format-effectiveness-measure.md`

**Step 1: Create content config**
```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const instruments = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    acronym: z.string(),
    project: z.string(),
    projectSlug: z.string(),
    status: z.enum([
      'observability-pilot',
      'platform-live-study-pending',
      'design-iteration',
      'concept',
    ]),
    evidenceSummary: z.string(),
    version: z.string(),
    limitations: z.array(z.string()).optional(),
  }),
});

export const collections = { instruments };
```

**Step 2: Create IΔ instrument file**
```markdown
---
title: Integrity Delta
acronym: IΔ
project: Integrity Delta
projectSlug: integrity-delta
status: observability-pilot
evidenceSummary: "Observability confirmed in initial diagnostic radiology study. IΔ detected divergence between AI-assigned labels and ground truth in cases not surfaced by standard workflow review. Prevalence study designed and pre-registerable."
version: "0.3"
limitations:
  - "Observability study (n=5) confirms the gap is detectable. It does not establish prevalence, reliability across sites, or generalizability across clinical AI domains."
  - "Resolution Valley values in the published paper are illustrative predictions, not empirical data."
---

IΔ measures the gap between what a deployed clinical AI system produces and independently verifiable ground truth — the divergence that standard workflow review does not surface.

The measurement logic is domain-agnostic. The initial observability study was conducted in diagnostic radiology. The instrument applies wherever clinical AI produces outputs against which a ground truth standard can be established.
```

**Step 3: Create Proximity Index instrument file**
```markdown
---
title: Proximity Index
acronym: PI
project: Polarity GPS
projectSlug: polarity-gps
status: platform-live-study-pending
evidenceSummary: "Platform live at polaritygps.com. Community partnerships established with MUSEOFRI and GOODhumanz. Instrument specification complete. Formal scored pilot not yet run."
version: "0.2"
limitations:
  - "No formal pilot scores have been computed. Readiness level is platform and instrument design, not scored validation."
  - "The Proximity Index does not yet distinguish between restoration of genuine place-knowledge and substitution for embodied neighborhood experience."
---

The Proximity Index measures the gap between what local recommendation surfaces and what actually exists at the neighborhood scale — the stores, organizations, and places that have persisted but don't appear in algorithmic surfaces because they don't optimize for engagement.
```

**Step 4: Create CGM instrument file**
```markdown
---
title: Cognitive Gap Measure
acronym: CGM
project: WAXFEED
projectSlug: waxfeed
status: design-iteration
evidenceSummary: "Instrument framework developed. No prior specification existed. Formal validation study not yet run. WAXFEED counter-environment in development."
version: "0.0"
limitations:
  - "The CGM is a concept design. No validation study has been conducted. No CGM scores exist."
  - "The instrument does not yet distinguish between restoration of authentic musical preference and dependency on the counter-environment."
---

The Cognitive Gap Measure scores the divergence between a listener's authentic musical preference and their recommendation system's behavioral model — the gap produced by years of engagement-optimized surfacing.
```

**Step 5: Create FEM instrument file**
```markdown
---
title: Format Effectiveness Measure
acronym: FEM
project: AVDP
projectSlug: avdp
status: design-iteration
evidenceSummary: "Instrument framework developed. Counter-format footage (Zay episode) pre-exists this specification. FEM as a formal psychometric instrument is a concept design. No formal scores computed."
version: "0.0"
limitations:
  - "The FEM is a concept design. No formal FEM scores have been computed."
  - "Within-subject paired sessions introduce carry-over effects that counterbalancing can reduce but not eliminate."
  - "The instrument does not yet distinguish between restoration of authentic expression and dependency on the counter-format environment."
---

The Format Effectiveness Measure scores the signed gap between what a subject expresses in the AVDP counter-format and what the same subject expresses under conventional interview conditions — a direct measure of how much authentic expression conventional formats suppress.
```

**Step 6: Verify build**
```bash
npm run build
```
Expected: content collections parsed, no type errors.

**Step 7: Commit**
```bash
git add src/content/
git commit -m "feat: add content collection schema and instrument files"
```

---

## Task 6: Project Data File + EvidenceBar Component

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/components/EvidenceBar.astro`

**Step 1: Create project data**
```typescript
// src/data/projects.ts
export type EvidenceState =
  | 'observability-pilot'
  | 'platform-live-study-pending'
  | 'design-iteration'
  | 'concept';

export interface Project {
  name: string;
  slug: string;
  thesis: string;
  evidenceState: EvidenceState;
  evidenceLabel: string;
  href: string;
}

export const PROJECTS: Project[] = [
  {
    name: 'Integrity Delta',
    slug: 'integrity-delta',
    thesis: 'Clinical AI produces gaps that standard workflow review does not surface. IΔ measures them.',
    evidenceState: 'observability-pilot',
    evidenceLabel: 'Observability confirmed, validation study designed',
    href: '/projects/integrity-delta',
  },
  {
    name: 'Polarity GPS',
    slug: 'polarity-gps',
    thesis: 'Recommendation surfaces what is popular nearby. The Proximity Index measures what exists but does not appear.',
    evidenceState: 'platform-live-study-pending',
    evidenceLabel: 'Platform live, formal study pending',
    href: '/projects/polarity-gps',
  },
  {
    name: 'WAXFEED',
    slug: 'waxfeed',
    thesis: 'Recommendation platforms build a model of the listener from engagement history. The Cognitive Gap Measure scores how far that model has drifted from who the person actually is.',
    evidenceState: 'design-iteration',
    evidenceLabel: 'Counter-environment in development',
    href: '/projects/waxfeed',
  },
  {
    name: 'AVDP',
    slug: 'avdp',
    thesis: 'Media format constraints suppress authentic expression. AVDP removes the suppressants and measures how much more of the person comes through.',
    evidenceState: 'design-iteration',
    evidenceLabel: 'Counter-format in development',
    href: '/projects/avdp',
  },
];
```

**Step 2: Create EvidenceBar component**
```astro
---
// src/components/EvidenceBar.astro
import type { EvidenceState } from '../data/projects';

interface Props {
  state: EvidenceState;
  label: string;
}

const { state, label } = Astro.props;
---
<div class:list={['evidence-bar', state]}>
  <span class="indicator" aria-hidden="true"></span>
  <span class="label">{label}</span>
</div>

<style>
  .evidence-bar {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.75rem;
    border-radius: 2px;
    border: 1px solid var(--border-ghost);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-tertiary);
  }

  .indicator {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--text-ghost);
    flex-shrink: 0;
  }

  /* State-specific colors */
  .observability-pilot {
    border-color: rgba(78, 205, 196, 0.2);
  }
  .observability-pilot .indicator {
    background: var(--teal);
  }
  .observability-pilot .label {
    color: var(--teal-deep);
  }

  .platform-live-study-pending {
    border-color: rgba(187, 143, 206, 0.2);
  }
  .platform-live-study-pending .indicator {
    background: var(--purple);
  }
  .platform-live-study-pending .label {
    color: var(--purple);
  }

  .design-iteration {
    border-color: var(--border-ghost);
  }
  .design-iteration .indicator {
    background: var(--text-ghost);
  }
</style>
```

**Step 3: Verify build**
```bash
npm run build
```

**Step 4: Commit**
```bash
git add src/data/projects.ts src/components/EvidenceBar.astro
git commit -m "feat: add project data and evidence bar component"
```

---

## Task 7: ProjectCard Component

**Files:**
- Create: `src/components/ProjectCard.astro`

**Step 1: Create ProjectCard**
```astro
---
// src/components/ProjectCard.astro
import EvidenceBar from './EvidenceBar.astro';
import type { Project } from '../data/projects';

interface Props {
  project: Project;
}

const { project } = Astro.props;
---
<a href={project.href} class="project-card">
  <div class="card-header">
    <span class="project-name">{project.name}</span>
  </div>
  <p class="thesis">{project.thesis}</p>
  <EvidenceBar state={project.evidenceState} label={project.evidenceLabel} />
</a>

<style>
  .project-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    border: 1px solid var(--border-ghost);
    background: var(--void-surface);
    color: var(--text-primary);
    transition: border-color 0.2s var(--ease-smooth), background 0.2s var(--ease-smooth);
    text-decoration: none;
  }

  .project-card:hover {
    border-color: var(--border-subtle);
    background: var(--void-elevated);
    color: var(--text-primary);
  }

  .project-name {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1.125rem;
    color: var(--text-pure);
    letter-spacing: -0.01em;
  }

  .thesis {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: var(--text-secondary);
    flex: 1;
  }
</style>
```

**Step 2: Verify build**
```bash
npm run build
```

**Step 3: Commit**
```bash
git add src/components/ProjectCard.astro
git commit -m "feat: add project card component"
```

---

## Task 8: Homepage

**Files:**
- Create: `src/pages/index.astro`
- Modify: `src/layouts/Base.astro` (add page wrapper styles if needed)

**Step 1: Create homepage**
```astro
---
// src/pages/index.astro
import Base from '../layouts/Base.astro';
import ProjectCard from '../components/ProjectCard.astro';
import { PROJECTS } from '../data/projects';
---
<Base title="Polarity Lab" description="Counter-environments for authentic capacity.">

  <!-- Pledge -->
  <section class="pledge">
    <div class="pledge-inner">
      <h1 class="headline">
        Every platform you use has a model of you.
      </h1>
      <p class="body">
        That model was built from your engagement history. Engagement history is not you.
        The gap between the model and the person is measurable. We measure it.
      </p>
      <a href="#work" class="cta">See the work</a>
    </div>
  </section>

  <!-- Turn -->
  <section class="turn">
    <div class="turn-inner">
      <div class="turn-text">
        <h2>The mechanism</h2>
        <p>
          Every environment optimized for engagement metrics reaches a second threshold.
          Below it, the environment serves the person it was built for.
          Beyond it, optimization for the environment's own metrics begins
          to suppress the capacity it was built to develop.
        </p>
        <p>
          Music recommendation learns your engagement, not your taste.
          Clinical AI learns your workflow, not your judgment.
          Local discovery learns what is popular, not what exists.
          Interview formats learn what gets clicks, not what people actually are.
        </p>
        <p>
          The gap between what the environment has made of you
          and what you actually are is not hypothetical. It is measurable.
        </p>
      </div>
      <div class="turn-diagram" aria-hidden="true">
        <div class="gap-visual">
          <span class="line authentic">authentic capacity</span>
          <span class="gap-label">gap</span>
          <span class="line modeled">environment's model</span>
        </div>
      </div>
    </div>
  </section>

  <!-- Prestige -->
  <section class="prestige" id="work">
    <div class="prestige-inner">
      <h2 class="section-label">The work</h2>
      <div class="projects-grid">
        {PROJECTS.map(project => (
          <ProjectCard project={project} />
        ))}
      </div>
    </div>
  </section>

</Base>

<style>
  /* Pledge */
  .pledge {
    min-height: 80vh;
    display: flex;
    align-items: center;
    padding: 6rem 2rem;
  }

  .pledge-inner {
    max-width: 720px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .headline {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: var(--text-pure);
  }

  .pledge-inner .body {
    font-size: 1.125rem;
    line-height: 1.7;
    color: var(--text-secondary);
    max-width: 600px;
  }

  .cta {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid var(--border-subtle);
    font-family: var(--font-display);
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--text-primary);
    transition: border-color 0.2s var(--ease-smooth), color 0.2s var(--ease-smooth);
    align-self: flex-start;
  }

  .cta:hover {
    border-color: var(--teal);
    color: var(--teal);
  }

  /* Turn */
  .turn {
    padding: 6rem 2rem;
    border-top: 1px solid var(--border-ghost);
  }

  .turn-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .turn-text h2 {
    font-family: var(--font-display);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--teal);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }

  .turn-text p {
    font-size: 1rem;
    line-height: 1.75;
    color: var(--text-secondary);
    margin-bottom: 1rem;
  }

  .turn-text p:last-child { margin-bottom: 0; }

  /* Gap diagram */
  .gap-visual {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem;
    border: 1px solid var(--border-ghost);
    background: var(--void-surface);
  }

  .line {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--text-tertiary);
    padding: 0.75rem 1rem;
    border: 1px solid var(--border-ghost);
  }

  .line.authentic {
    border-color: rgba(78, 205, 196, 0.3);
    color: var(--teal);
  }

  .gap-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-ghost);
    text-align: center;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* Prestige */
  .prestige {
    padding: 6rem 2rem;
    border-top: 1px solid var(--border-ghost);
  }

  .prestige-inner {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-label {
    font-family: var(--font-display);
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-tertiary);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 2.5rem;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1px;
    background: var(--border-ghost);
  }

  .projects-grid > * {
    background: var(--void-deep);
  }

  @media (max-width: 768px) {
    .turn-inner { grid-template-columns: 1fr; }
    .projects-grid { grid-template-columns: 1fr; }
  }
</style>
```

**Step 2: Verify build and preview**
```bash
npm run build && npm run preview
```
Open browser at `localhost:4321`. Check: headline renders, four project cards appear, gap diagram shows.

**Step 3: Commit**
```bash
git add src/pages/index.astro
git commit -m "feat: add homepage with pledge/turn/prestige structure"
```

---

## Task 9: Project Layout

**Files:**
- Create: `src/layouts/Project.astro`

**Step 1: Create project layout**

This layout wraps all project pages. It provides consistent header, body, and optional CTA structure.

```astro
---
// src/layouts/Project.astro
import Base from './Base.astro';
import EvidenceBar from '../components/EvidenceBar.astro';
import type { EvidenceState } from '../data/projects';

interface Props {
  title: string;
  description?: string;
  evidenceState: EvidenceState;
  evidenceLabel: string;
}

const { title, description, evidenceState, evidenceLabel } = Astro.props;
---
<Base title={title} description={description}>
  <article class="project-page">
    <header class="project-header">
      <div class="header-inner">
        <EvidenceBar state={evidenceState} label={evidenceLabel} />
        <h1>{title}</h1>
      </div>
    </header>
    <div class="project-body">
      <slot />
    </div>
  </article>
</Base>

<style>
  .project-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .project-header {
    padding: 4rem 0 3rem;
    border-bottom: 1px solid var(--border-ghost);
  }

  .header-inner {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 720px;
  }

  h1 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--text-pure);
    line-height: 1.2;
  }

  .project-body {
    padding: 3rem 0 6rem;
    max-width: 720px;
  }
</style>
```

**Step 2: Verify build**
```bash
npm run build
```

**Step 3: Commit**
```bash
git add src/layouts/Project.astro
git commit -m "feat: add project page layout"
```

---

## Task 10: Integrity Delta Project Page

**Files:**
- Create: `src/pages/projects/integrity-delta/index.astro`

**Step 1: Create IΔ page**

Read the design doc (`docs/plans/website-design-doc.md`) for IΔ framing before writing copy. Key rule: IΔ is domain-agnostic. Radiology is the first proof-of-concept. Never cite UID-1013 or UID-1014.

```astro
---
// src/pages/projects/integrity-delta/index.astro
import Project from '../../../layouts/Project.astro';
---
<Project
  title="Integrity Delta"
  description="A gap measurement methodology for clinical AI."
  evidenceState="observability-pilot"
  evidenceLabel="Observability confirmed, validation study designed"
>

  <!-- Pledge -->
  <section class="act">
    <p class="act-label">Pledge</p>
    <p class="act-body">
      AI reads the scan. The clinician confirms it. That is the workflow.
    </p>
  </section>

  <!-- Turn -->
  <section class="act">
    <p class="act-label">Turn</p>
    <p class="act-body">
      Confirmation is not independent evaluation. When AI confidence shapes how clinicians look,
      the gap between what the system flagged and what is actually present is not caught.
      It is inherited. IΔ makes that gap visible before it propagates.
    </p>
  </section>

  <!-- What IΔ does -->
  <section class="section">
    <h2>What IΔ measures</h2>
    <p>
      IΔ is a gap measurement methodology for clinical AI. It measures the divergence between
      what a deployed AI system produces and independently verifiable ground truth — the gap
      that standard workflow review does not surface.
    </p>
    <p>
      The measurement logic is domain-agnostic. The initial observability study was conducted
      in diagnostic radiology. The instrument applies wherever clinical AI produces outputs
      against which a ground truth standard can be established.
    </p>
  </section>

  <!-- Evidence -->
  <section class="section evidence-section">
    <h2>Evidence</h2>
    <div class="evidence-block">
      <p>
        Observability confirmed in initial diagnostic radiology study. IΔ detected divergence
        between AI-assigned labels and ground truth in cases not surfaced by standard workflow
        review. Prevalence study designed and pre-registerable. Validation protocol available
        on request.
      </p>
      <p class="evidence-note">
        The observability study confirms the gap is detectable. It does not establish prevalence,
        reliability across sites, or generalizability across clinical AI domains.
        That is what the validation study is designed to establish.
      </p>
    </div>
  </section>

  <!-- CTA -->
  <section class="section">
    <h2>For institutions</h2>
    <p>
      If your organization has deployed a clinical AI system and wants to know what
      IΔ would find, the path starts with a scoping conversation.
    </p>
    <a href="/projects/integrity-delta/assess" class="primary-cta">Start the assessment process</a>
  </section>

</Project>

<style>
  .act {
    padding: 2rem 0;
    border-bottom: 1px solid var(--border-ghost);
  }

  .act-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-ghost);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
  }

  .act-body {
    font-size: 1.25rem;
    line-height: 1.6;
    color: var(--text-primary);
    font-family: var(--font-display);
  }

  .section {
    padding: 2.5rem 0;
    border-bottom: 1px solid var(--border-ghost);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .section:last-child { border-bottom: none; }

  h2 {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9375rem;
    line-height: 1.75;
    color: var(--text-secondary);
  }

  .evidence-block {
    padding: 1.5rem;
    border: 1px solid var(--border-ghost);
    background: var(--void-surface);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .evidence-note {
    font-size: 0.875rem;
    color: var(--text-tertiary);
    font-family: var(--font-mono);
    line-height: 1.6;
  }

  .primary-cta {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid var(--teal);
    color: var(--teal);
    font-family: var(--font-display);
    font-size: 0.9375rem;
    font-weight: 500;
    align-self: flex-start;
    transition: background 0.2s var(--ease-smooth);
  }

  .primary-cta:hover {
    background: var(--teal-subtle);
    color: var(--teal-bright);
  }
</style>
```

**Step 2: Verify build**
```bash
npm run build && npm run preview
```
Navigate to `/projects/integrity-delta`. Verify evidence bar shows teal state, copy does not say "radiology tool."

**Step 3: Commit**
```bash
git add src/pages/projects/integrity-delta/index.astro
git commit -m "feat: add integrity delta project page"
```

---

## Task 11: Integrity Delta Assessment Subpage

**Files:**
- Create: `src/pages/projects/integrity-delta/assess.astro`

**Step 1: Create assess page**

This page is not in the nav. Institutional conversion. Three sections: what it produces, how it works, contact.

```astro
---
// src/pages/projects/integrity-delta/assess.astro
import Base from '../../../layouts/Base.astro';
---
<Base
  title="IΔ Assessment — Integrity Delta"
  description="Start the IΔ assessment process for your deployed clinical AI."
>

  <div class="assess-page">
    <header class="assess-header">
      <a href="/projects/integrity-delta" class="back-link">← Integrity Delta</a>
      <h1>Assessment process</h1>
      <p class="sub">For institutions with deployed clinical AI systems.</p>
    </header>

    <div class="assess-body">

      <section class="assess-section">
        <h2>What the assessment produces</h2>
        <p>
          A scored IΔ report on a deployed clinical AI system. The report identifies
          divergence between AI outputs and independently verified ground truth — the gap
          that standard workflow review does not surface. Scoped per engagement based on
          your system, your workflow, and the ground truth standard we establish together.
        </p>
      </section>

      <section class="assess-section">
        <h2>How it works</h2>
        <ol class="process-steps">
          <li>
            <span class="step-num">01</span>
            <div>
              <strong>Scoping conversation</strong>
              <p>We identify which clinical AI system to assess and what ground truth standard applies.</p>
            </div>
          </li>
          <li>
            <span class="step-num">02</span>
            <div>
              <strong>Ground truth establishment</strong>
              <p>You provide access to a de-identified sample of AI outputs. We establish the independent ground truth standard jointly.</p>
            </div>
          </li>
          <li>
            <span class="step-num">03</span>
            <div>
              <strong>IΔ measurement</strong>
              <p>We run the gap measurement against your sample. Every divergence is documented.</p>
            </div>
          </li>
          <li>
            <span class="step-num">04</span>
            <div>
              <strong>Findings report</strong>
              <p>You receive a scored report with the gap magnitude, case documentation, and a plain-language interpretation for clinical leadership.</p>
            </div>
          </li>
        </ol>
      </section>

      <section class="assess-section">
        <h2>Start the process</h2>
        <p>
          The first step is a scoping conversation with Polarity Lab's Director of Strategy.
          No commitment required. Tell us what you have and we tell you what IΔ would find.
        </p>
        <a href="mailto:strategy@polarity-lab.com" class="contact-cta">
          Begin scoping conversation
        </a>
        <p class="contact-note">
          Responses within two business days.
        </p>
      </section>

    </div>
  </div>

</Base>

<style>
  .assess-page {
    max-width: 720px;
    margin: 0 auto;
    padding: 4rem 2rem 6rem;
  }

  .assess-header {
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .back-link {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--text-tertiary);
    align-self: flex-start;
  }

  .back-link:hover { color: var(--text-secondary); }

  h1 {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 3vw, 2.5rem);
    font-weight: 600;
    color: var(--text-pure);
    letter-spacing: -0.02em;
  }

  .sub {
    color: var(--text-secondary);
    font-size: 1rem;
  }

  .assess-section {
    padding: 2.5rem 0;
    border-bottom: 1px solid var(--border-ghost);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .assess-section:last-child { border-bottom: none; }

  h2 {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  p {
    font-size: 0.9375rem;
    line-height: 1.75;
    color: var(--text-secondary);
  }

  .process-steps {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .process-steps li {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
  }

  .step-num {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-ghost);
    flex-shrink: 0;
    padding-top: 0.25rem;
  }

  .process-steps strong {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 0.9375rem;
    color: var(--text-primary);
    display: block;
    margin-bottom: 0.25rem;
  }

  .contact-cta {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid var(--teal);
    color: var(--teal);
    font-family: var(--font-display);
    font-size: 0.9375rem;
    font-weight: 500;
    align-self: flex-start;
    transition: background 0.2s var(--ease-smooth);
  }

  .contact-cta:hover {
    background: var(--teal-subtle);
    color: var(--teal-bright);
  }

  .contact-note {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--text-ghost);
  }
</style>
```

**Step 2: Update email address.** Replace `strategy@polarity-lab.com` with the actual Director of Strategy contact email before deploy.

**Step 3: Verify build**
```bash
npm run build && npm run preview
```
Navigate to `/projects/integrity-delta/assess`. Verify back link works.

**Step 4: Commit**
```bash
git add src/pages/projects/integrity-delta/assess.astro
git commit -m "feat: add integrity delta assessment subpage"
```

---

## Task 12: GPS, WAXFEED, AVDP Project Pages

**Files:**
- Create: `src/pages/projects/polarity-gps.astro`
- Create: `src/pages/projects/waxfeed.astro`
- Create: `src/pages/projects/avdp.astro`

All three follow the same three-act structure as IΔ. Use the `Project` layout.

**Step 1: Create GPS page**
```astro
---
// src/pages/projects/polarity-gps.astro
import Project from '../../layouts/Project.astro';
---
<Project
  title="Polarity GPS"
  description="The Proximity Index measures what exists in your neighborhood but does not appear in recommendation."
  evidenceState="platform-live-study-pending"
  evidenceLabel="Platform live, formal study pending"
>

  <section class="act">
    <p class="act-label">Pledge</p>
    <p class="act-body">Discovery platforms surface what is around you.</p>
  </section>

  <section class="act">
    <p class="act-label">Turn</p>
    <p class="act-body">
      They surface what is popular around you. Popularity is not the same as presence.
      What exists at the neighborhood scale — the store that has been there for twenty years,
      the church that anchors the block — is not what recommendation surfaces,
      because it does not optimize for engagement. The Proximity Index measures the gap.
    </p>
  </section>

  <section class="section">
    <h2>What GPS measures</h2>
    <p>
      The Proximity Index scores the divergence between what local recommendation surfaces
      and what actually exists in a neighborhood. A high score means significant
      authentic local presence is invisible to the recommendation layer.
    </p>
    <p>
      The platform is live at <a href="https://polaritygps.com" target="_blank" rel="noopener">polaritygps.com</a>.
      Community partnerships are established with MUSEOFRI and GOODhumanz in Providence.
      The formal Proximity Index measurement study is the next step.
    </p>
  </section>

  <section class="section">
    <h2>Evidence</h2>
    <div class="evidence-block">
      <p>
        Platform live. Instrument specified. Community partnerships established.
        Formal scored pilot not yet run — that is what comes next.
      </p>
    </div>
  </section>

</Project>

<style>
  /* Shared project page styles -- copy from integrity-delta/index.astro */
  .act { padding: 2rem 0; border-bottom: 1px solid var(--border-ghost); }
  .act-label { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-ghost); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.75rem; }
  .act-body { font-size: 1.25rem; line-height: 1.6; color: var(--text-primary); font-family: var(--font-display); }
  .section { padding: 2.5rem 0; border-bottom: 1px solid var(--border-ghost); display: flex; flex-direction: column; gap: 1rem; }
  .section:last-child { border-bottom: none; }
  h2 { font-family: var(--font-display); font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem; }
  p { font-size: 0.9375rem; line-height: 1.75; color: var(--text-secondary); }
  .evidence-block { padding: 1.5rem; border: 1px solid var(--border-ghost); background: var(--void-surface); }
</style>
```

**Note on repeated styles:** The `.act`, `.section`, `.evidence-block` styles are duplicated across four project pages. After all four are built, extract them into a shared `src/styles/project.css` and import via `<style>@import '../styles/project.css';</style>`. Do this as a cleanup commit after all four pages pass build.

**Step 2: Create WAXFEED page**
```astro
---
// src/pages/projects/waxfeed.astro
import Project from '../../layouts/Project.astro';
---
<Project
  title="WAXFEED"
  description="The Cognitive Gap Measure scores how far a recommendation system's model has drifted from who the listener actually is."
  evidenceState="design-iteration"
  evidenceLabel="Counter-environment in development"
>

  <section class="act">
    <p class="act-label">Pledge</p>
    <p class="act-body">The platform knows what you want to hear.</p>
  </section>

  <section class="act">
    <p class="act-label">Turn</p>
    <p class="act-body">
      It knows your engagement history. Engagement was shaped by what it showed you,
      when it showed it, how it framed it. Over years of use, the model trained on
      your engagement diverges from your genuine musical identity.
      The Cognitive Gap Measure scores that divergence.
      WAXFEED is the counter-environment designed to close it.
    </p>
  </section>

  <section class="section">
    <h2>What WAXFEED measures</h2>
    <p>
      The Cognitive Gap Measure is a signed scalar score representing the divergence
      between a listener's authentic musical preference and the recommendation system's
      behavioral model of that listener. The gap is the suppression.
      A CGM score near zero means the platform's model matches the person.
      A high CGM score means most of the person's musical identity is not reflected
      in what the platform shows them.
    </p>
  </section>

  <section class="section">
    <h2>Where we are</h2>
    <div class="evidence-block">
      <p>
        Counter-environment in development. CGM is a working instrument design.
        No formal validation study has been run yet. The next step is the first
        controlled study — measuring whether WAXFEED use reduces CGM scores
        at 90-day follow-up.
      </p>
    </div>
  </section>

</Project>

<style>
  .act { padding: 2rem 0; border-bottom: 1px solid var(--border-ghost); }
  .act-label { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-ghost); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.75rem; }
  .act-body { font-size: 1.25rem; line-height: 1.6; color: var(--text-primary); font-family: var(--font-display); }
  .section { padding: 2.5rem 0; border-bottom: 1px solid var(--border-ghost); display: flex; flex-direction: column; gap: 1rem; }
  .section:last-child { border-bottom: none; }
  h2 { font-family: var(--font-display); font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem; }
  p { font-size: 0.9375rem; line-height: 1.75; color: var(--text-secondary); }
  .evidence-block { padding: 1.5rem; border: 1px solid var(--border-ghost); background: var(--void-surface); }
</style>
```

**Step 3: Create AVDP page**
```astro
---
// src/pages/projects/avdp.astro
import Project from '../../layouts/Project.astro';
---
<Project
  title="AVDP"
  description="The Format Effectiveness Measure scores how much authentic expression conventional media formats suppress."
  evidenceState="design-iteration"
  evidenceLabel="Counter-format in development"
>

  <section class="act">
    <p class="act-label">Pledge</p>
    <p class="act-body">Interview formats capture who people are.</p>
  </section>

  <section class="act">
    <p class="act-label">Turn</p>
    <p class="act-body">
      They capture what people are willing to say under production pressure,
      with phones visible, with a clock running. That is not the same thing.
      Every design element of AVDP — the removed phones, the live-mixed ambient music,
      the long-form structure, the absence of production interruption — is a hypothesis
      about the specific mechanism by which conventional formats suppress authentic expression.
      The Format Effectiveness Measure scores the gap.
    </p>
  </section>

  <section class="section">
    <h2>What AVDP measures</h2>
    <p>
      The Format Effectiveness Measure is the signed gap between what a subject expresses
      in the AVDP counter-format and what the same subject expresses under conventional
      interview conditions. A positive FEM means the counter-format produced more
      authentic expression. The larger the score, the more the conventional format
      was suppressing.
    </p>
  </section>

  <section class="section">
    <h2>Where we are</h2>
    <div class="evidence-block">
      <p>
        Counter-format in development. Proof-of-concept footage exists.
        FEM is a working instrument design. The formal validation study requires
        a matched conventional condition and trained rater calibration.
      </p>
    </div>
  </section>

</Project>

<style>
  .act { padding: 2rem 0; border-bottom: 1px solid var(--border-ghost); }
  .act-label { font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-ghost); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.75rem; }
  .act-body { font-size: 1.25rem; line-height: 1.6; color: var(--text-primary); font-family: var(--font-display); }
  .section { padding: 2.5rem 0; border-bottom: 1px solid var(--border-ghost); display: flex; flex-direction: column; gap: 1rem; }
  .section:last-child { border-bottom: none; }
  h2 { font-family: var(--font-display); font-size: 1rem; font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem; }
  p { font-size: 0.9375rem; line-height: 1.75; color: var(--text-secondary); }
  .evidence-block { padding: 1.5rem; border: 1px solid var(--border-ghost); background: var(--void-surface); }
</style>
```

**Step 4: Verify all three build**
```bash
npm run build && npm run preview
```
Check `/projects/polarity-gps`, `/projects/waxfeed`, `/projects/avdp`.

**Step 5: Extract shared styles**
```bash
mkdir -p src/styles
```
Create `src/styles/project.css` with the shared `.act`, `.section`, `.evidence-block`, `h2`, `p` rules. Replace inline `<style>` blocks in all four project pages with:
```astro
<style>
  @import '../../../styles/project.css';
  /* page-specific overrides only */
</style>
```
For GPS and IΔ (one directory deeper), path is `../../styles/project.css`.

**Step 6: Verify build after style extraction**
```bash
npm run build
```

**Step 7: Commit**
```bash
git add src/pages/projects/ src/styles/
git commit -m "feat: add GPS, WAXFEED, AVDP project pages with shared styles"
```

---

## Task 13: Research Index + Dynamic Instrument Pages

**Files:**
- Create: `src/layouts/Research.astro`
- Create: `src/pages/research/index.astro`
- Create: `src/pages/research/[instrument].astro`

**Step 1: Create Research layout**
```astro
---
// src/layouts/Research.astro
import Base from './Base.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---
<Base title={title} description={description}>
  <div class="research-page">
    <header class="research-header">
      <p class="breadcrumb"><a href="/research">Research</a></p>
      <h1>{title}</h1>
    </header>
    <div class="research-body">
      <slot />
    </div>
  </div>
</Base>

<style>
  .research-page {
    max-width: 720px;
    margin: 0 auto;
    padding: 4rem 2rem 6rem;
  }

  .breadcrumb {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--text-tertiary);
    margin-bottom: 1rem;
  }

  h1 {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    font-weight: 600;
    color: var(--text-pure);
    letter-spacing: -0.02em;
  }

  .research-header {
    padding-bottom: 2rem;
    border-bottom: 1px solid var(--border-ghost);
    margin-bottom: 2rem;
  }

  .research-body {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
</style>
```

**Step 2: Create research index**
```astro
---
// src/pages/research/index.astro
import Research from '../../layouts/Research.astro';
import { getCollection } from 'astro:content';
import EvidenceBar from '../../components/EvidenceBar.astro';

const instruments = await getCollection('instruments');
---
<Research title="Research" description="Instruments, validation protocols, and evidence documentation.">

  <p class="intro">
    Each Polarity Lab project produces two things: a diagnostic instrument that scores
    a measurable gap, and a therapeutic counter-environment designed to close it.
    This layer documents the instruments — what they measure, their current status,
    and their limitations.
  </p>

  <p class="audience-note">
    This section is for academic partners, grant reviewers, and institutional evaluators.
    It documents what is actually known, what is designed but not yet validated,
    and what remains to be established.
  </p>

  <ul class="instrument-list">
    {instruments.map(instrument => (
      <li class="instrument-item">
        <a href={`/research/${instrument.slug}`} class="instrument-link">
          <div class="instrument-header">
            <span class="instrument-name">{instrument.data.title}</span>
            <span class="instrument-acronym">{instrument.data.acronym}</span>
          </div>
          <EvidenceBar state={instrument.data.status} label={instrument.data.evidenceSummary.slice(0, 60) + '...'} />
        </a>
      </li>
    ))}
  </ul>

</Research>

<style>
  .intro, .audience-note {
    font-size: 0.9375rem;
    line-height: 1.75;
    color: var(--text-secondary);
  }

  .audience-note {
    color: var(--text-tertiary);
    font-family: var(--font-mono);
    font-size: 0.875rem;
    padding: 1rem 1.25rem;
    border: 1px solid var(--border-ghost);
    border-left: 2px solid var(--border-medium);
  }

  .instrument-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1px;
    background: var(--border-ghost);
  }

  .instrument-link {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 1.5rem;
    background: var(--void-deep);
    color: var(--text-primary);
    transition: background 0.2s var(--ease-smooth);
  }

  .instrument-link:hover {
    background: var(--void-surface);
    color: var(--text-primary);
  }

  .instrument-header {
    display: flex;
    align-items: baseline;
    gap: 1rem;
  }

  .instrument-name {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: 1rem;
    color: var(--text-pure);
  }

  .instrument-acronym {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--text-ghost);
  }
</style>
```

**Step 3: Create dynamic instrument page**
```astro
---
// src/pages/research/[instrument].astro
import { getCollection, getEntry } from 'astro:content';
import Research from '../../layouts/Research.astro';
import EvidenceBar from '../../components/EvidenceBar.astro';

export async function getStaticPaths() {
  const instruments = await getCollection('instruments');
  return instruments.map(instrument => ({
    params: { instrument: instrument.slug },
    props: { instrument },
  }));
}

const { instrument } = Astro.props;
const { Content } = await instrument.render();
---
<Research title={instrument.data.title}>

  <EvidenceBar state={instrument.data.status} label={instrument.data.evidenceSummary} />

  <div class="meta-row">
    <span class="meta-label">Project</span>
    <a href={`/projects/${instrument.data.projectSlug}`} class="meta-value">
      {instrument.data.project}
    </a>
    <span class="meta-label">Version</span>
    <span class="meta-value mono">{instrument.data.version}</span>
  </div>

  <div class="instrument-body">
    <Content />
  </div>

  {instrument.data.limitations && instrument.data.limitations.length > 0 && (
    <div class="limitations">
      <h2>Limitations</h2>
      <ul>
        {instrument.data.limitations.map(limitation => (
          <li>{limitation}</li>
        ))}
      </ul>
    </div>
  )}

</Research>

<style>
  .meta-row {
    display: flex;
    gap: 1rem;
    align-items: center;
    flex-wrap: wrap;
  }

  .meta-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--text-ghost);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .meta-value {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  .meta-value.mono {
    font-family: var(--font-mono);
  }

  .instrument-body {
    font-size: 0.9375rem;
    line-height: 1.75;
    color: var(--text-secondary);
  }

  .limitations {
    padding: 1.5rem;
    border: 1px solid var(--border-ghost);
    background: var(--void-surface);
  }

  .limitations h2 {
    font-family: var(--font-display);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-tertiary);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 1rem;
  }

  .limitations ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .limitations li {
    font-family: var(--font-mono);
    font-size: 0.8125rem;
    color: var(--text-tertiary);
    line-height: 1.6;
    padding-left: 1rem;
    border-left: 1px solid var(--border-ghost);
  }
</style>
```

**Step 4: Verify build**
```bash
npm run build
```
Expected: four instrument pages generated at `/research/integrity-delta`, `/research/proximity-index`, `/research/cognitive-gap-measure`, `/research/format-effectiveness-measure`.

**Step 5: Commit**
```bash
git add src/layouts/Research.astro src/pages/research/
git commit -m "feat: add research index and dynamic instrument pages"
```

---

## Task 14: Fund + Join Pages

**Files:**
- Create: `src/pages/fund.astro`
- Create: `src/pages/join.astro`

**Step 1: Create Fund page**

Reference `docs/fund-legal/` for fund economics before writing copy.

```astro
---
// src/pages/fund.astro
import Base from '../layouts/Base.astro';
---
<Base title="Fund" description="Supporting Polarity Lab's research before the results are in.">
  <div class="simple-page">
    <h1>Fund</h1>
    <p class="lead">
      Polarity Lab is a research lab funded by people who believe the work matters
      before the validation studies are complete.
    </p>

    <section class="fund-section">
      <h2>What you are funding</h2>
      <p>
        Four research programs building diagnostic instruments and therapeutic counter-environments
        for authentic human capacity. All four are at early stages. The evidence picture is honest
        on every project page.
      </p>
    </section>

    <section class="fund-section">
      <h2>How it works</h2>
      <p>
        Financial believers contribute to the lab's general research fund. 
        Contributions support instrument development, validation studies, and
        the infrastructure for all four programs. This is not philanthropy at scale —
        it is early belief in a research direction.
      </p>
    </section>

    <section class="fund-section">
      <h2>Get in touch</h2>
      <a href="mailto:fund@polarity-lab.com" class="contact-cta">Contact the fund</a>
    </section>
  </div>
</Base>

<style>
  .simple-page {
    max-width: 720px;
    margin: 0 auto;
    padding: 4rem 2rem 6rem;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  h1 {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 600;
    color: var(--text-pure);
    letter-spacing: -0.02em;
    margin-bottom: 1.5rem;
  }

  .lead {
    font-size: 1.125rem;
    line-height: 1.7;
    color: var(--text-secondary);
    margin-bottom: 3rem;
  }

  .fund-section {
    padding: 2rem 0;
    border-top: 1px solid var(--border-ghost);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  h2 {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  p {
    font-size: 0.9375rem;
    line-height: 1.75;
    color: var(--text-secondary);
  }

  .contact-cta {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid var(--border-subtle);
    color: var(--text-primary);
    font-family: var(--font-display);
    font-size: 0.9375rem;
    font-weight: 500;
    align-self: flex-start;
    transition: border-color 0.2s var(--ease-smooth);
  }

  .contact-cta:hover {
    border-color: var(--teal);
    color: var(--teal);
  }
</style>
```

**Step 2: Create Join page**

Reference `docs/roles/` for contributor role types.

```astro
---
// src/pages/join.astro
import Base from '../layouts/Base.astro';
---
<Base title="Join" description="Contributing to Polarity Lab.">
  <div class="simple-page">
    <h1>Join</h1>
    <p class="lead">
      Polarity Lab is building four research programs. Each one needs specific people
      at specific stages.
    </p>

    <section class="join-section">
      <h2>Research contributors</h2>
      <p>
        Domain leads, research coordinators, and technical contributors across
        Integrity Delta, Polarity GPS, WAXFEED, and AVDP. If you have relevant
        domain knowledge and want to contribute to one of the programs, start here.
      </p>
    </section>

    <section class="join-section">
      <h2>Academic partners</h2>
      <p>
        The validation studies for each instrument require IRB infrastructure,
        statistical review, and co-authorship. If you are at a research institution
        and see alignment with your work, the research layer at
        <a href="/research">polarity-lab.com/research</a> has the instrument specifications.
      </p>
    </section>

    <section class="join-section">
      <h2>Get in touch</h2>
      <a href="mailto:join@polarity-lab.com" class="contact-cta">Contact the lab</a>
    </section>
  </div>
</Base>

<style>
  /* Same styles as fund.astro -- extract to shared if both pages exist */
  .simple-page { max-width: 720px; margin: 0 auto; padding: 4rem 2rem 6rem; }
  h1 { font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3rem); font-weight: 600; color: var(--text-pure); letter-spacing: -0.02em; margin-bottom: 1.5rem; }
  .lead { font-size: 1.125rem; line-height: 1.7; color: var(--text-secondary); margin-bottom: 3rem; }
  .join-section { padding: 2rem 0; border-top: 1px solid var(--border-ghost); display: flex; flex-direction: column; gap: 0.75rem; }
  h2 { font-family: var(--font-display); font-size: 1rem; font-weight: 600; color: var(--text-primary); }
  p { font-size: 0.9375rem; line-height: 1.75; color: var(--text-secondary); }
  .contact-cta { display: inline-block; padding: 0.75rem 1.5rem; border: 1px solid var(--border-subtle); color: var(--text-primary); font-family: var(--font-display); font-size: 0.9375rem; font-weight: 500; align-self: flex-start; transition: border-color 0.2s var(--ease-smooth); }
  .contact-cta:hover { border-color: var(--teal); color: var(--teal); }
</style>
```

**Step 3: Verify build**
```bash
npm run build
```

**Step 4: Commit**
```bash
git add src/pages/fund.astro src/pages/join.astro
git commit -m "feat: add fund and join pages"
```

---

## Task 15: Cloudflare Pages Deploy Config

**Files:**
- Modify: `astro.config.mjs`
- Verify: `wrangler.toml` or deploy command from CLAUDE.md

**Step 1: Confirm Cloudflare Pages project name**

Check CLAUDE.md for the deploy command. The polarity-site project name on Cloudflare Pages may differ from `theo-os` (which is the Theo OS admin dashboard). Confirm with:
```bash
cat .wrangler/cache/pages.json 2>/dev/null | head -20
```

**Step 2: Update deploy script in package.json**
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "deploy": "astro build && CLOUDFLARE_API_TOKEN=cfut_vAbpkApD6sclTYEPK0t9E0j02eIBZV8Bx0otnHgm0c2447ea npx wrangler pages deploy dist/ --project-name polarity-site"
  }
}
```
Cloudflare Pages project name is `polarity-site` (confirmed from dashboard at team@polarity-lab.com account). Do not use `theo-os` -- that is a different project on a different Cloudflare account.

**Step 3: Test build output**
```bash
npm run build
ls dist/
```
Expected: `index.html`, `projects/`, `research/`, `fund/`, `join/` directories.

**Step 4: Deploy**
```bash
npm run deploy
```
Expected: Cloudflare Pages upload completes, deployment URL returned.

**Step 5: Verify deployed site**

Visit the deployment URL. Check:
- Homepage loads with three sections
- `/projects/integrity-delta` loads with evidence bar
- `/projects/integrity-delta/assess` loads and back link works
- `/research` loads with four instruments
- `/research/integrity-delta` loads with limitations block
- Nav active state works on project pages

**Step 6: Final commit**
```bash
git add package.json astro.config.mjs
git commit -m "feat: add cloudflare pages deploy config"
```

---

## Post-Build Cleanup (after all tasks pass)

1. **Email addresses:** Replace all placeholder emails (`strategy@polarity-lab.com`, `fund@polarity-lab.com`, `join@polarity-lab.com`) with real addresses or a single contact address.

2. **Old static HTML:** Once Astro build is live, the old `public/index.html`, `public/fund.html`, `public/join.html`, `public/work.html` can be removed. Keep `public/favicon.svg`, `public/og-image.png`, and image assets -- Astro copies `public/` contents to `dist/` automatically.

3. **Shared simple-page styles:** `fund.astro` and `join.astro` duplicate styles. Extract to `src/styles/simple-page.css`.

4. **404 page:** Add `src/pages/404.astro` with the same Base layout and a simple "not found" message.
