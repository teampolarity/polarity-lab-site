# IΔ — First Proof Contract
*Operational doc. How to close the first institutional assessment. Read alongside integrity-delta-program.md and monetization.md.*

---

## What We Are Selling

One IΔ assessment. A clinical AI vendor, hospital system, or compliance function pays the lab to measure the Integrity Delta in their deployed system — the signed gap between what the model's intermediate representations indicate and what its final output states. The deliverable is a scored, validated before-and-after that they can show to their board, their regulators, or their accreditation body.

This is not a research paper they're funding. It is a paid service: the lab enters their environment, runs the instrument, produces a credible assessment, and delivers a result they can use. The research is what makes the instrument credible. The credibility is what they're buying.

**Why they buy it now:**

The FDA is actively expanding oversight of clinical AI decision support. DSA mandates independent audits of large platforms. Neither regulatory body has a measurement standard for clinical AI honesty. The buyers are already asking "how do we demonstrate our system is honest about what it knows" and finding no answer. The IΔ is the answer. The market exists. The lab just has to be findable.

---

## The Deliverable

A completed IΔ assessment consists of:

1. **Baseline case set** — a defined set of clinical cases across relevant diagnostic categories, designed to create the conditions under which sycophantic suppression occurs
2. **Layer-level measurement** — activation analysis across the model's intermediate representations, identifying where the correct clinical signal exists and where it is suppressed
3. **Integrity Delta score** — the signed gap for each case, aggregated into a project score with confidence interval
4. **Suppression profile** — characterization of which diagnostic categories, model parameter ranges, and adversarial pressure conditions produce the highest gap
5. **Assessment report** — a document structured for presentation to boards, regulators, and compliance functions

The pilot (n=5, Llama 3.1 8B) produced all five of these components at small scale. The first proof contract runs the same protocol at clinical scale — the validation study and the first paid assessment are the same work.

---

## Pricing

Three tiers based on scope:

| Scope | What it covers | Price range |
|---|---|---|
| Pilot assessment | Single model, 20-50 cases, suppression profile | $25,000 - $50,000 |
| Standard assessment | Single model, 100-200 cases, full suppression profile, regulatory-ready report | $50,000 - $100,000 |
| Comprehensive assessment | Multiple models or model versions, 200+ cases, comparative analysis, annual monitoring option | $100,000 - $150,000 |

**Annual monitoring:** Once a baseline assessment is complete, the buyer can contract for annual re-assessment as their model is updated. Recurring revenue. Price at 40-60% of the original assessment fee.

**First contract pricing:** Price the first contract at the low end of the standard tier ($50,000-$75,000). The goal is to close a signed agreement with a credible institutional buyer, generate the case study, and build the citation trail. Margin optimization comes later.

---

## Target Buyers

**Tier 1: Clinical AI vendors (highest urgency, most accessible)**

These companies need to demonstrate their products are honest before hospital systems will deploy them and before regulators will clear them. They have the most direct incentive to pay for an IΔ assessment.

Priority targets:
- **Nuance (Microsoft)** — DAX Copilot and ambient clinical documentation. Massive deployment, active FDA conversations. The gap between what their models derive and what they output in clinical settings is exactly what IΔ measures.
- **Nabla** — clinical AI assistant with significant European exposure. DSA-adjacent regulatory pressure creates direct demand for third-party assessment.
- **Abridge** — AI medical documentation, strong hospital system partnerships. A credibility tool that shows Abridge deployments maintain clinical reasoning integrity would differentiate them.
- **Suki** — AI voice assistant for clinical documentation. Similar profile to Abridge.
- **Cohere Health** — prior authorization AI. The sycophancy risk here is acute: a model trained to streamline approvals has a direct incentive to agree with payer positions over clinical positions.

**Tier 2: Hospital systems with active AI deployments**

Hospital systems face two pressures: demonstrating due diligence in AI deployment to their boards and accreditation bodies, and managing liability from clinical AI error. An IΔ assessment creates an auditable record that they measured this class of risk.

Priority targets:
- Systems that have publicly announced AI deployments in clinical decision support
- Academic medical centers — they have research infrastructure that makes the lab's methodology legible
- Systems under active FDA scrutiny for clinical AI deployments

**Tier 3: Compliance and audit functions**

As the IΔ methodology is validated and published, audit firms, compliance consultancies, and FDA-facing advisory firms become buyers. They license the methodology to conduct their own assessments. This is Channel 3 from the monetization model — standard licensing — and it is downstream of the first proof contract, not the starting point.

---

## Who Owns What

**IΔ domain lead:** Knows the buyer landscape -- who the right targets are, what problem they need to have before IΔ is relevant, what makes a real buyer versus a curious one. Owns the research substance in every conversation. Defines what a qualified prospect looks like and writes it down for the Director of Strategy.

**Director of Strategy:** Runs the approach process -- identifies warm introduction paths, makes first contact, qualifies prospects, manages the relationship. Briefs the founder when a prospect is ready for something substantive. Does not need to be a clinical AI expert; needs to be able to describe the mechanism and the finding clearly enough to get the right person on the phone.

**Founder:** In the room when there is something real to close. Not running outreach.

---

## The Approach

**Don't cold pitch. Get to the right person through the right door.**

The Director of Strategy owns this. Clinical AI vendors don't make assessment purchasing decisions at the marketing level. The buyer is the Chief Medical Officer, Chief Safety Officer, VP of Regulatory Affairs, or equivalent. These people are reachable through:

- Medical conference networks (HIMSS, AMIA, AMA annual -- the CMO track)
- Regulatory advisory networks (FDA Digital Health Center of Excellence, ONC)
- Academic medical center research affiliations -- a co-investigator at a medical school with clinical AI vendor relationships is a warm introduction
- Published research -- the IΔ paper, once out, makes the lab findable to the exact people who are already looking for this instrument

**The pilot is the door-opener, not the ask.**

Lead with the finding, not the product. "Our pilot showed that Llama 3.1 8B correctly identified pathology at the layer level in 100% of cases but suppressed that finding in final output under adversarial conditions. Here is the mechanism. Here is what we measured. Here is what it means for your deployed system." That's a conversation any CMO or regulatory affairs lead will have. The IΔ domain lead provides this framing to the Director of Strategy before any first meeting. The assessment comes after the conversation establishes that the problem is real and the instrument is credible.

**The first conversation is a research conversation, not a sales conversation.**

The lab is not pitching a service. It is describing a finding and asking whether the institutional buyer has seen the same behavior in their deployed systems. Most of them have and haven't been able to name it. The moment the IΔ mechanism lands as a description of something they've actually observed, the buyer becomes a collaborator. The assessment agreement follows from that.

---

## What Needs to Be True to Close the First Contract

In order of dependency:

1. **The validation study protocol is defined.** The first contract is the validation study. The buyer needs to understand what they're getting — how many cases, which models, what the output looks like, how long it takes. This exists in draft form in the research program doc. It needs to be tightened into a one-page scope document that can be shared in a conversation.

2. **The assessment report template exists.** The buyer needs to see what a completed IΔ assessment looks like before they sign. Build a sample report from the pilot data — redacted, clearly labeled as a pilot result, structured the way a full assessment report would be. This is the single most important sales artifact.

3. **The pricing and agreement structure is ready.** A clean scope-of-work template, a revenue participation agreement for any financial believer element, and the pricing table above. Legal review needed before any agreements are signed.

4. **At least one warm institutional introduction exists.** Cold outreach to clinical AI vendors at the CMO level has a low hit rate. The Director of Strategy needs one warm introduction -- a mutual contact, a research affiliation, a conference conversation that establishes credibility first. The IΔ domain lead's research network and the academic affiliation in progress are both paths to this. Director of Strategy should be actively mapping warm introduction routes before any cold outreach is attempted.

5. **The paper is in progress.** A vendor paying $50,000 for an assessment from a lab with a published methodology is a different decision than paying $50,000 for an assessment from a lab with a pilot and a slide deck. The paper doesn't need to be published before the first contract, but it needs to be in active progress and discussable. The validation study produces the data the paper needs. The sequence can overlap.

---

## The Case Study

The first proof contract produces the lab's most important asset: a named institutional buyer, a validated assessment, and a publishable result.

The case study structure:
- Buyer (named, with permission, or anonymized if required)
- What was assessed and at what scale
- What the IΔ measurement found
- What the buyer did with the finding
- What the result means for the lab's instrument and for the field

This case study is what changes the nature of every subsequent conversation. It's in the 1517 pitch. It's in the NIH and Wellcome Trust grant applications. It's the credibility that makes the next institutional buyer say yes faster. The first contract is expensive to close. Every one after it is cheaper.

---

## Timeline

Realistic path to first signed contract:

| Milestone | Target |
|---|---|
| Assessment scope document finalized | 2 weeks |
| Sample report built from pilot data | 2 weeks |
| Legal review of scope-of-work and agreement template | 4 weeks |
| First warm institutional introduction made | Ongoing, Nathan's work |
| First substantive conversation with a Tier 1 target | 6-8 weeks |
| First signed contract | 3-6 months from first conversation |

The timeline depends heavily on getting the first warm introduction right. A cold approach adds 2-3 months. A co-investigator or advisory board member with a direct relationship to a Tier 1 target cuts that to weeks.

---

*The first proof contract is not a sales milestone. It is the event that transforms the lab from an institution describing a methodology into an institution that has performed it for a paying institutional buyer. Everything before it is preparation. Everything after it is compounding.*
