# Polarity Lab Site Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Overhaul polarity-lab.com with bug fixes, restructured nav, new Studio section, content refresh, patent credibility, privacy narrative, and email updates.

**Architecture:** Single page HTML site. All changes go into `index.html` (CSS, HTML, JS all inline). After all changes, copy `index.html` to `public/index.html` to keep them in sync.

**Tech Stack:** Vanilla HTML/CSS/JS, no build step.

---

### Task 1: Fix hero subtitle centering and mobile text cutoff

**Files:**
- Modify: `index.html:873-881` (`.hero-subtitle` CSS)
- Modify: `index.html:2245-2260` (mobile media query for hero text)

**Step 1: Fix the hero subtitle styles**

In `.hero-subtitle` (line 873), the `text-align: center` already exists but `max-width: 520px` combined with the parent centering may cause visual misalignment. Ensure the subtitle container itself is centered:

```css
.hero-subtitle {
  font-size: 18px;
  font-weight: 400;
  color: var(--text-secondary);
  max-width: 520px;
  margin: 0 auto;
  line-height: 1.7;
  text-align: center;
  padding: 0 24px;
}
```

**Step 2: Fix mobile hero text so it does not clip on scroll**

In the mobile media query (around line 2245), update `.scroll-text--center` to move the text higher and give it breathing room:

```css
.scroll-text--center {
  top: 48% !important;
  padding: 0 20px;
  max-width: 100%;
}
.hero-subtitle {
  font-size: 13px;
  max-width: 100%;
  padding: 0 8px;
  line-height: 1.5;
}
```

**Step 3: Verify visually**

Open index.html in browser, check:
- Desktop: subtitle is centered under the title
- Mobile (375px): subtitle fully visible, no clipping on scroll

**Step 4: Commit**

```bash
git add index.html
git commit -m "Fix hero subtitle centering and mobile text cutoff"
```

---

### Task 2: Restructure navigation

**Files:**
- Modify: `index.html:2479-2488` (nav HTML)
- Modify: `index.html:3335` (JS sections array)
- Modify: `index.html:984` (CSS section backgrounds, add `.studio`)

**Step 1: Update nav HTML**

Replace lines 2479-2488 with:

```html
<ul class="nav-links" id="nav-links">
  <li><a href="#about" class="nav-link">About</a></li>
  <li><a href="#ccx" class="nav-link">Science</a></li>
  <li><a href="#products" class="nav-link">Products</a></li>
  <li><a href="#studio" class="nav-link">Studio</a></li>
  <li><a href="#team" class="nav-link">Team</a></li>
  <li><a href="#research" class="nav-link">Research</a></li>
  <li><a href="#contact" class="nav-link">Contact</a></li>
</ul>

<a href="#contact" class="nav-cta"><span>Contact</span></a>
```

**Step 2: Update JS sections array**

Find line 3335 and update:

```javascript
const sections = ['about', 'ccx', 'products', 'studio', 'team', 'research', 'safety', 'contact'];
```

**Step 3: Add `.studio` to section backgrounds CSS**

At line 984, add `.studio` to the selector:

```css
.ccx, .about, .team, .products, .studio, .safety, .research, .involve, .contact {
```

**Step 4: Verify nav links work**

Click each nav item and confirm it scrolls to the correct section. Studio will 404 until Task 3.

**Step 5: Commit**

```bash
git add index.html
git commit -m "Restructure navigation order and change CTA to Contact"
```

---

### Task 3: Reorder HTML sections to match nav

**Files:**
- Modify: `index.html` (move section blocks)

**Step 1: Reorder the HTML sections in the scroll container**

The sections in the HTML should match the nav order. Current order is: hero, ccx, about, team, products, safety, research, involve, algorithm-cta, contact.

New order should be: hero, about, ccx, products, (studio goes here in Task 4), team, research, safety, involve, algorithm-cta, contact.

Move the About section (`<section class="spatial-section about" id="about">`) to come before the CCX section. Move Team to come after where Studio will be inserted. Move Research before Safety.

**Step 2: Verify scroll order**

Scroll through the page and confirm sections appear in order: About, Science, Products, (Studio placeholder), Team, Research, Safety, Get Involved, Algorithm CTA, Contact.

**Step 3: Commit**

```bash
git add index.html
git commit -m "Reorder HTML sections to match new navigation flow"
```

---

### Task 4: Add Studio section and CSS

**Files:**
- Modify: `index.html` (add CSS for `.studio` section, add HTML between Products and Team)

**Step 1: Add Studio CSS**

Add after the `.involve` CSS block (around line 1906), before the Algorithm CTA CSS:

```css
/* Studio Section */
.studio-header {
  text-align: center;
  margin: 0 auto 80px;
}

.studio-header .section-label {
  justify-content: center;
}

.studio-subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 16px auto 0;
  line-height: 1.6;
}

.studio-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  max-width: 900px;
  margin: 0 auto 48px;
}

.studio-card {
  background: var(--void-surface);
  border: 1px solid var(--border-ghost);
  border-radius: 20px;
  padding: 36px;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.5s var(--ease-out-expo);
  display: flex;
  flex-direction: column;
}

.studio-card:hover {
  transform: translateY(-8px);
  border-color: var(--border-medium);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.studio-card-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.studio-card:nth-child(1) .studio-card-icon { background: rgba(255, 138, 101, 0.15); }
.studio-card:nth-child(2) .studio-card-icon { background: var(--teal-subtle); }

.studio-card-icon svg {
  width: 26px;
  height: 26px;
}

.studio-card h3 {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--text-pure);
}

.studio-card p {
  font-size: 14px;
  color: var(--text-tertiary);
  line-height: 1.6;
  margin-bottom: 16px;
  flex: 1;
}

.studio-card a {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: gap 0.4s var(--ease-out-expo);
}

.studio-card:nth-child(1) a { color: var(--coral); }
.studio-card:nth-child(2) a { color: var(--teal); }

.studio-card a:hover { gap: 12px; }

.studio-cta {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.studio-cta a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 600;
  color: var(--teal);
  text-decoration: none;
  transition: gap 0.4s var(--ease-out-expo);
}

.studio-cta a:hover { gap: 14px; }

@media (max-width: 768px) {
  .studio-grid { grid-template-columns: 1fr; }
}
```

**Step 2: Add Studio HTML section**

Insert between Products section and Team section:

```html
<!-- STUDIO SECTION -->
<section class="spatial-section studio" id="studio">
  <div class="section-inner">
    <div class="studio-header reveal">
      <p class="section-label">The Studio</p>
      <h2 class="section-title">Pulse</h2>
      <p class="studio-subtitle">A digital broadcasting network by Polarity Lab.</p>
    </div>

    <div class="studio-grid stagger">
      <div class="studio-card">
        <div class="studio-card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#FFA07A" stroke-width="1.5">
            <path d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"/>
          </svg>
        </div>
        <h3>A Very Distant Perspective</h3>
        <p>Real conversations between real people about what it means to be a person right now. The kind of dialogue that helps us understand how people actually communicate when they care.</p>
        <a href="https://www.instagram.com/averydistantperspective" target="_blank">Watch on Instagram</a>
      </div>

      <a href="https://onpulse.tv" target="_blank" class="studio-card">
        <div class="studio-card-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#4ECDC4" stroke-width="1.5">
            <path d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
          </svg>
        </div>
        <h3>Broadcast</h3>
        <p>Live content delivery across WBRU and partner channels. Music, conversation, and culture.</p>
        <span style="font-family: var(--font-display); font-size: 13px; font-weight: 600; color: var(--teal);">Visit onpulse.tv</span>
      </a>
    </div>

    <div class="studio-cta reveal">
      <a href="https://onpulse.tv" target="_blank">Explore Pulse</a>
    </div>
  </div>
</section>
```

**Step 3: Verify the Studio section**

Open in browser, confirm Studio appears between Products and Team with proper styling.

**Step 4: Commit**

```bash
git add index.html
git commit -m "Add Studio section for Pulse broadcasting network"
```

---

### Task 5: Update products grid (replace AVDP with Pulse)

**Files:**
- Modify: `index.html:2799-2806` (AVDP product card)

**Step 0: Update Polarity product card description**

Find the Polarity product card and update the description to: "Not a chatbot. A thinking partner that helps you figure out what you're actually trying to say. Talk to it and it learns what matters to you."

**Step 1: Replace AVDP product card with Pulse**

Find the AVDP product card (around line 2799) and replace with:

```html
<a href="https://onpulse.tv" target="_blank" class="product-card">
  <div class="product-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="#4ECDC4" stroke-width="2">
      <path d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.789m13.788 0c3.808 3.808 3.808 9.981 0 13.79M12 12h.008v.007H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
    </svg>
  </div>
  <div class="product-name">Pulse</div>
  <div class="product-desc">A digital broadcasting network. Live content, long form conversation, and the research engine behind how we study real dialogue.</div>
  <span class="product-arrow">Explore</span>
</a>
```

**Step 2: Verify products grid**

Should show: Polarity, WaxFeed, Painpoints, Pulse (4 cards).

**Step 3: Commit**

```bash
git add index.html
git commit -m "Replace AVDP with Pulse in products grid"
```

---

### Task 6: Update hero constellation (replace AVDP icon with Pulse)

**Files:**
- Modify: `index.html:2565-2571` (AVDP hero icon)

**Step 1: Update the hero constellation AVDP icon**

Replace the AVDP hero product link with Pulse:

```html
<!-- Pulse -->
<a href="https://onpulse.tv" target="_blank" class="hero-product hero-product--avdp" id="icon-avdp">
  <div class="hero-product-icon avdp-icon">
    <img src="AVDPLOGOREAL.jpg" alt="Pulse">
  </div>
  <span class="hero-product-label">Pulse</span>
</a>
```

Keep the same id/class for now to not break the parallax JS animation. Just change the label and alt text.

**Step 2: Commit**

```bash
git add index.html
git commit -m "Update hero constellation label from AVDP to Pulse"
```

---

### Task 7: Update About section copy

**Files:**
- Modify: `index.html:2656-2709` (about section HTML)

**Step 1: Update the About section content**

Update the about section header, main card, and sub cards to reflect the interdisciplinary research lab identity:

- Header title: "A research lab that studies how conversation reveals how the mind works"
- Main card: Update algorithm description to emphasize the research flywheel and three interaction environments
- "The Studio" card becomes "The Research" with language about three interaction environments
- Keep "Open Platform" and "The Purpose" cards but update copy to remove en dashes

**Step 2: Update the three sub cards**

Card 1 (Open Platform): Keep but replace en dash with period.
Card 2 (The Purpose): Update to use new Polarity framing: "Not a form, not a chatbot. A thinking partner that helps you figure out what you're actually trying to say. Other AI tells you what to think. Polarity helps you think more clearly."
Card 3 (The Studio): Rename to reflect the three research environments:

```html
<h4>Three Environments</h4>
<p>Human to human. Human to computer to human. Human to computer. Every product we build creates one of these environments. Every conversation inside them feeds the science.</p>
```

**Step 3: Verify**

Read through the About section and confirm no en dashes or hyphens as punctuation remain.

**Step 4: Commit**

```bash
git add index.html
git commit -m "Update About section with interdisciplinary research lab positioning"
```

---

### Task 8: Add privacy narrative to Safety section

**Files:**
- Modify: `index.html:2811-2846` (safety section HTML)

**Step 1: Add "What You See vs What We See" block**

After the existing safety grid, add a new block before the closing `</div>`:

```html
<div class="safety-privacy reveal" style="margin-top: 64px; background: var(--void-surface); border: 1px solid var(--border-ghost); border-radius: 20px; padding: 48px; max-width: 900px; margin-left: auto; margin-right: auto;">
  <h3 style="font-family: var(--font-display); font-size: 20px; font-weight: 600; color: var(--text-pure); margin-bottom: 24px; text-align: center;">What You See vs What We See</h3>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 36px;">
    <div>
      <h4 style="font-family: var(--font-display); font-size: 14px; font-weight: 600; color: var(--teal); margin-bottom: 12px;">What You See</h4>
      <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.7;">Your full profile. What matters to you. How your thinking has shifted over time. A living record of who you are. All of it stays between you and Polarity.</p>
    </div>
    <div>
      <h4 style="font-family: var(--font-display); font-size: 14px; font-weight: 600; color: var(--purple); margin-bottom: 12px;">What We See</h4>
      <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.7;">Anonymized patterns across thousands of people. We might learn that people going through career changes tend to talk more about their close relationships. That kind of insight. Never yours specifically.</p>
    </div>
  </div>
</div>
```

Add responsive stacking in the 768px media query:

```css
.safety-privacy div[style*="grid-template-columns"] {
  grid-template-columns: 1fr !important;
}
```

**Step 2: Verify**

Check the Safety section shows the new "What You See vs What We See" block below the existing grid.

**Step 3: Commit**

```bash
git add index.html
git commit -m "Add privacy narrative to Safety section"
```

---

### Task 9: Add patents to Research section

**Files:**
- Modify: `index.html:2849-2876` (research section HTML)

**Step 1: Add patents block**

After the research tags block (around line 2876), add:

```html
<div class="research-patents reveal" style="margin-top: 48px; display: flex; gap: 24px; max-width: 800px; margin-left: auto; margin-right: auto; justify-content: center; flex-wrap: wrap;">
  <div style="background: var(--void-surface); border: 1px solid var(--border-ghost); border-radius: 16px; padding: 28px 36px; text-align: center;">
    <div style="font-family: var(--font-display); font-size: 36px; font-weight: 700; color: var(--teal); margin-bottom: 8px;">2</div>
    <div style="font-family: var(--font-mono); font-size: 11px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.1em;">Patents Filed</div>
  </div>
  <div style="background: var(--void-surface); border: 1px solid var(--border-ghost); border-radius: 16px; padding: 28px 36px; flex: 1; min-width: 300px;">
    <p style="font-family: var(--font-mono); font-size: 10px; color: var(--teal); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">USPTO Patent Center</p>
    <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 8px;">Conversational Connectomics: Methods for Bayesian Associative Strength Estimation, Cognitive State Classification, and Integrated Cognitive Fingerprinting</p>
    <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.6;">System and Method for Neuroanatomically Grounded Knowledge Graph Construction and Cognitive Biometric Authentication</p>
  </div>
</div>
```

**Step 2: Verify**

Check the Research section shows "2 Patents Filed" with the patent titles below the research tags.

**Step 3: Commit**

```bash
git add index.html
git commit -m "Add patent credibility to Research section"
```

---

### Task 10: Update Get Involved section (remove AVDP card)

**Files:**
- Modify: `index.html:2924-2933` (AVDP involve card)

**Step 1: Remove the AVDP Podcast card**

Delete the fourth involve card (AVDP Podcast, around lines 2924-2933). AVDP now lives under Studio.

**Step 2: Update the involve grid**

With 3 cards instead of 4, the 2 column grid still works (2 on top, 1 centered on bottom). Or switch to 3 columns. Keep 2 columns for visual consistency.

**Step 3: Commit**

```bash
git add index.html
git commit -m "Remove AVDP card from Get Involved section (now in Studio)"
```

---

### Task 11: Update all email addresses

**Files:**
- Modify: `index.html` (5 locations)

**Step 1: Replace all email addresses**

Find and replace all instances:
- `polarity@polarity-lab.com` to `team@polarity-lab.com`

Locations (5 total):
- Line 2897: Research Collaboration mailto
- Line 2910: Advisory Interest mailto
- Line 2921: Painpoints Contributor mailto
- Line 2962: Contact section mailto
- Line 2967: Contact section display text

**Step 2: Verify**

Search the file for any remaining instances of `polarity@polarity-lab.com`. Should return 0 results.

**Step 3: Commit**

```bash
git add index.html
git commit -m "Update contact email to team@polarity-lab.com"
```

---

### Task 12: Clean up copy (remove en dashes and hyphens as punctuation)

**Files:**
- Modify: `index.html` (scan all visible text)

**Step 1: Find all en dashes and hyphens used as punctuation**

Search for ` — ` (space en dash space) and ` - ` (space hyphen space used as em dash) in visible text content. Replace with periods, commas, or restructured sentences.

Known locations:
- Product descriptions using dashes
- About section copy
- Any other visible text

**Step 2: Verify**

Grep for ` — ` and ` - ` in text content. Legitimate hyphens in compound words (e.g., "long-form") are fine. Only remove punctuation dashes.

**Step 3: Commit**

```bash
git add index.html
git commit -m "Remove en dashes and hyphens as punctuation from all copy"
```

---

### Task 13: Sync public/index.html

**Files:**
- Copy: `index.html` to `public/index.html`

**Step 1: Copy the file**

```bash
cp index.html public/index.html
```

**Step 2: Verify**

```bash
diff index.html public/index.html
```

Should return no differences.

**Step 3: Commit**

```bash
git add public/index.html
git commit -m "Sync public/index.html with updated index.html"
```
