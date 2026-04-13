# Copy Reframe Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rewrite polarity-lab.com copy to lead with the compliance-apparatus thesis across homepage and all four research pages.

**Architecture:** Pure copy changes. No new sections, no structural edits. Six HTML files touched. Both `index.html` and `public/index.html` must be updated independently (they have diverged).

**Tech Stack:** Static HTML, Cloudflare Pages

---

## Compliance mechanism map

- AVDP: performance identity (film as the context where the filter is most visible)
- WAXFEED: cognitive compliance (thinking shaped to match what's rewarded)
- Integrity Delta: institutional truth suppression (AI as approval machine disguised as authority)
- Polarity GPS: social sorting (belonging gated behind conformity)

## Copy rules

- No em dashes. Use commas, colons, or restructure.
- No "Four" or any numeric count of projects. The work speaks for itself.
- Short sentences. No jargon. No academic hedging.
- Thesis stated as fact, not manifesto.

---

## Task 1: index.html (root)

**File:** `index.html`

**Changes:**

| Element | Old | New |
|---|---|---|
| `.hero-minimal-tagline` | An institute for the human condition. | Systems that reward compliance produce compliant people. That's not a flaw in the design. |
| About `section-title` h2 | The problems no one is moving fast enough to solve. | The world engineers stagnation as people age. |
| About body p1 | The problems accumulating fastest... | Not through malice. Through design. Every institution you move through, school, work, medicine, social infrastructure, optimizes for predictability. Pursuit gets expensive. Uniqueness becomes a liability. Most people don't notice the transition. They just stop. |
| About body p2 | Polarity Lab is that room... | Polarity Lab is a prototype of a different system. One question asked from multiple angles: what does a human look like when the compliance apparatus is removed? |
| Work `section-title` h2 | The problems you feel but can't name yet. | Each project targets a different mechanism. Each one removes it differently. |
| AVDP `fund-card-ask` | Watching someone face death honestly... | Film is where performance identity is most visible. This series puts people in environments designed to drop the filter. |
| WAXFEED `fund-card-ask` | Your listening history has a cognitive signature... | Your taste gets shaped by what the systems around you reward. WAXFEED measures the cognitive signature underneath: what you actually are, not what you've been trained to prefer. |
| Integrity Delta `fund-card-ask` | Clinical AI will change a correct diagnosis... | Clinical AI was trained to be agreeable. It learned to filter correct answers through acceptable ones. Integrity Delta measures the gap. |
| GPS `fund-card-ask` | A location game where every move... | Who you know is downstream of how well you've performed belonging. Polarity GPS maps what gets hidden when discovery infrastructure sorts by conformity. |
| Get Involved `section-title` h2 | What's your angle? | This is open. |
| Bring a Project `contact-col-desc` | Have an MVP or working prototype... | Have work that asks what people look like without the compliance layer? The lab provides the team, infrastructure, and model to make it compound. |
| Join a Project `contact-col-desc` | Researcher, engineer, filmmaker, designer. If your skills match... | Researcher, engineer, filmmaker, designer. If your skills fit what a project needs, there is a role and a defined stake in what it produces. |
| Back the Work `contact-col-desc` | Start with $10 and get your name on something real. | Start at $10. Every project has a direct contribution path, or give where the lab needs it most. |

---

## Task 2: public/index.html

Same changes as Task 1, accounting for structural differences:
- No about h2 exists in this file (just `section-label`). Add the h2 after the label div.
- About body has a third paragraph ("If you've felt these problems...") — replace all three paragraphs with the two new ones.
- Work h2 reads "What we're building." not the Task 1 text.

---

## Task 3: public/research/avdp.html

| Element | Old | New |
|---|---|---|
| `subpage-question` h1 | Can the right environment make people genuinely open up... | Performance identity is the filter. Film is where it's most visible. |
| Intro `paper-section-title` h2 | The format is the methodology. | The format is designed to remove it. |
| Intro `paper-body` p1 | Having a smartphone visible on a table... | Most people haven't had an unscripted conversation in weeks. Not because they don't want one. Because the contexts that produce them have been replaced by contexts that reward performance. Even a smartphone face-down on a table measurably reduces the quality of the conversation happening around it (Przybylski & Weinstein, 2012). A camera in the room usually makes it worse. AVDP is designed to do the opposite. |

---

## Task 4: public/research/wax-feed.html

| Element | Old | New |
|---|---|---|
| `subpage-question` h1 | The platform that learns who you are through what you love. | Cognitive compliance is how thinking gets shaped to match what's rewarded. Music is where the signal is cleanest. |
| Intro `paper-section-title` h2 | You've been rating music your whole life. We're finally paying attention. | Preference is behavior. The platform reads both. |
| Intro `paper-body` p1 | (omitted in source — see file) | You've been rating music your whole life. Not consciously. Every track you skipped, every album you defended past the point of reason, every artist you grew out of: that's data. WAXFEED is built to read it. Not what you say you like. What your response pattern looks like underneath. |

---

## Task 5: public/research/integrity-delta.html

| Element | Old | New |
|---|---|---|
| `subpage-question` h1 | When a hospital's AI system knows the right diagnosis, what stops it from telling the doctor? | Institutional truth suppression: correctness filtered through acceptability before it reaches the human. |
| Intro `paper-section-title` h2 | (already correct: "The model knew the right answer. It said the wrong one anyway.") | No change |
| Intro `paper-body` p1 | AI Honesty is the study of when and why AI systems suppress their own correct reasoning... | When a clinician pushes back on an AI diagnosis, the AI changes its answer. Not because new evidence appeared. Because disagreement felt like pressure, and the model was trained to relieve pressure. That is not a flaw in one system. It is the design logic of every approval-optimized model deployed in a clinical setting. |

---

## Task 6: public/research/polaritygps.html

| Element | Old | New |
|---|---|---|
| `subpage-question` h1 | Why do the places, causes, and culture built in your city never reach the people living right next to them? | Social sorting: belonging gated behind conformity. Communities built for you don't reach you because discovery infrastructure wasn't built to find them. |
| Intro `paper-section-title` h2 | The places that made your city worth living in don't show up where you look for them. | The places are there. The pathways aren't. |
| Intro `paper-body` p1 | You live somewhere. You probably don't know half of what's there... | The community built for you is not visible from where you are. Not because it failed. Because the platforms that map your city were built to surface what's popular, not what's near you. Conformity scales. Proximity doesn't. Discovery infrastructure wasn't built to find what exists at the neighborhood level. It was built to find what performs at the national level. |

---

## Task 7: Verify

Search for: em dashes (`—`), `Four compliance`, `Four experiments`, `An institute for the human condition`, old about copy.

## Task 8: Commit

```bash
git add index.html public/index.html public/research/avdp.html public/research/wax-feed.html public/research/integrity-delta.html public/research/polaritygps.html
git commit -m "reframe: rewrite copy around compliance-apparatus thesis"
```
