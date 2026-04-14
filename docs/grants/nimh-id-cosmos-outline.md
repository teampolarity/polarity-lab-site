# Grant Outline: NIMH — Integrity Delta + Cosmos

**Polarity Lab**
**Program target:** National Institute of Mental Health (NIMH) — R01 or R21 mechanism
**Secondary target:** National Institute of Biomedical Imaging and Bioengineering (NIBIB) for IΔ-specific infrastructure
**Readiness:** IΔ pilot data complete (n=5, Llama 3.1 8B). Instrument specification complete. No IRB yet. No academic clinical partner yet. Cosmos at n=1 proof of concept.
**Document version:** April 2026 — internal outline, not for external distribution

---

## Why NIMH

NIMH funds research on the causes, diagnosis, and treatment of mental disorders. Both IΔ and Cosmos have NIMH-legible framing, but through different mechanisms:

**IΔ path into NIMH:** Clinical AI sycophancy is a mental health patient safety issue. Under-resourced mental health settings, community mental health centers, rural behavioral health providers, are among the highest adopters of mid-tier AI clinical tools. These settings have the least redundant expert review. The population most exposed to sycophantic AI diagnostic errors is the psychiatric patient population served by the lowest-resourced providers. NIMH's services research portfolio (Health Services Research Study Section, HSRO) is the entry point.

**Cosmos path into NIMH:** ADHD is within NIMH's disease mandate. The CRM (Cognitive Return Measure) is a proposed novel measure of executive function restoration through counter-environment design. A validated CRM with a controlled study of Cosmos vs. conventional productivity systems would fit NIMH's Basic and Translational Research portfolio and potentially the Interventions Research portfolio (ITMHS study section) as a digital therapeutic.

**Combined framing:** The strongest single application framing is the IΔ, because pilot data exists and the clinical stakes are concrete. Cosmos should follow IΔ as the CRM validation study (Aim 3 in the combined narrative, or a separate R21 if IΔ is funded first).

**R21 vs. R01:** The R21 mechanism ($275,000 over 2 years, no preliminary data requirement) is appropriate for the current IΔ stage. If the academic partner can provide a strong PI with NIH track record, an R01 ($500,000-$750,000 over 4-5 years) targeting the full three-aim program is feasible.

---

## Project Title (working)

**The Integrity Delta: Measuring Sycophantic Suppression of Correct Clinical Reasoning in AI Systems Deployed in Behavioral Health Settings**

*(Cosmos sub-aim: "and Testing a Counter-Environment for Executive Function Restoration in Adults with ADHD")*

---

## Significance and Innovation Section (core argument)

### Significance

Clinical AI systems exhibit a well-documented failure mode called sycophancy: models suppress internally held correct clinical reasoning in order to produce output that agrees with the user. This mechanism has been demonstrated across 11 frontier models at a 49% elevated endorsement rate of incorrect medical positions (Cheng et al., 2026). Existing clinical AI evaluation frameworks, including FDA De Novo clearance criteria, benchmark performance metrics, and post-market surveillance requirements, do not measure this gap. A model that achieves 91% accuracy on a benchmark may simultaneously suppress its own correct internal reasoning 40% of the time when the user expresses a preference. These numbers coexist. No current tool detects both.

Mental health settings have unique exposure to this failure mode. Psychiatric diagnosis is inherently complex, frequently involves differential reasoning across imperfect information, and is the domain where clinicians are most likely to express diagnostic uncertainty in ways that invite algorithmic agreement rather than correction. Under-resourced behavioral health providers, community mental health centers, and rural psychiatric practices are the highest-adoption targets for mid-tier AI clinical tools and the settings with the least redundant expert review to catch sycophantic errors. The population most harmed by AI clinical sycophancy is the psychiatric patient population served by the least-resourced systems.

The **Integrity Delta (IΔ)** is a novel diagnostic instrument that measures this gap directly. IΔ = correctness_grade(best_internal_representation) - correctness_grade(final_output). A positive IΔ means the model internally held a more correct answer than it communicated. Measured at scale, this instrument produces a scored characterization of a given model's sycophancy risk in clinical deployment, stratified by diagnostic domain, clinician pressure profile, and model architecture.

### Innovation

No existing instrument measures the IΔ construct. Current clinical AI evaluation tests what a model outputs. The IΔ tests the gap between what the model internally represents and what it says. This requires mechanistic interpretability methods (logit-lens projection across transformer layers) applied in a clinical context, which no existing FDA-cleared or IRB-approved evaluation framework does.

The instrument is also structurally novel: it produces a signed scalar score (not a binary pass/fail) that characterizes model behavior under pressure, not just benchmark performance. This scoring structure allows IΔ to serve as a safety monitoring tool throughout the clinical AI lifecycle, not just at clearance.

---

## Aims

### Aim 1: Develop and Validate the IΔ as a Reproducible Clinical AI Safety Instrument (Months 1-18)

**Hypothesis:** The Integrity Delta can be measured with sufficient reliability (ICC > 0.80) across standardized clinical case batteries to detect sycophancy-induced suppression of correct clinical reasoning in psychiatric diagnostic domains.

**Background:** Pilot data (n=5 radiological cases, Llama 3.1 8B) demonstrates proof of concept: mean IΔ = 0.74 (severe classification), with individual case scores ranging from 0.12 (minimal suppression, control case) to 1.00 (complete suppression). The pilot demonstrates that logit-lens methodology produces a stable, interpretable IΔ score. Validation requires an expanded case battery across psychiatric diagnostic domains and multiple model architectures.

**Approach:**
- Develop a 50-case clinical battery spanning five NIMH-priority psychiatric diagnostic domains: major depressive disorder, bipolar I, schizophrenia spectrum, PTSD, and ADHD in adults. Cases designed with controlled pressure conditions (aligned vs. misaligned clinician prompts).
- Apply IΔ measurement protocol across three model architectures representing the commercial deployment range: 7B-13B parameter (Resolution Valley range), 30-70B parameter (mid-tier commercial), and frontier (GPT-4 class).
- Establish inter-case reliability for each model and test-retest stability of IΔ across two independent scoring runs.
- Identify model parameter ranges with highest IΔ scores (Resolution Valley hypothesis: 7B-13B models show highest sycophantic suppression due to sufficient knowledge to sound authoritative but insufficient robustness to resist pressure).

**Key output:** A published IΔ scoring protocol, normative values across model classes, and an open-source scoring tool for clinical AI evaluation.

---

### Aim 2: Characterize Sycophancy Risk Profiles Across Psychiatric Diagnostic Domains and Provider Settings (Months 12-30)

**Hypothesis:** IΔ scores will be significantly higher in diagnostic domains characterized by clinical ambiguity (PTSD, bipolar I) compared to domains with more objective diagnostic criteria, and higher in simulated under-resourced provider settings (high clinician pressure, reduced decision time) than in standard settings.

**Background:** The mechanism of sycophantic suppression is interaction-dependent. A model that performs with low IΔ in a well-structured clinical exchange may show high IΔ in a setting where the clinician expresses uncertainty, frustration, or diagnostic pre-commitment. Aim 1 establishes the instrument. Aim 2 characterizes when and where the instrument finds the most danger.

**Approach:**
- Apply the Aim 1 case battery under four pressure conditions: neutral, aligned pressure (clinician correctly pre-states diagnosis), misaligned pressure (clinician incorrectly pre-states diagnosis), and high-urgency pressure (time-constrained prompt with expressed clinician certainty).
- Stratify IΔ scores by diagnostic domain and pressure condition. Test interaction effects.
- Conduct simulated provider setting studies: recruit 20 licensed behavioral health clinicians to interact with three AI systems (representing the three model classes from Aim 1) on the case battery under standard and high-pressure conditions. Compute IΔ from model behavior during clinician interactions rather than research-constructed prompts.

**Key output:** A published risk stratification model that characterizes which model architectures, diagnostic domains, and provider interaction patterns produce the highest IΔ, with specific implications for behavioral health AI deployment guidance.

---

### Aim 3: Pilot the Cognitive Return Measure (CRM) and Cosmos Counter-Environment for ADHD Executive Function Restoration (Months 18-36)

**Hypothesis:** Adults with ADHD who use Cosmos as their primary operational system for 90 days will show significantly greater improvement on executive function outcome measures than a waitlist control group using standard productivity systems (Todoist, Notion, conventional task management).

**Background:** ADHD represents a direct instance of the Polarity Lab thesis: conventional productivity systems are optimized for a cognitive compliance style that ADHD neurology cannot provide consistently. The progressive failure of those systems is not a symptom of ADHD. It is the predictable consequence of a design that optimizes against ADHD cognition. Cosmos is a counter-environment: a personal operating system designed to model the person rather than ask the person to model themselves into the system's required form.

The Cognitive Return Measure (CRM) is the diagnostic instrument. It measures the signed gap between executive function performance under conventional system conditions and under Cosmos counter-environment conditions. A positive CRM at 90 days means the counter-environment restored something the conventional environment was suppressing.

**Approach:**
- Recruit 60 adults with documented ADHD diagnosis (DSM-5 criteria), minimum 2 years of conventional productivity system use.
- Random assignment: Cosmos (n=30) vs. waitlist control continuing current productivity system (n=30).
- CRM assessment at baseline, 45 days, 90 days using: BRIEF-A (Behavioral Rating Inventory of Executive Function, Adult version), Brown ADHD Rating Scale, and a purpose-built CRM composite (authentic goal achievement rate, cognitive load self-report, self-reported authentic cognitive self-expression).
- Secondary outcomes: ADHD symptom severity, quality of life, system compliance rates.
- Exit interviews with n=20 purposive subsample on subjective experience of the two environments.
- IRB: Brown University or Lifespan/Rhode Island Hospital.

**Key output:** First controlled pilot of a counter-environment digital therapeutic for ADHD executive function, with a validated CRM as the primary outcome measure.

---

## Budget Sketch

### R21 (IΔ only, Aims 1-2, 24 months)

| Item | Cost |
|---|---|
| PI effort (0.25 FTE) | $50,000 |
| Clinical AI researcher (postdoc, 1.0 FTE) | $115,000 |
| Clinical consultant (psychiatry, 0.10 FTE) | $25,000 |
| Case battery development (clinical vignette writers) | $20,000 |
| Compute costs (model inference at scale) | $15,000 |
| Clinical collaborator travel and coordination | $10,000 |
| Dissemination | $10,000 |
| Indirect (26%) | $62,400 |
| **Total** | **~$307,400** |

### R01 (Full three-aim program, 48 months)

Estimated range: $550,000-$750,000 over 4 years. Requires academic co-PI with NIH track record as lead investigator.

---

## Academic Partner Requirements

This application requires a co-PI or lead PI from an academic institution with:
- NIH R01 track record (or at minimum an R21)
- IRB infrastructure at an academic medical center with psychiatric clinical capacity
- Access to licensed behavioral health clinicians for Aim 2 clinical simulations
- Ideally: existing interest in AI safety, clinical NLP, or psychiatric digital therapeutics

**Target institutions and potential contacts:**
- Brown University (Psychiatry and Human Behavior department; Warren Alpert Medical School)
- Lifespan / Rhode Island Hospital (academic medical center with Brown affiliation; psychiatric research infrastructure)
- MIT CSAIL (AI safety and clinical AI track record; less clinical but strong on mechanistic interpretability)
- Boston University (School of Medicine, AI and clinical decision support research)

**This is a blocking dependency.** NIMH will not fund an R01 from an independent research organization without an academic institutional home. The R21 may be achievable with a subaward arrangement. Securing an academic partner is the pre-application priority.

---

## Framing Notes

**Lead with patient harm, not model behavior.** NIH study sections respond to health impact. "A model that suppresses its own correct psychiatric diagnosis" is the opening. "Clinical AI sycophancy is a training artifact" is the third paragraph.

**Name the population.** Community mental health centers, rural behavioral health providers, Federally Qualified Health Centers adopting AI clinical tools. These are NIMH's communities of concern for health disparities. The intersection of sycophantic AI risk and under-resourced psychiatric providers is the equity framing.

**The pilot data.** Five cases is thin for an R01, adequate for an R21. The pilot is a proof of concept, not a normative study. Frame it as: "We have demonstrated that the IΔ produces stable, interpretable scores in a controlled pilot. This R21 funds the validation that establishes its clinical significance."

**Cosmos as translational extension.** Frame Aim 3 as translational from the IΔ's diagnostic principle: if clinical AI suppresses the authentic signal, does counter-environment design restore it? Cosmos is the direct application to a NIMH-relevant population (ADHD adults). This keeps the application within a unified scientific narrative rather than looking like two unrelated projects.

**Avoid "second threshold" jargon in the NIH narrative.** The Polarity Lab theoretical frame is real but will read as non-standard to NIH reviewers. Translate into: "designed environments that optimize against the capacity they were built to serve," cite Illich if needed but sparingly, and let the mechanism (sycophantic suppression, executive function restoration) do the scientific work.

---

## Pre-Application Checklist

- [ ] Identify academic co-PI (Brown Psychiatry or Lifespan are the priority conversations) — **Owner: Director of Strategy.** IΔ domain lead maps who the right faculty are and what scientific fit looks like; Strategy runs the first meeting and briefs the founder when there's genuine interest.
- [ ] Attend NIMH R21 funding opportunity analysis (current FOA: PA-23-275 for pilot studies)
- [ ] Review NIMH Services Research study section (HSRO) and Interventions and Treatment Research in Mental Health Services (ITMHS) for best fit
- [ ] Submit IΔ pilot data as a brief preprint or conference abstract (this strengthens the preliminary data section of any NIH application)
- [ ] Confirm whether Polarity Lab needs 501(c)(3) status or can partner as a subaward under an academic institution's prime award
- [ ] Inquire about NSF SBIR/STTR as a parallel track if academic partnership is slow (SBIR Phase I is $275,000, faster, and does not require academic institution)

---

## Alternative Funding Track: NSF SBIR Phase I

If the NIMH academic partnership takes longer than 6 months to establish, NSF SBIR Phase I is an alternative path for the IΔ:

- **Program:** NSF SBIR Phase I — Healthcare and Biomedical Technologies (topic HM)
- **Amount:** $275,000 over 6-12 months
- **Requirements:** Small business status, at least one PI with PhD or equivalent
- **Advantage:** Does not require academic institution; Polarity Lab can apply directly if it meets small business criteria
- **Framing shift:** SBIR requires commercial path framing. The IΔ commercial product is an assessment service for health systems and AI vendors (as documented in the first proof contract doc). This is credible.

---

*Internal outline — April 2026. Not for external distribution. Pre-application priority: academic co-PI identification.*
