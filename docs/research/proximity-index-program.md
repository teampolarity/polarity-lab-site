# Proximity Index Lab — Research Program

**Principal Investigator:** Polarity Lab
**Partner Researcher:** J'Juan Wilson Jr. (GOODhumanz, Providence RI)
**Location:** Providence, RI
**Document Version:** April 2026
**Status:** Working draft — for advisor, collaborator, and funder review

---

## The Question

Why can't the communities that need resources the most find the ones built specifically for them?

This is not a rhetorical question. It is a measurable phenomenon. Cultural output, workforce training tools, public health resources, and civic services are produced by and for communities of color at scale. They exist. The people those resources were built for largely cannot find them. The gap between what is produced and what is surfaced is not random noise. It is a structural feature of the platforms, algorithms, and discovery infrastructure that govern what people see.

This lab exists to measure that gap precisely, give it a reproducible number, and deploy an intervention designed to close it.

---

## Institutional Context

Polarity Lab's institutional thesis is that technology is creating a new class of harm to human cognition and connection. Each lab at Polarity produces either a diagnostic instrument or a therapeutic environment. This lab produces both.

The **Proximity Index** is a diagnostic instrument. It takes two inputs, cultural and civic output produced by or for a specific community, and what discovery platforms actually surface to that community, and produces a score. Zero means everything made for you reaches you. A high score means your own culture, resources, and infrastructure are algorithmically invisible to you. The score is reproducible. It can be tracked over time and compared across geographies.

**PolarityGPS** is the corresponding therapeutic environment. It is a live cultural discovery platform (polaritygps.com) that connects people to music, places, and experiences produced by and for their community. PolarityGPS is the counter-infrastructure: what a discovery platform looks like when it is designed from proximity rather than engagement maximization.

Together, the Proximity Index and PolarityGPS give us a closed loop. We can measure the gap, intervene, and measure again.

The work is grounded in two partner research documents produced in 2026:

1. The **Closing the Gap whitepaper** (Wilson, GOODhumanz 2026): identifies five systemic failures in nonprofit workforce development and finds that AI and open education tools can replace $5,000 to $10,000 in annual per-person training spend at near-zero marginal cost. The bottleneck is discovery, not production.

2. The **MUSEOFRI Nonprofit Pain Points Report** (2026): identifies five pain points for small nonprofits serving communities of color. Key finding: BIPOC-led nonprofits are not invisible because they are doing poor work. They are invisible because the philanthropic and discovery infrastructure was built around institutions that already have resources.

This research program builds the formal evidence base for what those documents found in the field.

---

## Foundational Literature

The following 14 works form the theoretical and empirical bedrock of this program. They are grouped by the specific claim they support.

---

### On Algorithmic Bias and the Encoding of Structural Inequity

**1. Noble, Safiya Umoja. *Algorithms of Oppression: How Search Engines Reinforce Racism.* NYU Press, 2018.**

Noble demonstrates that commercial search engines, specifically Google, do not operate as neutral information utilities. Through analysis of search results and advertising systems, she shows that algorithms systematically deprioritize content produced by communities of color and return results that degrade, sexualize, or erase those communities. The infrastructure of discovery is not passive. It reproduces existing hierarchies.

*Relevance:* This is the foundational claim this lab operationalizes. Noble names the phenomenon qualitatively; the Proximity Index is the quantitative instrument that measures its magnitude.

---

**2. Benjamin, Ruha. *Race After Technology: Abolitionist Tools for the New Jim Code.* Polity Press, 2019.**

Benjamin introduces the concept of the "New Jim Code," the use of automated technologies that appear objective while reproducing and deepening racial discrimination. She shows how discriminatory design can encode inequity through explicit racial hierarchy, passive replication of social division, or ostensible bias-correction that produces opposite effects.

*Relevance:* The Proximity Index methodology must account for what Benjamin identifies: the difference between systems that actively penalize communities of color and systems that simply fail to account for them. Both produce the same outcome. The Index measures the outcome regardless of mechanism.

---

**3. Buolamwini, Joy and Timnit Gebru. "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification." *Proceedings of Machine Learning Research*, vol. 81, 2018, pp. 1-15.**

Using the Fitzpatrick skin type classification system, Buolamwini and Gebru conducted a systematic audit of commercial facial analysis algorithms and found error rates of up to 34.7% for darker-skinned women, versus 0.8% for lighter-skinned men. Critically, they developed an auditable, reproducible methodology for measuring algorithmic disparity against a defined population.

*Relevance:* Gender Shades is the methodological template for the Proximity Index. The lab's work applies this same audit logic to a different domain: instead of measuring misclassification of faces, we measure the misclassification of cultural relevance. The question is not "does the algorithm see this face correctly?" but "does the discovery platform surface this resource to the community for whom it was built?"

---

**4. Gebru, Timnit, et al. "Datasheets for Datasets." *Communications of the ACM*, vol. 64, no. 12, 2021, pp. 86-92.**

Gebru and colleagues argue that machine learning datasets lack standardized documentation, which enables biased systems to propagate through the research pipeline without accountability. They propose a structured documentation framework, the "datasheet," that forces transparency about who generated a dataset, for what purpose, and whose populations are represented.

*Relevance:* The Proximity Index requires this kind of structured documentation to be a reproducible scientific instrument. We are building a dataset about what communities produce and what platforms surface. Without rigorous documentation of that dataset's construction, the Index cannot be validated or replicated by outside researchers.

---

**5. Duffy, Brooke Erin and Colten Meisner. "Platform governance at the margins: Social media creators' experiences with algorithmic (in)visibility." *Media, Culture and Society*, vol. 45, no. 2, 2023, pp. 425-441.**

Drawing on interviews with 30 social media creators from historically marginalized identities and stigmatized content categories, Duffy and Meisner find that platforms enact governance unevenly through both formal content moderation and informal mechanisms including shadowbans and biased algorithmic amplification. Marginalized creators and non-normative cultural expressions are systematically disadvantaged within the creator economy.

*Relevance:* This paper provides direct empirical evidence for the phenomenon the Proximity Index measures in the cultural discovery domain. The "algorithmic (in)visibility" framing is analytically close to our construct. The Proximity Index provides what this paper lacks: a scalar measure rather than a qualitative account.

---

### On the Digital Divide as a Layered, Outcomes-Oriented Problem

**6. van Deursen, Alexander J.A.M. and Jan A.G.M. van Dijk. "The first-level digital divide shifts from inequalities in physical access to inequalities in material access." *New Media and Society*, vol. 21, no. 2, 2019, pp. 354-375.**

Van Deursen and van Dijk trace the evolution of digital divide research through three levels: physical access (can you get online?), digital literacy (can you use the tools?), and what they call the third-level divide, the ability to translate internet use into tangible socioeconomic benefit. Their framework shows that the most consequential inequalities now live at level three.

*Relevance:* The Proximity Index addresses a fourth-level divide that van Deursen and van Dijk's framework anticipates but does not name explicitly: even when a community has access and literacy, the infrastructure of discovery may be systematically withholding the resources most relevant to them. The Index makes this fourth level measurable.

---

**7. Pariser, Eli. *The Filter Bubble: What the Internet Is Hiding from You.* Penguin Press, 2011.**

Pariser introduced the term "filter bubble" to describe how personalization algorithms create individualized information environments that algorithmically exclude content the user did not explicitly request but might need. He argues this produces a narrow, distorted picture of reality and undermines the shared informational commons that democratic participation requires.

*Relevance:* Pariser's analysis focuses on ideological polarization. This lab's work extends the filter bubble concept to resource access and cultural production: the filter bubble does not just shape political views, it determines whether you ever learn that a workforce training program, a health clinic, or a cultural institution designed for your community exists.

---

**8. Nguyen, Tien T., et al. "Exploring the filter bubble: the effect of using recommender systems on content diversity." *Proceedings of the 23rd International Conference on World Wide Web*, ACM, 2014, pp. 677-686.**

This paper contributes a novel metric for measuring content diversity at the individual level and is among the first to examine the temporal dynamics of recommendation systems on what users encounter. It finds measurable reductions in content diversity as users engage more with recommendation systems.

*Relevance:* This is a direct methodological precursor to the Proximity Index. The authors build a measurement framework for a similar construct (content diversity) at the platform level. The Index adapts this approach for a community-specific discoverability question.

---

### On Philanthropic Inequity and the Structural Invisibility of BIPOC-Led Organizations

**9. Dorsey, Cheryl, Jeff Bradach, and Peter Kim. "Racial Equity and Philanthropy: Disparities in Funding for Leaders of Color Leave Impact on the Table." Bridgespan Group, 2020.**

This landmark sector analysis finds that Black and Latinx leaders receive approximately 4% of philanthropic funding despite representing roughly 10% of nonprofit leadership. Organizations led by people of color have unrestricted net assets 76% smaller than white-led counterparts and revenues 24% lower. The report identifies structural barriers including inequitable access to philanthropic social networks, interpersonal bias in relationship-building, and the design of grantmaking processes that favor established institutions.

*Relevance:* The MUSEOFRI Pain Points Report (2026) found this dynamic playing out on the ground in Providence. The Bridgespan analysis is the national quantitative context. This lab's Proximity Index extends the measurement from funding flows to discoverability: the problem is not just that BIPOC-led organizations are underfunded but that they are systematically harder to find.

---

**10. Nonprofit Finance Fund. "2022 State of the Nonprofit Sector Survey: A Focus on Racial Equity." NFF, 2022.**

NFF's survey finds that 64% of BIPOC-led organizations experienced significant demand increases in the prior two years, compared to 47% of white-led organizations. Only 26% of BIPOC-led nonprofits received majority unrestricted funding (versus 41% of white-led organizations). The organizations bearing the highest community burden have the fewest flexible resources.

*Relevance:* This data is the supply-side context for the discovery gap. BIPOC-led organizations are producing more services under greater constraint. The Proximity Index measures whether those services reach the communities that need them. This paper establishes who is doing the work and what they are operating under.

---

**11. Candid. "Nonprofits Advancing Racial Equity: State of the Sector." Candid Insights, 2023.**

Candid's sector analysis of 59,550 public charities finds that commitments to racial equity in philanthropy surged to $16.5 billion in 2020 before retreating significantly. By 2022-2023 a substantial proportion of 2020-era racial justice grants had not been renewed. Organizations in communities with high racial inequity and low existing philanthropic capital remained systematically underfunded.

*Relevance:* The funding retraction documented by Candid creates urgency for a different approach to resource discovery. Grant money will not stabilize the problem. What can change is how communities find the resources that do exist. The Proximity Index measures the discovery gap; PolarityGPS is the infrastructure correction.

---

### On Information Asymmetry and the Structural Disadvantage It Creates

**12. Eubanks, Virginia. *Automating Inequality: How High-Tech Tools Profile, Police, and Punish the Poor.* St. Martin's Press, 2018.**

Eubanks examines how automated decision systems, deployed in child welfare, public benefits, and homeless services, separate poor communities from resources while appearing neutral. She introduces the concept of the "digital poorhouse," an automated infrastructure that reproduces the social control functions of historical poorhouses at greater speed, scale, and opacity.

*Relevance:* Eubanks demonstrates the inverse of the Proximity Index problem: not just that resources are hidden from communities, but that automated systems can actively route resources away from them. Both are aspects of the same structural dynamic. The Index measures the discoverability failure; Eubanks provides the theoretical frame for why that failure is not neutral.

---

**13. Bergh, Donald D., et al. "Information Asymmetry in Management Research: Past Accomplishments and Future Opportunities." *Journal of Management*, vol. 45, no. 1, 2019, pp. 122-158.**

Bergh and colleagues survey information asymmetry theory and its measurement across management and organizational research. They define information asymmetry as a condition in which one party in a relationship has more or better information than another and argue it produces systematic disadvantage at scale. They outline measurement frameworks grounded in observable outcome gaps rather than subjective assessments of knowledge.

*Relevance:* The Proximity Index is an information asymmetry instrument. The gap between what a community produces and what platforms surface to that community is a direct, observable measure of asymmetry. This paper grounds the Index's construct in established theoretical literature and supports its use in institutional settings.

---

**14. Greenlining Institute. "Algorithmic Bias Explained: How and Why Algorithmic Tools Discriminate Against Communities of Color." Greenlining Institute, 2021.**

This policy-facing report synthesizes research on algorithmic discrimination across domains including employment, housing, credit, and content distribution. It provides a typology of how bias enters algorithmic systems: biased training data, proxy variables that correlate with race, feedback loops that amplify initial disparities, and design choices that prioritize engagement over equity.

*Relevance:* The Greenlining typology directly informs the methodological design of the Proximity Index. When we observe a gap between cultural production and platform surfacing, we need to identify what kind of bias is producing it. This typology is the diagnostic framework for interpreting Index scores.

---

## Research Aims

### Aim 1: Validate the Proximity Index as a Reproducible, Cross-Context Measurement Instrument

**Hypothesis:** A community's Proximity Score, defined as the measured gap between cultural and civic output produced by or for that community and what discovery platforms surface to that community, can be calculated with sufficient reliability (test-retest r > 0.80) and validity to detect meaningful differences across geographies and population groups.

**Background:** The Proximity Index was piloted in Providence with MUSEOFRI in 2026, demonstrating proof of concept. However, a single-site pilot is not sufficient to establish the Index as a validated scientific instrument. Without formal validation, it cannot anchor grant applications, appear in peer-reviewed literature, or inform policy. This aim closes that gap.

**Approach:**
- Administer the Index methodology across three to five geographically and demographically distinct communities (e.g., Providence RI, New Orleans LA, Detroit MI, Albuquerque NM) selected for variation in nonprofit density, digital infrastructure, and demographic composition.
- Define the two Index inputs operationally: cultural output will be measured through a structured scrape of organizational outputs from Candid/GuideStar registries, local cultural institution databases, and community-maintained directories; discovery output will be measured through systematic platform queries (Google, Yelp, Eventbrite, Facebook Events, and one or more sector-specific discovery tools) using standardized community-identity prompts.
- Calculate inter-rater reliability (for human-coded categorization of outputs) and test-retest reliability (for platform query reproducibility at 30-day intervals).
- Assess construct validity against existing measures of community resource access (e.g., USDA Food Access Research Atlas methodology, HUD Community Assessment Reporting Tool) and convergent validity against NFF's racial equity survey data.

**Timeline:** 12-18 months.

**Team:** PI + one research coordinator + MUSEOFRI as community partner. External validation by one academic partner with measurement expertise (target: Brown University School of Public Health or MIT Media Lab).

**Why now:** The pilot data exists. The field is actively looking for measurement tools in this domain, as demonstrated by Candid's public commitment to demographic data collection and the Bridgespan Group's call for sector-level equity metrics. A validated Index is fundable, publishable, and useful to sector partners immediately upon completion.

---

### Aim 2: Characterize the Discovery Gap for Nonprofit Workforce Development Resources in Three Northeast Urban Communities

**Hypothesis:** BIPOC-led nonprofit organizations that produce workforce development resources (training curricula, open education tools, credentialing programs) will show significantly higher Proximity Scores (greater discovery gap) than white-led organizations offering equivalent resources, after controlling for organizational age, budget size, and geographic density.

**Background:** The Closing the Gap whitepaper (Wilson, 2026) found that AI and open education tools can replace $5,000 to $10,000 in per-person annual training spend but that staff cannot find them. This aim tests the specific mechanism: is it that comparable resources are harder to discover when they come from BIPOC-led organizations, or is the gap equally distributed? If the former, we have evidence of a structural bias in workforce development discovery infrastructure specifically. If the latter, we have a different problem requiring a different intervention.

**Approach:**
- Build a dataset of nonprofit workforce development resources in Providence, Boston, and New Haven using Candid, IRS Form 990 data, organizational websites, and OpenCurriculum/OER repositories.
- Code organizations by leadership demographics (using NFF and Candid demographic data where available, supplemented by direct organizational survey).
- Compute Proximity Scores for each organization's primary training offerings using the validated methodology from Aim 1.
- Run mixed-effects regression with organization-level controls (budget, age, staff size, geographic density of comparable organizations) to test whether BIPOC-led organization status predicts a higher Proximity Score independently.
- Conduct 10-15 semi-structured interviews with nonprofit workforce development staff to produce a qualitative account of how workers search for training resources, which platforms they use, and whether they are aware of locally produced alternatives.

**Timeline:** 18-24 months (requires completion of Aim 1 for validated methodology).

**Team:** PI + research coordinator + J'Juan Wilson Jr. (GOODhumanz) as co-investigator and community partner for Providence cohort. Academic partner for statistical analysis.

**Primary output:** Peer-reviewed paper and a public data dashboard showing Proximity Scores for workforce development resources in the three cities. Dashboard will be built into PolarityGPS infrastructure.

**Why this matters:** This aim produces the evidence base that converts the Closing the Gap whitepaper from a field observation to a testable scientific claim. If the hypothesis is confirmed, it supports a direct policy argument: discovery platforms for workforce development resources have a measurable, correctable racial bias. It also creates the empirical foundation for Aim 3.

---

### Aim 3: Measure PolarityGPS as a Proximity-Reducing Intervention

**Hypothesis:** Providence-area users who actively engage with PolarityGPS for a 90-day period will show significantly reduced Proximity Scores for cultural and civic resources relevant to their community, compared to a control group using standard discovery platforms.

**Background:** Aims 1 and 2 establish the problem. This aim tests the intervention. PolarityGPS (polaritygps.com) is a live product with an existing user base. It was designed specifically to surface cultural production by and for communities, with architecture that inverts the engagement-maximization logic of commercial discovery platforms. The question is whether it actually moves the Index.

**Approach:**
- Recruit 80-120 Providence-area participants across two cohorts: PolarityGPS users (existing and newly onboarded) and a waitlist control group using standard platforms (Google, Yelp, Spotify, Eventbrite).
- Compute baseline Proximity Scores for each participant at enrollment using a standardized query protocol (the participant describes their community affiliations; the research team runs structured queries across both cohorts' platforms and scores the gap).
- Re-administer the Proximity Score protocol at 30, 60, and 90 days.
- Collect platform usage logs (with consent) to measure engagement depth, session frequency, and category distribution.
- Conduct exit interviews with a purposive subsample (n=20) to characterize the qualitative experience of discovery: did participants find resources they did not know existed? Did they act on them?
- Primary outcome: within-subject change in Proximity Score at 90 days, compared between PolarityGPS and control groups.
- Secondary outcomes: self-reported resource utilization, self-reported sense of community connection (using validated scales from the McMillan-Chavis Sense of Community Index).

**Timeline:** 18-24 months, running concurrently with Aim 2 after Aim 1 completion.

**Team:** PI + research coordinator + PolarityGPS product team for platform instrumentation. IRB review required (Brown University or University of Rhode Island).

**Why this matters:** Without a measured intervention effect, the Proximity Index is a diagnostic instrument with no demonstrated path to remedy. Aim 3 closes the loop between measurement and change. A positive result, that PolarityGPS demonstrably reduces Proximity Scores, establishes PolarityGPS as a therapeutic environment in the scientific sense Polarity Lab intends. It also produces the evidence needed for the next funding cycle and for potential replication with partner platforms.

---

## The Gap We Fill

No existing research program, instrument, or platform does all of the following simultaneously:

1. **Measures the gap between community-directed cultural/civic production and platform surfacing of that production, at the individual and community level.**

Research on algorithmic bias (Noble, Benjamin, Buolamwini) documents that the gap exists qualitatively or measures it in narrow technical domains (facial recognition, ad targeting). No instrument produces a reproducible scalar score for discoverability bias against a defined community across general discovery platforms.

2. **Applies the measurement specifically to civic and cultural resources produced by and for communities of color, including nonprofit services.**

Digital divide literature (van Dijk, Pariser, Nguyen) measures access and content diversity but not the alignment between what a specific community produces and what its members can find. Philanthropic equity research (Bridgespan, NFF, Candid) measures funding flows but not discovery flows. The Proximity Index bridges these two bodies of literature.

3. **Pairs the diagnostic instrument with a live, deployable therapeutic environment and measures the intervention's effect on the Index.**

Irth (Seals Allers) is the closest analog in structure: a community-centered platform designed to address a specific information asymmetry in BIPOC health experience, with backend data collection that builds a measurement layer. PolarityGPS does for cultural and civic discovery what Irth does for maternity care. But no one has yet built a randomized trial that shows a community-centered discovery platform measurably reduces an information asymmetry score.

4. **Integrates the workforce development resource gap specifically.**

The Closing the Gap whitepaper identifies a specific, high-stakes instance of the discovery problem: staff at BIPOC-led nonprofits cannot find the workforce development tools built for them, at a cost of $5,000 to $10,000 per person per year. No existing research program has targeted this specific gap with a measurement instrument and intervention.

The gap this lab fills is the space between the critique and the instrument. Many researchers have named the problem. No one has built the thermometer.

---

## Potential Funders and Partners

### Federal Agencies

**National Science Foundation, Directorate for Technology, Innovation and Partnerships**
NSF's Smart and Connected Communities (S&CC) program (NSF 25-527) funds exactly this type of research: technology-mediated interventions in community resource access with rigorous measurement. The Proximity Index plus PolarityGPS is a textbook S&CC project. NSF's Racial Equity in STEM Education program (EDU Racial Equity, NSF 22-634) is also potentially relevant for the workforce development aim.

**National Endowment for the Arts, Challenge America and Research Grants**
NEA's Challenge America grants specifically target "organizations with projects to reach historically underserved communities with rich and dynamic cultural identities." PolarityGPS is exactly this project. The NEA's research grant programs also fund investigations of how communities access arts and cultural resources, which is a narrow reframe of Aim 1.

**Institute of Museum and Library Services**
IMLS funds research on information access and community-centered collections. The Proximity Index's methodology for measuring what community-produced cultural content platforms surface is within IMLS's scope, particularly given MUSEOFRI's partnership.

---

### Foundations

**Robert Wood Johnson Foundation**
RWJF's 2025 Exploring Equitable Futures call explicitly invites proposals on "how artificial intelligence and decreasing trust in institutions impact efforts to transform the Health Science Knowledge System." The Proximity Index is a knowledge access instrument. The workforce development arm of Aim 2 has direct health-adjacent implications (health literacy, community health worker training resources). RWJF is the strongest foundation fit.

**Knight Foundation**
Knight funds research on how digital technologies impact how people seek and share information, with an emphasis on informed and engaged communities. The Proximity Index is precisely a measure of how well that information-seeking process functions for marginalized communities. Knight's journalism and information-society programs are the most natural entry point.

**W.K. Kellogg Foundation**
WKKF's four grantmaking priorities (education, health, food and workforce systems) map directly onto the nonprofit workforce development focus of Aim 2. Kellogg funds in communities facing racial inequity and low philanthropic access, which describes the Providence pilot context exactly.

**MacKenzie Scott / Yield Giving**
Scott's explicit criterion is to "pay special attention to organizations in communities facing high projected food insecurity, high measures of racial inequity, high local poverty rates and low access to philanthropic capital." Polarity Lab's research addresses the last criterion directly: low access to philanthropic capital is partly a discoverability problem. This is not a typical grant relationship but is a plausible general operating support target as the work matures.

**Surdna Foundation**
Surdna's Thriving Cultures program funds projects at the intersection of arts, culture, and community power, with an explicit focus on BIPOC-led organizations. PolarityGPS's cultural discovery mission and the Proximity Index's application to cultural production make this a strong fit.

---

### Institutional Partners

**MUSEOFRI (Providence, RI)**
Already a pilot partner. MUSEOFRI represents the institutional voice of small BIPOC-led nonprofits in Rhode Island and is essential for community validation, participant recruitment in Aims 2 and 3, and translation of findings into policy.

**GOODhumanz / J'Juan Wilson Jr. (Providence, RI)**
Co-investigator. Wilson's Closing the Gap whitepaper and on-the-ground relationships in the Providence workforce development ecosystem are foundational to Aim 2.

**Brown University School of Public Health**
Community-based participatory research expertise, IRB infrastructure, and faculty partnerships in health equity measurement (relevant to Aim 3's use of validated community-connectedness scales). Brown's proximity to the field site is also an asset.

**MIT Media Lab**
The Media Lab's work on algorithmic auditing (Buolamwini's Algorithmic Justice League was founded here) and its track record with community-facing technology research make it a credible external validation partner for Aim 1. A co-PI relationship would substantially strengthen any federal grant application.

**Candid (formerly Foundation Center + GuideStar)**
Candid holds the most comprehensive dataset of nonprofit organizational output and demographics in the United States. A data partnership with Candid for Aim 2's organizational dataset would dramatically accelerate the work and increase its generalizability.

---

## Next Steps

The team's immediate priorities, in order:

1. **Formalize the Proximity Index methodology documentation.** Before external validation can begin, the Index methodology needs to be written as a technical protocol. This means specifying the query procedures for each discovery platform, the coding rubric for categorizing community relevance of surfaced results, and the scoring formula. Target: a methodology paper suitable for submission to a measurement-focused venue (e.g., *Journal of the American Society for Information Science and Technology* or an ACM CHI workshop). Timeline: 60 days.

2. **Build the Providence baseline dataset.** Extend the MUSEOFRI 2026 pilot into a full Providence baseline: a structured inventory of community-produced cultural and civic outputs (using Candid, IRS 990 data, and MUSEOFRI's organizational network) paired with documented platform query results. This is the raw material for Aim 1 and the submission data for initial grant applications. Timeline: 90 days.

3. **Submit a letter of inquiry to RWJF's Exploring Equitable Futures program.** The current call's framing around AI's impact on knowledge access is the strongest near-term funding match. A letter of inquiry grounded in the pilot data, the Closing the Gap whitepaper, and the MUSEOFRI Pain Points Report can be submitted without waiting for formal validation. Timeline: 45 days.

4. **Initiate an academic partnership conversation with Brown School of Public Health.** The IRB infrastructure and measurement expertise Brown can provide are blocking dependencies for Aim 3. This conversation should begin while methodology documentation is underway. Timeline: 30 days.

5. **Instrument PolarityGPS for research-grade data collection.** Aim 3 requires usage logs, session data, and a platform query API. The PolarityGPS engineering team needs to be briefed on the research requirements and a data collection architecture designed with IRB compliance from the beginning. Timeline: 90 days, concurrent with items 1 and 2.

---

*This document was prepared by the Polarity Lab research team, April 2026. It is intended for advisor review, collaborator briefing, and foundation prospecting. It should be treated as a living document and updated as the methodology evolves and pilot data matures.*
