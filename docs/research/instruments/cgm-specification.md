# Cognitive Gap Measure (CGM) — Instrument Specification

**Polarity Lab | WAXFEED Research Group**
**Version:** 0.0 — Concept draft, instrument framework not pre-existing. Validation study pending.
**Domain:** Music recommendation and authentic taste
**Document type:** Instrument specification — for domain lead, Technical Director, and research partner use

---

## What the CGM Measures

The Cognitive Gap Measure is a signed scalar score representing the divergence between two quantities:

- **P_authentic**: the listener's authentic musical preference distribution, derived from System 1 response to music under conditions that minimize algorithmic priming
- **P_algorithmic**: the recommendation system's behavioral model of the listener, derived from platform engagement history

A CGM score of zero means the platform's model of the person matches the person's genuine musical identity. A positive CGM score means the platform's model has diverged from the person — that there is measurable authentic musical preference that the platform's predictions do not account for. This divergence is the suppression the counter-environment is designed to close.

---

## Component 1: Authentic Preference Signal (P_authentic)

The fundamental methodological challenge: authentic preference cannot be estimated from behavioral history, because behavioral history is what the algorithm has shaped. P_authentic requires a measurement channel independent of prior platform engagement.

Three channels, used in combination:

**1a. Novel track forced-choice tasks (primary signal)**

Present the listener with pairs of tracks meeting all of the following criteria:
- Not present in the listener's documented streaming history on any platform
- Not appearing in any playlist, recommendation queue, or "similar artists" surface the listener has engaged with
- Selected to span the MUSIC taxonomy dimensions (Mellow, Unpretentious, Sophisticated, Intense, Contemporary) and sub-genre space

Protocol: 40 track pairs, presented in sequence. No platform context (no artist name framing, no genre labels, no popularity signals during selection). Listener selects one track per pair within 8 seconds (time pressure reduces System 2 rationalization). After all selections, listener rates each chosen track on a 5-point familiarity scale ("this feels like music I've always wanted to find" to "this is entirely new to me").

The distribution of choices across the MUSIC taxonomy dimensions constitutes the raw authentic preference signal.

**1b. Physiological valence indexing (secondary signal)**

During novel track presentation (Aim 3 subsample only, requiring additional consent): measure skin conductance response (SCR) as a valence-independent arousal indicator during the first 15 seconds of each track. High SCR to a novel track indicates genuine affective engagement independent of behavioral engagement history. Used to validate 1a: do the listener's forced-choice selections correlate with their highest-SCR tracks?

**1c. MUSIC taxonomy personality alignment (validation signal)**

Administer Rentfrow and Gosling's (2003) Big Five personality measure and STOMP music preference scale at enrollment. These instruments estimate authentic preference from personality structure, independent of listening history. P_authentic estimated from 1a should correlate with personality-predicted MUSIC profile at r > 0.40 for construct validity to hold.

**Constructing P_authentic**: From the forced-choice task results, construct a probability distribution over MUSIC taxonomy dimensions and a 12-dimensional preference vector (5 MUSIC dimensions + 7 sub-genre axes defined below). Normalize to sum to 1.

---

## Component 2: Algorithmic Preference Model (P_algorithmic)

The recommendation platform's behavioral model of the listener, estimated from one of three sources in order of precision:

**2a. Platform behavioral history export (preferred)**
Where platforms provide data export (Spotify, Apple Music): extract full listening history, compute play frequency, completion rate, skip rate, and explicit feedback (thumbs, saves, playlist additions) per track. Map tracks to MUSIC taxonomy dimensions using genre metadata. Construct a weighted distribution over MUSIC dimensions reflecting engagement-weighted exposure history.

**2b. Platform "recommended for you" sampling (fallback)**
Where behavioral history is unavailable or incomplete: run 10 standardized sessions on the platform without listener interaction, recording what the platform queues unprompted. This represents the platform's current model of the listener's preferences. Map to MUSIC taxonomy.

**2c. Collaborative filtering estimate (fallback)**
Where neither 2a nor 2b is feasible: use demographic and engagement duration proxies to estimate an expected algorithmic profile from Anderson et al. (2020) normative data for equivalent listener cohorts. This is the least precise method and should be flagged in scoring.

**Constructing P_algorithmic**: Produce a 12-dimensional preference vector using the same axes as P_authentic.

---

## Scoring Formula

```
CGM = D_KL(P_authentic || P_algorithmic)
    = Σ P_authentic(i) × log(P_authentic(i) / P_algorithmic(i))
      for all i in the 12 preference dimensions
```

KL divergence is asymmetric: it measures how much P_authentic diverges from P_algorithmic. This directionality is intentional — we are measuring how far the algorithm's model has drifted from the person's authentic identity, not the reverse.

Normalize to [0, 1] using the empirical maximum KL divergence observed in the normative sample (to be established in Aim 1). Until normative data is available, report raw KL divergence alongside a percentile rank within the pilot sample.

**The 12 preference dimensions:**

| # | Dimension | Source |
|---|---|---|
| 1 | Mellow | MUSIC taxonomy |
| 2 | Unpretentious | MUSIC taxonomy |
| 3 | Sophisticated | MUSIC taxonomy |
| 4 | Intense | MUSIC taxonomy |
| 5 | Contemporary | MUSIC taxonomy |
| 6 | Lyrical complexity | Sub-genre axis |
| 7 | Rhythmic complexity | Sub-genre axis |
| 8 | Timbral brightness | Sub-genre axis |
| 9 | Cultural specificity | Sub-genre axis |
| 10 | Era (recency preference) | Sub-genre axis |
| 11 | Language diversity | Sub-genre axis |
| 12 | Genre boundary-crossing | Sub-genre axis |

Sub-genre axes 6-12 are operationalized using Spotify Audio Features API (where available) or manual coding. Final operationalization to be determined by domain lead and academic partner before Aim 1 begins.

---

## Scale and Interpretation

| CGM Score | Classification | Interpretation |
|---|---|---|
| 0.00 - 0.15 | Minimal gap | Algorithm closely models authentic preference. Suppression unlikely or early-stage. |
| 0.16 - 0.35 | Low gap | Moderate alignment. Some preference suppression present; not clinically significant for intervention. |
| 0.36 - 0.60 | Moderate gap | Substantial divergence. Platform model has meaningfully diverged from authentic identity. Intervention indicated. |
| 0.61 - 0.80 | High gap | Significant suppression. Platform model bears weak relationship to authentic preference. Priority for WAXFEED intervention. |
| 0.81 - 1.00 | Severe gap | Algorithm model and authentic preference are largely orthogonal. Most severe suppression. |

Thresholds are provisional. Aim 1 normative data will establish empirically grounded cut-points.

---

## Validity and Reliability Requirements

For the CGM to be a defensible scientific instrument:

**Construct validity:** Correlation between P_authentic (from 1a forced-choice task) and personality-predicted MUSIC profile (from 1c) must be r > 0.40. This establishes that the forced-choice task is measuring authentic preference and not merely novelty preference or random selection.

**Test-retest reliability:** CGM score ICC > 0.75 at 30-day intervals in the absence of significant new platform engagement. A listener's authentic preference structure should be stable over 30 days if the counter-environment has not intervened.

**Sensitivity to intervention:** CGM change > 0.10 detectable at 90-day WAXFEED use in Aim 3. Below this threshold the instrument cannot distinguish counter-environment effect from measurement noise.

**Method convergence:** Correlation between CGM scores derived from 2a (behavioral history) vs. 2b (recommendation queue sampling) must be r > 0.60 in the Aim 1 subset where both methods are available.

---

## Measurement Conditions

A CGM measurement is valid only when:

1. The novel track pool (1a) has been verified as absent from the listener's streaming history. History export required. Listeners with incomplete history data should be flagged and may require a longer exclusion window.
2. The forced-choice task is administered before the listener has any WAXFEED exposure (baseline) or after a washout period of 14+ days (follow-up).
3. Time-pressure condition (8-second selection window) is enforced. Unconstrained selection allows System 2 rationalization and contaminates the signal.
4. Physiological measurement (1b) requires controlled listening conditions and equipment; can be omitted for remote participants using self-report valence ratings as substitute.

---

## Limitations

- The 12-dimension preference space does not capture all dimensions of musical identity. Lyrical content preferences, cultural resonance, and lived memory associations are not fully represented in MUSIC taxonomy or audio feature analysis. These dimensions are particularly relevant for listeners from communities underrepresented in music recommendation research. The instrument may underestimate suppression in these populations.
- KL divergence assumes well-defined probability distributions over the preference dimensions. Listeners with very narrow authentic preference profiles (strong concentration on 1-2 dimensions) may produce inflated CGM scores because the distribution is poorly specified.
- P_algorithmic estimated via method 2c is substantially less precise than 2a or 2b and should be treated as an approximation.

- **The CGM does not distinguish restoration from dependency creation.** A reduced CGM score after WAXFEED use is consistent with two different outcomes: (1) WAXFEED surfacing authentic musical preference that the recommendation environment genuinely suppressed -- the counter-environment effect the instrument is designed to measure; and (2) WAXFEED creating a functional dependency where the listener can only access authentic preference through the counter-environment, without developing the underlying aesthetic judgment to navigate music independently. Both produce a lower CGM composite. The 90-day follow-up design should include a pre-specified analysis of whether CGM improvements persist after WAXFEED use ends. Attenuation or reversal is evidence of dependency; persistence is evidence closer to genuine restoration. This limitation connects to the lab's second generation research question: under what conditions does cognitive extension develop capacity versus prevent it (see `docs/research/second-generation-thesis.md`).

---

## Cross-Instrument Notes

The CGM is structurally parallel to the Style Authenticity Measure (SAM, Phresh) and the Cognitive Return Measure (CRM, Cosmos). All three instruments measure the gap between authentic capacity and what a designed environment has suppressed. Cross-domain analysis requires that the 12-dimension CGM preference space map onto the SAM's 33-dimension style space at a conceptual level. Domain leads for WAXFEED and Phresh should align on shared measurement philosophy before their respective validation studies begin.

The implicit vs. explicit cognition theme document (`docs/research/themes/implicit-explicit-cognition.md`) provides the epistemological foundation for why the forced-choice time-pressure task (System 1) is preferred over free-response preference rating (System 2) as the authentic preference signal.

---

*Version 0.0 (Concept draft). The CGM framework was developed as a working design document. No prior instrument specification existed. Final operationalization of the 12 preference dimensions, the KL normalization procedure, and the scoring thresholds requires validation study data and academic partner review. Domain lead and Technical Director own updates to this document.*
