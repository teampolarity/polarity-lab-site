# IP Strategy

**Polarity Lab**
**Owner:** Executive Director (decisions) + Legal (filings and counsel coordination)
**Document version:** April 2026
**Status:** Two provisionals filed. Strategy decided — see overview below.

---

## Strategy Overview

The lab's IP falls into two distinct categories that warrant different protection mechanisms.

**Category 1: Technical system inventions (the two provisionals)**

These are not instrument methodologies. They are AI/ML system methods conceived by the founder, not yet implemented in any deployed system.

| Application | Strategy | Rationale |
|---|---|---|
| 63/940,728 — cognitive biometric authentication + knowledge graph | **Convert to non-provisional + PCT** | Cognitive biometric authentication has real licensing potential in a large commercial market. The claims are technically specific. No TRIBE-equivalent prior art concern identified. |
| 63/960,633 — MEG-proxy, Bayesian associative strength, cognitive fingerprinting | **Defensive publication** | Meta TRIBE v1 (arXiv July 2025) is prior art. Surviving claims after distinguishing TRIBE would be narrow. Technology not implemented. Prosecution cost not justified. Defensive publication preserves freedom to operate and enables free publication at near-zero cost. |

**Category 2: Research methodology and instruments (CGM, IΔ, SAM, FEM, CRM, Proximity Index)**

These are not patentable under Alice (abstract scoring formulas, social science protocols). They are protected through:

| Mechanism | What it covers | Cost |
|---|---|---|
| **Copyright** | Instrument specification documents, scoring rubrics, rater training materials, software code | Automatic. Add explicit notices. |
| **Copyright-based licensing** | Commercial use of the instrument methodology requires a license. Same model as LIWC. | Contract drafting cost only |
| **Trademark** | Instrument names and platform names: Integrity Delta, IΔ, Cognitive Gap Measure, Proximity Index, WAXFEED, Polarity GPS | ~$400/class, ~$2,400 total for 6 marks |
| **OSF preregistration** | Timestamps methodology publicly before peer-reviewed publication. Establishes scientific priority. | Free |
| **Trade secret** | Specific implementation details kept confidential: clinical prompt libraries, novel track pools, rater calibration rubrics | NDA enforcement only |

---

## Current Portfolio

| Application | Title | Filed | Inventor | Deadline to convert or file PCT |
|---|---|---|---|---|
| 63/960,633 | Conversational Connectomics: Methods for Bayesian Associative Strength Estimation, MEG-Proxy Cognitive State Classification, and Integrated Cognitive Fingerprinting from Natural Language Dialogue | January 2026 | Theodore Addo | **January 2027** |
| 63/940,728 | System and Method for Neuroanatomically-Grounded Knowledge Graph Construction and Cognitive Biometric Authentication | December 2025 | Theodore Addo | **December 2026** |

Both are US provisional applications. Provisionals establish a priority date but do not mature into patents. To get patent protection, each provisional must be converted to a non-provisional US application and/or an international PCT application before the deadline. After the deadline, the provisional expires and the priority date is lost. Filing after expiration would require treating the invention as a new filing with a new priority date, which risks intervening art.

**Important framing correction:** These are not Cosmos implementation patents. The methods described in both applications are not currently implemented in Cosmos or in any other deployed lab system. They are independent inventions conceived and filed by the founder, whose relationship to Cosmos (and to other lab projects) is aspirational and architectural, not operational. This distinction matters for several reasons:

- The "reduction to practice" question: patents can be filed on a conceived invention without a working implementation, but during prosecution the USPTO may ask for evidence of working reduction to practice if claims are contested. The fact that neither invention is currently implemented means that evidence does not exist yet.
- The Cosmos framing in licensing conversations should be careful: these patents are not "what makes Cosmos work." They are inventions that could inform Cosmos's future architecture, among other applications.
- If and when these methods are implemented -- in Cosmos or elsewhere -- that implementation should be documented contemporaneously as evidence of reduction to practice.

**The December 2026 deadline is the immediate action item.** It is 8 months away. Patent prosecution takes time; working with patent counsel on the 63/940,728 conversion should begin no later than Month +3 to allow for prior art search, claim drafting, and filing preparation.

**Known prior art flag for 63/960,633:** Meta TRIBE (Trimodal Brain Encoder) -- arXiv:2507.22229, published July 29, 2025, 6 months before the January 2026 filing date. TRIBE predicts fMRI responses from received stimuli (direction: stimulus → brain response). The patent claims inference of cognitive states from produced dialogue (direction: dialogue → cognitive state). The distinction is defensible but claim drafting must be built around it. Provide this paper to patent counsel before the non-provisional for 63/960,633 is drafted. See the Prior Art Flag section below for full analysis.

---

## What the Provisionals Cover

### 63/960,633 — Conversational Connectomics (January 2026)

Full title: *Conversational Connectomics: Methods for Bayesian Associative Strength Estimation, MEG-Proxy Cognitive State Classification, and Integrated Cognitive Fingerprinting from Natural Language Dialogue*

This patent covers three distinct methods, each of which may support independent claims:

**1. Bayesian Associative Strength Estimation**
A method for estimating the probabilistic strength of associations between cognitive concepts, entities, or knowledge nodes -- derived from patterns in natural language dialogue rather than from explicit user input. "Bayesian" means the estimates are updated as new conversational data arrives, with prior strengths revised by new evidence. In the Cosmos context: the system's confidence that two things (a goal and a person, a task and a knowledge node, a behavioral pattern and a life area) are meaningfully connected to this person, expressed as a probability that is maintained and updated over time.

This is a substantive technical claim. Bayesian updating of associative strength from dialogue is specific enough to be potentially patentable as a method, separate from the general concept of a persistent user model.

**2. MEG-Proxy Cognitive State Classification**
A method for classifying a person's cognitive state -- analogous to what a magnetoencephalography (MEG) scan would reveal about neural activity patterns -- derived from natural language dialogue alone, without any neuroimaging hardware. MEG captures brain oscillation patterns associated with attention, memory encoding, cognitive load, and affective state. This method claims to infer the equivalent cognitive state classification from the linguistic and temporal features of how a person speaks and writes.

This is the most technically distinctive claim in the current portfolio and potentially the most commercially significant. MEG-based cognitive monitoring requires expensive clinical-grade hardware. A software method that approximates MEG-class cognitive state classification from conversation has applications far outside Cosmos: clinical mental health monitoring, fatigue and cognitive load detection, educational engagement assessment, human-computer interaction adaptation. The prior art landscape for "MEG-proxy from language" is likely sparse. This claim should be the centerpiece of prosecution strategy for this application.

**3. Integrated Cognitive Fingerprinting from Natural Language Dialogue**
A method for constructing a stable, unique cognitive fingerprint of an individual -- a multi-dimensional representation of their cognitive style, associative patterns, and knowledge structure -- derived from ongoing natural language dialogue. The "fingerprint" is integrated in the sense that it draws on the Bayesian associative strength estimates and MEG-proxy state classifications above to produce a composite identity representation that is both stable across time and updated by new evidence.

In the Cosmos context: this is what makes the system's model genuinely personal rather than generic. The cognitive fingerprint is what the AI assistant is building and using. Outside Cosmos, cognitive fingerprinting from dialogue has applications in authentication (see Patent 2 below), clinical monitoring, and personalized AI adaptation.

**Combined claim territory:** The three methods together describe a system that builds a cognitive model of a person from conversation that is (a) probabilistically rigorous (Bayesian updating), (b) physiologically grounded (MEG-proxy), and (c) individually distinctive (cognitive fingerprint). This is not just another "learn from conversation" patent. The neuroanatomical and physiological grounding is what distinguishes it from prior art in personalized AI.

---

### 63/940,728 — System and Method for Neuroanatomically-Grounded Knowledge Graph Construction and Cognitive Biometric Authentication (December 2025)

Full title: *System and Method for Neuroanatomically-Grounded Knowledge Graph Construction and Cognitive Biometric Authentication*

This patent covers two linked components:

**1. Neuroanatomically-Grounded Knowledge Graph Construction**
A system and method for constructing a personal knowledge graph where the structure -- node types, edge types, connectivity patterns, and organizational hierarchy -- is grounded in neuroanatomical principles: how the human brain actually organizes and relates information. Rather than using conventional folder/tag/category structures, the graph architecture mirrors the associative, hierarchical, and contextual organization of biological memory and knowledge representation.

In the Cosmos context: this is the underlying architecture of the relational system connecting tasks, goals, knowledge, people, and behavioral patterns. The neuroanatomical grounding is what makes the system capable of surfacing connections the user would not have explicitly made, and what allows the AI assistant to maintain a coherent, human-appropriate model of the person's cognitive landscape.

**2. Cognitive Biometric Authentication**
The second and commercially more significant claim: a method for using the cognitive fingerprint derived from the knowledge graph (and potentially from the conversational methods in 63/960,633) as a biometric authentication mechanism. Biometric authentication typically uses physical signals (fingerprint, face, iris, voiceprint). Cognitive biometric authentication uses a person's characteristic cognitive patterns -- how they associate concepts, how they structure knowledge, how they respond to prompts -- as a unique identifying signature.

This is a commercially substantial claim. Cognitive biometric authentication has distinct advantages over physical biometrics: it cannot be stolen by photographing a face or cloning a fingerprint; it is continuously updatable as the person's cognitive patterns evolve; and it can be performed passively through normal interaction rather than requiring a dedicated authentication gesture. Applications extend well beyond Cosmos into enterprise security, healthcare identity management, and continuous authentication systems.

**The linkage between the two components:** The knowledge graph construction method produces the cognitive representation; the authentication method uses that representation as a biometric. These are two claims in one application, which means the USPTO may issue a restriction requirement (asking the applicant to choose one for prosecution). Patent counsel should assess whether splitting into two separate applications at the non-provisional stage is strategically preferable, to allow both claims to be prosecuted independently.

**Prior art notes:** Cognitive-based authentication is an active research area. Prior art search should specifically address: behavioral biometrics (keystroke dynamics, mouse movement patterns), EEG-based authentication (existing academic literature), and cognitive challenge-response systems. The neuroanatomically-grounded construction methodology and its specific application to authentication is likely the novel element -- the prior art will have "use behavior for authentication" broadly covered, but the specific neuroanatomical grounding and knowledge graph architecture as the authentication substrate is likely more defensible.

---

## What Is and Is Not Patentable at Polarity Lab

### The hard question: are measurement instruments patentable?

The core Polarity Lab instruments (IΔ, CGM, SAM, FEM, CRM, Proximity Index) are measurement methodologies. Whether they are patentable depends on whether they constitute patentable subject matter under 35 U.S.C. § 101, which excludes abstract ideas, natural phenomena, and laws of nature.

**The Alice problem.** Post-*Alice Corp. v. CLS Bank Int'l* (2014), software and method patents must do more than implement an abstract idea on a computer. A method of computing KL divergence between two preference distributions is arguably an abstract mathematical concept. A method of extracting linguistic features from a transcript and combining them into a weighted score is arguably an abstract mental process.

**What is more likely patentable:**
- The specific technical implementation of an instrument in a deployed system (WAXFEED's forced-choice task interface + behavioral data integration pipeline; the IΔ's logit-lens extraction pipeline applied to clinical prompts)
- Novel hardware or software arrangements that enable the measurement (the FEM behavioral coding pipeline combining OpenFace FACS output with MediaPipe pose estimation and audio disfluency detection into a single scoring stream)
- The Cosmos system architecture (the two provisionals are in this territory)

**What is less likely patentable:**
- Abstract scoring formulas (KL divergence, cosine distance, set intersection ratios)
- Clinical assessment methodologies without a specific technical system claim (the IΔ measurement concept, as distinct from a specific software implementation)
- Social science research protocols (the Proximity Index COS/PDS methodology is closer to a research method than a patentable invention)

**Practical implication:** The instruments are better protected through trade secret (keeping the specific implementation details confidential until licensing) and copyright (the specification documents, scoring rubrics, and rater training materials) than through patents. The exception is if specific technical systems are built to implement an instrument -- those systems can be patented.

---


## Provisional-Specific Recommendations

These are preliminary assessments. Patent counsel must conduct prior art searches before any conversion decision is made.

### 63/940,728 — System and Method for Neuroanatomically-Grounded Knowledge Graph Construction and Cognitive Biometric Authentication (December 2026 deadline)

**Immediate action required.** This provisional expires in December 2026, 8 months from now. Prior art search and claim analysis should begin no later than Month +3.

**Preliminary recommendation:** Convert to US non-provisional and file PCT simultaneously. The cognitive biometric authentication claim in particular has significant international commercial potential -- enterprise security, healthcare identity management, and continuous authentication are global markets. PCT preserves the option to enter EU, UK, Japan, South Korea, and Canada without committing to national phase costs now.

**Restriction requirement risk.** The application contains two substantively different inventions: knowledge graph construction and biometric authentication. The USPTO is likely to issue a restriction requirement forcing election of one claim set for initial prosecution. Patent counsel should assess whether to split into two separate non-provisionals at conversion -- prosecuting knowledge graph construction and cognitive biometric authentication as independent applications, both claiming priority to the December 2025 provisional. This increases prosecution cost but allows both inventions to be prosecuted without one being held hostage to the other.

**Prior art search priorities:**
- Knowledge graph construction: search "neuroanatomically inspired knowledge representation," "brain-inspired personal knowledge management," "biologically grounded knowledge graphs"
- Cognitive biometric authentication: search "behavioral biometrics," "cognitive authentication," "EEG biometric authentication," "knowledge-based cognitive identity," "continuous authentication from interaction patterns"

The neuroanatomical grounding is likely the differentiating element in both claim families. Prior art will have both knowledge graphs and behavioral biometrics broadly covered; the specific architectural grounding in neuroanatomy is where novelty lives.

---

### 63/960,633 — Conversational Connectomics (January 2027 deadline)

**Decision: Defensive publication. Do not convert to non-provisional.**

**Rationale:**
- Meta TRIBE v1 (arXiv:2507.22229, July 2025) is confirmed prior art. Claims must be narrowed significantly to distinguish. Narrow claims reduce commercial licensing territory.
- The technology is not implemented. Prosecution cost ($15-25K) is not justified against speculative future licensing value from narrow claims.
- Defensive publication achieves the most important goal -- no competitor can ever patent MEG-proxy cognitive state classification, Bayesian associative strength estimation, or cognitive fingerprinting from dialogue -- at near-zero cost and without blocking publication.

**How to execute defensive publication:**
Submit a detailed technical disclosure to [Research Disclosure](https://www.researchdisclosure.com) or [IP.com](https://ip.com). The disclosure should describe each of the three methods (Bayesian associative strength estimation, MEG-proxy cognitive state classification, integrated cognitive fingerprinting) with sufficient technical detail that a person skilled in the art could implement them. Once published, this becomes prior art against any future filer worldwide.

Cost: approximately $500-$1,500 for Research Disclosure submission, or free via arXiv preprint (which also constitutes prior art).

**Timing:** Submit before January 2027. The provisional's priority date does not matter for defensive publication -- what matters is publishing before anyone else files a patent on similar claims. Given TRIBE v1 is already public, the most urgent risk is a competitor filing a narrow patent that carves out specific territory. Publish the detailed disclosure within 60 days.

**What happens to the provisional:** Let 63/960,633 lapse after defensive publication is confirmed. The priority date is no longer needed once the defensive publication establishes prior art.

**Prior art flag: Meta TRIBE**

TRIBE (Trimodal Brain Encoder) is a Meta FAIR research project that is prior art to 63/960,633 and must be addressed in the non-provisional claim strategy before conversion.

**What TRIBE is:**
TRIBE is a deep neural network that predicts fMRI brain responses to naturalistic stimuli -- video, audio, and text. Given a movie clip or text passage, TRIBE predicts the spatial pattern of fMRI voxel activations the stimulus would produce in a human brain. It combines LLaMA 3.2 (text), V-JEPA2 (video), and Wav2Vec-BERT (audio) into a unified Transformer architecture that maps multimodal representations onto the cortical surface.

**Publication timeline:**
- TRIBE v1 paper: arXiv July 29, 2025 -- **6 months before** the January 2026 filing of 63/960,633. This IS prior art.
- TRIBE v2 product announcement: March 26, 2026 -- after the January 2026 filing date. This is NOT prior art to 63/960,633, but is prior art to any future continuation or new filing.

**The overlap and the distinction:**

TRIBE and the MEG-proxy claim in 63/960,633 both involve mapping between language/stimulus features and brain states. That conceptual overlap is real and an examiner will likely cite TRIBE.

But the direction of inference is opposite, and this is the defensible distinction:

| | TRIBE | Patent 63/960,633 |
|---|---|---|
| Direction | Received stimulus → predicted brain response | Produced dialogue → inferred cognitive state |
| Task | Brain encoding (forward model) | Cognitive state classification (inverse inference) |
| Modality | fMRI (BOLD signal, spatial, seconds-resolution) | MEG-proxy (temporal dynamics, ms-resolution) |
| Input | External media consumed by a subject | Natural language produced by a subject |
| Output | voxel-level fMRI predictions | Cognitive state classification + fingerprint |

The patent claims a method for inferring cognitive states from what a person says, not for predicting what a brain would do when shown content. These are different problems. TRIBE is a brain encoding model; the patent covers a cognitive state decoding method from self-generated language.

**Why the distinction matters for claim drafting:**

Broad claims like "using language features to infer brain states" will not survive if TRIBE is cited, because TRIBE demonstrates that language and brain states are mappable. The claims must be drafted around the specific distinctions:
1. Produced dialogue as input (not received stimuli)
2. MEG-temporal feature analogues specifically (not fMRI spatial patterns)
3. The fingerprinting and authentication applications (not brain response prediction)
4. The Bayesian updating framework for ongoing dialogue (not a one-shot encoding model)

**Action item for patent counsel:** Provide the TRIBE v1 paper (arXiv:2507.22229) and TRIBE v2 materials as the primary prior art reference for the prior art search. Ask counsel to specifically assess: (a) whether the direction-of-inference distinction is sufficient to avoid anticipation; (b) whether MEG-proxy vs. fMRI-encoding is a meaningful claim differentiator; and (c) how narrowly the claims must be drafted to distinguish TRIBE while retaining commercial value. This analysis should happen before the non-provisional is drafted, not during prosecution.

---

## What Else Might Be Patentable

Beyond the two provisionals, the following inventions should be evaluated for patent potential as technical implementations mature:

### IΔ clinical sycophancy measurement system

A specific technical pipeline that: (1) intercepts clinical AI inference at intermediate representational layers using logit-lens methodology; (2) computes a correctness grade for the intermediate representation; (3) computes a correctness grade for the final output; and (4) produces a signed IΔ score in real time.

**Patentability assessment:** The abstract idea (comparing internal representation to output) is not patentable. A specific technical system for doing this in a clinical context -- with a defined interface to deployed clinical AI systems -- may be patentable as a technical method claim. This is a stronger patent candidate than the instruments that lack a technical implementation system.

**When to file:** After a working system exists. Do not disclose the technical implementation details publicly (in publications, conference presentations, or open-source releases) before filing. Once any version of the system is publicly demonstrated, a US provisional should be filed within 12 months (US grace period) or earlier for any international protection.

---

### CGM preference measurement pipeline

The specific technical implementation of the forced-choice task (8-second selection window, novel track presentation, behavioral data integration) combined with the algorithmic preference modeling from behavioral history and the KL divergence scoring.

**Patentability assessment:** Similar to IΔ -- the abstract scoring formula is not patentable; a specific technical system combining the preference task interface, data pipeline, and scoring methodology may be. The combination may be what's novel.

**When to file:** When the WAXFEED technical implementation is sufficiently developed to describe as a specific system. The CGM instrument specification document must not be published in a way that would constitute public disclosure before filing.

---

### Cosmos counter-environment design system

The specific Cosmos architecture: persistent behavioral model construction from task and conversation history, authentic goal alignment scoring from behavioral data, proactive surfacing of relevant information without compliance demand. This may be a third patent in the Cosmos family alongside the two provisionals.

**Patentability assessment:** Depends heavily on how specific and technical the claims can be made. "A personal operating system that models the user" is too abstract. A specific implementation -- the data structures, the model update algorithms, the surfacing logic -- may produce defensible claims.

**When to file:** When the system's technical architecture stabilizes beyond the current n=1 implementation.

---

## The Publish-or-Patent Tension

This is the most operationally significant tension in the lab's strategy, and it currently has no workflow enforcement. It will get crossed accidentally without a concrete gate.

**The current exposure:** The six instrument specification documents (CGM, IΔ, SAM, FEM, CRM, Proximity Index) and the two provisional applications are all internal. Nothing has been publicly disclosed. But that window closes the moment any of these documents is attached to a grant application, shared with an academic partner, posted to a website, or submitted as a preprint. Once public, the US 12-month grace period begins -- international patent rights (EU, UK, Japan, etc.) are already foreclosed.

**The gap right now:** There is no step in the current workflow between "ready to share a document externally" and "actually sharing it" that routes through patent counsel. The instrument specifications are detailed enough that if a future technical system implementation is based on them, an inadvertent publication of the spec could be treated as prior art against the patent.

**The fix: a pre-disclosure review gate**

Before any of the following actions, patent counsel must review the document for patentable technical disclosures:

| Action | Documents requiring review |
|---|---|
| Submit a grant application (any funder) | Any aims section describing a technical system implementation |
| Share instrument specifications with an academic partner | All six instrument specs |
| Post any technical document to the lab website | Any document describing system architecture or method implementation |
| Submit a preprint or journal manuscript | Full text |
| Present at a conference with published abstracts or proceedings | Abstract and slides |
| Open-source any code repository | All code and accompanying documentation |

**How the gate works in practice:**
1. Before sharing externally, flag the document to Legal
2. Legal sends to patent counsel with a 5-business-day review request
3. Counsel identifies any technical disclosures that should be patented before release, or confirms the document is clear
4. If a patentable disclosure is found: either (a) file a provisional before releasing, or (b) redact the technical claim from the external version
5. If clear: proceed with sharing

This is not a bureaucratic slowdown for non-technical documents. A collaborator agreement or a budget spreadsheet does not need patent review. The gate applies specifically to documents that describe how a technical system works.

**Practical implication for grant applications:** Grant applications become public if funded (NIH awards are published in NIH Reporter; NSF and most foundations publish grant titles and abstracts). The full technical aims should not describe a novel technical implementation in patentable detail until that implementation has been filed. For the current grant applications (Knight, NIMH, Mozilla), this is low risk because the technical systems are not yet built. It becomes high risk when the IΔ scoring system, the WAXFEED CGM pipeline, or Cosmos architecture variants are built and the lab needs to describe them in a grant.

**Practical implication for academic co-PI agreements:** The academic partnership strategy document calls for co-PI agreements to include a patent review clause. That clause should specify: (a) no co-PI may publish, present, or share technical content from the joint research without 30-day advance notice to Polarity Lab; (b) Polarity Lab has the right to file a patent application within that 30-day window before any public disclosure; (c) publications that would disclose patentable technical implementations require patent counsel review and approval before submission. This is standard in industry-academic research agreements. It is not unusual. Academic partners familiar with tech transfer will expect it.

**Note on 63/960,633:** With the shift to defensive publication, the publication gate for this application works in reverse. The goal is to publish the technical disclosure as soon as possible, not to delay publication. Once the defensive publication is submitted, CRM study publications that describe the MEG-proxy methodology are clear to proceed.

---

## Instrument Protection: Copyright Licensing

The six instruments (CGM, IΔ, SAM, FEM, CRM, Proximity Index) are protected through copyright, not patents. This is the same model used by LIWC -- one of the most widely used instruments in social science -- which generates licensing revenue through copyright alone.

**What is automatically protected:** The instrument specification documents, scoring rubrics, coding guides, rater training materials, and any software code are original creative works and are copyrighted at creation. No registration is required for protection to exist, but registration strengthens enforcement.

**The licensing model:** Commercial use of an instrument methodology requires a license from Polarity Lab. The IΔ scope-of-work template already implements this: it grants the client a perpetual non-exclusive license to use the methodology for internal and regulatory purposes. Formalizing this across all instruments means:
- Non-commercial academic use: free, with attribution
- Commercial use (health systems, AI vendors, platform auditing): licensed, at a fee
- Bundled with an assessment service (the lab scores, delivers report): as per SoW pricing

**What to do now:**
1. Add explicit copyright notices to all instrument specification documents: "© 2026 Polarity Lab LLC. All rights reserved. Non-commercial research use with attribution permitted. Commercial use requires a license. Contact team@polarity-lab.com."
2. Publish a one-page instrument licensing schedule on the website specifying the terms for commercial use
3. Register copyright on the six instrument specifications with the US Copyright Office (~$65/work, or $55 for a group registration of related works)

---

## Instrument Protection: Trademark

Registering the instrument and platform names as trademarks prevents competitors from using the same names for different products and protects brand value independently of any IP in the underlying methodology.

**Marks to register:**

| Mark | Class | What it protects |
|---|---|---|
| Integrity Delta | 42 (scientific services) | The IΔ assessment service and instrument |
| IΔ (stylized) | 42 | The scored instrument |
| Cognitive Gap Measure | 42 | The CGM instrument |
| Proximity Index | 42 | The community discoverability instrument |
| WAXFEED | 42 + 41 (entertainment) | The platform and research program |
| Polarity GPS | 42 + 38 (communication services) | The platform and research program |

Cost: approximately $400 per class per mark. Filing all six marks across the relevant classes: approximately $4,000-$6,000 in USPTO filing fees. Attorney fees for clearance search and application: $3,000-$6,000 additional.

**Priority:** Integrity Delta and IΔ first -- these are the first instruments being commercialized. Register before the first IΔ assessment report is delivered to a client under that name.

---

## Instrument Protection: OSF Preregistration

Before each instrument's validation study begins, register the methodology, hypotheses, and analysis plan at the Open Science Framework (osf.io). This:
- Timestamps the methodology publicly before peer review
- Establishes scientific priority that no one can dispute
- Increases credibility of validation findings (preregistered studies are treated as more rigorous)
- Prevents any subsequent filer from claiming the methodology as novel in a patent application (it becomes prior art)
- Costs nothing

Register each instrument spec as a preregistration when the corresponding validation study begins. Do not wait for publication.

---

## Patent Licensing (63/940,728 only)

Once 63/940,728 converts and claims are granted, the cognitive biometric authentication claim has active licensing potential in:
- Enterprise security: continuous authentication, privileged access management, identity-as-a-service
- Healthcare identity management: patient verification, EHR access control
- Fintech: behavioral biometric layering on top of existing MFA

This is a standalone commercial opportunity separate from the lab's research programs. It is not a Cosmos licensing play -- the addressable market is the $30B+ authentication space. It requires a technology licensing function that doesn't exist yet. Flag for development when prosecution is underway and claim scope is known.

---

## Budget Planning

| Item | Cost | Timing |
|---|---|---|
| Patent counsel engagement for 63/940,728 prior art search | $1,500-$2,500 | Month +2 |
| Non-provisional conversion, 63/940,728 | $8,000-$15,000 | Month +4-5 (before Dec 2026) |
| PCT filing, 63/940,728 | $5,000-$8,000 | Same window |
| Patent counsel retainer (63/940,728 prosecution) | $3,000-$5,000/year | Ongoing |
| Defensive publication submission, 63/960,633 | $500-$1,500 | Month +2 (urgent) |
| Trademark filing, 6 marks | $4,000-$6,000 filing fees + $3,000-$6,000 attorney | Month +2 (IΔ first) |
| Copyright registration, 6 instrument specifications | $330-$390 | Month +1 |
| Future patent filings (IΔ system, CGM pipeline) | $15,000-$25,000 each | When technical systems are built |
| **Total near-term (12 months)** | **$25,000-$44,000** | |

Previous estimate under convert-both-provisionals strategy: $30,000-$55,000. The shift to defensive publication for 63/960,633 saves approximately $15,000-$25,000 in prosecution cost and adds ~$7,000-$13,000 for trademark and copyright registration -- net savings of approximately $8,000-$15,000 while providing broader and more durable protection for the instruments.

---

## Action Items and Owners

| Action | Owner | Deadline |
|---|---|---|
| Copyright notices on all 6 instrument specifications | Legal | **Immediate** |
| Register copyright on 6 instrument specifications | Legal | Month +1 |
| Submit defensive publication for 63/960,633 (Research Disclosure or arXiv) | Executive Director + Legal | Month +2 |
| Engage patent counsel for 63/940,728 prior art search | Executive Director | Month +2 |
| Trademark application -- Integrity Delta and IΔ first | Legal | Month +2 |
| Trademark applications -- remaining 4 marks | Legal | Month +3 |
| File non-provisional + PCT for 63/940,728 | Patent counsel (via Legal) | Month +4-5 (no later than November 2026) |
| Publish instrument licensing schedule on website | Executive Director | Month +2 |
| Add pre-disclosure review gate to publication workflow | Executive Director | Immediate |
| Add patent review clause to academic co-PI agreement template | Legal | Month +2 |
| OSF preregistration for first validation study (IΔ Aim 1) | Domain lead + Research coordinator | When study begins |

---

*This document is for internal planning and attorney-client communication. Not for external distribution. Update when 63/940,728 conversion is filed and when trademark applications are submitted.*
