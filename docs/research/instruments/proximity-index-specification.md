# Proximity Index — Instrument Specification

**Polarity Lab | GPS Research Group**
**Version:** 0.2 — Working draft, pilot complete, validation study pending
**Domain:** Community discovery and cultural resource access
**Document type:** Instrument specification — for domain lead, research partner, and funder use

---

## What the Proximity Index Measures

The Proximity Index measures the gap between what a community produces and what discovery platforms surface to that community. It produces a scalar Proximity Score for a defined community and a defined resource category.

A score of 0 means that every resource produced by or for the community is discoverable through standard platforms when community members search for it. A score of 1 means that none of the community's relevant resources are surfaced. In practice, scores will fall between these extremes, with higher scores indicating a greater structural discovery gap.

The index is not a measure of resource quality, funding levels, or organizational capacity. It measures one thing: given that these resources exist, does the discovery infrastructure surface them to the people they were built for?

---

## Construct Definition

**Community:** A defined group identified by geographic boundary, demographic identity, or both. In the Providence pilot: Providence-area residents identifying with BIPOC communities served by MUSEOFRI member organizations. Must be operationally defined before scoring begins.

**Community Output Set (COS):** The full enumerated set of cultural, civic, and service resources produced by or for the defined community. This is the numerator — what exists that should be discoverable.

**Platform Discovery Set (PDS):** The set of results surfaced by standard discovery platforms when queried with standardized community-identity prompts. This is what the community actually finds.

**Proximity Score:** The proportion of the COS that is absent from the PDS.

---

## Component 1: Community Output Set Construction

The COS is a structured inventory of resources meeting all three of the following criteria:

1. **Produced by or for the community**: either the organization is led by or primarily composed of community members, or the resource is explicitly designed for and marketed to the community
2. **Active and accessible**: the resource is currently operational and can in principle be discovered through a platform search
3. **Within the resource category under study**: the COS is always category-specific (workforce development resources, cultural events, health services, etc.). Cross-category scoring conflates different discovery dynamics.

**COS construction sources (in order of completeness):**

| Source | What it provides | Limitation |
|---|---|---|
| Candid / GuideStar registry | Registered nonprofits, EIN, mission statement, program descriptions | Only registered nonprofits; informal organizations absent |
| IRS Form 990 data | Revenue, program descriptions, geographic service area | Annual lag; program descriptions inconsistent |
| MUSEOFRI organizational network | Direct community partner referrals | Specific to Providence; requires replication in new cities |
| Community-maintained directories | Informal and emerging organizations | Incomplete, variable quality |
| Organizational websites | Current programs, events, resources | Must be manually coded for resource category |

**COS coding protocol:**

Each candidate resource is coded by two independent raters on:
- Community relevance (1 = produced by/for community, 0 = not)
- Resource category match (1 = within scope, 0 = out of scope)
- Active status (1 = currently operational, 0 = inactive or defunct)

Inclusion requires: community relevance = 1, category match = 1, active status = 1, with both raters agreeing (Cohen's kappa ≥ 0.70 required before scoring proceeds). Disagreements adjudicated by third rater.

---

## Component 2: Platform Discovery Set Construction

The PDS is the set of results surfaced by standard discovery platforms under the standardized query protocol.

**Platforms included (standard set):**
1. Google (organic search, not paid placement)
2. Yelp
3. Eventbrite (for event-based resources)
4. Facebook Events / Facebook Places
5. One sector-specific platform (LinkedIn for workforce development; Spotify/Bandcamp for cultural/music resources; Zocdoc or Healthgrades for health services)

**Query protocol:**

For each platform, run three query types using standardized prompts:

| Query type | Example prompt | Purpose |
|---|---|---|
| Identity-anchored | "[community identity] workforce training [city]" | Direct community-targeted search |
| Resource-first | "free workforce training [city]" | Generic resource search without identity signal |
| Organization-anchored | "[organization name]" | Direct discovery of known COS members |

Each query is run on three separate days within a 7-day window to account for platform variability. Results from the first page (top 10 organic results) are recorded for each run. Results are deduplicated across runs and platforms.

**PDS coding protocol:**

Each PDS result is coded by two independent raters:
- COS match (1 = this result corresponds to a COS member, 0 = not in COS)
- Community relevance (1 = community-relevant even if not in COS, 0 = not relevant)

PDS coding requires the same inter-rater standard as COS coding (kappa ≥ 0.70).

---

## Scoring Formula

```
Proximity Score = 1 - (|COS ∩ PDS| / |COS|)
```

Where:
- |COS| = number of resources in the Community Output Set
- |COS ∩ PDS| = number of COS resources that appear in at least one PDS query result
- The score represents the proportion of the COS that is not discoverable through standard platforms

**Example:**
- COS contains 40 workforce development resources
- 14 of those 40 appear in at least one PDS query
- Proximity Score = 1 - (14/40) = 1 - 0.35 = **0.65**

A score of 0.65 means 65% of the community's workforce development resources are not surfaced by standard discovery platforms.

**Sub-scores:**

In addition to the aggregate Proximity Score, report:
- Score by platform (which platforms have highest and lowest discovery rates for the COS)
- Score by query type (identity-anchored vs. resource-first vs. organization-anchored — differences indicate whether identity signaling in search helps or hurts discoverability)
- Score by organization type (BIPOC-led vs. white-led organizations within the same resource category — the key equity analysis in Aim 2)

---

## Scale and Interpretation

| Proximity Score | Classification | Interpretation |
|---|---|---|
| 0.00 - 0.15 | Near-complete discovery | Platforms surface most community resources. Discovery infrastructure functioning for this community and resource category. |
| 0.16 - 0.35 | Moderate gap | Meaningful proportion of resources not discoverable. Specific platform or category failures may be identifiable. |
| 0.36 - 0.60 | Substantial gap | Most community resources are not discoverable through standard platforms. Structural discovery failure present. |
| 0.61 - 0.80 | Severe gap | Community resources are largely invisible to standard discovery infrastructure. Counter-environment intervention indicated. |
| 0.81 - 1.00 | Near-complete invisibility | Discovery infrastructure surfaces almost none of the community's relevant resources. |

Thresholds will be established with normative data from Aim 1 multi-site validation. No formal pilot scores have been computed yet. Initial threshold calibration will be based on the first Providence pilot run.

---

## Validity and Reliability Requirements

**Test-retest reliability:** Proximity Score ICC > 0.80 at 30-day intervals. Platform query results should be stable enough that the score reflects structural discovery patterns rather than platform noise.

**Inter-rater reliability:** Cohen's kappa ≥ 0.70 for both COS coding and PDS coding before any scoring proceeds. If this threshold is not met, coding rubric must be revised and coders retrained before the study continues.

**Construct validity:** Proximity Scores for BIPOC-led organizations should be significantly higher than scores for demographically equivalent white-led organizations offering the same resource category, after controlling for organizational size, age, and geographic density (Aim 2 hypothesis). If no such difference is found, either the Index is not measuring what it claims or the hypothesis is wrong. Both outcomes are publishable.

**Convergent validity:** Proximity Scores should correlate negatively with organizations' self-reported discoverability (from staff interviews in Aim 2). Organizations that report high difficulty being found should have higher Proximity Scores.

---

## Measurement Conditions

A Proximity Score measurement is valid only when:

1. The community is operationally defined before COS construction begins. Post-hoc community definition introduces selection bias into the COS.
2. The resource category is defined before COS construction. Multi-category scoring should use category-specific scores, not aggregates.
3. Inter-rater reliability thresholds are met for both COS and PDS coding. A score based on unreliable coding is not a valid measurement.
4. Platform queries are run within a defined 7-day window. Queries spread over longer periods may reflect platform changes rather than stable discovery patterns.
5. The COS is complete for the defined scope. A partial COS underestimates the Proximity Score. The methodology paper must document completeness assumptions explicitly.

---

## Limitations

- The Proximity Index measures discoverability through standard platform queries, not through community members' actual search behavior. A high Proximity Score means the platforms don't surface the resource, but it does not directly measure whether community members fail to find it in practice. Community members may have non-platform discovery channels (word of mouth, trusted referrals) that reduce the practical impact of a high Proximity Score.
- COS completeness is bounded by the quality of organizational registries. Informal community resources with no digital presence cannot be included in the COS, which means the Index systematically undercounts the most invisible resources.
- Platform query results vary by user location, login state, and browsing history. The standardized protocol uses logged-out, location-cleared queries to control for this, but cannot fully eliminate platform personalization effects.
- The Index measures the COS-to-PDS gap but does not diagnose what produces it. A high score could reflect active algorithmic suppression, passive omission from training data, or low SEO investment by community organizations. The sub-score analysis (by platform, by query type) provides initial diagnostic information, but causal attribution requires additional investigation.

- **The Proximity Index does not distinguish discovery restoration from substitution for embodied place-knowledge.** A reduced Proximity Index gap after GPS use is consistent with two different outcomes: (1) GPS surfacing authentic local culture that the discovery algorithm genuinely suppressed -- the counter-environment effect the instrument measures; and (2) GPS substituting for the embodied, friction-laden process of discovering a city that builds genuine place-knowledge and community membership. A person who can find the right places through GPS without developing the contextual knowledge to find them without it has not had their authentic community connection restored -- they have exchanged one dependency for another. The instrument measures discoverability; it does not measure whether using the counter-environment builds or replaces the capacity for authentic local navigation. This limitation connects to the lab's second generation research question: under what conditions does cognitive extension develop capacity versus prevent it (see `docs/research/second-generation-thesis.md`).

---

## Cross-Instrument Notes

The Proximity Index is the most direct operationalization of the lab's second threshold thesis in a social infrastructure domain. Where the CGM and SAM measure suppression of individual preference, the Proximity Index measures suppression of community-directed resources. The mechanism is different but the instrument logic is the same: enumerate what exists (the authentic signal), measure what the environment surfaces, score the gap.

The neural synchronization theme document (`docs/research/themes/neural-synchronization.md`) describes a future direction for the GPS program: measuring whether genuine community proximity (as closed by the GPS counter-environment) produces ISC effects that digitally-mediated community connection does not. That extension requires the Proximity Index to have a validated behavioral measure of authentic community connection first.

---

*Version 0.2. This specification reflects the methodology designed in partnership with MUSEOFRI and GOODhumanz. The counter-environment is live at polaritygps.com. No formal Proximity Index pilot scores have been computed yet -- Aim 1 produces the first scored results. Final operationalization of platform query standardization, COS completeness thresholds, and normative scoring ranges requires Aim 1 multi-site validation. Domain lead and research coordinator own updates to this document. Academic partner review required before formal validation study begins.*
