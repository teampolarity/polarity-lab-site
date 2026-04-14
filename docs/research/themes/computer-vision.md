# Computer Vision — Cross-Lab Methodological Thread

**Polarity Lab**
**Document Version:** April 2026
**Status:** Working document — methodological thread active across Phresh and AVDP; implications for other projects under development

---

## What This Document Is

This is not a research program document. It is a map of a methodological capability that runs across multiple lab projects and whose cross-project implications are more significant than any single project realizes in isolation. It is intended for the Technical Director, domain leads, and any collaborator whose work touches visual inference, image analysis, or behavioral signal extraction.

---

## The Core Methodological Argument

Every instrument the lab builds has the same weak link: self-report. When you ask someone what they authentically prefer, you get a mixture of actual preference, social desirability bias, category habit, and whatever the environment has already trained them to expect. The person who has been listening to algorithm-curated music for five years does not know what their unmediated taste sounds like. The person who has been buying algorithm-surfaced fashion does not know what their authentic style identity looks like. The clinical AI that has been trained on socially optimized outputs does not know what unmediated clinical judgment sounds like. Self-report cannot cleanly recover what suppression has obscured.

Computer vision offers a partial solution. Revealed preference derived from behavioral response to visual stimuli is closer to authentic preference than stated preference. What a person is drawn to before they have time to rationalize it — which images they select, how long they look, what micro-expressions or postural shifts accompany engagement — reflects the authentic signal more directly than what they say they like.

This is not a novel claim in cognitive science. It is the basis for much of visual attention research, implicit association testing, and affective computing. What is novel is applying it as the measurement methodology for authentic preference recovery across multiple suppression domains simultaneously.

---

## Where Computer Vision Appears Across the Lab

### Phresh — Style Authenticity Measure

The StyleDNA process is already doing revealed preference inference from image response. Users view 20 fashion images and progressively narrow selections. The system maps preferences across 33 style dimensions without questionnaires. The person does not name what they like — the system infers it from what they are drawn to.

Computer vision deepens this in two directions:

**SAM baseline measurement.** The Style Authenticity Measure requires a baseline that captures what conventional algorithms have already shaped before Phresh onboarding. Computer vision applied to a person's existing digital wardrobe (saved items, purchase history, social media fashion content) could provide an objective read of algorithm-trained drift — what the environment has been surfacing and what the person has been absorbing — separate from what StyleDNA captures as the authentic signal. The gap between those two is the SAM.

**Preference drift detection.** Over time, computer vision analysis of how StyleDNA evolves can detect whether authentic preferences are shifting or stabilizing. Stabilization after onboarding is the expected counter-environment effect. Drift in a consistent direction would indicate that even Phresh is training preference rather than modeling it — a critical quality control signal for the instrument.

### AVDP — Format Effectiveness Measure

The Format Effectiveness Measure distinguishes authentic expression from format-suppressed output. Currently the FEM relies substantially on self-report: subjects describe how they felt in each format, what they were able to say or not say, how close the output felt to authentic expression. That is a valid measurement approach. It is not sufficient alone.

Computer vision applied to footage analysis provides a behavioral channel that does not depend on the subject's ability to articulate what they experienced:

- **Micro-expression analysis**: spontaneous emotional expressions (Ekman's action units, FACS-coded) that appear and disappear in under 250ms are largely involuntary. They reflect genuine affective state in ways that composed self-presentation does not. The hypothesis is that counter-format environments produce more spontaneous micro-expressions and fewer composed or suppressed ones.
- **Body language and postural alignment**: open vs. closed postures, forward lean, gestural fluency, eye contact patterns — all behavioral correlates of authentic engagement vs. performed or constrained expression.
- **Spontaneous vs. composed speech indicators**: disfluencies, self-interruptions, genuine laughter, unplanned elaborations are markers of authentic cognitive engagement. Highly polished, on-message delivery is a marker of format compliance. Computer vision (combined with audio analysis) can distinguish these without asking the subject.

The FEM with a behavioral computer vision layer is a substantially stronger instrument than the FEM on self-report alone. It also opens a publication pathway that conventional film studies and media psychology cannot access: objective behavioral measurement of format effects on authentic expression.

### Cross-Project: Revealed Preference as Lab Methodology

If the lab can demonstrate across two or more domains that image-response-derived or behavior-derived preference measures are more predictive of authentic behavior than self-report, that is itself a methodological contribution worth publishing independently of any single domain finding.

A paper titled something like "Revealed Preference via Visual Response as a Measure of Authentic Preference Across Suppression Domains" — drawing on Phresh data (fashion), AVDP data (expressive behavior), and potentially WAXFEED data if audio-visual listening behavior is instrumented — would position the lab as contributing to preference measurement methodology, not just building counter-environments in individual domains.

This is the highest-leverage use of the computer vision thread. It turns a technical capability into a theoretical contribution.

---

## Technical Considerations for the Technical Director

Computer vision work across the lab does not need to be built from scratch. The relevant capabilities are available through existing models and frameworks:

- **Visual preference inference**: CLIP-based embeddings for style dimension mapping; fine-tunable on StyleDNA data
- **Facial action unit detection**: OpenFace, MediaPipe Face Mesh for FACS-coded expression analysis in AVDP footage
- **Behavioral signal extraction**: pose estimation (MediaPipe, OpenPose) for postural analysis; disfluency detection via Whisper + prosodic analysis for speech markers
- **Attention and gaze**: webcam-based gaze estimation (L2CS-Net, GazeML) for revealed preference during image selection

The key architectural decision is whether to build a shared computer vision service layer that both Phresh and AVDP consume, or to build separately and converge later. Given the Technical Director's cross-lab scope, a shared layer is the right call if the timelines align. It prevents the two projects from building parallel infrastructure that cannot talk to each other.

---

## Open Questions

- Can the StyleDNA image-response methodology generalize to other sensory domains beyond fashion? WAXFEED currently relies on self-report and listening behavior. A visual version (album art, concert footage, artist imagery) could provide a revealed preference channel for music taste that doesn't depend on explicit ratings.
- What is the IRB pathway for computer vision analysis of facial expressions and body language in AVDP footage? Subjects consent to being filmed. Do they separately consent to automated behavioral analysis? This needs to be clarified before the FEM instrument layer is designed.
- Is there a GPS application? Spatial behavior (movement patterns, dwelling, social clustering) is a form of revealed preference for community. Computer vision applied to physical space observation could supplement the Proximity Index's survey-based methods.

---

*Living document. Update as computer vision capabilities are scoped into Phresh and AVDP instrument layers. Technical Director is the primary owner of cross-project coordination on this thread.*
