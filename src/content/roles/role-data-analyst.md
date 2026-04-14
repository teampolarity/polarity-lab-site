---
title: "Data Analyst"
type: "lab-level"
---

*Read alongside onboarding.md and the research program documentation for your assigned project.*

---

## What You're Here For

The instruments are only as good as the data they produce and the analysis that interprets it. IΔ generates activation data from intermediate model layers. WAXFEED generates behavioral listening data. GPS generates proximity and movement data. Each of these data types requires someone who can clean it, structure it, analyze it, and produce outputs the research can actually use.

This is not a dashboards and metrics role. The lab is not optimizing KPIs. The data you're working with is the evidence base for the lab's core claims — that designed environments suppress capacity and that counter-environments can prove the return. If the analysis is sloppy, the claim is sloppy. The instrument fails. The methodology loses credibility.

The standard is: the analysis should be reproducible, honest about its limitations, and structured so that another researcher could take the data and reach the same conclusions.

---

## What You Do

Your work is organized by project. Each project generates different data types with different analysis requirements.

**If you're on IΔ:** You're working with activation data — intermediate layer representations from clinical AI models across a set of diagnostic cases. The analysis identifies where in the model's processing chain the correct clinical signal exists, where it's suppressed, and produces a signed gap score for each case. This requires familiarity with mechanistic interpretability methods: logit-lens analysis, activation patching, residual stream analysis. The pilot produced five cases. The validation study will produce hundreds. You're building the pipeline that handles scale.

**If you're on WAXFEED:** You're working with behavioral listening data — what users play, how long, what they skip, how their behavior changes over time as the platform surfaces less predicted and more authentic taste responses. The analysis has to distinguish genuine preference signals from habituated engagement, novelty effects, and platform-induced behavior. This is harder than it sounds. Work closely with the domain lead on what a "real" preference signal looks like in the data versus what looks like one but isn't.

**If you're on GPS:** You're working with proximity and movement data — what locations people visit, in what sequence, how that maps against the domain lead's working model of what a city's culture actually looks like versus what discovery infrastructure makes visible. The analysis works toward producing the gap score between predicted and actual cultural density, once the instrument definition is locked by the domain lead.

Across all projects: you clean the data before anyone else touches it. You document what you did and why. You flag anomalies rather than smoothing them over. You produce outputs in formats the domain lead and researcher can use without having to re-derive your work.

---

## What Stays With Researchers and Domain Leads

Methodology — what the instruments measure, how the gap is defined, what constitutes a valid result — belongs to the domain lead and the founder. You implement the methodology. You don't redefine it.

Interpretation of findings belongs to the research team. You produce the analysis. You don't write the conclusion. If the data suggests something unexpected, you flag it and bring it to the domain lead. The interpretation is theirs.

Publication decisions — what gets published, when, in what form — are not yours to make. You produce the analysis that supports those decisions.

---

## How You Get Paid

Data analysis is a project-level contributing collaborator role. Your tier and weight within the time collaborator pool are agreed at project start and documented in the project agreement. Most data contributors come in as contributing collaborators (0.6x) or core collaborators (1.0x) depending on how central the analysis work is to the project's current phase.

Distributions don't begin until the project hits its runway threshold. The full mechanics are in polarity-fund-model.md.

If you're working across multiple projects, you have a separate agreement for each.

---

## Ownership and Governance

Polarity Lab LLC is Theodore's. You are a collaborator, not an owner. You have no governance rights over the lab's research agenda or findings.

Analysis pipelines, codebases, and data processing tools you build for the lab belong to the lab.

If anything here doesn't match your understanding of your role, that conversation happens with the founder before work continues.

---

## What to Work On Right Now

**IΔ validation study data pipeline.** The pilot produced five cases. The validation study needs a pipeline that can process hundreds. Define the data architecture: how cases are ingested, how activations are extracted, how gap scores are calculated, how results are stored for analysis and audit. This is the most time-sensitive data work in the lab.

**Pilot data analysis documentation.** The pilot's five cases generated data. That data should be fully documented — every analytical decision recorded, every step reproducible, the findings structured in a form that can be referenced in the paper and shown to prospective buyers. If the documentation doesn't exist yet, create it.

**WAXFEED behavioral data schema.** Before the platform generates behavioral data at any scale, define what that data looks like: what gets recorded, at what granularity, how it's stored, what a "session" means for analysis purposes. Building the schema before the data exists is faster and cheaper than rebuilding it after.

---

*The data is what makes the instrument real. A finding without reproducible analysis behind it is not a finding. Build with that standard from the start.*
