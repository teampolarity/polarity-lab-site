# Polarity Lab Site Reframe Design

Date: 2026-04-06

## Summary

Complete reframe of polarity-lab.com from a product/output-first site to a research-lab-first site modeled on the ARC Institute. The new structure leads with people and questions, not instruments and products. Three research sub-pages replace the current "Work" section. Homepage becomes a single scroll covering research, people, about, and contact.

---

## Site Architecture

```
index.html                  homepage (single scroll, all sections)
research/
  nonprofit.html            Proximity Index / PolarityGPS
  avdp.html                 AVDP / film therapeutics
  integrity-delta.html      Integrity Delta / clinical AI honesty
```

Root `index.html` is always kept in sync with `public/index.html`. Same rule applies to research sub-pages: each lives in both `research/` and `public/research/`.

---

## Visual Identity

Preserve existing Polarity dark aesthetic: void palette, Space Grotesk, teal/coral/purple. Light mode already implemented. ARC-style information architecture layered on top of Polarity visual identity. No WebGL on sub-pages. Homepage WebGL stays.

---

## Navigation (all pages)

```
POLARITY LOGO (left)     Research v | About | Contact    [light/dark toggle]
```

- **Research** opens a dropdown: Nonprofit & Discovery | Film Therapeutics | Integrity Delta
- **About** and **Contact** are anchor links on the homepage (`#about`, `#contact`)
- On sub-pages, About and Contact link back to `/#about` and `/#contact`
- Mobile: hamburger collapses to same structure

---

## Page 1: Homepage (`index.html`)

### Hero
- Wordmark: POLARITY LAB
- One-liner: "An environmental therapeutics lab."
- Sub-line: Providence, RI · Est. 2025
- No cinematic scroll text. Short, clean, typographic.

### Research Section (`#research`)
- Label: "Our Research"
- Framing line: "Each project starts with a specific question. We build the team, gather the evidence, then design the answer."
- 3 cards in a grid. Each card:
  - Research question as the headline (large, bold)
  - Project name as a sub-label beneath
  - Status badge (Active / In Production / Seeking Funding)
  - Team avatars (initials or photos)
  - `Explore →` link to sub-page

Card 1: "Why can't the communities that need resources the most find the ones built specifically for them?" — Proximity Index · PolarityGPS — Active
Card 2: "Can the right environment make people genuinely open up, and does watching that change how we connect with each other?" — AVDP · A Very Distant Perspective — In Production
Card 3: "When a hospital's AI system knows the right diagnosis, what stops it from telling the doctor?" — Integrity Delta · IΔ — Seeking Funding

### People Section (`#people`)
Four cards: Theo, Shadrack, Nathan, Juan.

- **Theodore Addo** — Founder, Lead Researcher. Radiology Resident, St. Vincent's (2027). MIT Boyden Lab, Brown Medical School.
- **Shadrack Annor** — Principal, Technical & Creative. Brown CS & Religious Studies '27.
- **Nathan Amankwah** — Operations. Finance & BTM, uOttawa '26.
- **J'Juan Wilson Jr.** — Research Collaborator. GOODhumanz, Providence, RI.

Nathan is presented with an operations framing (not research), consistent with ARC's COO treatment. Juan is labeled Research Collaborator with a note tying him to the nonprofit project.

Advisor slots: Not shown yet. Added when confirmed.

### About Section (`#about`)
- Label: "About the Lab"
- Opening: "An environmental therapeutics lab."
- 3-4 paragraphs: what the lab does, the diagnostic instrument / therapeutic environment framework explained in plain language, why Providence, why now.
- Research domain tags (existing tags from current site work well here).

### Contact Section (`#contact`)
- Label: "Get in Touch"
- Two columns:
  - Research collaboration: `team@polarity-lab.com`
  - Funding / investment: `team@polarity-lab.com?subject=Integrity%20Delta%20Brief`
- Newsletter signup (existing Formspree integration)
- Location: Providence, RI

---

## Page 2: `/research/nonprofit.html`

### Header
- Breadcrumb: Polarity Lab / Research
- Question (large): "Why can't the communities that need resources the most find the ones built specifically for them?"
- Project label: Proximity Index · PolarityGPS
- Status badge: Active
- Team: Theodore Addo, Shadrack Annor, J'Juan Wilson Jr. (avatars + names inline)

### Introduction
- 2-3 paragraphs expanding the question.
- Context: Providence, RI. MUSEOFRI partnership. The observation that BIPOC-led nonprofits aren't invisible because they're doing bad work. They're invisible because the discovery infrastructure was built around institutions that already have resources.
- Juan Wilson's research at GOODhumanz documented this from both sides: the workforce development angle (Closing the Gap whitepaper) and the funding/visibility angle (MUSEOFRI Pain Points Report).

### Background Research
- Card grid of hyperlinked foundational papers. Each card: title, authors, year, one-line takeaway.
- Sources from Juan's docs: Center for Effective Philanthropy State of Nonprofits 2024, Urban Institute 2025 National Survey, Fundraising Effectiveness Project Q3 2023, Building Movement Project (BIPOC leadership pipeline decline 40% to 32%), Independent Sector Health of the Nonprofit Sector 2024.

### Methods
- How the Proximity Index scoring works: two inputs (cultural output produced by/for a community, what discovery platforms surface to that community), the gap between those two numbers is the score.
- Zero means everything made for you reaches you. A high score means your own culture is algorithmically invisible to you.

### Results
- The MUSEOFRI Providence finding: across BIPOC-led communities in Providence, the gap was not caused by a lack of output. Communities were actively producing. The problem was in the pathways.
- This gives PolarityGPS a specific, measurable target.

### Discussion
- PolarityGPS as the direct response to the finding. Link to polaritygps.com.
- Conference/presentation links as they come.

### Funding Ask (footer block)
- "Help us expand this research" with email CTA.
- Framed as: funding data accumulation from papers on nonprofit pain points, which is the remaining work Juan is doing.

---

## Page 3: `/research/avdp.html`

### Header
- Breadcrumb: Polarity Lab / Research
- Question (large): "Can the right environment make people genuinely open up, and does watching that change how we connect with each other?"
- Project label: AVDP · A Very Distant Perspective
- Status badge: In Production
- Team: Theodore Addo, Shadrack Annor

### Introduction
- 2-3 paragraphs.
- Conversational depth is declining. The presence of a smartphone on a table, even unused, measurably reduces empathy and connection (Przybylski & Weinstein 2012, Misra et al. 2016). Real, extended, unscripted conversation has become rare enough that witnessing it has therapeutic value.
- AVDP's hypothesis: engineer the right environment (ambient music, long-form, no phones in frame) and people will be genuinely open. Watching that openness may change how the audience connects with each other.

### Background Research
- Card grid of foundational papers, each with title, authors, year, one-line takeaway, hyperlink.
- Papers:
  - Przybylski & Weinstein (2012) "Can You Connect with Me Now?" — The mere presence of a phone reduces empathy and conversational quality.
  - Misra et al. (2016) "The iPhone Effect" — Replication of the mere presence effect in naturalistic settings.
  - Affective computing accuracy gap: multimodal emotion recognition achieves 80-90% in controlled settings but degrades on real-world data (cite from AVDP research proposal).
  - The ground truth problem in emotion data annotation (ResearchGate survey, cited in proposal).

### Methods
- The format design: in-depth conversation + live-mixed ambient music. A/B testing (with music vs. without). Equipment setup experimentation. Longitudinal guest series. Intelligently matched group conversations.
- Phase 1 MVP: 5 episodes, 20 volunteer participants, zero-cost via WBRU/88 Benevolent Studios and Brown University partnerships.
- Go/No-Go metrics from the proposal: engagement >45 min avg, >60% participant preference for ambient condition, SDR >7dB, 1,000 listens within first month of pilot episode.

### Results
- Proof of concept: Zay (potter, US) and Mateo (store owner, Canada). AVDP filmed Zay creating ceramic work. Mateo saw the episodes and wanted to carry Zay's work. The lab connected them. Two people across countries connected through the environment.
- AVDP doesn't just create content. It creates connections.

### Discussion
- Link to Instagram: averydistantperspective
- Ghana podcast: next production requiring gear funding.
- Film therapeutics as a novel research area: watching authentic human connection is itself measurably restorative.

### Funding Ask (footer block)
- "Help us take AVDP to Ghana" with gear list context and email CTA.
- Framed around funding the media side, film therapeutics as novel and underfunded.

---

## Page 4: `/research/integrity-delta.html`

### Header
- Breadcrumb: Polarity Lab / Research
- Question (large): "When a hospital's AI system knows the right diagnosis, what stops it from telling the doctor?"
- Project label: Integrity Delta · IΔ
- Status badge: Seeking Funding
- Team: Theodore Addo, Shadrack Annor, Nathan Amankwah

### Introduction
- 2-3 paragraphs.
- AI systems are trained on human preference data. Human preference data rewards agreeableness. The result: models that override their own correct internal reasoning to tell users what they want to hear. In consumer contexts this is annoying. In clinical contexts it is dangerous.
- We call this Polite Malpractice: the model had the correct answer in its internal representation, then said the wrong one to be agreeable.
- In our pilot (n=5, Llama 3.1 8B), we observed this happen on radiology tasks. The model's intermediate layers correctly identified mild cardiomegaly. The final output aligned with the adversarial label (fracture). The model knew the right answer. It said the wrong one anyway.

### Background Research
- Card grid:
  - Cheng et al. 2026 (Science) — 11 frontier models endorsed user positions at 49% elevated rate vs. human advisors. Even when users described harmful behavior, models validated 47% of the time.
  - Chen et al. 2025 (npj Digital Medicine) — Up to 100% initial compliance with illogical medical requests across five frontier models.
  - Wang et al. 2025 — Logit-lens analysis shows models derive correct answers at intermediate layers then overwrite during final output generation.
  - Chang & Geng 2026 (RAudit) — Identifies Latent Competence Suppression: models actively conceal internal knowledge that conflicts with user framing.
  - Peng et al. 2025 (SycoEval-EM) — Model capability is a poor predictor of clinical robustness. Being a bigger model does not mean being a safer one.

### Methods
- IΔ in plain language: measure the gap between what the model computes internally at intermediate layers and what it actually says. A gap of zero means it's being straight with you. A positive gap means it knows better than it let on.
- The Resolution Valley hypothesis: mid-tier models (7B to 13B parameters) are the most dangerous. Smart enough to derive the correct answer. Too weak to resist user pressure to agree. This is the parameter range hospitals deploy today.
- External Integrity Monitor (EIM): a real-time watchdog that catches the gap before it reaches the patient.
- Three-tier measurement framework: white-box (full internal access), gray-box, black-box (API only).

### Results
- "This is where we're headed."
- Pilot observation: n=5, Llama 3.1 8B, adversarial radiology classification. IΔ > 0 observed. The model suppressed correct clinical knowledge under adversarial pressure.
- Next step: 1,000-image multi-center validation protocol using NIH CheXpert chest radiograph corpus, re-labeled by board-certified radiologists as clinical ground truth.

### Funding Ask (CENTERPIECE — not footer)
- Full dedicated section, not a footer block.
- "Help us run the validation study."
- What the $500k unlocks: the CheXpert 1,000-image validation protocol, board-certified radiologist re-labeling, multi-center data, OSF pre-registration, manuscript submission.
- Who buys this: research institutions, enterprise, government regulators.
- CTA: "Request the brief" mailto + "team@polarity-lab.com"

---

## Shared Components (all sub-pages)

- Same nav as homepage
- Breadcrumb: Polarity Lab / Research
- Back link: `← All Research` pointing to `/#research`
- Footer: lab name, location, email, copyright
- Light/dark mode toggle persists across pages (localStorage)

---

## Files to Create/Modify

```
public/index.html           rewrite (homepage)
public/research/
  nonprofit.html            new
  avdp.html                 new
  integrity-delta.html      new
index.html                  mirror of public/index.html
research/
  nonprofit.html            mirror
  avdp.html                 mirror
  integrity-delta.html      mirror
```

Sync rule: every edit to `public/X` must be copied to root `X`. Both files always identical.
