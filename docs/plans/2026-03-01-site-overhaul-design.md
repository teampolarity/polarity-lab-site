# Polarity Lab Site Overhaul Design

Date: 2026-03-01

## Summary

Major update to polarity-lab.com covering bug fixes, navigation restructuring, new Studio section for Pulse, content refresh with interdisciplinary research lab positioning, patent credibility, privacy narrative, and email update.

## 1. Bug Fixes

### Hero subtitle not centered
- Add `text-align: center` to `.hero-subtitle`
- Currently left aligned while the title above it is centered

### Mobile scroll text cutoff
- `.scroll-text--center` uses fixed positioning inside the stage
- On mobile the subtitle overflows and clips on scroll
- Fix: add `padding-inline` on mobile, ensure text container does not clip
- Reduce subtitle font size on small screens

## 2. Navigation Restructure

### New order
`About | Science | Products | Studio | Team | Research | Contact`

### Changes
- Remove Algorithm as a nav item (it stays as inline CTAs within Science and About sections)
- Add `Studio` nav link pointing to new `#studio` section
- Top right CTA button = `CONTACT` linking to `#contact`
- Update the JS `sections` array to match: `['about', 'ccx', 'products', 'studio', 'team', 'research', 'safety', 'contact']`

## 3. New Studio Section

Position: between Products and Team

```
Section label: "The Studio"
Title: "Pulse"
Subtitle: A digital broadcasting network by Polarity Lab.

Card 1: AVDP (A Very Distant Perspective)
  Real conversations between real people about what it means to be
  a person right now. The kind of dialogue that helps us understand
  how people actually communicate when they care.
  Link: Instagram / Linktree

Card 2: Broadcast
  Live content delivery across WBRU and partner channels.
  Link: onpulse.tv

CTA: Visit onpulse.tv
```

### Removes AVDP from:
- Products grid (replace with Pulse card or leave 3 products)
- Get Involved section (AVDP podcast card removed, lives under Studio now)

## 4. Content and Copy Refresh

### Tone rules
- No en dashes or hyphens as punctuation anywhere
- Do not frame data collection as surveillance or extraction
- Frame everything as understanding, not profiling
- MIT Media Lab vibes: interdisciplinary, rigorous, accessible

### Hero
Keep current "Measure the Mind" or "We measure what matters" per existing copy. Subtitle should be centered and readable on mobile.

### Polarity product framing
Key positioning: "Not a form, not a chatbot. A thinking partner that helps you figure out what you're actually trying to say."
- Other AI chatbots tell you what to think. Polarity helps you think more clearly.
- Use this framing in the Polarity product card and About section.
- This separates Polarity from every other AI product on the market.

### About section updates
Informed by the lab aims document:
- Studying consciousness through conversation at an individual level through a multi angle lens
- Three research environments:
  - Human to human interaction (AVDP / Pulse)
  - Human to computer to human interaction (WaxFeed, Painpoints)
  - Human to computer interaction (Polarity OS)
- The flywheel: products generate authentic conversations, conversations feed the algorithm, algorithm improves products

### Safety section: add data privacy narrative
New framing: "What You See vs What We See"
- Your conversations stay between you and Polarity. We never see them.
- What we learn comes from patterns across thousands of people, not from reading yours.
- Example population insight: "We might learn that people going through career changes tend to talk more about their close relationships. That kind of insight. Never yours specifically."

## 5. Patents and Credibility

Add to Research section as a credibility element:
- "2 Patents Filed" badge or stat
- Patent 1: Conversational Connectomics (App 63/960,633, Filed Jan 2026)
- Patent 2: Neuroanatomically Grounded Knowledge Graph Construction (App 63/940,728, Filed Dec 2025)
- Inventor: Theodore Addo

## 6. Email Update

All instances of `polarity@polarity-lab.com` changed to `team@polarity-lab.com`

Locations:
- Contact section mailto link
- Get Involved section (Research Collaborators, Advisors, Contributors mailto links)

## 7. Products Grid Update

- Remove AVDP card from products (moves to Studio)
- Add Pulse card linking to onpulse.tv
- Final grid: Polarity, WaxFeed, Painpoints, Pulse (4 cards)

## Files to modify

- `index.html` (primary, all changes)
- `public/index.html` (mirror of index.html for deployment)
