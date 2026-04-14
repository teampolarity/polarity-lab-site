# Technical Director
*For Shadrack. Read alongside onboarding.md, polarity-fund-model.md, and role-domain-lead-waxfeed.md.*

---

## What You're Here For

The lab's vision moves faster than any single technical implementation. Your job is to hold the technical reality in honest contact with that vision — not to slow it down, but to make sure what gets built is actually buildable, and that the choices made in development today don't close off the directions the lab needs to move tomorrow.

You came to this through your own encounter with the second threshold. Your blog shows the philosophy arriving from a different direction before you named what it had in common with the lab's work. The technical role is an extension of that — not building because it's interesting to build, but building because the thing being built needs to exist for the proof to be real.

This document covers the lab-level technical role. Your work running WAXFEED specifically is in role-domain-lead-waxfeed.md.

---

## What You Do

You make architectural decisions that hold across projects. The lab runs four active projects on shared infrastructure. The choices made about how systems are built — how data flows, how instruments record, how platforms communicate — affect every project, not just one. You're the one who holds the full technical picture and makes sure individual project decisions don't create conflicts at the infrastructure level.

You own technical viability review before commitments get made. When the lab is scoping a new project or an institutional partner asks about a technical capability, your input on what's actually executable and on what timeline is load-bearing. Not every technical question has to go back to you, but the ones that touch the lab's positioning or external commitments do.

You build and maintain the shared technical foundations. Authentication, deployment infrastructure, data pipelines, instrument recording architecture. These exist so domain leads can run their projects without rebuilding the same things. That shared stack is your responsibility.

You're the technical voice in conversations with institutional buyers and research partners. When IΔ is being pitched to a clinical AI vendor or GPS is in conversation with a city, technical credibility matters. You don't have to be in every conversation. When technical specifics are on the table, you are.

You recruit and orient technical collaborators. As projects add engineers, analysts, or technical research partners, you're involved in identifying the right people and making sure they understand how technical work integrates with the research mandate. A developer who doesn't understand that the product is the instrument will build the wrong product.

---

## What Stays With the Founder

Which environments the lab enters is not a technical decision. The question the lab is asking comes before the question of how to build the tool for asking it. You can raise technical feasibility concerns about any proposed direction. You don't determine the research agenda.

Instrument methodology — what IΔ measures, how the Proximity Index is defined, what the Cognitive Gap Measure is actually calculating — belongs to the research function. You build the systems that implement those methodologies and generate clean data. The methodology itself isn't yours to redefine.

Financial structure, collaborator agreements, and investor relationships stay with the founder. You may have visibility into these as needed for technical scoping. You're not party to them.

---

## How You Get Paid

Your compensation runs through two channels, one for this role and one for WAXFEED.

As Technical Director, you're part of the core pool — the lab's 15% share of revenue distributed to lab-level roles. The core pool uses a points system that resets quarterly. Your base points and any activity bonuses for the Technical Director function are agreed at the start of each quarter. Your share equals your points divided by total points across all core pool roles that quarter.

The WAXFEED Domain Lead compensation is separate and runs through the project's 85% distribution. Those mechanics are in role-domain-lead-waxfeed.md and in polarity-fund-model.md.

Neither channel pays out until the relevant runway threshold is hit. That's the reality. It's better said plainly.

---

## Ownership and Governance

Polarity Lab LLC is Theodore's. You are a collaborator, not an owner. You have no governance rights over the lab's direction, research agenda, or methodology.

The single-member structure isn't about the value of what you bring. It's about why the lab is structured the way it is. The vision has to stay intact while it propagates. The LLC structure provides that protection at the legal level, not just the philosophical one.

IP created under the lab's infrastructure belongs to the lab. That includes technical systems you build as Technical Director, regardless of which project they serve.

If anything here doesn't match your understanding of your role, that conversation happens with the founder before work continues.

---

## What to Work On Right Now

**Shared infrastructure baseline.** The lab has four projects that need common foundations — deployment, authentication, instrument data recording. Before individual projects build their own versions of these, establish what the shared stack looks like so domain leads don't duplicate work or create conflicts.

**IΔ technical validation pipeline.** The pilot ran on n=5. The validation study at scale requires a system that can process clinical cases, record intermediate layer activations, and generate the signed gap metrics reliably. Get the technical architecture for that pipeline defined.

**Collaborator technical onboarding.** As the lab adds technical collaborators across projects, there needs to be a clear picture of how to get them oriented — what the shared infrastructure is, where project-specific code lives, what the lab's technical norms are. Start that documentation.

**WAXFEED technical stack decisions.** See the domain lead doc for project-specific priorities.

---

*The technical foundation you're building now determines what the lab can prove later. That's the weight of this role.*
