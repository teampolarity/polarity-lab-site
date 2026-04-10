# Polarity Lab OS — Design Document

Date: 2026-04-10

## Summary

A private, login-gated admin portal that serves as the operating system for Polarity Lab. It combines an active business development engine (outreach, grants, content) with internal institutional infrastructure (wiki, doc generation). The goal is to generate revenue and keep the lab functional as it grows.

Revnu for Polarity: active distribution and business development machine that holds the lab's institutional memory.

---

## Problem

Polarity Lab has no distribution, no organized pipeline for financial believers or grants, and no centralized institutional knowledge. Every conversation lives in email. Every document is drafted from scratch. Growth is blocked not by the quality of the work but by the absence of an ops surface to drive it.

---

## Architecture

### Stack

- **Backend**: `polarity-os` (FastAPI), extended with new admin routes
- **Auth**: JWT-based login, single admin user to start
- **Frontend**: new `admin/` directory in `polarity-site`, plain HTML/CSS/JS matching Polarity aesthetic (void palette, Space Grotesk, teal/coral/purple). No new framework.
- **Database**: SQLite to start, schema designed for easy Postgres migration
- **AI**: Claude API (`claude-sonnet-4-6`) for all generation tasks
- **Stripe**: added to public `fund.html` for $10–$999 gift tier (parallel public site change)

### Hosting

Admin frontend served from the existing Vercel deployment under `/admin`. Backend routes under `/api/admin/*`, protected by JWT middleware.

---

## Modules

### 1. Growth Engine

Generates external-facing distribution content using Claude API. Nothing auto-posts. Every output is reviewed before publishing.

**Content types:**
- SEO articles per research domain (AI sycophancy, nonprofit discovery gap, film therapeutics, cognitive profiling)
- LinkedIn posts and threads
- Hacker News submission drafts
- Newsletter issues
- Research announcements

**Workflow:**
1. Select project and content type
2. Claude generates draft using project data from the wiki
3. Review and edit inline
4. Mark as published with destination and date logged

**Storage:** Each piece of content stored with project tag, status (draft/published), destination, and date.

---

### 2. Outreach

Targeted lead management and cold outreach drafting per project.

**Lead targets by project:**
- Integrity Delta: hospital CTOs, radiology department heads, AI safety researchers, clinical AI teams, health regulators
- Polarity GPS: foundation program officers (Knight, RWJF, RI Foundation), city planners, nonprofit infrastructure orgs
- AVDP: film festival programmers, media brands, therapeutics researchers, documentary distributors
- WAXFEED: music platform engineers, cognitive science researchers, early adopters

**Workflow:**
1. Add lead (name, org, project, source, notes)
2. Claude drafts personalized cold email using lead details and project data
3. Edit and send externally
4. Log response and advance stage

**Pipeline stages:** New → Contacted → Replied → In Conversation → Closed (Won/Lost)

**Fields per lead:** Name, organization, role, project, email, stage, last contact date, notes, email history.

---

### 3. Grant Prospecting

Tracks relevant grant opportunities, manages application pipeline, and drafts application sections.

**Seeded grant database:**

| Funder | Focus | Fit | Deadline cadence |
|---|---|---|---|
| Knight Foundation | Community, media, civic tech | Polarity GPS, AVDP | Rolling / annual |
| Mozilla Foundation | Trustworthy AI, open web | Integrity Delta | Annual |
| Open Philanthropy | AI safety, global health | Integrity Delta | Rolling |
| RWJF | Health equity, community health | Integrity Delta, Polarity GPS | Varied |
| Rhode Island Foundation | Providence-based work | All projects | Rolling |
| NSF SBIR Phase I | Early-stage tech ($275k) | WAXFEED, Polarity GPS | 3x/year |
| NEA / NEH | Arts, humanities, media | AVDP | Annual |
| Ford Foundation | Racial equity, community power | Polarity GPS | Annual |
| Microsoft Research | AI safety | Integrity Delta | Rolling |

**Workflow:**
1. Add grant (funder, amount, deadline, requirements, fit score 1-5, project)
2. Claude drafts application sections (problem statement, methods, team, budget narrative) from wiki data
3. Edit and track submission
4. Log decision

**Pipeline stages:** Identified → Researching → Drafting → Submitted → Decision (Awarded/Rejected)

**Fields per grant:** Funder, program name, amount, deadline, fit score, project(s), stage, application materials, decision, notes.

---

### 4. Financial Believer Pipeline

CRM for the $1,000+ Founding Partner track. Private, relationship-driven. Per project.

**Pipeline stages:** Lead → Conversation Scheduled → Agreement Drafting → Signed → Active

**Fields per entry:** Name, project, amount, stage, date added, last contact, notes, agreement status.

**Claude assists with:** Follow-up email drafts, agreement draft generation (from template, not legal advice).

---

### 5. Lab Wiki + Internal Doc Generator

Two layers: structured knowledge base and on-demand document generation.

#### Wiki (structured fields, not freeform)

**Lab structure**
- Org chart and role registry (role, person, core pool base points, activity bonuses)
- Quarterly review cadence and process
- Operating procedures (collaborator onboarding, contribution processing, quarterly review, Founding Partner close)

**Project pages** (one per active project)
- Research question, status badge, team with tiers and weights
- Active agreements (collaborators and financial believers)
- Runway status and disbursement milestone
- Key milestones and dates

**People directory**
- Every collaborator: name, role, tier, weight, projects, agreement date, status

**Decision log**
- Timestamped entries: decision, rationale, who made it

#### Doc Generator (Claude API)

Generates documents on demand from wiki data. All outputs are drafts for human review.

| Document | Source data |
|---|---|
| Collaborator onboarding packet | Person record, project page, operating procedures |
| Project one-pager / brief | Project page (research question, methods, results, team, ask) |
| Pitch deck outline | Project page + current funding ask |
| Quarterly review summary | Project page + inputs from team |
| Revenue participation agreement draft | Financial believer record + fund model template |
| Collaborator agreement draft | Person record + project page + contributor tier |
| Meeting summary | Paste raw notes → structured summary + decision log entry |
| Grant application section | Grant record + project page + lab structure |

**Pitch decks are generated from live wiki data.** When a project page is updated, a regenerated pitch deck reflects the current state automatically on next generation.

---

## Stripe (Public Site Change)

Parallel to the admin portal, add Stripe to `fund.html` so the $10–$999 gift tier does not require email. Each project card and the General Fund card gets a Stripe payment link or embedded checkout. Contribution records sync to the admin.

This is the fastest revenue change available. Days to ship.

---

## Phased Delivery

### Phase 1 — Pipeline and Stripe
- JWT auth and login screen
- Grant prospecting module
- Outreach pipeline module
- Stripe on fund.html for gift tier
- Basic financial believer CRM

### Phase 2 — Content and Wiki
- Growth engine (content generation)
- Lab wiki (structured fields)
- People directory and decision log

### Phase 3 — Doc Generator
- All document types
- Pitch deck generation from live project data
- Onboarding packet generation

---

## What This Is Not

- Not a public-facing product. Admin only.
- Not a legal instrument. Agreement drafts require legal review before signing.
- Not an auto-posting tool. Every piece of content is reviewed before it leaves.
- Not a replacement for Wefunder/Republic if the lab moves to broad public campaigns. This handles the private Reg D track.

---

*Design approved: 2026-04-10*
