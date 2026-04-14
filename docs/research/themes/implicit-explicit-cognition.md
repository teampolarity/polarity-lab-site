# Implicit vs. Explicit Cognition — Cross-Lab Methodological Thread

**Polarity Lab**
**Document Version:** April 2026
**Status:** Working document — foundational to all instrument design across the lab

---

## What This Document Is

This is the epistemological foundation for why the lab's instruments are designed the way they are. Every measurement choice the lab makes -- revealed preference over self-report, behavioral signals over stated preference, neural correlates over questionnaires, computer vision over interviews -- follows from a single theoretical commitment about the nature of suppression and what can recover authentic capacity from it.

---

## The Problem With Asking

The lab's central claim is that designed environments suppress authentic capacity. If that is true, then asking people what their authentic capacity is will not recover it. The suppression operates below the level at which the person can accurately report on it.

This is not a methodological inconvenience. It is the mechanism of suppression itself. A person who has been listening to algorithm-curated music for five years does not know what their unmediated taste sounds like -- not because they are being evasive or inarticulate, but because the authentic signal has been progressively replaced by the algorithm-trained signal and they cannot separate the two through introspection. A person who has restructured their cognitive life to serve a productivity system's compliance requirements does not know what their genuine executive function looks like without the system, because they have not exercised it independently in years. The clinical AI that has been trained on socially optimized outputs does not have access, through its output layer, to what it suppressed.

Self-report in each case returns the suppressed state, not the authentic state. The person tells you what the environment has trained them to believe about themselves. The instrument needs a different channel.

---

## The Dual-Process Framework

The theoretical foundation is dual-process cognition, formalized by Kahneman in *Thinking, Fast and Slow* (2011) but developed across decades of cognitive and social psychology research.

**System 1** (implicit, automatic): Fast, associative, pattern-based, emotionally loaded, largely inaccessible to conscious introspection. This is where authentic preference lives. The immediate draw toward a piece of music before evaluation begins. The micro-expression that precedes the composed response. The posture that opens before the person has decided how to present themselves. The intuition that the diagnosis is wrong before the social pressure to agree has been registered.

**System 2** (explicit, deliberate): Slow, rule-governed, linguistically mediated, consciously accessible. This is where self-report comes from. And this is also where suppression operates. The environment trains System 2 -- through reward structures, social feedback, optimization metrics -- to override or ignore System 1 signals. The person learns to discount their immediate response in favor of the environment's preferred output.

The suppression the lab documents is System 2 overriding System 1, trained by an environment that rewards compliance over authenticity. The instruments need to access System 1 directly, bypassing the System 2 filter that has been shaped by the suppressive environment.

That is why:
- StyleDNA infers preference from image response rather than asking people to describe their style
- The FEM looks for micro-expressions and behavioral signals rather than relying on subjects' accounts of how authentic they felt
- The IΔ examines intermediate layer representations rather than taking the model's output at face value
- The CGM uses behavioral and physiological signals rather than self-reported taste ratings
- The CRM measures actual executive function output rather than asking whether the system feels helpful

Each instrument is designed to access the System 1 signal that the suppressive environment has trained System 2 to suppress or override.

---

## Foundational Literature

**Kahneman, D. (2011).** *Thinking, Fast and Slow.* Farrar, Straus and Giroux.
The accessible synthesis of dual-process theory. Chapters on availability, anchoring, and the planning fallacy document how System 2 rationalizes rather than accurately reports System 1 processes.

**Greenwald, A. G., & Banaji, M. R. (1995).** Implicit social cognition: Attitudes, self-esteem, and stereotypes. *Psychological Review, 102*(1), 4-27.
The foundational paper on implicit cognition. Attitudes and self-assessments that people cannot accurately report on conscious inquiry are measurable through behavioral and reaction-time methods. The Implicit Association Test is the methodological demonstration that stated and implicit preferences diverge systematically.

**Nisbett, R. E., & Wilson, T. D. (1977).** Telling more than we can know: Verbal reports on mental processes. *Psychological Review, 84*(3), 231-259.
The empirical demonstration that people's verbal accounts of why they did or preferred something are often post-hoc confabulations rather than accurate introspective reports. People have limited access to their own cognitive processes. This is the foundational argument for why self-report fails as a measure of authentic preference.

**Strack, F., & Deutsch, R. (2004).** Reflective and impulsive determinants of social behavior. *Personality and Social Psychology Review, 8*(3), 220-247.
A dual-process model focused on the interaction between reflective and impulsive systems in behavior. The impulsive system (System 1 equivalent) is activated by stimulus features automatically; the reflective system (System 2 equivalent) is activated by intentions and beliefs. Behavior is the outcome of both. Environmental design that consistently rewards reflective compliance will suppress impulsive (authentic) response over time.

**Bargh, J. A., & Chartrand, T. L. (1999).** The unbearable automaticity of being. *American Psychologist, 54*(7), 462-479.
Documents the pervasiveness of automatic, nonconscious processing in everyday behavior. Most behavior is not consciously chosen -- it is automatically triggered by environmental cues. This is directly relevant to how suppressive environments train behavior without the person's awareness: the training happens at the level of automatic response, below the threshold of conscious deliberation.

---

## Implications for Each Instrument

**IΔ:** The gap between what the model internally represents and what it outputs is an AI-system version of the implicit-explicit gap. The model's intermediate layers (accessible through mechanistic interpretability techniques) are the System 1 signal. The output is System 2 -- what social training has shaped the model to say. The IΔ is literally measuring the distance between these two processing levels.

**CGM (working name, direction not confirmed) (WAXFEED):** Authentic taste is a System 1 signal. Algorithm-trained preference is a System 2 construction -- the rationalized account of what I like based on what I have been consistently exposed to and rewarded for engaging with. The working instrument concept needs to measure the System 1 signal (immediate response to unfamiliar music, pre-evaluation) and compare it to the stated preference (System 2). The gap is the cognitive suppression.

**SAM (working name, direction not confirmed) (Phresh):** StyleDNA is a System 1 measurement instrument. Image selection before analysis or categorization activates aesthetic response at the automatic, pre-reflective level. The 33-dimension mapping is derived from this System 1 signal. The conventional algorithm's surface is a System 2 environment -- it presents what has been promoted, categorized, and approved, which is what the person's reflective system has learned to expect. The working instrument concept measures the gap between authentic System 1 aesthetic response and algorithm-trained System 2 preference.

**FEM (working name, direction not confirmed) (AVDP):** Authentic expression is a System 1 output -- spontaneous, pre-composed, affectively immediate. Format compliance is System 2 -- the learned behavior of performing for the format's requirements. Micro-expressions, disfluencies, postural openness are System 1 signals. Composed delivery, on-message framing, and performed authenticity are System 2. The working instrument concept needs to measure the balance between the two under different format conditions.

**CRM (working name, direction not confirmed) (Cosmos):** Genuine executive function -- initiating action toward authentic goals, sustaining attention on what matters, managing time in ways that reflect actual priorities -- is not what productivity systems measure. They measure System 2 compliance: did you complete the task you scheduled, did you maintain the habit you committed to, did you keep the system fed? The working instrument concept is aimed at measuring whether Cosmos restores the System 1 capacity -- the intrinsic motivation, the authentic prioritization, the genuine cognitive engagement -- that conventional systems suppress by demanding System 2 compliance in its place.

**Proximity Index (working name, direction not confirmed) (GPS):** Authentic community connection is a System 1 phenomenon -- felt sense of belonging, spontaneous mutual recognition, the implicit social trust that develops through shared physical environment and repeated unplanned contact. Platform-mediated connection is System 2 -- consciously managed, metrics-tracked, deliberately maintained. The working instrument concept is aimed at measuring the System 1 signal in community.

---

## The Methodological Commitment

The lab is committed to measuring authentic capacity at the System 1 level wherever possible, using System 2 measures (self-report, stated preference, conscious reflection) only as supplementary signals rather than primary outcomes. This commitment has three consequences:

**1. Instrument complexity.** System 1 measures require behavioral, physiological, neural, or computational channels rather than surveys. They are more expensive to build and validate. They are also more defensible against the objection that the lab is just measuring what people say, which can always be attributed to social desirability, framing effects, or researcher influence.

**2. Stronger falsifiability.** A gap between System 1 and System 2 signals that closes after counter-environment exposure is stronger evidence than a gap in self-reported satisfaction ratings. System 1 signals are harder to fake, harder to be influenced by demand characteristics, and harder to dismiss as artifacts of measurement.

**3. Cross-domain generalizability.** The dual-process framework is domain-general. It applies to music taste, style identity, clinical judgment, expressive behavior, executive function, and community connection for the same theoretical reason in each case. This is why the lab's instruments, despite measuring different things, share a structural logic: they are all trying to recover System 1 signals that suppressive environments have trained System 2 to override.

---

*Living document. Update as instrument designs are finalized and as the measurement methodology for each project is validated. This document is the methodological anchor for the theoretical framework -- read alongside `theoretical-framework.md`.*
