# WAXFEED — Research Program

**Executive Director:** Theodore Addo, Polarity Lab
**Domain Lead:** Shadrack Annor
**Document Version:** April 2026
**Status:** Working draft — for advisor, collaborator, and funder review

---

## The Question

What has algorithmic music recommendation suppressed in your musical identity, and what does the return of authentic taste look like?

This question has a precise shape. Every major music platform constructs a listening history, derives a taste profile, and uses that profile to predict what you want to hear next. The prediction is trained on what you have engaged with before. Engagement is not the same as authentic preference. Engagement is a behavioral output shaped by what you were shown, when you were shown it, how the interface framed it, and what you were doing at the time. Over years of platform use, the gap between what the recommendation system predicts you want and what you would choose from a position of genuine awareness of your own taste grows. The platform reinforces the gap by interpreting your engagement as confirmation of its model. The model shapes your next encounter. Your next encounter trains the model further.

At some point the person listening is no longer discovering music. They are receiving confirmation of a prediction about themselves that was built from the engagement history of a person who was already receiving confirmation of a prediction. Genuine musical identity — the taste that exists independent of algorithmic mediation — has gone somewhere. This lab exists to measure where, and to prove it can come back.

The **Cognitive Gap Measure (CGM, working name — instrument direction not yet confirmed)** is the proposed instrument. WAXFEED is the counter-environment. The platform is designed to surface what the recommendation system has suppressed. The CGM is designed to measure whether it does, pending instrument validation.

---

## Institutional Context

Polarity Lab's thesis is that designed environments have a second threshold. Below it, the environment extends the capacity it was built to serve. Beyond it, the optimization for the environment's own metrics diverges from the underlying human capacity those metrics were meant to represent — and the environment begins to suppress what it was built to develop.

Music recommendation platforms crossed the second threshold when their optimization for engagement became, in effect, optimization against authentic taste. Not by malicious design. By the structural feature of training on engagement: engagement is a noisy proxy for preference, and a model trained on engagement at scale learns to optimize for the proxy rather than the thing itself.

Each lab at Polarity builds either a diagnostic instrument or a therapeutic environment. The WAXFEED Lab builds both.

The **Cognitive Gap Measure (CGM)** is the proposed diagnostic instrument (working name; instrument design not yet confirmed, no validated scores exist). It is designed to produce a scalar score representing the signed gap between what a recommendation environment predicts a listener wants and what that listener's genuine taste response actually is. A CGM score of zero would mean the recommendation environment's model of the person matches the person's own authentic preference. A large positive CGM score would mean the platform's model has diverged from the person — that there is measurable authentic musical identity that the platform's predictions do not account for.

**WAXFEED** is the corresponding therapeutic environment. It is a music discovery platform designed to build a cognitive profile from listening behavior and surface what the recommendation environment has suppressed. The platform is the counter-environment. The CGM is designed to measure whether it works. The before-and-after is the intended proof.

This research program designs, validates, and applies the Cognitive Gap Measure, and tests WAXFEED as the intervention that closes it.

---

## Foundational Literature

The following works form the theoretical and empirical base of this program.

---

### On Music, Identity, and Authentic Taste

**1. DeNora, Tia. *Music in Everyday Life.* Cambridge University Press, 2000.**

DeNora argues that music is not merely a cultural product but a social technology — a resource people use to organize emotional states, coordinate action, and construct identity. Music is an affordance environment: it structures what people do and feel. Identity construction through music is an active, ongoing process, not a static trait.

*Relevance:* If musical identity is actively constructed through ongoing engagement with music, it is also actively constructed through the mediation of discovery platforms. The platform is not a neutral conduit. It is an environment that shapes what musical identity becomes. This theoretical foundation establishes that CGM is not measuring a static preference trait — it is measuring the gap produced by an active environmental suppression.

---

**2. Frith, Simon. "Music and Identity." In *Questions of Cultural Identity,* edited by Stuart Hall and Paul du Gay. Sage Publications, 1996, pp. 108-127.**

Frith argues that music's primary social function is the construction of group and personal identity. This identity construction happens through the social experience of music — how you encounter it, with whom, in what context. Authentic taste is not a fixed internal attribute but a relational and contextual one.

*Relevance:* Authentic taste exists in relation to discovery context. An algorithm that strips social and contextual discovery in favor of predicted preference is not merely offering different music — it is intervening in the process by which musical identity forms. CGM measures the cumulative result of that intervention.

---

**3. Prey, Robert. "Nothing Personal: Algorithmic Individuation on Music Streaming Platforms." *Media, Culture and Society,* vol. 40, no. 7, 2018, pp. 1086-1100.**

Prey examines how Spotify's recommendation system constructs algorithmic individuation: a mode of personalization that presents music as uniquely matched to you while erasing the social and collective dimensions of musical taste. Streaming platforms present music as personal discovery while concealing the social infrastructure through which preferences actually form.

*Relevance:* This is the closest existing description of the mechanism WAXFEED is designed to counter. Algorithmic individuation constructs a version of the listener that serves the platform's optimization target. That constructed version is what the recommendation system calls your taste. The Cognitive Gap Measure is the instrument that names the distance between that construction and the authentic thing.

---

**4. Sacks, Oliver. *Musicophilia: Tales of Music and the Brain.* Knopf, 2007.**

Sacks documents through clinical cases the deep embeddedness of musical memory and response in cognitive architecture — involuntary musical imagery, earworms, the survival of musical recognition in advanced dementia. Musical identity is not primarily a preference system. It is a memory and identity system, neurologically deep and resistant to suppression.

*Relevance:* If musical identity has neurological depth, the CGM is measuring the distance between a platform's behavioral model and something with genuine cognitive structure. Recovery of suppressed musical identity is not merely preference revision — it is a return to cognitively deep material. This frames the WAXFEED intervention as authentic recovery rather than novelty exposure.

---

### On Recommendation Systems and Taste Suppression

**5. Schedl, Markus, Emilia Gómez, and Julián Urbano. "Music Information Retrieval: Recent Developments and Applications." *Foundations and Trends in Information Retrieval,* vol. 8, no. 2-3, 2014, pp. 127-261.**

This technical review maps algorithmic music systems and documents their persistent limitations, including popularity bias, filter bubble effects, and the structural absence of authenticity or identity-depth as recommendation signals.

*Relevance:* Establishes the technical gap WAXFEED addresses. No current music recommendation architecture treats the gap between behavioral history and authentic preference as a measurable quantity. CGM is the first instrument to operationalize that gap.

---

**6. Celma, Òscar. *Music Recommendation and Discovery: The Long Tail, Long Fail, and Long Play.* Springer, 2010.**

Celma documents the popularity bias problem in music recommendation: algorithms systematically surface popular artists, narrowing the listener's exposure to a smaller slice of available music over time. Users who rely heavily on recommendation systems develop narrower listening profiles than users who engage in active discovery.

*Relevance:* This is the longitudinal mechanism of taste suppression. The CGM captures the state of that suppression at a point in time. The validation study design must account for the temporal dynamics Celma documents: suppression is not a single event but an accumulating divergence.

---

**7. Anderson, Ashton, Lucas Maystre, Ian Anderson, Rishabh Mehrotra, and Mounia Lalmas. "Algorithmic Effects on the Diversity of Consumption on Spotify." *Proceedings of the Web Conference 2020.* ACM, 2020.**

An empirical analysis of 100,000 Spotify users found that users who relied more heavily on algorithmic recommendations showed lower diversity in their listening profiles over time, while users who engaged more in active discovery maintained or increased diversity. The study found this effect was independent of initial taste profile.

*Relevance:* This is the strongest direct empirical evidence for the suppression mechanism CGM is designed to measure. The diversity reduction Andersen et al. document is the behavioral correlate of increasing CGM. As the recommendation system narrows what a listener encounters, the gap between the platform's model and the listener's authentic broader taste grows. The Andersen et al. study observes the outcome; CGM measures the gap that produces it.

---

**8. Nguyen, Tien T., et al. "Exploring the Filter Bubble: The Effect of Using Recommender Systems on Content Diversity." *Proceedings of the 23rd International Conference on World Wide Web,* ACM, 2014, pp. 677-686.**

This paper contributes a metric for measuring content diversity at the individual level and examines the temporal dynamics of recommendation systems on what users encounter, finding measurable reductions in content diversity as users engage more with recommendation systems.

*Relevance:* Direct methodological precedent for CGM. The authors operationalize a content diversity gap between predicted and encountered content. CGM extends this framework by measuring not just what the listener encounters but the gap between algorithmic prediction and authentic preference response — what they genuinely want, independent of what they've been shown.

---

### On Authentic Preference and Its Measurement

**9. Kahneman, Daniel. *Thinking, Fast and Slow.* Farrar, Straus and Giroux, 2011.**

Kahneman's dual-process theory distinguishes automatic, fast cognition (System 1) from deliberate, slow cognition (System 2). Preferences formed under conditions of low cognitive load and environmental priming are systematically different from preferences formed under conditions of deliberate reflection. Music recommendation systems are optimized for System 1 engagement — immediate response to presented stimuli.

*Relevance:* The CGM measures the gap between System 1 engagement-based preference (what the algorithm has learned from behavioral history) and something closer to System 2 authentic preference (what the listener, given genuine awareness and choice, actually wants). The counter-environment WAXFEED builds must create conditions for System 2 taste engagement — slow, reflective, genuinely chosen — to produce data that differs meaningfully from System 1 behavioral history.

---

**10. Loewenstein, George, Ted O'Donoghue, and Matthew Rabin. "Projection Bias in Predicting Future Utility." *Quarterly Journal of Economics,* vol. 118, no. 4, 2003, pp. 1209-1248.**

Documents projection bias: the systematic tendency to overweight current preferences when predicting future preferences, and to underweight the degree to which preferences will change. Applied to music platforms: algorithmic systems trained on current behavioral history systematically underweight the listener's capacity for genuine taste development and preference change.

*Relevance:* Recommendation systems exhibit institutional projection bias — they encode the listener's current (algorithm-shaped) preferences and project them forward, reducing the probability of the genuine taste discovery that would reveal the gap. This is the structural mechanism that makes suppression self-reinforcing. The CGM must account for this: a low CGM score might reflect genuine alignment or it might reflect a listener whose authentic preferences have been successfully compressed toward their algorithmic profile.

---

**11. Rentfrow, Peter J., and Samuel D. Gosling. "The Do Re Mi's of Everyday Life: The Structure and Personality Correlates of Music Preferences." *Journal of Personality and Social Psychology,* vol. 84, no. 6, 2003, pp. 1236-1256.**

Rentfrow and Gosling develop the MUSIC (Mellow, Unpretentious, Sophisticated, Intense, Contemporary) taxonomy of music preference dimensions and establish their relationship to personality traits and identity characteristics. Musical preference has measurable structure that is independent of listening history.

*Relevance:* The CGM validation requires an external criterion for authentic musical preference that is independent of behavioral listening history. Rentfrow and Gosling's MUSIC taxonomy, combined with personality and identity measures, provides a baseline against which the CGM can be validated: does a listener's authentic preference profile (as estimated from CGM-based WAXFEED discovery) align better with their personality-predicted MUSIC profile than their algorithm-generated profile does?

---

**12. Cook, D.A., and T.J. Beckman. "Current Concepts in Validity and Reliability for Psychometric Instruments: Theory and Application." *The American Journal of Medicine,* vol. 119, no. 2, 2006, pp. 166.e7-166.e16.**

A methodological reference for the psychometric standards that any new measurement instrument must meet: content validity, response process validity, internal structure validity, relationship to other variables, and consequences. Applied to the CGM: what constructs it claims to measure, how those constructs are operationalized, what reliability coefficients are needed for the instrument to be scientifically credible.

*Relevance:* The CGM is a new psychometric instrument. This paper provides the validation framework. Aim 1 of this research program follows this framework explicitly.

---

## Research Aims

### Aim 1: Define and Validate the Cognitive Gap Measure as a Reproducible Instrument

**Specific Aim:** To develop a psychometrically valid and reliable Cognitive Gap Measure — a signed scalar score for the gap between a music recommendation system's behavioral model of a listener and that listener's authentic musical preference — and establish normative values, test-retest reliability, and convergent validity against independent preference measures.

**Background and Significance**

No existing instrument measures the gap between algorithmic prediction and authentic musical preference. Existing music recommendation research measures behavioral engagement (clicks, streams, skips) and content diversity, but not the divergence between the recommendation system's model of the listener and the listener's genuine taste. The CGM closes this gap.

The CGM requires precise specification of two quantities: the recommendation system's prediction (estimable from the listener's behavioral history on the platform) and the listener's authentic preference response (not estimable from behavioral history — this is what the counter-environment is designed to surface). The gap between them, when systematically nonzero, represents taste suppression.

**Approach**

*Operationalizing Authentic Preference.* The methodological challenge is producing an authentic preference signal that is independent of platform behavioral history. WAXFEED's counter-environment approach addresses this through three mechanisms: (1) novel music presentation — exposing listeners to music their recommendation history has not surfaced, measuring genuine first-encounter response; (2) forced-choice preference tasks under no-recommendation conditions — presenting matched pairs of tracks with no platform context and recording deliberate choice; (3) physiological response indexing — measuring arousal and valence responses to novel tracks as a preference signal independent of behavioral engagement.

*Scoring the CGM.* For each listener, the CGM is computed as the difference between their recommendation system's predicted preference distribution (estimated from behavioral history) and their authentic preference distribution (estimated from the counter-environment tasks above). The signed gap is expressed as a KL divergence between the two distributions, normalized to a 0-1 scale.

*Validation.* Construct validity: does the CGM correlate with the listener's MUSIC taxonomy profile (Rentfrow and Gosling 2003) as estimated from personality measures independent of listening history? Test-retest reliability: does the CGM score remain stable at 30-day intervals in the absence of significant new listening activity? Sensitivity: does the CGM change measurably after 90 days of WAXFEED use?

*Sample.* 200 listeners recruited through direct outreach and early WAXFEED user recruitment (platform in development at time of writing). Inclusion criteria: at least 2 years of active streaming platform use on a single primary platform.

*Timeline.* 12-18 months.

**Expected Outcomes**

A published CGM instrument specification and validation study. Normative CGM values for listeners at varying levels of platform engagement duration. A validated scoring protocol enabling subsequent research to use the CGM as a standardized measure.

---

### Aim 2: Characterize the Temporal Dynamics of Taste Suppression

**Specific Aim:** To test whether CGM scores increase over time as a function of streaming platform engagement duration, and to identify the platform behavior patterns (heavy reliance on algorithmic curation vs. active discovery engagement) most predictive of high CGM.

**Background and Significance**

Taste suppression is not a binary state. It is a dynamic process. The Anderson et al. (2020) finding that algorithmic reliance reduces listening diversity over time suggests that CGM scores should increase with platform engagement duration among listeners who rely heavily on algorithmic curation. But not all platform engagement produces suppression equally: users who engage heavily in active search and social discovery may maintain lower CGM despite equivalent engagement duration. This aim tests that hypothesis and characterizes the behavioral predictors of high CGM.

**Approach**

*Cross-sectional component.* In the Aim 1 sample, correlate CGM scores with self-reported streaming engagement history: years of use, primary discovery mode (algorithmic vs. active vs. social), percentage of listening time driven by algorithmic queue. Test whether CGM increases with engagement duration, controlling for discovery mode and initial taste diversity.

*Longitudinal component.* Enroll 80 new participants at WAXFEED onboarding, compute baseline CGM, and re-administer at 6 and 12 months. Collect monthly platform usage logs (with consent). Model the trajectory of CGM change as a function of both WAXFEED use patterns and concurrent streaming platform behavior.

*Timeline.* 18-24 months, running concurrently with Aim 1.

**Expected Outcomes**

An empirically grounded characterization of the conditions under which recommendation platforms produce measurable taste suppression. A published result establishing CGM as a temporally sensitive measure that responds to platform behavior patterns, not just platform use duration.

---

### Aim 3: Test WAXFEED as a Counter-Environment That Closes the Cognitive Gap

**Specific Aim:** To test whether WAXFEED users who actively engage with the counter-environment for 90 days show significantly greater reduction in CGM scores than a waitlist control group, and to characterize the platform engagement patterns most predictive of CGM reduction.

**Background and Significance**

Aims 1 and 2 establish the problem and its measurement. This aim tests the intervention. WAXFEED is designed specifically to surface music that the recommendation environment has suppressed — to close the CGM rather than reinforce it. The hypothesis is that deliberate counter-environment use produces genuine taste recovery: not exposure to different music, but return to authentic musical identity that was present before algorithmic mediation compressed it.

**Approach**

*Design.* 120 participants with CGM > 0.4 (high suppression, identified from Aim 1). Random assignment: WAXFEED as primary discovery platform for 90 days (n=60) vs. waitlist control continuing usual platform use (n=60). CGM administered at baseline, 45 days, and 90 days.

*Primary Outcome.* Within-subject change in CGM at 90 days, compared across conditions.

*Secondary Outcomes.* Participant self-report of musical self-recognition — qualitative rating of whether discovered music feels familiar, like something they always wanted to find but didn't. Change in MUSIC taxonomy profile alignment. Self-reported sense of musical identity coherence (purpose-built scale).

*Exit Interviews.* A purposive subsample (n=20) interviewed at 90 days: Did they find music they recognized as authentically theirs? How does their WAXFEED discovery compare to their primary platform? What does the experience of authentic musical discovery feel like, as distinct from algorithmic recommendation?

*IRB.* Brown University or University of Rhode Island. Consent procedures aligned with Proximity Index Lab's existing IRB framework to enable cross-study participant enrollment where appropriate.

*Timeline.* 18-24 months following CGM instrument finalization.

**Expected Outcomes**

The first empirical test of whether a counter-environment designed against algorithmic taste suppression produces measurable authentic taste recovery. A positive result — that WAXFEED users show significantly greater CGM reduction than controls — establishes the platform as a therapeutic environment in the scientific sense Polarity Lab intends and provides the evidence base for subsequent grant funding and institutional partnerships.

---

## The Gap We Fill

Three bodies of literature converge here without producing the instrument this program builds.

The music sociology literature (DeNora, Frith, Straw) establishes that musical identity is actively constructed through discovery context. The recommendation systems literature (Schedl, Celma, Anderson et al.) establishes that algorithmic platforms narrow what listeners encounter over time and reduce diversity. The preference and psychometrics literature (Kahneman, Rentfrow and Gosling) establishes that authentic preference has measurable structure independent of behavioral history.

None of these literatures produces an instrument that measures the gap between what a recommendation system predicts a listener wants and what that listener's genuine musical identity is. The CGM does.

And no existing platform is designed to close that gap deliberately. WAXFEED does.

---

## Potential Funders and Partners

### Federal Agencies

**National Science Foundation, Human-Centered Computing**
The CGM validation study and WAXFEED intervention trial map directly onto NSF's Human-Centered Computing program: technology-mediated experience, computational measurement of human cognitive states, and empirical platform evaluation.

**National Endowment for the Arts**
NEA's research programs fund investigation of how people engage with and access cultural content. The CGM's application to authentic cultural identity and the WAXFEED intervention's effects on musical self-recognition are within NEA's research scope.

---

### Foundations

**Knight Foundation**
Knight funds research on how digital technologies impact how people seek and engage with cultural content. WAXFEED's intervention against algorithmic content narrowing is a direct fit.

**Surdna Foundation**
Surdna's Thriving Cultures program funds work at the intersection of arts, culture, and authentic community expression. The CGM's application to suppressed musical identity has direct implications for how artists from marginalized communities reach their natural audiences.

**Mozilla Foundation**
Mozilla funds independent technology research that examines the impact of algorithmic systems on human autonomy. The CGM is precisely an autonomy instrument: it measures the degree to which algorithmic systems have displaced the listener's own judgment about what they want.

---

### Institutional Partners

**AS220 (Providence, RI)**
AS220's independent music and arts ecosystem provides a population of engaged listeners with strong independent discovery habits and minimal algorithmic curation dependence — an ideal baseline population for the Aim 1 normative study and a community partner for Aim 3 recruitment.

**Rhode Island School of Design**
RISD's music and sound studies programs, combined with its design research infrastructure, provide an academic partner for the CGM instrument design and the counter-environment evaluation methodology.

**Brown University**
IRB infrastructure, music cognition expertise, and shared research infrastructure with the Proximity Index Lab's existing partnership.

**Bandcamp**
Bandcamp's artist-first data posture and its position as the platform most resistant to algorithmic individuation make it a natural partner for the authentic-discovery behavioral baseline. WAXFEED's counter-environment approach draws on the same discovery philosophy.

---

## Next Steps

1. **Lock the CGM instrument specification.** The four operational definitions — what constitutes an authentic preference response, how the prediction distribution is estimated, how the gap is scored, what a valid measurement requires — must be settled before the validation study begins. Target: internal specification document. Timeline: 30 days.

2. **Build the WAXFEED behavioral data architecture.** The validation study requires consent-based platform logs, session data, and a preference task interface. The platform instrumentation must be designed with IRB compliance from the start. Timeline: 60 days.

3. **Recruit an academic partner for the CGM validation study.** A music cognition, cognitive psychology, or information systems co-investigator at Brown or RISD would substantially strengthen the Aim 1 methodology and any federal grant application. Timeline: initial meeting within 30 days.

4. **MUSIC taxonomy baseline study.** A small (n=30) pilot comparing listeners' algorithm-estimated preference profiles against their personality-predicted MUSIC profiles will establish the construct validity hypothesis and provide power estimates for the full validation study. This can be run within WAXFEED's existing user base. Timeline: 60 days.

5. **IRB pre-consultation.** Before the full Aim 3 trial begins, a pre-submission consultation with Brown or URI's IRB will clarify consent requirements for usage log collection and the randomized platform assignment design. Timeline: 45 days.

---

*This document was prepared by the Polarity Lab research team, April 2026. For advisor review, collaborator briefing, and foundation prospecting. Living document — updated as instrument design and platform development progress.*
