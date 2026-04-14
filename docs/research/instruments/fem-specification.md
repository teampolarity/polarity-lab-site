# Format Effectiveness Measure (FEM) — Instrument Specification

**Polarity Lab | AVDP Research Group**
**Version:** 0.0 — Concept draft, instrument framework not pre-existing. Counter-format footage (Zay episode) pre-existing. FEM as a formal instrument is a concept design. Validation study pending.
**Domain:** Media format and authentic human expression
**Document type:** Instrument specification — for domain lead, academic partner, and Technical Director use

---

## What the FEM Measures

The Format Effectiveness Measure is the signed gap between what a person expresses in the AVDP counter-format environment and what that same person expresses under conventional interview format conditions.

FEM = disclosure_depth(counter-format) - disclosure_depth(conventional format)

A positive FEM means the counter-format produced more authentic expression than the conventional format. The larger the score, the more the conventional format was suppressing. FEM = 0 means both formats produce equivalent depth — no suppression effect. A negative FEM would mean the conventional format somehow produced more authentic expression than the counter-format, which would falsify the design hypothesis.

The FEM is structurally different from the CGM, SAM, and Proximity Index. Those instruments measure the gap between a person's authentic state and what their environment has made of it -- a within-person divergence measured at a point in time. The FEM measures a between-condition effect -- the same person in two different environments, with the gap produced by the environmental manipulation. The counter-format is the treatment. The conventional format is the control.

---

## The Two Conditions

Every FEM measurement requires the same subject under both conditions. Order is counterbalanced across participants to control for topic fatigue and disclosure habituation.

**Counter-format condition (AVDP):**
- Ambient live-mixed music present throughout
- No phones visible in frame or immediate environment
- Long-form temporal structure: minimum 45 minutes, no time pressure communicated to participant
- No production interruptions (no cut signals, retakes, or director intervention during recording)
- Conversational rather than interview structure: the host facilitates but does not steer toward specific disclosures
- Participants aware they are being recorded but not given specific framing about what to discuss

**Conventional format condition:**
- No ambient music
- Standard interview room; phones present but not in active use
- Time-limited: 20-30 minute explicit window
- Standard production framing: participant briefed on topics in advance, interview structure communicated
- All other environmental variables matched to counter-format (lighting, seating, camera angle) to isolate the format manipulation

Both conditions use equivalent topic prompts (drawn from the same pool, counterbalanced across conditions). Topic prompts are designed to invite authentic disclosure without specifying what to disclose.

---

## Measurement Channels

The FEM is computed from two channels. Both are required for a valid score. They are not interchangeable -- they measure different dimensions of authentic expression and their convergence is itself a validity check.

### Channel 1: Linguistic Disclosure Depth (primary)

**Instrument:** Linguistic Inquiry and Word Count (LIWC) emotional disclosure subscales + Jourard Self-Disclosure Questionnaire (adapted for post-session self-report).

**What it captures:** The depth and authenticity of verbal expression as reflected in:
- Emotional disclosure score: frequency of emotional processing and affect language in transcript (LIWC)
- Self-reference density: first-person singular language as indicator of personal ownership of disclosure (LIWC)
- Cognitive processing depth: use of insight words, causation words, discrepancy language indicating genuine reflection (LIWC)
- Disclosure breadth: number of distinct personal topic domains engaged (coded from transcript by trained raters)
- Participant self-report authenticity: post-session rating of perceived authenticity, comfort, and willingness to disclose (Jourard adapted scale, 7-point Likert)

**Scoring:** LIWC subscales produce standardized scores. Rater-coded disclosure breadth requires two independent raters (inter-rater reliability ICC ≥ 0.70 required). Participant self-report averaged across items. All subscores normalized to 0-1 scale and combined into a composite Linguistic Disclosure Score (LDS) with weights:

```
LDS = 0.30 × emotional_disclosure
    + 0.20 × self_reference
    + 0.20 × cognitive_processing
    + 0.15 × disclosure_breadth
    + 0.15 × participant_self_report
```

Weights are provisional. Aim 1 factor analysis will determine whether these subscores form a unidimensional construct or require separate treatment.

### Channel 2: Behavioral Authenticity Signal (secondary)

**What it captures:** Non-verbal behavioral indicators of authentic vs. performed expression that are independent of linguistic content. This channel is the computer vision application described in `docs/research/themes/computer-vision.md`.

**Behavioral indicators coded from video footage:**

| Signal | Coding method | What it indicates |
|---|---|---|
| Spontaneous micro-expressions | FACS AU coding (OpenFace or manual) | Involuntary affective response; genuineness of emotional engagement |
| Postural openness | MediaPipe pose estimation | Open vs. closed body posture; self-protective vs. engaged stance |
| Forward lean / engagement | Pose estimation | Physical orientation toward conversation; genuine engagement |
| Gestural fluency | Motion analysis | Spontaneous vs. restricted gesture; embodied expression |
| Disfluencies and self-corrections | Audio analysis | Spontaneous speech vs. composed delivery; genuine thinking |
| Laughter onset | Audio + video | Spontaneous vs. polite laughter; genuine affective response |
| Gaze behavior | Eye tracking or estimation | Mutual gaze as indicator of genuine engagement |

**Coding requirements:** Behavioral coding requires trained raters or validated computer vision models. For manual coding: minimum two independent raters per session, ICC ≥ 0.65 for each behavioral indicator. For automated coding: model validation against manual codes on 20% of sessions before full automated coding proceeds.

**Scoring:** Each behavioral indicator normalized to 0-1 scale. Composite Behavioral Authenticity Score (BAS):

```
BAS = 0.25 × spontaneous_microexpressions
    + 0.20 × postural_openness
    + 0.15 × gestural_fluency
    + 0.15 × disfluency_rate
    + 0.15 × spontaneous_laughter
    + 0.10 × forward_lean
```

Gaze behavior excluded from composite until estimation accuracy is validated against eye-tracking ground truth.

---

## Scoring Formula

```
FEM = (LDS_counter + BAS_counter) / 2
    - (LDS_conventional + BAS_conventional) / 2
```

Or equivalently, using the composite Authenticity Score (AS = average of LDS and BAS):

```
FEM = AS_counter - AS_conventional
```

Scale: FEM ranges from -1 to +1.
- FEM > 0: counter-format produced more authentic expression than conventional format
- FEM = 0: no format effect
- FEM < 0: conventional format produced more authentic expression (unexpected; would require investigation)

For group-level reporting (across participants), report mean FEM with 95% confidence interval and effect size (Cohen's d). The primary Aim 1 hypothesis is that the group-level mean FEM is significantly greater than zero.

---

## Scale and Interpretation

| FEM Score | Classification | Interpretation |
|---|---|---|
| < 0.05 | Negligible effect | Counter-format produces no measurable difference in authentic expression. Format design hypothesis not supported. |
| 0.05 - 0.15 | Small effect | Counter-format produces slightly more authentic expression. Marginal suppression by conventional format. |
| 0.16 - 0.30 | Moderate effect | Counter-format produces meaningfully more authentic expression. Conventional format demonstrably suppressive. |
| 0.31 - 0.50 | Large effect | Counter-format produces substantially more authentic expression. Strong suppression effect from conventional format. |
| > 0.50 | Very large effect | Counter-format produces dramatically more authentic expression. Conventional format is a severe suppressive environment. |

These thresholds are provisional and will be revised with Aim 1 data. The AVDP pilot footage (Zay episode) provides an initial calibration reference but no formal FEM score has been computed from it. Calibration is a pre-Aim 1 task.

---

## Validity and Reliability Requirements

**Channel convergence:** LDS and BAS should be positively correlated (r > 0.30) within condition. If they diverge significantly, either a channel is measuring something other than authentic expression or authentic expression is not unidimensional. Both are informative. Channel divergence should be investigated rather than resolved by dropping a channel.

**Inter-rater reliability:** ICC ≥ 0.70 for linguistic disclosure breadth coding. ICC ≥ 0.65 for each behavioral indicator. Required before any FEM scores are computed from that session. Sessions failing inter-rater thresholds are excluded from analysis pending rater calibration.

**Test-retest reliability (same condition):** FEM scores computed from two sessions in the same format condition at 14-day intervals should be correlated (r > 0.60). If within-condition scores are not stable, the instrument is too sensitive to session-level variability to detect a format effect.

**Ecological validity check:** Participant self-report authenticity ratings should be higher in the counter-format condition than the conventional condition (p < 0.05 at group level). This is a subjective convergent validity check -- participants should experience the counter-format as producing more authentic expression, consistent with what the linguistic and behavioral channels measure.

---

## Measurement Conditions

A FEM measurement is valid only when:

1. Both conditions are completed by the same participant. A between-subjects comparison (different people in different conditions) cannot produce a FEM score -- it can only estimate a group-level format effect, which confounds format with individual differences.
2. Topic prompts are matched across conditions (same pool, counterbalanced order). Unmatched topics introduce content variance that confounds format variance.
3. Both conditions are filmed in full and transcribed before coding begins. Partial sessions are excluded.
4. Inter-rater reliability thresholds are met before scoring. Scores based on unreliable coding are invalid.
5. The counter-format condition genuinely meets its design criteria: music present, phones absent, no time pressure communicated, no production interruption. Protocol violations must be logged and sessions with protocol violations flagged.

---

## Relationship to the Pilot Footage

The Zay episode (proof-of-concept footage from the early AVDP production) is the training reference for rater calibration and FEM score interpretation. It has not been formally scored. Before Aim 1 begins:

- Two trained raters should code the Zay episode using the LDS and BAS protocols
- Agreement on this footage establishes baseline coding reliability
- The FEM score computed from the Zay footage (assuming a matched conventional condition footage is produced) will serve as the anchor for the Aim 1 effect size estimate and power calculation

If producing matched conventional condition footage for the Zay subject is not feasible, a calibration sample from new participants should be recruited specifically for this purpose before the main Aim 1 study begins.

---

## Limitations

- The FEM requires within-subject paired sessions. This means participants experience both conditions, which introduces carry-over effects that counterbalancing can reduce but not eliminate. Participants who complete the counter-format first may bring authentic disclosure habits to the conventional format session; participants who complete the conventional format first may be primed for the counter-format. These carry-over effects should be modeled in the Aim 1 analysis.
- Linguistic coding via LIWC captures what is said, not what was withheld. A person who authentically chose not to disclose certain material cannot be distinguished from a person whose format-induced suppression prevented disclosure. The behavioral channel provides a partial correction -- body language indicating suppressed expression that was not verbalized -- but this remains a fundamental limitation of measuring authentic expression from its output.
- The BAS computer vision channel requires either validated automated models or trained manual raters. Manual coding at scale is expensive. The lab should prioritize building or validating automated behavioral coding for the FACS and pose estimation components before Aim 1 participant recruitment reaches full scale.
- The FEM is specific to the AVDP format manipulation. It measures whether removing phones, adding ambient music, and extending the time window produces more authentic expression. It does not decompose which format elements are responsible for the effect. Aim 1's within-study variations (ambient music vs. no music as an initial isolation) begin to address this, but a full factorial design would be required to attribute the FEM to specific format elements.

- **The FEM does not distinguish expression restoration from counter-format dependency.** A positive FEM result is consistent with two different outcomes: (1) the counter-format genuinely recovering authentic expression that conventional format suppressed -- the counter-environment effect the instrument measures; and (2) the subject developing a dependency on counter-format conditions, such that they can now only express authentically when the format is specifically designed to accommodate them, without building the capacity to navigate conventional formats while preserving authentic expression. The instrument measures what a format allows through; it does not measure whether counter-format exposure builds or replaces the subject's underlying expressive capacity. This limitation connects to the lab's second generation research question: under what conditions does cognitive extension develop capacity versus prevent it (see `docs/research/second-generation-thesis.md`).

---

## Cross-Instrument Notes

The FEM's behavioral channel is the primary cross-lab application of the computer vision methodological thread documented in `docs/research/themes/computer-vision.md`. The FACS coding protocol and pose estimation approach described here should be developed in coordination with Phresh's SAM instrument layer (which uses a related visual preference inference approach) to avoid building parallel technical infrastructure.

The neural synchronization thread (`docs/research/themes/neural-synchronization.md`) describes a future extension: using ISC (inter-subject correlation) among viewers of AVDP footage as an independent outcome measure. A large FEM should predict higher ISC in viewers -- the authentic signal gets through and the audience's brains align with it. This extension requires the FEM to be validated first, and the neural measurement infrastructure (EEG or fMRI) to be established through the Brown/Carney Institute partnership.

---

*Version 0.0 (Concept draft). The FEM framework was developed as a working design document. Counter-format footage (Zay episode) pre-exists this spec. FEM as a formal psychometric instrument has no prior specification. No formal FEM score has been computed. Pre-Aim 1 tasks: rater calibration on Zay episode, computer vision model validation, matched conventional condition footage production. Domain lead and academic partner review required before validation study begins.*
