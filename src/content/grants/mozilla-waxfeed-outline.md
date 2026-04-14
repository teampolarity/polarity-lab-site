---
title: "Mozilla Technology Fund — WAXFEED"
funder: "Mozilla Foundation"
program: "WAXFEED"
status: "in-development"
owner: "Director of Strategy"
---

**Polarity Lab**
**Program target:** Mozilla Foundation — Mozilla Technology Fund / Responsible AI Track
**Secondary target:** Mozilla Open Source Support (MOSS) if CGM tooling is open-sourced
**Readiness:** CGM concept framework developed (working design, not a prior-validated instrument). WAXFEED counter-environment design complete, platform in development. No user study yet. No academic partner yet.
**Document version:** April 2026 — internal outline, not for external distribution

---

## Why Mozilla

Mozilla's Technology Fund (MTF) focuses on responsible AI and trustworthy internet. The fund explicitly targets "technology that empowers people and increases individual autonomy, safety, and well-being online." The WAXFEED research program is a direct fit on all three dimensions.

Mozilla is also unique among the funders this lab is targeting because it cares about mechanisms, not just outcomes. Mozilla has funded work on algorithmic auditing, filter bubbles, and recommendation transparency that is directly adjacent to CGM methodology. The MTF explicitly invites "independent researchers and technologists who are building or studying tools that make AI more accountable to the people it affects." The CGM is exactly that: an auditing instrument for what recommendation AI does to authentic preference.

The additional fit: Mozilla's audience is technically sophisticated. You do not need to explain what KL divergence is. You can lead with the measurement and the mechanism. That is an advantage over every other funder in this pipeline.

**Target program:** Mozilla Technology Fund — Responsible AI
**Grant range:** $50,000 to $250,000 over 12-18 months
**Application type:** Open call when live (MTF runs annual cycles); alternatively, the Mozilla Foundation's direct grants program has a rolling intake for smaller grants under $75,000

---

## Project Title (working)

**The Cognitive Gap Measure: An Auditing Instrument for Algorithmic Suppression of Authentic Musical Preference**

---

## Project Summary (350 words, for Mozilla application)

Every major music platform builds a model of the listener from behavioral history and uses that model to predict what they want to hear next. The model is trained on engagement, not on authentic preference. Engagement is shaped by what the platform showed you, when it showed it, and how it framed it. Over years of use, the model trained on your engagement history diverges from your genuine musical identity.

This divergence is not hypothetical. It is measurable. Existing research has documented that algorithmic reliance reduces listening diversity over time (Anderson et al., 2020, Spotify, n=100,000). What no existing research has produced is a scored, reproducible instrument that measures the gap at the individual level: not "users in this cohort listen to less diverse music," but "this specific listener's authentic musical preference diverges from their recommendation system's model by 0.67 on a 0-1 scale."

The Cognitive Gap Measure (CGM) is that instrument. It produces a signed scalar score representing the divergence between two quantities: a listener's authentic musical preference (estimated through novel forced-choice tasks that bypass platform behavioral history) and the recommendation system's model of that listener (estimated from platform behavioral data). The gap is the suppression. A CGM score of 0 means the platform's model matches the person. A CGM score of 0.67 means 67% of the person's musical identity is not represented in what the platform is showing them.

WAXFEED is the counter-environment: a music discovery platform designed to close the CGM rather than reinforce it. It surfaces what the recommendation system has suppressed. The CGM measures whether it works.

This proposal funds: (1) formal psychometric validation of the CGM as a reproducible auditing instrument; (2) an open-source CGM scoring toolkit deployable against any music platform's behavioral data export; and (3) a first controlled study of whether WAXFEED measurably reduces CGM scores at 90-day follow-up.

The output is an auditing instrument that any researcher, regulator, or platform can use to measure what algorithmic recommendation is doing to authentic human preference.

---

## Mozilla-Specific Framing

### The autonomy argument

Mozilla funds for human autonomy. The CGM is an autonomy instrument. It measures the degree to which a person's musical choices have been displaced by algorithmic prediction. A high CGM score means the listener is receiving confirmation of a model the platform built, not discovery of what they actually want. The platform has substituted its model for the person's own judgment.

This is the same concern Mozilla has applied to filter bubbles, surveillance capitalism, and algorithmic amplification. WAXFEED applies it to a domain Mozilla has not yet entered: cultural taste and authentic identity formation.

### The open web argument

Mozilla also funds independent tooling for accountability. The CGM, published as an open-source instrument with a scoring toolkit, enables external auditing of recommendation systems that no platform currently requires or permits. If the CGM becomes a standard auditing measure, platforms can be held accountable to it even before any regulatory mandate exists. This is the Mozilla playbook from browser standards and content moderation transparency: build the measurement before the policy catches up.

### The AI accountability argument

The CGM requires accessing a platform's behavioral data export (Spotify provides this; Apple Music provides limited versions). Computing the gap between that export and a listener's authentic preference is an AI accountability analysis: it reveals whether the model the platform built matches the person it claims to serve. This is exactly what Mozilla's Responsible AI track is designed to fund.

---

## Aims

### Aim 1: Validate the Cognitive Gap Measure as a Psychometrically Sound Instrument (Months 1-12)

**Core question:** Does the forced-choice task protocol produce a stable, reliable estimate of authentic musical preference that is demonstrably independent of platform behavioral history?

**What we do:**
- Recruit 150-200 participants from WAXFEED's Providence user base and direct outreach
- Administer the CGM protocol: 40-pair novel track forced-choice task (8-second selection window), MUSIC taxonomy personality alignment (Rentfrow and Gosling, 2003), Spotify behavioral data export analysis
- Compute CGM scores and assess:
  - Construct validity: correlation between forced-choice preference profile and personality-predicted MUSIC taxonomy profile (target r > 0.40)
  - Test-retest reliability: ICC > 0.75 at 30-day retest
  - Method convergence: correlation between CGM computed from behavioral history export vs. recommendation queue sampling (target r > 0.60)
- Publish validation paper to an information systems or music cognition venue
- Release open-source CGM scoring toolkit (Python library)

**What we already have:** CGM concept framework (instrument specification is a working design, not a prior-validated instrument). WAXFEED counter-environment design. Spotify data export methodology documented as conceptual design. No user study yet. No validated CGM scores.

---

### Aim 2: Build and Release the CGM Open-Source Toolkit (Months 6-15)

**Core question:** Can the CGM be packaged as a tool that researchers, journalists, and platform auditors can deploy without building from scratch?

**What we build:**
- A Python library (`cognitiv-gap-measure`) that:
  - Takes a Spotify (or Apple Music) data export as input
  - Presents the 40-pair forced-choice task in a browser-based interface
  - Computes and returns a CGM score with subscores and confidence intervals
  - Produces a plain-language interpretability report ("Your algorithmic taste profile is diverging from your authentic preference by 0.67 — this places you in the high-gap range")
- Publishes to PyPI under an open license (MIT or Apache 2.0)
- Includes documentation and a demo dataset for replication

**Why open-source matters here:** If the CGM is a proprietary instrument, it serves Polarity Lab's research program. If it is open-source, it becomes an accountability tool. Any journalist, regulator, or academic can run it on their own Spotify export and publish the result. That is what Mozilla funds.

---

### Aim 3: Controlled Study of WAXFEED as a CGM-Reducing Counter-Environment (Months 10-18)

**Core question:** Does 90 days of WAXFEED use produce a measurably greater reduction in CGM scores than continued standard platform use?

**What we do:**
- From the Aim 1 sample, identify participants with CGM > 0.40 (high suppression, n=80-100 expected)
- Random assignment: WAXFEED as primary discovery platform for 90 days (n=40-50) vs. waitlist control (n=40-50)
- CGM at baseline, 45 days, 90 days
- Primary outcome: within-subject CGM change at 90 days
- Secondary outcome: self-reported musical identity coherence and authentic discovery experience (purpose-built scale)
- Publish results regardless of outcome (null result = informative about the instrument's sensitivity, not a failure)

**Mozilla framing:** This aim produces public knowledge about whether a non-algorithmic counter-environment can measurably restore something that recommendation systems suppress. That knowledge belongs to the open research record.

---

## Budget Sketch

| Item | 18 months |
|---|---|
| PI effort (0.20 FTE) | $36,000 |
| Research engineer (open-source toolkit, 0.50 FTE) | $60,000 |
| Research coordinator (validation study, 0.50 FTE) | $45,000 |
| Participant compensation (n=200 at $40 per session, two sessions) | $16,000 |
| Compute and platform infrastructure | $12,000 |
| Dissemination (conference travel, open-access publication fees) | $10,000 |
| Indirect (10%) | $17,900 |
| **Total** | **~$196,900** |

A smaller $75,000-$100,000 ask covering only Aim 1 and Aim 2 (validation + open-source toolkit, no controlled study) is also fundable under Mozilla's direct grants track. The controlled study (Aim 3) requires the full budget or a concurrent academic partnership with IRB infrastructure.

---

## Framing Notes

**Lead with what the platform knows about you vs. what you actually are.** This is the Mozilla audience's frame: privacy, surveillance, the model the company built. CGM is the auditing instrument for that. The opening hook for Mozilla is not music, it is autonomy: "Your Spotify Wrapped tells you who it thinks you are. The CGM measures the gap between that and who you actually are."

**The KL divergence formula can appear in the proposal.** Unlike Knight or NIMH, Mozilla's program officers are technically literate. Don't hide the measurement methodology. Show it briefly. That is what distinguishes a serious research tool from a thought experiment.

**Open source is not optional.** Mozilla will want the toolkit released on an open license with documentation. Frame this as a deliverable, not a nice-to-have. The MOSS (Mozilla Open Source Support) secondary grant track is specifically for open-source tooling and could fund Aim 2 independently even if the main MTF application is not accepted.

**Cite Mozilla-adjacent work.** Zeynep Tufekci's work on algorithmic accountability, Filter Bubble (Pariser), and the Algorithmic Justice League (Buolamwini) are all in the Mozilla intellectual neighborhood. Reference them in the proposal narrative.

**Do not over-claim on the therapeutic intervention.** Mozilla funds research and tools, not clinical outcomes. Aim 3 is framed as "first controlled test of whether a counter-environment reduces CGM scores," not "WAXFEED cures algorithmic addiction." The scientific humility reads better in this funding context.

**The WAXFEED product story.** Mozilla responds to counter-environments that are built, not just theorized. Frame WAXFEED's design as concrete and deployable, with the grant funding the first formal user study. Do not claim a live user base that does not yet exist. The credibility comes from the design specificity and the CGM measurement framework, not from user numbers at this stage.

---

## Secondary Track: Mozilla Open Source Support (MOSS)

If the main Mozilla Technology Fund application timing doesn't align, MOSS is a parallel path for Aim 2 specifically:

- **Track:** MOSS Track 1 (Foundational Technology)
- **Amount:** Up to $250,000 per project
- **Requirements:** Open-source project, clear public benefit, application through online portal
- **Fit:** The CGM open-source toolkit is a clean MOSS project: a research instrument built as a public good, released under an open license, with documentation enabling replication

MOSS and MTF are not mutually exclusive. A MOSS award for the toolkit and an MTF award for the validation study would cover the full program without budget overlap.

---

## Pre-Application Checklist

- [ ] Confirm current Mozilla Technology Fund open call dates (check foundation.mozilla.org/en/what-we-fund/awards)
- [ ] Identify specific MTF program officer for Responsible AI track
- [ ] Register Polarity Lab as an organization eligible for Mozilla Foundation direct grants (501(c)(3) or equivalent may be required; check current requirements)
- [ ] Determine whether WAXFEED domain lead (Shadrack Annor) will be named as co-PI or project lead
- [ ] Draft the 350-word project summary and circulate to advisor before LOI submission
- [ ] Check whether existing WAXFEED codebase can be structured as an open-source project release concurrent with the toolkit (this strengthens the open-web framing)
- [ ] Identify a music cognition or information systems academic collaborator for Aim 1 validity (Brown, RISD, or MIT are the priority contacts)

---

## Timeline

| Milestone | Target |
|---|---|
| Mozilla Technology Fund call opens | Monitor; typically spring and fall cycles |
| Internal draft application ready | Month +2 |
| Submit application | Next available cycle after Month +2 |
| Grant decision | Typically 3-4 months after submission |
| Project start (if funded) | Month +6 to +8 |

---

*Internal outline — April 2026. Not for external distribution. Key pre-application task: confirm Mozilla grant eligibility for independent research organizations.*
