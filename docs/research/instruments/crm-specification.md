# Cognitive Return Measure (CRM) — Instrument Specification

**Polarity Lab | Cosmos Research Group**
**Version:** 0.1 — Pre-validation draft, n=1 proof of concept exists, validation study pending
**Domain:** Executive function and personal operating system design
**Document type:** Instrument specification — for domain lead, Technical Director, and research partner use

---

## What the CRM Measures

The Cognitive Return Measure is a signed scalar score representing the difference between two states of the same person:

- **EF_authentic**: the person's executive function capacity under the Cosmos counter-environment, where the system models the person rather than requiring the person to model themselves to the system
- **EF_suppressed**: the person's executive function capacity under conventional productivity system conditions, where system compliance demands consume the executive function resource they were supposed to extend

**CRM = EF_authentic - EF_suppressed**

A positive CRM means the conventional environment has been suppressing executive function capacity that the counter-environment can restore. The larger the score, the more the conventional system was costing. CRM = 0 means both environments produce equivalent executive function outcomes. A negative CRM would mean conventional tools produce better executive function than the counter-environment, which would falsify the design hypothesis.

The CRM is structurally similar to the FEM: both measure a between-condition effect for the same person, with the counter-environment as treatment and the conventional environment as control. The FEM measures authentic expression as the outcome. The CRM measures executive function as the outcome. The mechanism claimed by both instruments is the same: removing compliance demands that suppress the authentic signal.

The CRM is structurally different from the CGM and SAM, which measure a within-person gap between authentic capacity and what a platform has done to it, at a point in time. The CRM measures the outcome of two environments side by side.

---

## The Two Conditions

Every CRM measurement compares the same person across two conditions. For longitudinal validation studies, the two conditions are administered sequentially (conventional system baseline, then Cosmos intervention). For cross-sectional validity checks, matched participants across conditions are used as a secondary analysis only; the CRM's primary definition requires within-subject comparison.

**Cosmos condition (counter-environment):**
- Cosmos as the primary operational system for tasks, goals, knowledge management, and relationship tracking
- System behavior: learns from behavioral patterns over time rather than requiring explicit input; surfaces what the person needs rather than demanding system maintenance
- No imposed task structure, workflow linearity, or compliance streak requirements
- AI assistant with persistent session memory and pattern observations; builds a running model of the person
- Minimum 45-day use period before CRM assessment to allow the system to build an adequate behavioral model

**Conventional condition (control):**
- Current conventional productivity system (Notion, Todoist, Things, Asana, or equivalent) as primary operational system
- Standard design: explicit task input, progress logging, system-imposed structure, maintenance demand proportional to feature use
- All other life variables held constant; the condition varies only the system, not the person's goals, workload, or context

---

## Measurement Channels

The CRM is computed from three channels. All three are required for a valid composite score. They are not interchangeable: each captures a different dimension of executive function restoration, and their convergence is a validity check.

### Channel 1: Executive Function Capacity (primary)

**Instrument:** Behavior Rating Inventory of Executive Function, Adult Version (BRIEF-A) — Metacognition Index subscale.

**What it captures:** The person's rated executive function across the behavioral domains most directly affected by system design:

| BRIEF-A subscale | What it measures | Relevance to Cosmos |
|---|---|---|
| Initiate | Ability to begin tasks without external prompting | Cosmos surfaces due tasks rather than waiting for explicit initiation |
| Working Memory | Ability to hold information in mind while completing tasks | Cosmos holds context for the person; reduces working memory load |
| Plan/Organize | Ability to structure tasks and goals in sequence | Cosmos derives structure from behavior rather than requiring imposed structure |
| Organization of Materials | Ability to maintain an orderly work environment | Cosmos maintains relational connections across knowledge, tasks, and people |
| Monitor | Ability to check work quality and progress | Cosmos surfaces pattern observations and progress signals proactively |

**Scoring:** BRIEF-A items are rated by the person and, where possible, by a close observer (spouse, close colleague) on a 3-point scale (Never, Sometimes, Often). The Metacognition Index is the sum of the five subscale T-scores, normed against the adult standardization sample. Higher T-scores indicate more difficulty (lower executive function). CRM Channel 1 reflects the change in Metacognition Index T-score: a drop in T-score from conventional to Cosmos condition indicates improved executive function.

**Administration:** Self-report BRIEF-A at baseline (conventional condition) and at 30, 60, and 90 days of Cosmos use. Observer report at baseline and 90 days where feasible.

---

### Channel 2: Authentic Goal Alignment (secondary)

**What it captures:** The degree to which a person's active work in a given week reflects their own stated authentic priorities, rather than system-imposed structure or compliance maintenance.

**Rationale:** Executive function restoration that produces task completion without authentic goal alignment is not the counter-environment effect. A person completing system-maintenance tasks more efficiently is not experiencing cognitive return. Channel 2 distinguishes authentic productivity from compliance productivity.

**Measurement protocol:**

At baseline and each follow-up point, administer a two-part assessment:

1. **Authentic priority elicitation (5 minutes):** Without reference to their task system, the participant lists the three things they most want to make progress on this week. These are captured verbatim and blind-coded by two independent raters for life area, goal type, and specificity.

2. **System activity sample (48-hour window):** With consent, participant exports or screenshots the tasks they actually worked on in the 48 hours following the elicitation. Raters code each task as: authentic priority match (directly serves one of the three listed priorities), instrumental support (indirectly supports a priority), system maintenance (maintains the system itself), or other.

**Authentic Goal Alignment Score (AGA):**

```
AGA = (authentic_priority_tasks + instrumental_support_tasks) 
      / total_task_activity
```

Scored 0 to 1. A higher AGA means more of the person's actual work reflects their authentic priorities. Comparison of AGA under conventional system vs. Cosmos condition is Channel 2 of the CRM.

**Inter-rater reliability:** Two independent raters code each task sample. Cohen's kappa >= 0.70 required before AGA scores are used.

---

### Channel 3: Cognitive Self-Recognition (tertiary)

**What it captures:** Whether the person recognizes the cognitive self that emerges in the counter-environment as authentically theirs, rather than as a trained behavior or system artifact. This channel is qualitative and cannot be scored on a continuous scale, but its presence or absence is a validity condition for positive CRM interpretation.

**Rationale:** A system that improves task completion metrics while producing cognitive dissonance ("I'm more efficient but I don't recognize myself in how I'm working") is not achieving cognitive return. It may be achieving behavioral compliance with a different set of demands. Channel 3 distinguishes restoration from replacement.

**Measurement protocol:**

At 90-day follow-up, administer a structured exit interview (45-60 minutes, recorded and transcribed) with standardized probes:

1. "Describe how you experience your thinking and working in Cosmos, compared to your previous system."
2. "Does the way you work in Cosmos feel familiar to you, like something you've always been capable of but weren't accessing, or does it feel new?"
3. "Are there ways in which Cosmos has changed how you think about yourself as a worker or thinker? If so, describe them."
4. "Was there a moment during the 90 days when you recognized something about your cognitive self that felt authentic? Describe it."

**Coding:** Transcripts are coded for self-recognition (recognizes Cosmos-enabled cognition as authentically theirs vs. as new skill acquisition), restoration language (describes the experience as returning to something suppressed vs. learning something new), and valence (positive, neutral, negative). Cohen's kappa >= 0.70 required.

Channel 3 is a validity check rather than a scored component. A positive CRM interpretation requires that Channel 3 interviews show majority restoration language and authentic self-recognition in the treatment group.

---

## Scoring Formula

```
CRM_channel1 = BRIEF_Metacognition_conventional - BRIEF_Metacognition_cosmos
               (positive = improvement under Cosmos)

CRM_channel2 = AGA_cosmos - AGA_conventional
               (positive = more authentic goal alignment under Cosmos)

CRM_composite = 0.60 × CRM_channel1_normalized
              + 0.40 × CRM_channel2_normalized
```

Channel weights are provisional. Factor analysis with Aim 1 data will determine whether the two channels load on a single construct or require separate reporting.

Normalization: each channel normalized to 0-1 scale relative to the population range observed in the Aim 1 sample. Until normative data exists, report raw channel scores alongside the composite.

**CRM scale: -1 to +1**
- CRM > 0: Cosmos produced more executive function and authentic goal alignment than the conventional condition
- CRM = 0: No difference between conditions
- CRM < 0: Conventional system produced better outcomes (unexpected; requires investigation before interpretation)

Channel 3 does not enter the composite formula but is required for a valid CRM interpretation. A positive composite CRM accompanied by majority restoration language in Channel 3 interviews constitutes a full positive CRM result.

---

## Scale and Interpretation

| CRM Score | Classification | Interpretation |
|---|---|---|
| < 0.05 | Negligible effect | Counter-environment produces no measurable executive function improvement. Design hypothesis not supported for this participant. |
| 0.05 - 0.15 | Small effect | Cosmos produces marginally better executive function outcomes. Conventional system mildly suppressive. |
| 0.16 - 0.30 | Moderate effect | Cosmos produces meaningfully better outcomes. Conventional system demonstrably suppressive of executive function. |
| 0.31 - 0.50 | Large effect | Substantial executive function improvement under Cosmos. Conventional system significantly suppressive. |
| > 0.50 | Very large effect | Dramatic improvement under Cosmos. Conventional system severely suppressive of authentic executive function. |

Thresholds are provisional. Aim 1 validation data will establish empirically grounded cut-points, including whether these thresholds align with clinically meaningful change on BRIEF-A norms.

**ADHD-specific interpretation note:** BRIEF-A T-scores above 65 are clinically elevated (approximately the 92nd percentile for difficulty). A CRM large enough to move a participant from T > 65 to T < 65 on the Metacognition Index represents a shift from clinical-range to normative-range executive function. This is the threshold that matters clinically. Effect size relative to this threshold should be reported alongside the normalized CRM composite.

---

## Validity and Reliability Requirements

**Construct validity:** CRM scores should be positively correlated with ADHD symptom severity at baseline (Brown ADHD Rating Scale or Conners CAARS). Adults with more severe ADHD symptomatology, and therefore more to recover, should show larger CRM when the counter-environment works. If no correlation is found, either the CRM is not measuring what it claims or the severity-recovery relationship does not hold.

**Channel convergence:** Channels 1 and 2 should be positively correlated (r > 0.30) within condition. BRIEF Metacognition improvement should track with authentic goal alignment improvement. If they diverge significantly, the channels may be measuring different constructs and should be reported separately rather than composited.

**Sensitivity to intervention:** CRM change of >= 0.10 detectable after 90 days of Cosmos use. Below this threshold the instrument cannot distinguish counter-environment effect from normal variation in executive function over time.

**Ecological validity check:** Channel 3 restoration language rate should be significantly higher in the Cosmos condition than in exit interviews from the conventional tool condition (where available). If participants describe both conditions as equally familiar or equally foreign, Channel 3 is not discriminating between restoration and skill acquisition.

**Test-retest stability (Channel 2):** AGA scores measured two weeks apart in the same system condition should correlate at r > 0.65. Authentic goal alignment should reflect stable authentic priorities rather than week-to-week variation.

---

## Measurement Conditions

A CRM measurement is valid only when:

1. The Cosmos condition has been active for at least 45 days before CRM assessment. The system requires time to build an adequate behavioral model; CRM measured before the system is calibrated to the person does not reflect the counter-environment at full function.

2. The conventional condition baseline is measured while the person is still using their current system actively, not during a gap between systems. A person who has already abandoned their conventional system will not provide a valid conventional condition baseline.

3. BRIEF-A is administered by a qualified assessor or under standardized self-administration conditions. Remote administration is acceptable but must follow standardized protocols.

4. Channel 2 task sample is collected within 48 hours of the authentic priority elicitation. A longer gap between what the person said their priorities were and what their task activity reflects introduces temporal confounds.

5. Channel 3 interviews are conducted at or after 90 days. Exit interviews conducted earlier may not capture the full system-modeling effect.

6. Inter-rater reliability thresholds are met for Channel 2 task coding and Channel 3 interview coding before any CRM scores are reported. Sessions below threshold are excluded pending rater calibration.

---

## Relationship to the Proof of Concept

The n=1 implementation (the founder's operational system) is the training reference for what a fully calibrated Cosmos counter-environment looks like. It has not been formally scored with the CRM. Before Aim 1 begins:

- The BRIEF-A should be administered to the founder under both a Cosmos condition (current state) and a conventional tool condition (retrospective or simulated)
- Channel 2 task sampling from the current system vs. a conventional-tool period provides an authentic goal alignment comparison
- Channel 3 interview with the founder provides the anchor language for restoration coding in validation study interviews

The n=1 data is not a normative anchor but a calibration reference for what maximal CRM effect looks like in the case where the person built the system for themselves.

---

## Limitations

- The CRM requires the conventional condition to be a live baseline, not a hypothetical. Participants who have been using conventional systems inconsistently or who have already informally adopted Cosmos-like workflows may not provide a valid suppressed baseline. Selection criteria for the validation study should require active conventional system use as an inclusion criterion.

- BRIEF-A is a self-report measure subject to social desirability bias. Participants who want Cosmos to work may rate their executive function more favorably under that condition. Where possible, observer-report BRIEF-A and behavioral task performance measures should supplement self-report.

- The 90-day study window may not be sufficient to capture the full counter-environment effect. Cosmos's design depends on behavioral model accumulation over time; a person who has used it for two years may show substantially higher CRM than a person in a 90-day pilot. The validation study should plan for a 12-month follow-up subsample.

- The CRM is specific to the ADHD population in its current design. Executive function deficits in other populations (TBI, depression, aging) may benefit from counter-environment design but may require different BRIEF subscale weights and different Channel 2 operationalizations. Generalization beyond ADHD requires separate validation studies.

- The counter-environment condition currently requires building from Cosmos's existing technical implementation. The CRM cannot be applied to evaluate other personal OS products without establishing that those products meet the counter-environment design criteria (system models person; minimal compliance demand; persistent behavioral model; authentic goal surfacing). A Counter-Environment Design Criteria checklist should be developed alongside the CRM to define what qualifies as the treatment condition.

- **The CRM does not distinguish restoration from dependency creation.** A positive CRM score is consistent with two different outcomes: (1) Cosmos returning genuine executive function the person had and the conventional system suppressed -- the counter-environment effect the instrument is designed to measure; and (2) Cosmos creating a functional dependency that improves behavioral metrics while the underlying capacity to operate without the system atrophies. Both produce a positive CRM composite. The instrument cannot currently tell them apart. This is the instrument's most significant unresolved limitation and maps onto a broader open question -- under what conditions does cognitive extension develop capacity versus prevent it -- that the lab's second generation research agenda is designed to address (see `docs/research/second-generation-thesis.md`). Until instruments exist to distinguish these outcomes, CRM findings should be interpreted as evidence of functional improvement under Cosmos, not as evidence of genuine capacity restoration. The 12-month follow-up subsample is the nearest-term design choice that bears on this: if positive CRM scores attenuate or reverse after Cosmos use ends, that is evidence of dependency rather than restoration. This should be a pre-specified analysis in the validation study.

---

## Cross-Instrument Notes

The CRM is the Cosmos lab's primary instrument. Its structure is parallel to the FEM (AVDP): both are between-condition measures rather than within-person gap measures, and both require the same person under both conditions for a valid score.

The CRM differs from all other Polarity instruments in one important respect: it is also a clinical outcome measure. BRIEF-A T-scores are normed against a population, and CRM improvement that crosses clinical thresholds (moving from clinical-range to normative-range Metacognition Index) represents a clinically significant effect. This dual status, as both a research instrument and a clinical outcome measure, gives the CRM a direct path into NIMH's clinical trial infrastructure and regulatory relevance that the other instruments do not have.

The implicit-explicit cognition theme document (`docs/research/themes/implicit-explicit-cognition.md`) provides the epistemological foundation for why the CRM measures behavioral and functional outcomes rather than self-reported preference: the suppression that conventional productivity systems impose operates through compliance demands that are immediately visible, not through the implicit mechanisms that CGM and SAM address. The CRM's primary channel is therefore a validated behavioral rating scale rather than a forced-choice task.

---

*Version 0.1. n=1 proof of concept exists but no formal CRM score has been computed. Pre-Aim 1 tasks: BRIEF-A baseline collection from n=1 implementation, AGA protocol pilot, counter-environment design criteria checklist. Domain lead and academic partner review required before validation study begins.*
