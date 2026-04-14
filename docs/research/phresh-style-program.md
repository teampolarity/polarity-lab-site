# Phresh — Research Program

**Executive Director:** Theodore Addo, Polarity Lab
**Domain Lead:** [Director of Strategy and Partnerships] — active when available
**Location:** Providence, RI
**Document Version:** April 2026
**Status:** Pre-development placeholder — thesis established, instrument definition and validation study pending domain lead availability

---

## The Question

What has algorithmic fashion recommendation suppressed in your style identity, and what does the return of authentic taste look like when the environment is designed to model you rather than sell to you?

The second half is the research question. The first half has already been answered in the product. Phresh maps a person's authentic style across 33 dimensions — color, silhouette, texture, formality, edge — without questionnaires, without categories, without asking the person to name what they like. The StyleDNA profile is the instrument for measuring authentic preference. Every item it scores is being scored against that. The gap between what conventional retail algorithms surface and what actually matches is already implicit in the system. The research program makes it explicit, measures it, and asks whether closing that gap has effects beyond finding better clothes.

---

## Institutional Context

Polarity Lab's thesis is that designed environments have a second threshold. Below it, the environment extends the capacity it was built to serve. Beyond it, the optimization for the environment's own metrics begins to suppress the capacity it was built to develop.

Fashion recommendation crossed this threshold when platforms began optimizing for conversion and engagement rather than taste alignment. The algorithm surfaces what sells. Trend cycles are driven by what platforms can promote. Sponsored placement determines visibility. The person browsing five apps is not discovering their style — they are being trained toward what the system can efficiently surface and monetize.

The result is not just a bad shopping experience. For people who care about how they dress as an expression of identity, the cumulative effect is a wardrobe full of things that don't feel like them. They stop trusting their own taste because every system they use to find things is optimizing for something other than their taste. The authentic style identity doesn't disappear — it gets suppressed by an environment designed against it.

This is the same mechanism the lab documents in every domain. WAXFEED measures it in music. Phresh measures it in fashion. The suppression thesis is the same. The counter-environment design principle is the same. The instrument is domain-specific.

---

## The Style Authenticity Measure

The **Style Authenticity Measure (SAM)** is the diagnostic instrument for this program. It captures the signed gap between what conventional fashion recommendation environments surface and what a person's authentic style profile actually reflects.

A positive SAM means the conventional environment has been suppressing something. A high SAM over time means the person's expressed style has drifted from their authentic preferences — they have been trained toward what the algorithm surfaces rather than what they actually like.

Cosmos's Cognitive Return Measure and WAXFEED's Cognitive Gap Measure follow the same structure. The SAM is the fashion-domain instance of the same core measurement logic.

At minimum, the SAM needs to define:

- **Authentic style preference**: what StyleDNA captures through the image selection process, independent of price, availability, or promotion
- **Algorithmic surface**: what conventional recommendation environments (retailer feeds, platform algorithms, sponsored content) present as relevant to the person
- **The gap**: how far conventional surface diverges from authentic preference, measured across the 33 style dimensions
- **Drift over time**: whether repeated exposure to conventional environments shifts the person's expressed preferences toward algorithm-friendly categories and away from their initial StyleDNA profile — the suppression effect in real time

---

## What Phresh Already Has

Unlike other Polarity projects that need to build a counter-environment to run the study, Phresh is already a running product. That is a structural advantage.

What exists:
- A working StyleDNA profiling system that maps authentic preference across 33 dimensions without questionnaires
- A multi-marketplace aggregation layer (Depop, Grailed, ASOS, StockX, Poshmark)
- A match scoring system (Fashion Polarity Points, 0-100) that ranks items against StyleDNA
- Price-agnostic scoring that treats a $28 thrift find and a $320 designer piece equivalently — the system is already designed against the promotional hierarchy that conventional algorithms enforce

What the research program adds:
- Formal definition and validation of the SAM
- Baseline measurement before Phresh onboarding to capture the starting gap
- Longitudinal tracking to measure whether Phresh closes the gap and whether drift reverses
- A research question with a falsifiable answer: does a counter-environment designed to model authentic style preference reduce the SAM, and does that reduction persist?

---

## Relationship to WAXFEED

Phresh and WAXFEED are the closest sibling projects in the lab. Both are consumer-facing counter-environments in taste domains. Both measure the gap between algorithmic suppression and authentic preference. Both have the same second threshold story applied to different sensory and identity registers.

The instruments are structurally parallel (SAM and CGM), which creates an opportunity: a person who shows high suppression in both domains is a stronger argument for the lab's general thesis than either domain alone. The lab's underlying claim is not that music algorithms suppress taste or fashion algorithms suppress style — it is that designed environments suppress the authentic self when they optimize for their own metrics. Having two instruments in two domains running simultaneously is the strongest version of that claim.

The domain leads should coordinate on instrument design. The SAM and CGM should be parallel enough that cross-domain analysis is possible.

---

## What This Needs Before It Becomes a Full Program

The domain lead has other responsibilities and is taking his time getting here. That is the right call. What should be ready when he is:

1. **Lock the SAM definition.** The four operational parameters above need to be defined before any validation study can begin. This is a few days of work, not months. It can happen as soon as there is bandwidth.

2. **Baseline measurement protocol.** The research program requires measuring the gap before Phresh onboarding. That means capturing what the person's conventional algorithm surfaces (a structured audit of their existing recommendation environment) before running the StyleDNA process. The protocol needs to be designed.

3. **Instrument layer in the product.** The current Phresh implementation scores items against StyleDNA but doesn't yet generate the longitudinal data the research program requires. A lightweight instrument layer — tracking how the gap changes over time, flagging when expressed preference starts to drift — needs to be scoped and built.

4. **IRB pathway.** If the program generates longitudinal behavioral data and makes claims about psychological effects, it needs IRB coverage. The Brown University relationship the lab is building for Cosmos is the natural starting point.

5. **The case for the SAM as a complement to the CGM.** A short document making the cross-domain argument explicit — two instruments, two domains, one thesis — would be useful for the research affiliate conversations and for any funder who sees the lab's work as a whole.

---

## Computer Vision as a Cross-Lab Methodological Thread

The StyleDNA process is already doing something methodologically significant: inferring authentic preference from image response rather than asking people to describe what they like. That distinction matters beyond Phresh.

Self-report is the weak link in every instrument the lab builds. When you ask someone what they authentically prefer, you get a mix of actual preference, social desirability, category habit, and whatever the algorithm has already trained them to expect. The StyleDNA approach sidesteps this by deriving preference from behavioral response to images -- what you're drawn to before you have time to rationalize it -- which is closer to revealed preference than anything a questionnaire can capture.

If that inference engine is built on or extended with computer vision, it becomes a general-purpose visual preference modeling system with applications across the lab:

- **AVDP**: The Format Effectiveness Measure currently relies heavily on self-report to distinguish authentic expression from format-suppressed output. Computer vision analysis of the footage itself -- detecting micro-expressions, body language, eye contact patterns, spontaneous vs. composed behavior -- could provide a behavioral signal that doesn't depend on the subject's ability to articulate what they felt. That would significantly strengthen the FEM's validity.

- **SAM validation**: The Style Authenticity Measure needs to distinguish authentic style preference from algorithm-trained drift. Computer vision applied to a person's existing wardrobe, purchase history, or saved items could provide an objective baseline for what the algorithm has already shaped -- separate from what StyleDNA captures as the authentic signal.

- **Revealed preference as a general method**: If the lab can demonstrate that image-response-derived preference is more predictive of authentic behavior than stated preference across two or more domains, that is itself a methodological contribution worth publishing. It would strengthen every instrument in the lab and position Polarity as advancing preference measurement methodology, not just building counter-environments.

The computer vision thread doesn't need to be developed now. It needs to be held as the Phresh instrument layer is designed so the architecture doesn't foreclose it. The domain lead and the Technical Director should discuss this before the instrument layer is scoped.

---

## Positioning Note

The current phresh.fit site reads as a shopping tool. "The first ever digital personal stylist." That framing is fine for user acquisition. It is not the framing the research program or the institutional conversations use.

For research and partnership purposes: Phresh is a counter-environment designed to surface authentic style identity that conventional fashion recommendation systems have suppressed. The Fashion Polarity Points system is a proto-instrument measuring the gap between algorithmic surface and authentic preference. The research program measures whether restoring that alignment has effects on style confidence, identity expression, and purchasing behavior that go beyond finding better clothes.

The product framing and the research framing can coexist. They address different audiences. The domain lead should decide when and where to make the research framing public.

---

*This document was prepared by the Polarity Lab research team, April 2026. Pre-development placeholder — thesis and instrument structure established, pending domain lead availability. For internal use only until the domain lead is ready to move.*
