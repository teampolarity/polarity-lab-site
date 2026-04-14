# Style Authenticity Measure (SAM) — Instrument Specification

**Polarity Lab | Phresh Research Group**
**Version:** 0.1 — Pre-development draft, pending domain lead activation
**Domain:** Fashion recommendation and authentic style identity
**Document type:** Instrument specification — for domain lead and Technical Director use when Phresh research program activates

---

## What the SAM Measures

The Style Authenticity Measure is a signed scalar score representing the divergence between two quantities:

- **P_authentic**: the person's authentic style profile, derived from System 1 aesthetic response to visual stimuli under conditions that minimize commercial and algorithmic priming
- **P_algorithmic**: what conventional fashion recommendation environments surface to the person, derived from an audit of their existing platform behavior and surfaced content

A SAM score of zero means conventional platforms are surfacing items that match the person's authentic style identity. A positive SAM score means the platforms are optimizing for something other than authentic preference — conversion, trending items, promotional placement — and the person's genuine style identity is not what they're being shown.

The SAM is structurally parallel to the Cognitive Gap Measure (WAXFEED) and the Cognitive Return Measure (Cosmos). The measurement logic is the same: authentic signal vs. environmental surface, with the gap as the finding. The domain is visual self-expression rather than music or executive function.

---

## Component 1: Authentic Style Profile (P_authentic)

Authentic style preference cannot be reliably estimated from shopping history or saved items, because those reflect what the algorithm has been surfacing and the person has been absorbing. P_authentic requires a revealed preference channel that bypasses prior commercial exposure.

Phresh's StyleDNA process is the primary instrument for P_authentic. It is already designed to do this.

**1a. StyleDNA image-response profiling (primary signal)**

Present the person with 20 fashion images spanning the 33 StyleDNA dimensions (color, silhouette, texture, formality, edge, and 28 additional sub-dimensions). Progressive narrowing protocol: 20 → 10 → 7 → 5 → 3 images. Selection is made on visual response before analysis or categorization, under time pressure sufficient to minimize deliberate rationalization.

The 33-dimension preference vector derived from this process constitutes P_authentic.

Key design principles that make this a valid authentic signal:
- No brand or price information visible during selection
- No genre or category labels that would activate algorithm-trained associations
- Time-constrained selection (reduces System 2 rationalization)
- Progressive narrowing forces relative ranking rather than absolute rating

**1b. Second-session consistency check (validity signal)**

Administer a second StyleDNA session 14+ days after the first using a different but matched image set. P_authentic stability across sessions (cosine similarity ≥ 0.70) is required for the score to be valid. Scores based on a single session are provisional until confirmed.

**1c. Self-concordance alignment (validation signal)**

At enrollment, administer a self-concept measure focused on style identity: a brief instrument asking the person to describe their style in free text and rate how closely their current wardrobe reflects who they actually are. P_authentic estimated from StyleDNA should correlate with stated style self-concept. Where there is strong divergence (the person describes themselves as X but selects images reflecting Y), flag for follow-up — this may indicate that the person's stated self-concept has itself been shaped by environmental exposure.

---

## Component 2: Algorithmic Surface (P_algorithmic)

What conventional fashion platforms are actually surfacing to this person, captured through an audit of their existing recommendation environment before Phresh onboarding.

**2a. Platform feed audit (primary signal)**

Structured observation of the person's current discovery environment across the platforms they actively use (Depop, Grailed, ASOS, StockX, Poshmark, Instagram Shopping, Pinterest, TikTok Shop). For each platform, record the first 50 items surfaced unprompted (homepage recommendations, "for you" feed, "trending" or "discover" sections) in a standardized session.

Map each surfaced item to the 33 StyleDNA dimensions using the same dimensional framework as P_authentic. Construct P_algorithmic as the distribution of surfaced items across those dimensions.

**2b. Saved items and purchase history (supplementary signal)**

Items the person has saved, liked, or purchased represent behavioral compliance with algorithmic surface — what the algorithm promoted and what the person acted on. Include as a supplementary signal but weight lower than 2a, since these reflect the person's adaptive response to what they were shown rather than what they would choose from a neutral starting point.

**2c. Constructing P_algorithmic**: Produce a 33-dimensional preference vector using the same StyleDNA dimensions as P_authentic. Weight 2a (feed audit) at 0.70 and 2b (saved/purchased items) at 0.30 in the composite.

---

## Scoring Formula

```
SAM = 1 - cosine_similarity(P_authentic, P_algorithmic)
    = 1 - (P_authentic · P_algorithmic) / (||P_authentic|| × ||P_algorithmic||)
```

Cosine similarity measures the alignment between the two 33-dimensional vectors. SAM = 1 - similarity, so:
- SAM = 0: perfect alignment between authentic style and algorithmic surface
- SAM = 1: authentic style and algorithmic surface are orthogonal (no alignment)

Cosine distance is preferred over KL divergence (used in the CGM) because the StyleDNA dimensions are not probability distributions — they are dimensional preference intensities that may be sparse (a person may have no preference on texture but strong preference on silhouette). Cosine distance handles sparse vectors more robustly than KL divergence.

**Drift score (longitudinal extension):**

Rate of change in SAM over time, computed at 30-day intervals:

```
SAM_drift(t) = SAM(t) - SAM(t-1)
```

Positive drift means the SAM is increasing: the person's expressed preferences are moving toward the algorithmic surface rather than the authentic signal recovering. This is the suppression effect in real time.

Negative drift after Phresh onboarding means the counter-environment is working: authentic style identity is recovering and the algorithmic surface gap is closing.

---

## Scale and Interpretation

| SAM Score | Classification | Interpretation |
|---|---|---|
| 0.00 - 0.15 | Minimal gap | Platforms surface items closely matching authentic style profile. Low suppression. |
| 0.16 - 0.35 | Low gap | Some divergence between authentic profile and platform surface. Mild suppression. |
| 0.36 - 0.60 | Moderate gap | Platforms systematically surface items that diverge from authentic style identity. Moderate suppression. |
| 0.61 - 0.80 | High gap | Platform surface bears weak relationship to authentic profile. Significant suppression present. |
| 0.81 - 1.00 | Severe gap | Authentic style profile and platform surface are largely orthogonal. Most severe suppression. |

Thresholds are provisional. Validation study data will establish empirically grounded cut-points.

**Drift interpretation:**

| SAM_drift value | Interpretation |
|---|---|
| > +0.05 per month | Active suppression accumulating. Authentic preferences converging toward algorithmic surface. |
| -0.05 to +0.05 | Stable. Neither suppression accumulating nor recovering. |
| < -0.05 per month | Recovery in progress. Authentic preferences diverging from algorithmic surface. |

---

## Validity and Reliability Requirements

**Test-retest reliability (P_authentic):** StyleDNA second-session cosine similarity ≥ 0.70 at 14+ days. Authentic style identity should be stable over two weeks in the absence of significant new exposure.

**Construct validity:** P_authentic (from StyleDNA) should correlate with style self-concept ratings (from 1c) at r > 0.35. People who describe themselves as having a strong, distinctive style should show a more concentrated P_authentic vector (higher dimensional specificity) than people who describe themselves as having no particular style.

**Sensitivity to intervention:** SAM_drift < -0.05 per month detectable after 90 days of Phresh use in the validation study. Below this threshold the instrument cannot distinguish counter-environment effect from measurement noise.

**Parallel validity with CGM:** For participants who complete both the SAM and CGM (cross-domain enrollment), correlation between SAM and CGM scores should be positive (r > 0.20) if the lab's general thesis holds — that suppression is a cross-domain phenomenon affecting people with high engagement with recommendation environments. This is the cross-domain analysis described in the Phresh research program.

---

## Measurement Conditions

A SAM measurement is valid only when:

1. The StyleDNA session is administered before any Phresh item exposure. The image selection process must precede any personalized recommendations.
2. The platform feed audit (2a) is conducted in a standardized session: logged in to each platform, using the same device the person normally uses, within 48 hours of StyleDNA completion.
3. Second-session consistency check (1b) is completed within 30 days of the first session. Scores marked provisional until 1b is complete.
4. Both sessions use matched but non-identical image sets. Repeat exposure to the same images would inflate consistency scores artificially.

---

## Limitations

- The 33 StyleDNA dimensions were designed for product matching, not psychological measurement. Their psychometric properties (reliability, factor structure, construct validity) have not been independently validated. The SAM validation study should include factor analysis of the StyleDNA dimensions to assess whether 33 dimensions reduce to a smaller set of orthogonal factors.
- P_algorithmic via feed audit captures what platforms surface in a single standardized session, which may not represent the full range of what the person encounters over time. A longitudinal audit (multiple sessions over 30 days) would be more representative but requires greater participant burden.
- Cosine distance between 33-dimensional vectors may be influenced by the specific 33 dimensions chosen. The sensitivity of SAM scores to the dimensional framework should be tested by comparing scores computed on the full 33-dimension space vs. a reduced set of validated dimensions.
- The SAM does not currently capture fit, functionality, or practical style constraints (body type, climate, professional requirements). These factors shape real-world style choices and may create systematic gaps between authentic aesthetic preference (what P_authentic captures) and authentic style expression (what a person would actually wear). This distinction is important for interpreting SAM scores.

- **The SAM does not distinguish taste restoration from dependency creation.** A reduced SAM gap after counter-environment exposure is consistent with two different outcomes: (1) the counter-environment surfacing authentic aesthetic preference that the recommendation algorithm genuinely suppressed; and (2) the counter-environment creating a dependency where the person can only access authentic style preference when the system surfaces it, without developing the aesthetic judgment to recognize and pursue it independently. Both produce a lower SAM composite. The instrument measures the algorithmic gap; it does not measure whether counter-environment use builds or replaces the underlying capacity for authentic aesthetic self-knowledge. This limitation connects to the lab's second generation research question: under what conditions does cognitive extension develop capacity versus prevent it (see `docs/research/second-generation-thesis.md`).

---

## Cross-Instrument Notes

The SAM's design is explicitly parallel to the CGM. Both instruments use the same basic structure: authentic signal (System 1, revealed preference) vs. algorithmic surface (behavioral history or feed audit), with gap as the finding. The primary methodological difference is that the CGM uses a temporal preference distribution over the MUSIC taxonomy while the SAM uses a dimensional preference vector over StyleDNA dimensions.

Cross-domain validity analysis (a person's SAM correlating with their CGM) is the strongest version of the lab's general thesis. Domain leads for WAXFEED and Phresh must coordinate on participant recruitment to enable cross-domain enrollment.

The computer vision theme document (`docs/research/themes/computer-vision.md`) describes how StyleDNA's image-response methodology could be extended with computer vision to provide a more precise revealed preference signal and to validate P_authentic against behavioral response data beyond explicit selection choices.

---

*Version 0.1. This specification is a pre-development draft written ahead of domain lead activation. The domain lead and Technical Director should review and update this document before any validation work begins. StyleDNA dimensional operationalization, scoring normalization, and psychometric validation of the 33-dimension framework are the most critical open questions.*
