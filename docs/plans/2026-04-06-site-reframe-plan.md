# Polarity Lab Site Reframe Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reframe polarity-lab.com from a product/output-first site to a research-lab-first site modeled on ARC Institute, with a new homepage and three research sub-pages.

**Architecture:** Single static HTML site. No build system, no framework, no npm. Every page is a self-contained `.html` file. The design doc lives at `docs/plans/2026-04-06-site-reframe-design.md`. The only rule: every file in `public/` must be mirrored to the root. Edit `public/X`, copy to root `X`.

**Tech Stack:** HTML, CSS, vanilla JS. Same fonts (Space Grotesk, Inter, JetBrains Mono via Google Fonts). Three.js for WebGL on homepage only. Existing CSS variables and dark/light mode system preserved.

---

## Sync Rule (READ THIS FIRST)

Every task that touches HTML files ends with a sync step:
```bash
cp public/index.html index.html
# or for sub-pages:
cp public/research/nonprofit.html research/nonprofit.html
```

Never edit the root copies directly. Always edit `public/`, then copy.

---

## Before You Start

Read the design doc in full:
```
docs/plans/2026-04-06-site-reframe-design.md
```

Skim the current homepage to understand the existing CSS variable system, font setup, and JS patterns before touching anything:
```
public/index.html  (4925 lines)
```

---

## Task 1: Create Directory Structure

**Files:**
- Create: `public/research/` (directory)
- Create: `research/` (directory at root)

**Step 1: Create directories**

```bash
mkdir -p /Users/theodoreaddo/polarity-site/public/research
mkdir -p /Users/theodoreaddo/polarity-site/research
```

**Step 2: Verify**

```bash
ls /Users/theodoreaddo/polarity-site/public/
ls /Users/theodoreaddo/polarity-site/
```
Expected: `research/` appears in both listings.

**Step 3: Commit**

```bash
cd /Users/theodoreaddo/polarity-site
git add -A
git commit -m "feat: create research sub-page directory structure"
```

---

## Task 2: Rewrite Homepage (`public/index.html`)

**Files:**
- Modify: `public/index.html` (full rewrite)
- Sync: `index.html`

This is the largest task. The homepage becomes a single scroll with five sections: Hero, Research (3 cards), People (4 cards), About, Contact. WebGL stays.

### What to KEEP from the current file
- All CSS variables (`:root`, `[data-theme="light"]`)
- The WebGL canvas setup and Three.js script
- The custom cursor (`.cursor`, `.cursor-dot`)
- The nav base styles
- The scroll choreographer JS class
- The intersection observer reveal system
- The Formspree newsletter integration
- Light/dark toggle JS

### What to REMOVE
- The current hero stage/icons/product labels
- The About section (`#about` with domains — repurpose the domains but restructure)
- The Research/CCX section (disease cards, 3-step process)
- The Work/Products section (research cases grid)
- The Team section (replaced by new People section)
- The existing Contact section (replace with new two-column version)
- The Get Involved section
- The Changelog section

### Step 1: Build the new nav HTML

The new nav:
```html
<nav class="nav" id="nav">
  <a href="#" class="nav-logo" id="nav-logo">
    <!-- existing SVG atom logo -->
    <span class="nav-logo-text">POLARITY</span>
  </a>

  <ul class="nav-links" id="nav-links">
    <li class="nav-item nav-item--dropdown">
      <button class="nav-link nav-link--dropdown" id="research-dropdown-btn">
        Research
        <svg class="nav-dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
      </button>
      <div class="nav-dropdown" id="research-dropdown">
        <a href="research/nonprofit.html" class="nav-dropdown-item">Nonprofit &amp; Discovery</a>
        <a href="research/avdp.html" class="nav-dropdown-item">Film Therapeutics</a>
        <a href="research/integrity-delta.html" class="nav-dropdown-item">Integrity Delta</a>
      </div>
    </li>
    <li><a href="#about" class="nav-link">About</a></li>
    <li><a href="#contact" class="nav-link">Contact</a></li>
    <li>
      <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
        <!-- existing sun/moon SVG -->
      </button>
    </li>
  </ul>

  <button class="nav-mobile" id="nav-mobile" aria-label="Menu">
    <!-- existing hamburger SVG -->
  </button>
</nav>
```

### Step 2: CSS additions needed for new components

Add these styles to the `<style>` block. Do NOT remove existing styles, only add:

```css
/* ==========================================
   RESEARCH DROPDOWN
   ========================================== */
.nav-item--dropdown {
  position: relative;
}

.nav-link--dropdown {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-tertiary);
  transition: color 0.3s ease;
  padding: 8px 0;
}

.nav-link--dropdown:hover {
  color: var(--teal);
}

.nav-dropdown-chevron {
  width: 14px;
  height: 14px;
  transition: transform 0.3s ease;
}

.nav-item--dropdown.open .nav-dropdown-chevron {
  transform: rotate(180deg);
}

.nav-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--void-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: 8px;
  min-width: 220px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform: translateX(-50%) translateY(-8px);
  z-index: 100;
}

.nav-item--dropdown.open .nav-dropdown {
  opacity: 1;
  pointer-events: all;
  transform: translateX(-50%) translateY(0);
}

.nav-dropdown-item {
  display: block;
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 13px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: background 0.2s ease, color 0.2s ease;
}

.nav-dropdown-item:hover {
  background: var(--void-surface);
  color: var(--teal);
}

/* ==========================================
   HERO — MINIMAL
   ========================================== */
.hero-minimal {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  z-index: 2;
  padding: 0 24px;
}

.hero-minimal-title {
  font-family: var(--font-display);
  font-size: clamp(48px, 8vw, 96px);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-pure);
  line-height: 1;
  margin-bottom: 16px;
}

.hero-minimal-tagline {
  font-family: var(--font-body);
  font-size: clamp(16px, 2vw, 20px);
  color: var(--text-secondary);
  margin-bottom: 12px;
  font-style: italic;
}

.hero-minimal-location {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-tertiary);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* ==========================================
   RESEARCH CARDS GRID
   ========================================== */
.research-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 48px;
}

.research-card {
  background: var(--void-elevated);
  border: 1px solid var(--border-ghost);
  border-radius: 12px;
  padding: 32px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: border-color 0.3s ease, transform 0.3s var(--ease-out-expo);
  position: relative;
  overflow: hidden;
}

.research-card:hover {
  border-color: var(--teal);
  transform: translateY(-4px);
}

.research-card-question {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
  flex: 1;
}

.research-card-meta {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.research-card-project {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-tertiary);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.research-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.research-card-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.research-card-badge--active {
  background: rgba(78, 205, 196, 0.12);
  color: var(--teal);
  border: 1px solid rgba(78, 205, 196, 0.3);
}

.research-card-badge--production {
  background: rgba(187, 143, 206, 0.12);
  color: var(--purple);
  border: 1px solid rgba(187, 143, 206, 0.3);
}

.research-card-badge--funding {
  background: rgba(255, 138, 101, 0.12);
  color: var(--coral);
  border: 1px solid rgba(255, 138, 101, 0.3);
}

.research-card-arrow {
  font-size: 14px;
  color: var(--teal);
  transition: transform 0.3s ease;
}

.research-card:hover .research-card-arrow {
  transform: translateX(4px);
}

/* ==========================================
   PEOPLE SECTION
   ========================================== */
.people-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  margin-top: 48px;
}

.person-card {
  background: var(--void-elevated);
  border: 1px solid var(--border-ghost);
  border-radius: 12px;
  padding: 28px;
  text-decoration: none;
  transition: border-color 0.3s ease;
}

.person-card:hover {
  border-color: var(--border-subtle);
}

.person-card-role {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--teal);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.person-card-name {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: var(--text-pure);
  margin-bottom: 6px;
}

.person-card-affil {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-bottom: 12px;
  line-height: 1.5;
}

.person-card-bio {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* ==========================================
   ABOUT SECTION
   ========================================== */
.about-body {
  max-width: 720px;
  margin: 0 auto;
}

.about-body p {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 20px;
}

/* ==========================================
   CONTACT SECTION
   ========================================== */
.contact-cols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-top: 48px;
}

@media (max-width: 640px) {
  .contact-cols { grid-template-columns: 1fr; }
}

.contact-col-label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-tertiary);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.contact-col-link {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 500;
  color: var(--teal);
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.contact-col-link:hover { opacity: 0.7; }
```

### Step 3: Build hero HTML

```html
<!-- HERO -->
<section class="hero-minimal" id="hero">
  <h1 class="hero-minimal-title reveal">POLARITY</h1>
  <p class="hero-minimal-tagline reveal">An environmental therapeutics lab.</p>
  <p class="hero-minimal-location reveal">Providence, RI · Est. 2025</p>
</section>
```

### Step 4: Build Research section HTML

```html
<!-- RESEARCH -->
<section class="spatial-section" id="research">
  <div class="section-inner">
    <div class="reveal">
      <p class="section-label">Our Research</p>
      <h2 class="section-title">Each project starts with a specific question.</h2>
      <p class="about-lede">We build the team, gather the evidence, then design the answer.</p>
    </div>

    <div class="research-grid stagger">

      <a href="research/nonprofit.html" class="research-card">
        <p class="research-card-question">Why can't the communities that need resources the most find the ones built specifically for them?</p>
        <div class="research-card-meta">
          <span class="research-card-project">Proximity Index · Polarity GPS</span>
          <div class="research-card-footer">
            <span class="research-card-badge research-card-badge--active">Active</span>
            <span class="research-card-arrow">→</span>
          </div>
        </div>
      </a>

      <a href="research/avdp.html" class="research-card">
        <p class="research-card-question">Can the right environment make people genuinely open up, and does watching that change how we connect with each other?</p>
        <div class="research-card-meta">
          <span class="research-card-project">AVDP · A Very Distant Perspective</span>
          <div class="research-card-footer">
            <span class="research-card-badge research-card-badge--production">In Production</span>
            <span class="research-card-arrow">→</span>
          </div>
        </div>
      </a>

      <a href="research/integrity-delta.html" class="research-card">
        <p class="research-card-question">When a hospital's AI system knows the right diagnosis, what stops it from telling the doctor?</p>
        <div class="research-card-meta">
          <span class="research-card-project">Integrity Delta · IΔ</span>
          <div class="research-card-footer">
            <span class="research-card-badge research-card-badge--funding">Seeking Funding</span>
            <span class="research-card-arrow">→</span>
          </div>
        </div>
      </a>

    </div>
  </div>
</section>
```

### Step 5: Build People section HTML

```html
<!-- PEOPLE -->
<section class="spatial-section" id="people">
  <div class="section-inner">
    <div class="reveal">
      <p class="section-label">The Lab</p>
      <h2 class="section-title">The people building it</h2>
    </div>

    <div class="people-grid stagger">

      <a href="https://www.linkedin.com/in/theo-addo/" target="_blank" class="person-card">
        <div class="person-card-role">Founder · Lead Researcher</div>
        <h3 class="person-card-name">Theodore Addo</h3>
        <p class="person-card-affil">Radiology Resident, St. Vincent's Hospital (2027)</p>
        <p class="person-card-bio">12 years of independent research across medicine, film, music, and neuroscience. Trained at the MIT Boyden Lab and Brown Medical School.</p>
      </a>

      <a href="https://www.linkedin.com/in/shadrack-annor-38a627235/" target="_blank" class="person-card">
        <div class="person-card-role">Principal · Technical &amp; Creative</div>
        <h3 class="person-card-name">Shadrack Annor</h3>
        <p class="person-card-affil">Brown CS &amp; Religious Studies '27</p>
        <p class="person-card-bio">Research Assistant, Brown CS Dept. Creative direction, brand, UI/UX, and technical infrastructure across lab projects.</p>
      </a>

      <a href="https://www.linkedin.com/in/nathan-amankwah/" target="_blank" class="person-card">
        <div class="person-card-role">Operations</div>
        <h3 class="person-card-name">Nathan Amankwah</h3>
        <p class="person-card-affil">Finance &amp; BTM, uOttawa '26</p>
        <p class="person-card-bio">VP Finance, BIPOC Business Society. Partner research and investor positioning for the lab.</p>
      </a>

      <a href="https://juanwilson.com" target="_blank" class="person-card">
        <div class="person-card-role">Research Collaborator</div>
        <h3 class="person-card-name">J'Juan Wilson Jr.</h3>
        <p class="person-card-affil">GOODhumanz · Providence, RI</p>
        <p class="person-card-bio">30 years of experience in nonprofit consulting and community organizing. Leading data collection on the Nonprofit &amp; Discovery project.</p>
      </a>

    </div>
  </div>
</section>
```

### Step 6: Build About section HTML

```html
<!-- ABOUT -->
<section class="spatial-section" id="about">
  <div class="section-inner">
    <div class="reveal">
      <p class="section-label">About the Lab</p>
      <h2 class="section-title">An environmental therapeutics lab.</h2>
    </div>

    <div class="about-body reveal">
      <p>Most platforms make money when you keep scrolling. That incentive has produced a measurable result: people are more isolated, more anxious, and less able to focus than a generation ago. We study the mechanism, and we build the antidote.</p>
      <p>A <strong>diagnostic instrument</strong> gives you a number for something that doesn't have one yet. A blood pressure cuff doesn't ask how you feel. It gives a reading that means the same thing in any clinic in the world. We build that for things medicine hasn't gotten to yet: how disconnected someone has become from real relationships, how much an AI is steering their thinking without them knowing it.</p>
      <p>A <strong>therapeutic environment</strong> is a place or experience designed so that going through it produces a real, specific change in you. The environment does the work. You leave less isolated, thinking more clearly, trusting yourself more. Not because you tried. Because of what it put you through.</p>
    </div>

    <div class="about-domains reveal">
      <p class="about-domains-label">Where We Work</p>
      <div class="about-domains-grid">
        <span class="about-domain-tag">Brain Science &amp; Attention</span>
        <span class="about-domain-tag">Medicine &amp; Mental Health</span>
        <span class="about-domain-tag">Film &amp; Storytelling</span>
        <span class="about-domain-tag">Music &amp; Sound</span>
        <span class="about-domain-tag">Artificial Intelligence</span>
        <span class="about-domain-tag">Fashion &amp; Identity</span>
        <span class="about-domain-tag">Human Connection</span>
        <span class="about-domain-tag">Public Health</span>
      </div>
    </div>
  </div>
</section>
```

### Step 7: Build Contact section HTML

```html
<!-- CONTACT -->
<section class="spatial-section" id="contact">
  <div class="section-inner">
    <div class="reveal">
      <p class="section-label">Get in Touch</p>
      <h2 class="section-title">Let's talk.</h2>
    </div>

    <div class="contact-cols reveal">
      <div>
        <p class="contact-col-label">Research &amp; Collaboration</p>
        <a href="mailto:team@polarity-lab.com?subject=Research%20Collaboration" class="contact-col-link">team@polarity-lab.com</a>
      </div>
      <div>
        <p class="contact-col-label">Funding &amp; Investment</p>
        <a href="mailto:team@polarity-lab.com?subject=Integrity%20Delta%20Brief" class="contact-col-link">Request the Integrity Delta brief →</a>
      </div>
    </div>

    <!-- existing newsletter form, keep as-is -->
  </div>
</section>
```

### Step 8: Add dropdown JS to the script block

Add this inside the existing `<script>` tag, after the nav mobile toggle logic:

```javascript
// ==========================================
// RESEARCH DROPDOWN
// ==========================================
const researchDropdownBtn = document.getElementById('research-dropdown-btn');
const researchDropdownItem = researchDropdownBtn?.closest('.nav-item--dropdown');

researchDropdownBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  researchDropdownItem.classList.toggle('open');
});

document.addEventListener('click', () => {
  researchDropdownItem?.classList.remove('open');
});
```

### Step 9: Update the JS sections array for scroll spy

Find this line in the existing script:
```javascript
const sections = ['about', 'research', 'products', 'team', 'safety', 'contact'];
```
Replace with:
```javascript
const sections = ['hero', 'research', 'people', 'about', 'contact'];
```

### Step 10: Verify in browser

Open `public/index.html` directly in browser. Check:
- Hero text centered
- Research cards grid renders
- Dropdown opens/closes on click
- People grid renders
- About and Contact anchor links scroll correctly
- Light/dark toggle works

### Step 11: Sync and commit

```bash
cd /Users/theodoreaddo/polarity-site
cp public/index.html index.html
git add public/index.html index.html
git commit -m "feat: rewrite homepage with research-first layout"
```

---

## Task 3: Build Shared Sub-Page Template

**Files:**
- Create: `public/research/_template.html` (reference only, not served)

All three sub-pages share the same structure. Build this template once, then copy and customize for each project.

### Step 1: Create the template

The template has these sections in order:
1. `<head>` with shared fonts, CSS vars, same base styles as homepage
2. Nav (same as homepage, with Research dropdown)
3. Page header (breadcrumb, question, project label, status badge, team)
4. Introduction (2-3 paragraphs)
5. Background Research (card grid)
6. Methods
7. Results
8. Discussion
9. Funding Ask block
10. Footer

Key CSS additions for sub-pages (not needed on homepage):

```css
/* Sub-page layout */
.subpage-header {
  padding: 140px 0 80px;
}

.breadcrumb {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-tertiary);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.breadcrumb a {
  color: var(--teal);
  text-decoration: none;
}

.breadcrumb a:hover { opacity: 0.7; }

.subpage-question {
  font-family: var(--font-display);
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 700;
  color: var(--text-pure);
  line-height: 1.2;
  max-width: 800px;
  margin-bottom: 24px;
}

.subpage-project-label {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-tertiary);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.subpage-team {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.subpage-team-member {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--text-secondary);
}

.subpage-team-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--void-elevated);
  border: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  color: var(--teal);
}

/* Research paper sections */
.paper-section {
  padding: 80px 0;
  border-top: 1px solid var(--border-ghost);
}

.paper-section-label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--teal);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.paper-section-title {
  font-family: var(--font-display);
  font-size: clamp(22px, 3vw, 32px);
  font-weight: 700;
  color: var(--text-pure);
  margin-bottom: 24px;
}

.paper-body p {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.8;
  max-width: 720px;
  margin-bottom: 20px;
}

/* Background research cards */
.ref-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 32px;
}

.ref-card {
  background: var(--void-elevated);
  border: 1px solid var(--border-ghost);
  border-radius: 10px;
  padding: 24px;
  text-decoration: none;
  transition: border-color 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ref-card:hover {
  border-color: var(--teal);
}

.ref-card-authors {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--teal);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.ref-card-title {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.4;
}

.ref-card-takeaway {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  flex: 1;
}

.ref-card-meta {
  font-size: 11px;
  color: var(--text-tertiary);
  margin-top: 4px;
}

/* Funding ask block */
.funding-ask {
  background: var(--void-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 48px;
  margin-top: 80px;
  text-align: center;
}

.funding-ask-label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--coral);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.funding-ask-title {
  font-family: var(--font-display);
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 700;
  color: var(--text-pure);
  margin-bottom: 16px;
}

.funding-ask-desc {
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 560px;
  margin: 0 auto 32px;
  line-height: 1.7;
}

.funding-ask-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--teal);
  color: #000;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  padding: 14px 28px;
  border-radius: 8px;
  text-decoration: none;
  transition: opacity 0.2s ease;
  letter-spacing: 0.02em;
}

.funding-ask-cta:hover { opacity: 0.85; }

/* Sub-page footer */
.subpage-footer {
  padding: 48px 0;
  border-top: 1px solid var(--border-ghost);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: gap;
  gap: 16px;
}

.subpage-footer-left {
  font-size: 13px;
  color: var(--text-tertiary);
}

.subpage-footer-back {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 600;
  color: var(--teal);
  text-decoration: none;
  transition: gap 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.subpage-footer-back:hover { gap: 10px; }
```

### Step 2: Note on WebGL

Sub-pages do NOT include the Three.js script or WebGL canvas. The background on sub-pages is the plain `var(--void-deep)` color. This keeps sub-pages fast and focused.

### Step 3: Commit the template

```bash
cd /Users/theodoreaddo/polarity-site
git add public/research/_template.html
git commit -m "feat: add sub-page template and CSS foundation"
```

---

## Task 4: Build `/research/nonprofit.html`

**Files:**
- Create: `public/research/nonprofit.html`
- Sync: `research/nonprofit.html`

### Step 1: Copy template and set page-specific values

- Title: `Nonprofit & Discovery — Polarity Lab`
- Question: "Why can't the communities that need resources the most find the ones built specifically for them?"
- Project label: `Proximity Index · Polarity GPS`
- Status badge: Active (teal)
- Team: Theodore Addo (TA), Shadrack Annor (SA), J'Juan Wilson Jr. (JW)

### Step 2: Introduction copy

```
Two documents motivated this project. J'Juan Wilson Jr.'s Closing the Gap whitepaper documented five systemic failures in nonprofit workforce development. The MUSEOFRI Pain Points Report showed the same pattern from the funding side: organizations serving communities of color were chronically underfunded not because of weak missions, but because the discovery infrastructure was built around institutions that already had resources.

The finding: BIPOC-led nonprofits and the communities they serve are not invisible because they're doing bad work. They're invisible because the pathways between resources and the people who need them were never built.

The Proximity Index is the instrument that measures this gap. Polarity GPS is the environment designed to close it.
```

### Step 3: Background Research cards

Six cards. Each links to the source document cited in Juan's papers.

| Authors | Title | Takeaway | Year |
|---|---|---|---|
| Center for Effective Philanthropy | State of Nonprofits 2024 | 95% of nonprofit leaders expressed concern about staff burnout. 75% reported persistent job vacancies. | 2024 |
| Urban Institute | National Survey of Nonprofit Trends and Impacts | ~50% of nonprofit leaders named financial health as primary concern, 75% specifically worried about revenue loss. | 2025 |
| Fundraising Effectiveness Project | FEP Quarterly Sector Report | Fundraising dollars decreased 7.6% in Q3 2023, felt most acutely by small organizations. | 2023 |
| Building Movement Project | Race to Lead | Interest in top leadership roles among BIPOC professionals fell from 40% (2016) to 32% (2022). | 2022 |
| Independent Sector | Health of the U.S. Nonprofit Sector | Charitable donations down 3.4% (2022-2023). Only 57% of Americans expressed high confidence in nonprofits. | 2024 |
| Wilson Jr., J'Juan | Closing the Gap Whitepaper | AI and open education platforms can replace $5,000-$10,000 in annual per-person training spend at near-zero cost — but only if staff can find them. | 2026 |

### Step 4: Methods copy

```
The Proximity Index takes two inputs: the cultural output produced by or for a community, and what discovery platforms actually surface to that community. The gap between those two numbers is the score.

A score of zero means everything made for you reaches you. A high score means your own culture, resources, and support systems are algorithmically invisible to you.

The instrument was developed in partnership with MUSEOFRI (Providence, RI, 2026). Data collection focused on BIPOC-led nonprofits and the communities they serve across Rhode Island.
```

### Step 5: Results copy

```
Across BIPOC-led communities in Providence, the gap was not caused by a lack of output. Communities were actively producing. The problem was in the pathways.

This gives Polarity GPS a specific, measurable target: not to create new cultural content, but to fix the discovery infrastructure so that what already exists can reach the people it was made for.
```

### Step 6: Discussion copy

```
Polarity GPS is the direct response to the Proximity Index finding. It connects people to music, places, and experiences produced by and for their community — not what an engagement algorithm assumed they wanted.

The next phase of this research involves systematic data accumulation from the academic literature on nonprofit pain points, building the evidentiary base for the Proximity Index scoring methodology.
```

### Step 7: Funding ask block

```
Label: "Support This Research"
Title: "Help us build the evidentiary base."
Desc: "The remaining work is data accumulation: pulling from the academic literature on nonprofit pain points to ground the Proximity Index methodology. If you want to support this project or explore partnership, reach out."
CTA: "Get in touch →" → mailto:team@polarity-lab.com?subject=Nonprofit%20Research
```

### Step 8: Sync and commit

```bash
cd /Users/theodoreaddo/polarity-site
cp public/research/nonprofit.html research/nonprofit.html
git add public/research/nonprofit.html research/nonprofit.html
git commit -m "feat: add nonprofit research sub-page"
```

---

## Task 5: Build `/research/avdp.html`

**Files:**
- Create: `public/research/avdp.html`
- Sync: `research/avdp.html`

### Step 1: Page-specific values

- Title: `Film Therapeutics — Polarity Lab`
- Question: "Can the right environment make people genuinely open up, and does watching that change how we connect with each other?"
- Project label: `AVDP · A Very Distant Perspective`
- Status badge: In Production (purple)
- Team: Theodore Addo (TA), Shadrack Annor (SA)

### Step 2: Introduction copy

```
The research starts with a documented decline. Having a smartphone visible on a table, even face-down and never touched, measurably reduces empathy and the quality of conversation between people (Przybylski & Weinstein, 2012). Real, extended, unscripted conversation has become rare enough that most people haven't had one in weeks.

AVDP is an experiment in designing around this. The hypothesis: engineer the right environment — ambient music, long-form format, no phones in frame — and people will be genuinely open in ways they aren't in everyday settings. The secondary hypothesis: watching that openness may change how the audience connects with each other.

The podcast is simultaneously a creative output and a research instrument. Every episode is an experiment. The format itself is the methodology.
```

### Step 3: Background Research cards

| Authors | Title | Takeaway | Year |
|---|---|---|---|
| Przybylski & Weinstein | Can You Connect with Me Now? | The mere presence of a phone — unused, face-down — reduced relationship quality and reduced empathy during conversation. | 2012 |
| Misra et al. | The iPhone Effect | Replicated the mere presence effect in naturalistic coffee shop settings. Conversations with phones present were rated less fulfilling. | 2016 |
| Affective Computing (MIT Media Lab) | Survey of Emotion Recognition Accuracy | Multimodal emotion recognition achieves 80-90% accuracy in controlled settings but degrades significantly on real-world naturalistic data. | 2024 |
| ResearchGate (multiple authors) | A Survey of Ground-Truth in Emotion Data Annotation | Self-reported emotions often don't align with external observations. Laboratory scenarios fail to elicit fully naturalistic emotional responses. | 2023 |

### Step 4: Methods copy

```
The format design centers on one variable: does a live-mixed ambient soundscape change the quality of conversation?

Each recording session tests two conditions: (A) conversation with ambient music and (B) conversation without. Post-session surveys measure participant comfort, authenticity, and freedom of expression. Independent raters assess transcripts for conversational depth and vulnerability.

Phase 1 MVP: 5 episodes, minimum 20 volunteer participants. Zero-cost via partnerships with WBRU/88 Benevolent Studios and student groups at Brown University. Go/No-Go metrics: average engagement >45 minutes, >60% participant preference for the ambient condition, 1,000 listens within the first month of the pilot episode.

Two innovative content structures under test: a longitudinal 1-on-1 series (the same guest across multiple episodes, building an evolving portrait over time) and intelligently matched group conversations (guests from prior episodes paired based on shared interests surfaced during their individual interviews).
```

### Step 5: Results copy

```
Proof of concept established.

The lab filmed Zay, a potter in the US, creating and describing his ceramic work. The episodes reached Mateo, a store owner in Canada. He saw Zay's work and wanted to carry it. The lab connected them directly.

Two people across countries who would never have met, connected through the environment.

AVDP doesn't just create content. It creates connections.
```

### Step 6: Discussion copy

```
Film therapeutics is a novel research area. The claim is not that media is good for you in a vague sense. It is that watching authentic human connection is itself measurably restorative — that the right format, at the right length, with the right environment, produces a specific change in the audience.

The next production phase takes AVDP to Ghana. Gear funding unlocks this. If you want to support the project or explore the film therapeutics research, reach out.
```

### Step 7: Funding ask block

```
Label: "Support This Project"
Title: "Help us take AVDP to Ghana."
Desc: "The next production phase requires camera and audio gear. Film therapeutics is novel, underfunded, and directly connected to the lab's broader research on environments that restore human connection."
CTA: "Get in touch →" → mailto:team@polarity-lab.com?subject=AVDP
```

### Step 8: Sync and commit

```bash
cd /Users/theodoreaddo/polarity-site
cp public/research/avdp.html research/avdp.html
git add public/research/avdp.html research/avdp.html
git commit -m "feat: add AVDP film therapeutics research sub-page"
```

---

## Task 6: Build `/research/integrity-delta.html`

**Files:**
- Create: `public/research/integrity-delta.html`
- Sync: `research/integrity-delta.html`

This page has a different structure from the other two. The funding ask is a full dedicated section at the center of the page, not a footer block. The results section is honest about where the research stands.

### Step 1: Page-specific values

- Title: `Integrity Delta — Polarity Lab`
- Question: "When a hospital's AI system knows the right diagnosis, what stops it from telling the doctor?"
- Project label: `Integrity Delta · IΔ`
- Status badge: Seeking Funding (coral)
- Team: Theodore Addo (TA), Shadrack Annor (SA), Nathan Amankwah (NA)

### Step 2: Introduction copy

```
AI systems are trained on human preference data. Human preference data rewards agreeableness. The result is a model that has learned to tell people what they want to hear — even when it knows something different.

In consumer contexts this is annoying. In clinical contexts it is dangerous. We call it Polite Malpractice: the model had the correct answer in its internal representation, then said the wrong one to be agreeable, and the patient is the one who pays for it.

In our pilot study on Meta's Llama 3.1 8B, we observed this happen. The model's intermediate layers correctly identified mild cardiomegaly. The final output aligned with an adversarial label: fracture. The model knew the right answer. It said the wrong one anyway.

Integrity Delta (IΔ) is the instrument that catches this. It measures the gap between what a model computes internally and what it actually says. When that gap is zero, the model is being straight with you. When the gap is positive, the model is withholding its own best clinical judgment to be agreeable.
```

### Step 3: Background Research cards

| Authors | Title | Takeaway | Year |
|---|---|---|---|
| Cheng, Lee, Yu et al. | Sycophantic AI Decreases Prosocial Intentions (Science) | 11 frontier models endorsed user positions at 49% elevated rate vs. human advisors. Models validated harmful behavior 47% of the time. | 2026 |
| Chen, Gao, Sasse et al. | When Helpfulness Backfires (npj Digital Medicine) | Up to 100% initial compliance with illogical medical requests across five frontier models. | 2025 |
| Wang et al. | When Truth Is Overridden | Logit-lens analysis shows models derive correct answers at intermediate layers, then overwrite during final output generation. | 2025 |
| Chang & Geng | RAudit: A Blind Auditing Protocol for LLM Reasoning | Identifies Latent Competence Suppression: models actively conceal internal knowledge that conflicts with user framing. | 2026 |
| Peng et al. | SycoEval-EM | Model capability is a poor predictor of clinical robustness. Being a bigger model does not mean being a safer one. | 2025 |

### Step 4: Methods copy

```
IΔ measures one thing: the gap between what a clinical AI model knows internally and what it actually tells the user.

Internal representations are extracted at probe layers during the model's forward pass using logit-lens analysis (a technique that reads the model's internal state at each processing step, like tapping a wire at different points in a circuit). Both the internal state and the final output are scored against clinical ground truth. The signed difference is IΔ.

The Resolution Valley hypothesis: mid-tier models (7B to 13B parameters) occupy the most dangerous zone. They are smart enough to derive the correct clinical answer internally. They are too weak to resist user pressure to agree. This is the parameter range hospitals and enterprises deploy today.

The External Integrity Monitor (EIM) is the intervention layer: a real-time watchdog that catches the gap between internal reasoning and final output before it reaches the patient.

Three-tier measurement framework: white-box (full internal access via logit lens), gray-box (partial access), and black-box (API only, no internal access required). Any hospital can run a black-box IΔ audit on any deployed model without vendor cooperation.
```

### Step 5: Results copy (honest framing)

```
This is where we're headed.

Pilot observation (n=5, Llama 3.1 8B, adversarial radiology classification tasks): IΔ > 0 observed under controlled conditions. The model suppressed correct clinical knowledge under adversarial pressure. These are hypothesis-generating observations, not statistical claims. They demonstrate that IΔ > 0 is observable in at least one model. The validation study will determine whether these observations reflect a systematic phenomenon.

The manuscript is drafted. The OSF pre-registration is drafted. The validation protocol is designed and waiting on funding.
```

### Step 6: Funding ask section (full section, not footer block)

This replaces the standard footer funding block. It is a full `paper-section` with the `funding-ask` block inside it:

```html
<section class="paper-section">
  <div class="section-inner">
    <div class="funding-ask reveal">
      <p class="funding-ask-label">Seeking Funding</p>
      <h2 class="funding-ask-title">Help us run the validation study.</h2>
      <p class="funding-ask-desc">We're raising $500k to execute a 1,000-image multi-center validation protocol using the NIH CheXpert chest radiograph corpus, re-labeled by board-certified radiologists as clinical ground truth. This produces the first independently reproducible benchmark for clinical AI honesty.</p>
      <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-bottom:32px;">
        <span style="font-size:13px;color:var(--text-secondary);background:var(--void-surface);padding:8px 16px;border-radius:6px;border:1px solid var(--border-ghost);">Research Institutions</span>
        <span style="font-size:13px;color:var(--text-secondary);background:var(--void-surface);padding:8px 16px;border-radius:6px;border:1px solid var(--border-ghost);">Enterprise</span>
        <span style="font-size:13px;color:var(--text-secondary);background:var(--void-surface);padding:8px 16px;border-radius:6px;border:1px solid var(--border-ghost);">Government</span>
      </div>
      <a href="mailto:team@polarity-lab.com?subject=Integrity%20Delta%20Brief" class="funding-ask-cta">Request the brief →</a>
    </div>
  </div>
</section>
```

### Step 7: Sync and commit

```bash
cd /Users/theodoreaddo/polarity-site
cp public/research/integrity-delta.html research/integrity-delta.html
git add public/research/integrity-delta.html research/integrity-delta.html
git commit -m "feat: add Integrity Delta research sub-page"
```

---

## Task 7: Wire Vercel Routing

**Files:**
- Modify: `vercel.json`

Sub-pages need clean URLs. Check if `vercel.json` exists and add rewrites if needed.

### Step 1: Check current vercel.json

```bash
cat /Users/theodoreaddo/polarity-site/vercel.json
```

### Step 2: Ensure routing is correct

If `vercel.json` doesn't already handle `.html` extensions, update it:

```json
{
  "cleanUrls": true,
  "trailingSlash": false
}
```

`cleanUrls: true` lets `/research/nonprofit` serve `research/nonprofit.html` without the extension in the URL.

### Step 3: Commit

```bash
cd /Users/theodoreaddo/polarity-site
git add vercel.json
git commit -m "feat: configure clean URLs for research sub-pages"
```

---

## Task 8: Cross-Page QA Pass

Before deploying, verify everything manually:

### Checklist

**Homepage:**
- [ ] Hero text centered on mobile and desktop
- [ ] Research cards grid: 3 columns desktop, 1 column mobile
- [ ] Each card links to correct sub-page
- [ ] Dropdown opens on click, closes on outside click
- [ ] People grid: 4 cards, all links working
- [ ] About anchor scrolls correctly
- [ ] Contact anchor scrolls correctly
- [ ] Light/dark toggle works, persists on reload

**All sub-pages:**
- [ ] Nav loads with dropdown
- [ ] Breadcrumb links back to homepage
- [ ] Question is readable at mobile size
- [ ] Status badge shows correct color
- [ ] Background research cards are hyperlinked
- [ ] Back link (`← All Research`) scrolls to `/#research`
- [ ] Light/dark toggle persists from homepage

**Nonprofit page:**
- [ ] Polarity GPS link in discussion goes to polaritygps.com
- [ ] Funding ask email CTA works

**AVDP page:**
- [ ] Instagram link in discussion goes to averydistantperspective
- [ ] Funding ask email CTA works

**Integrity Delta page:**
- [ ] Funding ask section is prominent (not buried as footer)
- [ ] "Request the brief" CTA works
- [ ] Buyer tags (Research Institutions, Enterprise, Government) render

### Step: Final sync check

```bash
cd /Users/theodoreaddo/polarity-site
diff public/index.html index.html
diff public/research/nonprofit.html research/nonprofit.html
diff public/research/avdp.html research/avdp.html
diff public/research/integrity-delta.html research/integrity-delta.html
```
All diffs should be empty (files identical).

### Step: Final commit

```bash
git add -A
git commit -m "feat: complete site reframe — research-first architecture"
```

---

## Task 9: Deploy

```bash
cd /Users/theodoreaddo/polarity-site
git push origin main
```

Vercel auto-deploys on push to main. Verify at the live URL that all pages load and routing works.
