# Polarity Lab OS — Phase 1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an authenticated admin portal that handles grant prospecting, outreach pipeline, financial believer CRM, and Claude-assisted email/grant drafting — plus add Stripe to fund.html for the $10–$999 gift tier.

**Architecture:** New `routers/lab_os.py` FastAPI router in `polarity-os`, protected by a `lab_admin` JWT role. Three Neon PostgreSQL tables with `lab_os_` prefix. Plain HTML/CSS/JS admin frontend in `polarity-site/admin/` calling the API. Claude API for generation endpoints.

**Tech Stack:** FastAPI, Neon PostgreSQL (psycopg2), PyJWT (already in `api/auth.py`), Anthropic SDK (already in requirements), Stripe.js (public site only), plain HTML/CSS/JS (no framework)

---

## Context: How polarity-os works

- All routers live in `polarity-os/api/routers/`
- Routers are registered in `polarity-os/api/main.py`
- Auth utilities live in `polarity-os/api/auth.py` — use `create_token(user_id, email, role)` and `verify_token(authorization)`
- Database is Neon PostgreSQL. Connection pattern is in existing routers (use `psycopg2` with env var `DATABASE_URL`)
- Anthropic client: `import anthropic; client = anthropic.Anthropic()`
- Admin frontend lives in `polarity-site/admin/` and is served by Vercel

---

## Task 1: Database Schema

**Files:**
- Create: `polarity-os/api/lab_os_schema.sql`

**Step 1: Write the SQL migration**

```sql
-- lab_os_schema.sql
-- Run once against Neon PostgreSQL to create Lab OS tables

CREATE TABLE IF NOT EXISTS lab_os_grants (
    id          SERIAL PRIMARY KEY,
    funder      TEXT NOT NULL,
    program     TEXT NOT NULL,
    amount      TEXT,
    deadline    DATE,
    fit_score   INTEGER CHECK (fit_score BETWEEN 1 AND 5),
    projects    TEXT[],
    stage       TEXT NOT NULL DEFAULT 'identified'
                CHECK (stage IN ('identified','researching','drafting','submitted','awarded','rejected')),
    notes       TEXT,
    url         TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lab_os_leads (
    id              SERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    organization    TEXT,
    role            TEXT,
    email           TEXT,
    project         TEXT NOT NULL,
    source          TEXT,
    stage           TEXT NOT NULL DEFAULT 'new'
                    CHECK (stage IN ('new','contacted','replied','in_conversation','won','lost')),
    notes           TEXT,
    last_contact    DATE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS lab_os_believers (
    id              SERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    project         TEXT NOT NULL,
    amount          INTEGER,
    stage           TEXT NOT NULL DEFAULT 'lead'
                    CHECK (stage IN ('lead','conversation_scheduled','agreement_drafting','signed','active')),
    email           TEXT,
    notes           TEXT,
    last_contact    DATE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

**Step 2: Run the migration**

```bash
# In polarity-os directory
psql $DATABASE_URL -f api/lab_os_schema.sql
```

Expected: `CREATE TABLE` x3, no errors.

**Step 3: Commit**

```bash
git -C ~/polarity-os add api/lab_os_schema.sql
git -C ~/polarity-os commit -m "feat: add Lab OS database schema"
```

---

## Task 2: Lab OS Router — Auth + Scaffolding

**Files:**
- Create: `polarity-os/api/routers/lab_os.py`
- Modify: `polarity-os/api/main.py`

**Step 1: Write the router file**

```python
# polarity-os/api/routers/lab_os.py
"""
Polarity Lab OS — admin API.

All routes under /api/lab-os/* require a lab_admin JWT except POST /auth/login.
"""

import os
import logging
from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel
from typing import Optional, List
import jwt

from auth import SECRET_KEY, ALGORITHM, create_token

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/lab-os", tags=["lab-os"])

ADMIN_PASSWORD = os.getenv("LAB_OS_ADMIN_PASSWORD", "")


# ---------------------------------------------------------------------------
# Auth dependency
# ---------------------------------------------------------------------------

async def require_lab_admin(authorization: Optional[str] = Header(default=None)) -> dict:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="lab_admin token required")
    token = authorization.replace("Bearer ", "")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="token_expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="invalid_token")
    if payload.get("role") != "lab_admin":
        raise HTTPException(status_code=403, detail="lab_admin role required")
    return payload


# ---------------------------------------------------------------------------
# DB helper
# ---------------------------------------------------------------------------

def get_db():
    import psycopg2
    import psycopg2.extras
    conn = psycopg2.connect(os.getenv("DATABASE_URL"), cursor_factory=psycopg2.extras.RealDictCursor)
    try:
        yield conn
    finally:
        conn.close()


# ---------------------------------------------------------------------------
# Login
# ---------------------------------------------------------------------------

class LoginRequest(BaseModel):
    password: str


@router.post("/auth/login")
async def login(body: LoginRequest):
    if not ADMIN_PASSWORD:
        raise HTTPException(status_code=500, detail="LAB_OS_ADMIN_PASSWORD not set")
    if body.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="invalid_password")
    token = create_token("lab_admin", "admin@polarity-lab.com", role="lab_admin", expires_hours=72)
    return {"token": token}


@router.get("/auth/me")
async def me(admin: dict = Depends(require_lab_admin)):
    return {"role": "lab_admin", "email": admin.get("email")}
```

**Step 2: Register the router in main.py**

Find the block where other routers are included (search for `from routers.subscription import router`) and add:

```python
from routers.lab_os import router as lab_os_router
app.include_router(lab_os_router)
```

**Step 3: Add env var**

Add to `polarity-os/.env` (local) and Vercel environment variables:
```
LAB_OS_ADMIN_PASSWORD=<strong-random-password>
```

**Step 4: Test login endpoint**

```bash
curl -X POST http://localhost:8000/api/lab-os/auth/login \
  -H "Content-Type: application/json" \
  -d '{"password": "your-password"}'
```

Expected: `{"token": "eyJ..."}` (JWT string)

**Step 5: Test auth guard**

```bash
curl http://localhost:8000/api/lab-os/auth/me
```

Expected: `{"detail": "lab_admin token required"}`

```bash
curl http://localhost:8000/api/lab-os/auth/me \
  -H "Authorization: Bearer <token-from-login>"
```

Expected: `{"role": "lab_admin", "email": "admin@polarity-lab.com"}`

**Step 6: Commit**

```bash
git -C ~/polarity-os add api/routers/lab_os.py api/main.py
git -C ~/polarity-os commit -m "feat: add Lab OS router with lab_admin auth"
```

---

## Task 3: Grants API (CRUD)

**Files:**
- Modify: `polarity-os/api/routers/lab_os.py`

**Step 1: Add models and endpoints to lab_os.py**

Append to `lab_os.py`:

```python
# ---------------------------------------------------------------------------
# Grants
# ---------------------------------------------------------------------------

class GrantCreate(BaseModel):
    funder: str
    program: str
    amount: Optional[str] = None
    deadline: Optional[str] = None   # ISO date string
    fit_score: Optional[int] = None
    projects: Optional[List[str]] = []
    stage: str = "identified"
    notes: Optional[str] = None
    url: Optional[str] = None


class GrantUpdate(BaseModel):
    funder: Optional[str] = None
    program: Optional[str] = None
    amount: Optional[str] = None
    deadline: Optional[str] = None
    fit_score: Optional[int] = None
    projects: Optional[List[str]] = None
    stage: Optional[str] = None
    notes: Optional[str] = None
    url: Optional[str] = None


@router.get("/grants")
async def list_grants(admin: dict = Depends(require_lab_admin)):
    import psycopg2, psycopg2.extras, os
    conn = psycopg2.connect(os.getenv("DATABASE_URL"), cursor_factory=psycopg2.extras.RealDictCursor)
    with conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM lab_os_grants ORDER BY created_at DESC")
            return cur.fetchall()


@router.post("/grants", status_code=201)
async def create_grant(body: GrantCreate, admin: dict = Depends(require_lab_admin)):
    import psycopg2, psycopg2.extras, os
    conn = psycopg2.connect(os.getenv("DATABASE_URL"), cursor_factory=psycopg2.extras.RealDictCursor)
    with conn:
        with conn.cursor() as cur:
            cur.execute(
                """INSERT INTO lab_os_grants (funder, program, amount, deadline, fit_score, projects, stage, notes, url)
                   VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s) RETURNING *""",
                (body.funder, body.program, body.amount, body.deadline,
                 body.fit_score, body.projects, body.stage, body.notes, body.url)
            )
            return cur.fetchone()


@router.put("/grants/{grant_id}")
async def update_grant(grant_id: int, body: GrantUpdate, admin: dict = Depends(require_lab_admin)):
    import psycopg2, psycopg2.extras, os
    fields = {k: v for k, v in body.dict().items() if v is not None}
    if not fields:
        raise HTTPException(status_code=400, detail="no fields to update")
    fields["updated_at"] = datetime.utcnow()
    set_clause = ", ".join(f"{k} = %s" for k in fields)
    conn = psycopg2.connect(os.getenv("DATABASE_URL"), cursor_factory=psycopg2.extras.RealDictCursor)
    with conn:
        with conn.cursor() as cur:
            cur.execute(
                f"UPDATE lab_os_grants SET {set_clause} WHERE id = %s RETURNING *",
                (*fields.values(), grant_id)
            )
            row = cur.fetchone()
            if not row:
                raise HTTPException(status_code=404, detail="not found")
            return row


@router.delete("/grants/{grant_id}", status_code=204)
async def delete_grant(grant_id: int, admin: dict = Depends(require_lab_admin)):
    import psycopg2, os
    conn = psycopg2.connect(os.getenv("DATABASE_URL"))
    with conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM lab_os_grants WHERE id = %s", (grant_id,))
```

**Step 2: Test create grant**

```bash
TOKEN="<your-admin-token>"
curl -X POST http://localhost:8000/api/lab-os/grants \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"funder":"Knight Foundation","program":"Community Information","fit_score":5,"projects":["Polarity GPS"],"stage":"identified"}'
```

Expected: `{"id": 1, "funder": "Knight Foundation", ...}`

**Step 3: Test list grants**

```bash
curl http://localhost:8000/api/lab-os/grants \
  -H "Authorization: Bearer $TOKEN"
```

Expected: Array with the grant you just created.

**Step 4: Commit**

```bash
git -C ~/polarity-os add api/routers/lab_os.py
git -C ~/polarity-os commit -m "feat: add grants CRUD to Lab OS router"
```

---

## Task 4: Outreach Leads API (CRUD)

**Files:**
- Modify: `polarity-os/api/routers/lab_os.py`

**Step 1: Append leads models and endpoints to lab_os.py**

```python
# ---------------------------------------------------------------------------
# Outreach Leads
# ---------------------------------------------------------------------------

class LeadCreate(BaseModel):
    name: str
    organization: Optional[str] = None
    role: Optional[str] = None
    email: Optional[str] = None
    project: str
    source: Optional[str] = None
    stage: str = "new"
    notes: Optional[str] = None


class LeadUpdate(BaseModel):
    name: Optional[str] = None
    organization: Optional[str] = None
    role: Optional[str] = None
    email: Optional[str] = None
    project: Optional[str] = None
    stage: Optional[str] = None
    notes: Optional[str] = None
    last_contact: Optional[str] = None


@router.get("/leads")
async def list_leads(project: Optional[str] = None, admin: dict = Depends(require_lab_admin)):
    import psycopg2, psycopg2.extras, os
    conn = psycopg2.connect(os.getenv("DATABASE_URL"), cursor_factory=psycopg2.extras.RealDictCursor)
    with conn:
        with conn.cursor() as cur:
            if project:
                cur.execute("SELECT * FROM lab_os_leads WHERE project = %s ORDER BY created_at DESC", (project,))
            else:
                cur.execute("SELECT * FROM lab_os_leads ORDER BY created_at DESC")
            return cur.fetchall()


@router.post("/leads", status_code=201)
async def create_lead(body: LeadCreate, admin: dict = Depends(require_lab_admin)):
    import psycopg2, psycopg2.extras, os
    conn = psycopg2.connect(os.getenv("DATABASE_URL"), cursor_factory=psycopg2.extras.RealDictCursor)
    with conn:
        with conn.cursor() as cur:
            cur.execute(
                """INSERT INTO lab_os_leads (name, organization, role, email, project, source, stage, notes)
                   VALUES (%s,%s,%s,%s,%s,%s,%s,%s) RETURNING *""",
                (body.name, body.organization, body.role, body.email,
                 body.project, body.source, body.stage, body.notes)
            )
            return cur.fetchone()


@router.put("/leads/{lead_id}")
async def update_lead(lead_id: int, body: LeadUpdate, admin: dict = Depends(require_lab_admin)):
    import psycopg2, psycopg2.extras, os
    fields = {k: v for k, v in body.dict().items() if v is not None}
    if not fields:
        raise HTTPException(status_code=400, detail="no fields to update")
    fields["updated_at"] = datetime.utcnow()
    set_clause = ", ".join(f"{k} = %s" for k in fields)
    conn = psycopg2.connect(os.getenv("DATABASE_URL"), cursor_factory=psycopg2.extras.RealDictCursor)
    with conn:
        with conn.cursor() as cur:
            cur.execute(
                f"UPDATE lab_os_leads SET {set_clause} WHERE id = %s RETURNING *",
                (*fields.values(), lead_id)
            )
            row = cur.fetchone()
            if not row:
                raise HTTPException(status_code=404, detail="not found")
            return row


@router.delete("/leads/{lead_id}", status_code=204)
async def delete_lead(lead_id: int, admin: dict = Depends(require_lab_admin)):
    import psycopg2, os
    conn = psycopg2.connect(os.getenv("DATABASE_URL"))
    with conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM lab_os_leads WHERE id = %s", (lead_id,))
```

**Step 2: Test**

```bash
curl -X POST http://localhost:8000/api/lab-os/leads \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Dr. Sarah Chen","organization":"UCSF Medical Center","role":"Chief AI Officer","email":"schen@ucsf.edu","project":"Integrity Delta","source":"LinkedIn"}'
```

Expected: `{"id": 1, "name": "Dr. Sarah Chen", ...}`

**Step 3: Commit**

```bash
git -C ~/polarity-os add api/routers/lab_os.py
git -C ~/polarity-os commit -m "feat: add outreach leads CRUD to Lab OS router"
```

---

## Task 5: Financial Believers API (CRUD)

**Files:**
- Modify: `polarity-os/api/routers/lab_os.py`

**Step 1: Append believers models and endpoints**

```python
# ---------------------------------------------------------------------------
# Financial Believers
# ---------------------------------------------------------------------------

class BelieverCreate(BaseModel):
    name: str
    project: str
    amount: Optional[int] = None
    stage: str = "lead"
    email: Optional[str] = None
    notes: Optional[str] = None


class BelieverUpdate(BaseModel):
    name: Optional[str] = None
    project: Optional[str] = None
    amount: Optional[int] = None
    stage: Optional[str] = None
    email: Optional[str] = None
    notes: Optional[str] = None
    last_contact: Optional[str] = None


@router.get("/believers")
async def list_believers(project: Optional[str] = None, admin: dict = Depends(require_lab_admin)):
    import psycopg2, psycopg2.extras, os
    conn = psycopg2.connect(os.getenv("DATABASE_URL"), cursor_factory=psycopg2.extras.RealDictCursor)
    with conn:
        with conn.cursor() as cur:
            if project:
                cur.execute("SELECT * FROM lab_os_believers WHERE project = %s ORDER BY created_at DESC", (project,))
            else:
                cur.execute("SELECT * FROM lab_os_believers ORDER BY created_at DESC")
            return cur.fetchall()


@router.post("/believers", status_code=201)
async def create_believer(body: BelieverCreate, admin: dict = Depends(require_lab_admin)):
    import psycopg2, psycopg2.extras, os
    conn = psycopg2.connect(os.getenv("DATABASE_URL"), cursor_factory=psycopg2.extras.RealDictCursor)
    with conn:
        with conn.cursor() as cur:
            cur.execute(
                """INSERT INTO lab_os_believers (name, project, amount, stage, email, notes)
                   VALUES (%s,%s,%s,%s,%s,%s) RETURNING *""",
                (body.name, body.project, body.amount, body.stage, body.email, body.notes)
            )
            return cur.fetchone()


@router.put("/believers/{believer_id}")
async def update_believer(believer_id: int, body: BelieverUpdate, admin: dict = Depends(require_lab_admin)):
    import psycopg2, psycopg2.extras, os
    fields = {k: v for k, v in body.dict().items() if v is not None}
    if not fields:
        raise HTTPException(status_code=400, detail="no fields to update")
    fields["updated_at"] = datetime.utcnow()
    set_clause = ", ".join(f"{k} = %s" for k in fields)
    conn = psycopg2.connect(os.getenv("DATABASE_URL"), cursor_factory=psycopg2.extras.RealDictCursor)
    with conn:
        with conn.cursor() as cur:
            cur.execute(
                f"UPDATE lab_os_believers SET {set_clause} WHERE id = %s RETURNING *",
                (*fields.values(), believer_id)
            )
            row = cur.fetchone()
            if not row:
                raise HTTPException(status_code=404, detail="not found")
            return row


@router.delete("/believers/{believer_id}", status_code=204)
async def delete_believer(believer_id: int, admin: dict = Depends(require_lab_admin)):
    import psycopg2, os
    conn = psycopg2.connect(os.getenv("DATABASE_URL"))
    with conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM lab_os_believers WHERE id = %s", (believer_id,))
```

**Step 2: Test**

```bash
curl -X POST http://localhost:8000/api/lab-os/believers \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"James Osei","project":"Integrity Delta","amount":5000,"stage":"conversation_scheduled"}'
```

Expected: `{"id": 1, "name": "James Osei", ...}`

**Step 3: Commit**

```bash
git -C ~/polarity-os add api/routers/lab_os.py
git -C ~/polarity-os commit -m "feat: add financial believers CRUD to Lab OS router"
```

---

## Task 6: Claude Generation Endpoints

**Files:**
- Modify: `polarity-os/api/routers/lab_os.py`

**Step 1: Append generation endpoints**

```python
# ---------------------------------------------------------------------------
# Claude Generation
# ---------------------------------------------------------------------------

PROJECTS = {
    "Integrity Delta": "Clinical AI honesty research. We measure the gap between what an AI model computes internally and what it actually tells the doctor. A positive gap means it knew the right diagnosis but said the wrong one to be agreeable. We call this Polite Malpractice. We are running a validation study using 1,000 chest radiographs from the NIH CheXpert corpus.",
    "Polarity GPS": "A location game and community discovery platform. Every move players make draws a live map of how well their city connects people to opportunity. The underlying research is the Proximity Index, which measures the gap between cultural output produced by or for a community and what discovery platforms actually surface to that community.",
    "AVDP": "A Very Distant Perspective. A documentary series testing whether watching authentic, unscripted long-form conversation in a carefully engineered environment (ambient music, no phones) has measurable therapeutic value. Next episode: Ghana national football team.",
    "WAXFEED": "Music discovery platform that surfaces the cognitive signature in your listening history. The platform and the research are the same thing.",
    "General Fund": "Polarity Lab general fund. Backs the lab as a whole, not a single project. Think of it as investing in the portfolio rather than a single stock.",
}

class OutreachDraftRequest(BaseModel):
    lead_id: int
    context: Optional[str] = None   # any extra notes to personalize

class GrantDraftRequest(BaseModel):
    grant_id: int
    section: str  # "problem_statement" | "methods" | "team" | "budget_narrative"


@router.post("/generate/outreach-email")
async def generate_outreach_email(body: OutreachDraftRequest, admin: dict = Depends(require_lab_admin)):
    import psycopg2, psycopg2.extras, os, anthropic
    conn = psycopg2.connect(os.getenv("DATABASE_URL"), cursor_factory=psycopg2.extras.RealDictCursor)
    with conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM lab_os_leads WHERE id = %s", (body.lead_id,))
            lead = cur.fetchone()
    if not lead:
        raise HTTPException(status_code=404, detail="lead not found")

    project_context = PROJECTS.get(lead["project"], lead["project"])
    prompt = f"""You are writing a cold outreach email on behalf of Polarity Lab, a research and product lab based in Providence, RI.

Lead:
- Name: {lead['name']}
- Organization: {lead.get('organization', 'unknown')}
- Role: {lead.get('role', 'unknown')}
- Project we're reaching out about: {lead['project']}

Project context:
{project_context}

Additional context: {body.context or 'none'}

Write a cold email that:
1. Is under 150 words
2. Opens with a specific observation about their work, not a generic compliment
3. States clearly what Polarity Lab is doing and why it's relevant to them
4. Has one clear ask (a 20-minute call)
5. Does not use em dashes or en dashes
6. Does not use words like "innovative", "cutting-edge", or "revolutionary"

Output only the email text, no subject line, no commentary."""

    client = anthropic.Anthropic()
    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=400,
        messages=[{"role": "user", "content": prompt}]
    )
    return {"draft": message.content[0].text, "lead": dict(lead)}


@router.post("/generate/grant-section")
async def generate_grant_section(body: GrantDraftRequest, admin: dict = Depends(require_lab_admin)):
    import psycopg2, psycopg2.extras, os, anthropic
    conn = psycopg2.connect(os.getenv("DATABASE_URL"), cursor_factory=psycopg2.extras.RealDictCursor)
    with conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM lab_os_grants WHERE id = %s", (body.grant_id,))
            grant = cur.fetchone()
    if not grant:
        raise HTTPException(status_code=404, detail="grant not found")

    projects_context = "\n".join(
        f"- {p}: {PROJECTS.get(p, p)}" for p in (grant.get("projects") or [])
    )

    section_instructions = {
        "problem_statement": "Write a 200-word problem statement explaining the research gap this work addresses and why it matters to the funder's mission.",
        "methods": "Write a 200-word methods section describing the research approach, tools, and validation process.",
        "team": "Write a 150-word team section. Team: Theodore Addo (Founder, radiology resident at St. Vincent's 2027, MIT Boyden Lab, Brown Medical School), Shadrack Annor (Technical lead, Brown CS & Religious Studies '27), Nathan Amankwah (Operations, Finance & BTM uOttawa '26).",
        "budget_narrative": "Write a 150-word budget narrative explaining how grant funds will be used and why each expense is necessary.",
    }

    instruction = section_instructions.get(body.section, f"Write the {body.section} section.")

    prompt = f"""You are writing a grant application section for Polarity Lab.

Funder: {grant['funder']} — {grant.get('program', '')}
Projects: 
{projects_context}

Task: {instruction}

Do not use em dashes or en dashes. Write in plain, direct language. No filler phrases."""

    client = anthropic.Anthropic()
    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=600,
        messages=[{"role": "user", "content": prompt}]
    )
    return {"draft": message.content[0].text, "grant": dict(grant), "section": body.section}
```

**Step 2: Test outreach generation**

```bash
curl -X POST http://localhost:8000/api/lab-os/generate/outreach-email \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"lead_id": 1}'
```

Expected: `{"draft": "Subject: ...", "lead": {...}}`

**Step 3: Commit**

```bash
git -C ~/polarity-os add api/routers/lab_os.py
git -C ~/polarity-os commit -m "feat: add Claude generation endpoints to Lab OS router"
```

---

## Task 7: Admin Frontend — Login + Shell

**Files:**
- Create: `polarity-site/admin/index.html`
- Create: `polarity-site/admin/app.html`
- Create: `polarity-site/admin/css/admin.css`
- Create: `polarity-site/admin/js/auth.js`
- Modify: `polarity-site/vercel.json`

**Step 1: Add admin to vercel.json rewrites**

Read `polarity-site/vercel.json`. Add these rewrites so `/admin` and `/admin/*` are not caught by the API proxy:

```json
{ "source": "/admin", "destination": "/admin/index.html" },
{ "source": "/admin/(.*)", "destination": "/admin/$1" }
```

Add these BEFORE any existing catch-all rewrites.

**Step 2: Create admin/css/admin.css**

```css
/* Polarity Lab OS — Admin UI */
:root {
  --void-pure: #000000;
  --void-deep: #020204;
  --void-space: #050508;
  --void-surface: #0c0c14;
  --void-elevated: #12121c;
  --teal: #4ECDC4;
  --teal-subtle: rgba(78, 205, 196, 0.12);
  --coral: #FF8A65;
  --purple: #BB8FCE;
  --text-pure: #ffffff;
  --text-primary: rgba(255,255,255,0.95);
  --text-secondary: rgba(255,255,255,0.65);
  --text-tertiary: rgba(255,255,255,0.4);
  --border-ghost: rgba(255,255,255,0.06);
  --border-subtle: rgba(255,255,255,0.1);
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: var(--font-body); background: var(--void-deep); color: var(--text-primary); -webkit-font-smoothing: antialiased; }

/* Login */
.login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
.login-card { background: var(--void-elevated); border: 1px solid var(--border-ghost); border-radius: 12px; padding: 48px; width: 360px; }
.login-logo { font-family: var(--font-display); font-size: 13px; font-weight: 600; letter-spacing: 0.15em; color: var(--text-pure); text-transform: uppercase; margin-bottom: 32px; }
.login-label { font-size: 24px; font-family: var(--font-display); font-weight: 700; margin-bottom: 8px; }
.login-sub { font-size: 14px; color: var(--text-tertiary); margin-bottom: 32px; }
.field { margin-bottom: 20px; }
.field label { display: block; font-size: 12px; font-family: var(--font-mono); color: var(--text-tertiary); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px; }
.field input { width: 100%; background: var(--void-surface); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 10px 14px; font-size: 14px; color: var(--text-primary); font-family: var(--font-body); outline: none; transition: border-color 0.2s; }
.field input:focus { border-color: var(--teal); }
.btn { width: 100%; padding: 12px; background: var(--teal); color: #000; font-family: var(--font-display); font-size: 14px; font-weight: 600; border: none; border-radius: 6px; cursor: pointer; transition: opacity 0.2s; }
.btn:hover { opacity: 0.85; }
.btn:disabled { opacity: 0.4; cursor: not-allowed; }
.error-msg { font-size: 13px; color: var(--coral); margin-top: 12px; display: none; }

/* App shell */
.shell { display: flex; min-height: 100vh; }
.sidebar { width: 220px; background: var(--void-space); border-right: 1px solid var(--border-ghost); padding: 24px 0; flex-shrink: 0; }
.sidebar-logo { font-family: var(--font-display); font-size: 11px; font-weight: 600; letter-spacing: 0.15em; color: var(--text-pure); text-transform: uppercase; padding: 0 20px 24px; border-bottom: 1px solid var(--border-ghost); margin-bottom: 16px; }
.sidebar-label { font-family: var(--font-mono); font-size: 10px; color: var(--text-tertiary); letter-spacing: 0.1em; text-transform: uppercase; padding: 0 20px; margin: 16px 0 8px; }
.sidebar-link { display: flex; align-items: center; gap: 10px; padding: 9px 20px; font-size: 13px; color: var(--text-secondary); text-decoration: none; transition: all 0.2s; border-left: 2px solid transparent; }
.sidebar-link:hover { color: var(--text-primary); background: var(--void-elevated); }
.sidebar-link.active { color: var(--teal); border-left-color: var(--teal); background: var(--teal-subtle); }
.main { flex: 1; padding: 40px 48px; overflow-y: auto; }
.page-title { font-family: var(--font-display); font-size: 28px; font-weight: 700; margin-bottom: 8px; }
.page-sub { font-size: 14px; color: var(--text-tertiary); margin-bottom: 32px; }

/* Pipeline columns */
.pipeline { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 16px; }
.pipeline-col { flex-shrink: 0; width: 240px; }
.pipeline-col-header { font-family: var(--font-mono); font-size: 11px; color: var(--text-tertiary); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; }
.pipeline-col-count { background: var(--void-elevated); border-radius: 10px; padding: 2px 8px; font-size: 11px; }
.card { background: var(--void-elevated); border: 1px solid var(--border-ghost); border-radius: 8px; padding: 14px; margin-bottom: 10px; cursor: pointer; transition: border-color 0.2s; }
.card:hover { border-color: var(--border-subtle); }
.card-title { font-size: 13px; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
.card-sub { font-size: 12px; color: var(--text-tertiary); }
.badge { display: inline-block; font-family: var(--font-mono); font-size: 10px; padding: 2px 8px; border-radius: 3px; font-weight: 500; }
.badge-teal { background: var(--teal-subtle); color: var(--teal); }
.badge-coral { background: rgba(255,138,101,0.12); color: var(--coral); }
.badge-purple { background: rgba(187,143,206,0.12); color: var(--purple); }

/* Table */
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th { font-family: var(--font-mono); font-size: 10px; color: var(--text-tertiary); letter-spacing: 0.08em; text-transform: uppercase; text-align: left; padding: 8px 16px; border-bottom: 1px solid var(--border-ghost); }
td { font-size: 13px; padding: 12px 16px; border-bottom: 1px solid var(--border-ghost); color: var(--text-secondary); }
tr:hover td { background: var(--void-elevated); }

/* Modal */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 24px; }
.modal { background: var(--void-elevated); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 32px; width: 100%; max-width: 520px; max-height: 80vh; overflow-y: auto; }
.modal-title { font-family: var(--font-display); font-size: 20px; font-weight: 700; margin-bottom: 24px; }
.modal-footer { display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px; }
.btn-sm { padding: 8px 16px; font-size: 13px; font-family: var(--font-display); font-weight: 600; border: none; border-radius: 6px; cursor: pointer; transition: opacity 0.2s; }
.btn-primary { background: var(--teal); color: #000; }
.btn-ghost { background: var(--void-surface); color: var(--text-secondary); border: 1px solid var(--border-subtle); }
.btn-primary:hover, .btn-ghost:hover { opacity: 0.8; }

/* Draft output */
.draft-box { background: var(--void-surface); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 20px; font-size: 14px; color: var(--text-secondary); line-height: 1.7; white-space: pre-wrap; margin-top: 16px; font-family: var(--font-body); }

/* Top bar */
.topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px; }
.add-btn { padding: 8px 18px; background: var(--teal); color: #000; font-family: var(--font-display); font-size: 13px; font-weight: 600; border: none; border-radius: 6px; cursor: pointer; }
.add-btn:hover { opacity: 0.85; }

select, textarea { background: var(--void-surface); border: 1px solid var(--border-subtle); border-radius: 6px; padding: 10px 14px; font-size: 14px; color: var(--text-primary); font-family: var(--font-body); outline: none; transition: border-color 0.2s; width: 100%; }
select:focus, textarea:focus { border-color: var(--teal); }
textarea { resize: vertical; min-height: 80px; }
```

**Step 3: Create admin/js/auth.js**

```javascript
// admin/js/auth.js
const API_BASE = 'https://polarity-api-vercel-red.vercel.app';
// In local dev, change to: const API_BASE = 'http://localhost:8000';

function getToken() {
  return localStorage.getItem('lab_os_token');
}

function setToken(token) {
  localStorage.setItem('lab_os_token', token);
}

function clearToken() {
  localStorage.removeItem('lab_os_token');
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
  };
}

async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, { headers: authHeaders() });
  if (res.status === 401) { clearToken(); window.location.href = '/admin/index.html'; return null; }
  return res.json();
}

async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(body)
  });
  if (res.status === 401) { clearToken(); window.location.href = '/admin/index.html'; return null; }
  return res.json();
}

async function apiPut(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PUT', headers: authHeaders(), body: JSON.stringify(body)
  });
  if (res.status === 401) { clearToken(); window.location.href = '/admin/index.html'; return null; }
  return res.json();
}

async function apiDelete(path) {
  const res = await fetch(`${API_BASE}${path}`, { method: 'DELETE', headers: authHeaders() });
  if (res.status === 401) { clearToken(); window.location.href = '/admin/index.html'; return null; }
  return res.ok;
}

// Guard: redirect to login if no token
function requireAuth() {
  if (!getToken()) window.location.href = '/admin/index.html';
}
```

**Step 4: Create admin/index.html (login screen)**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Polarity Lab OS</title>
  <link rel="icon" href="/favicon.png">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/admin/css/admin.css">
</head>
<body>
<div class="login-wrap">
  <div class="login-card">
    <div class="login-logo">POLARITY</div>
    <h1 class="login-label">Lab OS</h1>
    <p class="login-sub">Admin access only.</p>
    <div class="field">
      <label>Password</label>
      <input type="password" id="password" placeholder="Enter admin password" autofocus>
    </div>
    <button class="btn" id="login-btn">Sign in →</button>
    <p class="error-msg" id="error-msg">Wrong password.</p>
  </div>
</div>
<script src="/admin/js/auth.js"></script>
<script>
  if (getToken()) window.location.href = '/admin/app.html';

  async function doLogin() {
    const pw = document.getElementById('password').value;
    const btn = document.getElementById('login-btn');
    const err = document.getElementById('error-msg');
    if (!pw) return;
    btn.disabled = true;
    btn.textContent = 'Signing in...';
    err.style.display = 'none';
    const data = await fetch(`${API_BASE}/api/lab-os/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw })
    }).then(r => r.json()).catch(() => null);
    if (data?.token) {
      setToken(data.token);
      window.location.href = '/admin/app.html';
    } else {
      err.style.display = 'block';
      btn.disabled = false;
      btn.textContent = 'Sign in →';
    }
  }

  document.getElementById('login-btn').addEventListener('click', doLogin);
  document.getElementById('password').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });
</script>
</body>
</html>
```

**Step 5: Create admin/app.html (main shell — redirects to grants by default)**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lab OS — Polarity</title>
  <link rel="icon" href="/favicon.png">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/admin/css/admin.css">
</head>
<body>
<script src="/admin/js/auth.js"></script>
<script>
  requireAuth();
  // Default: redirect to grants
  window.location.href = '/admin/grants.html';
</script>
</body>
</html>
```

**Step 6: Verify login flow locally**

Open `http://localhost:5500/admin/index.html` (use Live Server or any static server).
- Enter wrong password → error message shown
- Enter correct password → redirected to `/admin/grants.html`

**Step 7: Commit**

```bash
git -C ~/polarity-site add admin/ vercel.json
git -C ~/polarity-site commit -m "feat: add Lab OS admin frontend shell and login screen"
```

---

## Task 8: Grants UI

**Files:**
- Create: `polarity-site/admin/grants.html`

**Step 1: Create the grants page**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Grants — Lab OS</title>
  <link rel="icon" href="/favicon.png">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/admin/css/admin.css">
</head>
<body>
<div class="shell">
  <nav class="sidebar">
    <div class="sidebar-logo">LAB OS</div>
    <div class="sidebar-label">Pipeline</div>
    <a href="/admin/grants.html" class="sidebar-link active">Grants</a>
    <a href="/admin/outreach.html" class="sidebar-link">Outreach</a>
    <a href="/admin/believers.html" class="sidebar-link">Believers</a>
    <div class="sidebar-label" style="margin-top:24px;">Account</div>
    <a href="#" class="sidebar-link" id="logout-btn">Sign out</a>
  </nav>
  <main class="main">
    <div class="topbar">
      <div>
        <h1 class="page-title">Grant Prospecting</h1>
        <p class="page-sub">Track and draft grant applications.</p>
      </div>
      <button class="add-btn" id="add-btn">+ Add Grant</button>
    </div>
    <div class="pipeline" id="pipeline"></div>
  </main>
</div>

<!-- Add/Edit Modal -->
<div class="modal-overlay" id="modal" style="display:none">
  <div class="modal">
    <h2 class="modal-title" id="modal-title">Add Grant</h2>
    <div class="field"><label>Funder</label><input id="f-funder" placeholder="Knight Foundation"></div>
    <div class="field"><label>Program</label><input id="f-program" placeholder="Community Information"></div>
    <div class="field"><label>Amount</label><input id="f-amount" placeholder="$50,000 – $150,000"></div>
    <div class="field"><label>Deadline</label><input id="f-deadline" type="date"></div>
    <div class="field"><label>Fit (1-5)</label><input id="f-fit" type="number" min="1" max="5"></div>
    <div class="field"><label>Projects (comma-separated)</label><input id="f-projects" placeholder="Polarity GPS, AVDP"></div>
    <div class="field"><label>Stage</label>
      <select id="f-stage">
        <option value="identified">Identified</option>
        <option value="researching">Researching</option>
        <option value="drafting">Drafting</option>
        <option value="submitted">Submitted</option>
        <option value="awarded">Awarded</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
    <div class="field"><label>URL</label><input id="f-url" placeholder="https://..."></div>
    <div class="field"><label>Notes</label><textarea id="f-notes"></textarea></div>
    <div class="modal-footer">
      <button class="btn-sm btn-ghost" id="modal-cancel">Cancel</button>
      <button class="btn-sm btn-primary" id="modal-save">Save</button>
    </div>
  </div>
</div>

<!-- Draft Modal -->
<div class="modal-overlay" id="draft-modal" style="display:none">
  <div class="modal">
    <h2 class="modal-title">Draft Section</h2>
    <div class="field"><label>Section</label>
      <select id="d-section">
        <option value="problem_statement">Problem Statement</option>
        <option value="methods">Methods</option>
        <option value="team">Team</option>
        <option value="budget_narrative">Budget Narrative</option>
      </select>
    </div>
    <button class="btn-sm btn-primary" id="d-generate" style="margin-top:8px">Generate →</button>
    <div class="draft-box" id="d-output" style="display:none"></div>
    <div class="modal-footer">
      <button class="btn-sm btn-ghost" id="draft-close">Close</button>
    </div>
  </div>
</div>

<script src="/admin/js/auth.js"></script>
<script>
  requireAuth();

  const STAGES = ['identified','researching','drafting','submitted','awarded','rejected'];
  const STAGE_LABELS = { identified:'Identified', researching:'Researching', drafting:'Drafting', submitted:'Submitted', awarded:'Awarded', rejected:'Rejected' };
  let grants = [];
  let editingId = null;
  let draftGrantId = null;

  document.getElementById('logout-btn').addEventListener('click', () => { clearToken(); window.location.href = '/admin/index.html'; });

  async function load() {
    grants = await apiGet('/api/lab-os/grants') || [];
    render();
  }

  function render() {
    const pipeline = document.getElementById('pipeline');
    pipeline.innerHTML = STAGES.map(stage => {
      const items = grants.filter(g => g.stage === stage);
      return `<div class="pipeline-col">
        <div class="pipeline-col-header">
          <span>${STAGE_LABELS[stage]}</span>
          <span class="pipeline-col-count">${items.length}</span>
        </div>
        ${items.map(g => `
          <div class="card" onclick="openEdit(${g.id})">
            <div class="card-title">${g.funder}</div>
            <div class="card-sub">${g.program || ''}</div>
            ${g.amount ? `<div class="card-sub" style="margin-top:4px">${g.amount}</div>` : ''}
            ${g.fit_score ? `<span class="badge badge-teal" style="margin-top:8px">Fit: ${g.fit_score}/5</span>` : ''}
            <div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap">
              ${(g.projects||[]).map(p=>`<span class="badge badge-purple">${p}</span>`).join('')}
            </div>
            <div style="margin-top:10px">
              <button class="btn-sm btn-ghost" style="font-size:11px;padding:4px 10px" onclick="event.stopPropagation();openDraft(${g.id})">Draft →</button>
            </div>
          </div>`).join('')}
      </div>`;
    }).join('');
  }

  function openAdd() {
    editingId = null;
    document.getElementById('modal-title').textContent = 'Add Grant';
    ['funder','program','amount','deadline','fit','projects','url','notes'].forEach(f => {
      const el = document.getElementById(`f-${f}`);
      if (el) el.value = '';
    });
    document.getElementById('f-stage').value = 'identified';
    document.getElementById('modal').style.display = 'flex';
  }

  function openEdit(id) {
    const g = grants.find(x => x.id === id);
    if (!g) return;
    editingId = id;
    document.getElementById('modal-title').textContent = 'Edit Grant';
    document.getElementById('f-funder').value = g.funder || '';
    document.getElementById('f-program').value = g.program || '';
    document.getElementById('f-amount').value = g.amount || '';
    document.getElementById('f-deadline').value = g.deadline ? g.deadline.slice(0,10) : '';
    document.getElementById('f-fit').value = g.fit_score || '';
    document.getElementById('f-projects').value = (g.projects||[]).join(', ');
    document.getElementById('f-stage').value = g.stage || 'identified';
    document.getElementById('f-url').value = g.url || '';
    document.getElementById('f-notes').value = g.notes || '';
    document.getElementById('modal').style.display = 'flex';
  }

  async function saveGrant() {
    const body = {
      funder: document.getElementById('f-funder').value,
      program: document.getElementById('f-program').value,
      amount: document.getElementById('f-amount').value || null,
      deadline: document.getElementById('f-deadline').value || null,
      fit_score: parseInt(document.getElementById('f-fit').value) || null,
      projects: document.getElementById('f-projects').value.split(',').map(s=>s.trim()).filter(Boolean),
      stage: document.getElementById('f-stage').value,
      url: document.getElementById('f-url').value || null,
      notes: document.getElementById('f-notes').value || null,
    };
    if (editingId) {
      await apiPut(`/api/lab-os/grants/${editingId}`, body);
    } else {
      await apiPost('/api/lab-os/grants', body);
    }
    document.getElementById('modal').style.display = 'none';
    await load();
  }

  function openDraft(id) {
    draftGrantId = id;
    document.getElementById('d-output').style.display = 'none';
    document.getElementById('d-output').textContent = '';
    document.getElementById('draft-modal').style.display = 'flex';
  }

  async function generateDraft() {
    const btn = document.getElementById('d-generate');
    btn.textContent = 'Generating...';
    btn.disabled = true;
    const data = await apiPost('/api/lab-os/generate/grant-section', {
      grant_id: draftGrantId,
      section: document.getElementById('d-section').value
    });
    const out = document.getElementById('d-output');
    out.textContent = data?.draft || 'Error generating draft.';
    out.style.display = 'block';
    btn.textContent = 'Generate →';
    btn.disabled = false;
  }

  document.getElementById('add-btn').addEventListener('click', openAdd);
  document.getElementById('modal-cancel').addEventListener('click', () => document.getElementById('modal').style.display = 'none');
  document.getElementById('modal-save').addEventListener('click', saveGrant);
  document.getElementById('d-generate').addEventListener('click', generateDraft);
  document.getElementById('draft-close').addEventListener('click', () => document.getElementById('draft-modal').style.display = 'none');

  load();
</script>
</body>
</html>
```

**Step 2: Verify in browser**

- After login, you should land on `/admin/grants.html`
- Click "+ Add Grant", fill in Knight Foundation, save
- Card should appear in the Identified column
- Click "Draft →", select Problem Statement, click Generate → — a draft should appear after a few seconds

**Step 3: Commit**

```bash
git -C ~/polarity-site add admin/grants.html
git -C ~/polarity-site commit -m "feat: add grants pipeline UI to Lab OS admin"
```

---

## Task 9: Outreach UI

**Files:**
- Create: `polarity-site/admin/outreach.html`

Same pattern as grants.html but for leads. Pipeline stages: new → contacted → replied → in_conversation → won → lost. Add a "Draft email →" button per card that calls `/api/lab-os/generate/outreach-email`.

Key differences from grants UI:
- Fields: name, organization, role, email, project (select from AVDP/WAXFEED/Integrity Delta/Polarity GPS/General Fund), source, stage, notes, last_contact (date)
- Draft modal takes optional `context` textarea, calls `/api/lab-os/generate/outreach-email` with `lead_id` and `context`
- Stage labels: New, Contacted, Replied, In Conversation, Won, Lost

Build this following the exact same structure as grants.html. Copy the file, adjust field names, stages, and API paths.

**Commit:**
```bash
git -C ~/polarity-site add admin/outreach.html
git -C ~/polarity-site commit -m "feat: add outreach pipeline UI to Lab OS admin"
```

---

## Task 10: Believers UI

**Files:**
- Create: `polarity-site/admin/believers.html`

Same pattern as outreach.html but for financial believers. Pipeline stages: lead → conversation_scheduled → agreement_drafting → signed → active.

Key differences:
- Fields: name, project, amount (number, in dollars), stage, email, notes, last_contact
- No AI draft button (agreement drafts come in Phase 3)
- Stage labels: Lead, Call Scheduled, Agreement Drafting, Signed, Active
- Show amount on each card: `$${amount.toLocaleString()}`
- Add a total in each column header: sum of amounts for that stage

Build following grants.html structure. Adjust fields and stages.

**Commit:**
```bash
git -C ~/polarity-site add admin/believers.html
git -C ~/polarity-site commit -m "feat: add financial believer CRM UI to Lab OS admin"
```

---

## Task 11: Stripe on fund.html

**Files:**
- Modify: `polarity-site/fund.html`
- Modify: `polarity-os/api/routers/lab_os.py` (add Stripe session endpoint)

**Step 1: Add Stripe session endpoint to lab_os.py**

This endpoint is PUBLIC (no auth required) — it creates a Stripe checkout session for gift tier contributions.

```python
# ---------------------------------------------------------------------------
# Stripe gift tier (public — no admin auth required)
# ---------------------------------------------------------------------------

STRIPE_GIFT_PRICE_MAP = {
    "tier1": 1500,   # $15 representative amount for $10-$99 tier
    "tier2": 25000,  # $250 representative amount for $100-$999 tier
}

class GiftCheckoutRequest(BaseModel):
    project: str
    tier: str       # "tier1" or "tier2"
    amount_cents: int
    success_url: str
    cancel_url: str

@router.post("/gift/checkout")
async def create_gift_checkout(body: GiftCheckoutRequest):
    import stripe
    stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
    if not stripe.api_key:
        raise HTTPException(status_code=500, detail="Stripe not configured")
    if body.amount_cents < 1000 or body.amount_cents > 99900:
        raise HTTPException(status_code=400, detail="Amount must be $10–$999")
    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=[{
            "price_data": {
                "currency": "usd",
                "unit_amount": body.amount_cents,
                "product_data": {
                    "name": f"Polarity Lab — {body.project}",
                    "description": "Gift contribution. No financial return. See polarity-lab.com/legal.html for terms."
                },
            },
            "quantity": 1,
        }],
        mode="payment",
        success_url=body.success_url,
        cancel_url=body.cancel_url,
        metadata={"project": body.project, "tier": body.tier}
    )
    return {"checkout_url": session.url}
```

**Step 2: Update fund.html project cards**

For each project card, replace the `<a href="mailto:...">Back this project →</a>` button with a Stripe-powered button. Add amount input + checkout flow.

Find each `.fund-actions` div in fund.html. Replace the primary back button with:

```html
<button class="fund-btn" onclick="openGiftModal('AVDP')">Back this project →</button>
```

Add a gift modal at the end of the body (before `</div>` of page-wrapper):

```html
<!-- Gift Modal -->
<div id="gift-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:200;display:none;align-items:center;justify-content:center;padding:24px">
  <div style="background:var(--void-elevated);border:1px solid var(--border-subtle);border-radius:12px;padding:32px;width:100%;max-width:420px">
    <p style="font-family:var(--font-mono);font-size:11px;color:var(--teal);letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px" id="gift-project-label"></p>
    <h2 style="font-family:var(--font-display);font-size:22px;font-weight:700;margin-bottom:20px">Back this project</h2>
    <div style="margin-bottom:16px">
      <label style="font-size:12px;font-family:var(--font-mono);color:var(--text-tertiary);letter-spacing:.08em;text-transform:uppercase;display:block;margin-bottom:8px">Amount (USD)</label>
      <input id="gift-amount" type="number" min="10" max="999" placeholder="25" style="width:100%;background:var(--void-surface);border:1px solid var(--border-subtle);border-radius:6px;padding:10px 14px;font-size:16px;color:var(--text-primary);font-family:var(--font-body);outline:none">
      <p style="font-size:12px;color:var(--text-tertiary);margin-top:6px">$10–$99: founding credit. $100–$999: credit + physical artifact. <a href="/legal.html" style="color:var(--teal)">Full terms.</a></p>
    </div>
    <div style="display:flex;gap:12px;margin-top:24px">
      <button onclick="document.getElementById('gift-modal').style.display='none'" style="flex:1;padding:12px;background:var(--void-surface);border:1px solid var(--border-subtle);border-radius:6px;color:var(--text-secondary);font-family:var(--font-display);font-size:14px;font-weight:600;cursor:pointer">Cancel</button>
      <button onclick="submitGift()" style="flex:1;padding:12px;background:var(--teal);border:none;border-radius:6px;color:#000;font-family:var(--font-display);font-size:14px;font-weight:600;cursor:pointer" id="gift-pay-btn">Continue →</button>
    </div>
  </div>
</div>
```

Add the gift JS before `</script>` at the bottom of fund.html:

```javascript
const API_BASE = 'https://polarity-api-vercel-red.vercel.app';
let currentProject = '';

function openGiftModal(project) {
  currentProject = project;
  document.getElementById('gift-project-label').textContent = project;
  document.getElementById('gift-amount').value = '';
  document.getElementById('gift-modal').style.display = 'flex';
}

async function submitGift() {
  const amount = parseInt(document.getElementById('gift-amount').value);
  if (!amount || amount < 10 || amount > 999) {
    alert('Please enter an amount between $10 and $999.');
    return;
  }
  const btn = document.getElementById('gift-pay-btn');
  btn.textContent = 'Loading...';
  btn.disabled = true;
  const res = await fetch(`${API_BASE}/api/lab-os/gift/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      project: currentProject,
      tier: amount < 100 ? 'tier1' : 'tier2',
      amount_cents: amount * 100,
      success_url: `${window.location.origin}/fund.html?backed=1`,
      cancel_url: window.location.href
    })
  }).then(r => r.json()).catch(() => null);
  if (res?.checkout_url) {
    window.location.href = res.checkout_url;
  } else {
    alert('Something went wrong. Email team@polarity-lab.com to contribute.');
    btn.textContent = 'Continue →';
    btn.disabled = false;
  }
}
```

**Step 3: Add env vars**

```
STRIPE_SECRET_KEY=sk_live_...   (or sk_test_... for testing)
```

**Step 4: Test with Stripe test key**

Use `sk_test_...` and test card `4242 4242 4242 4242`. Back a project for $25. Should redirect to Stripe, complete, and return to fund.html with `?backed=1`.

**Step 5: Commit both repos**

```bash
git -C ~/polarity-os add api/routers/lab_os.py
git -C ~/polarity-os commit -m "feat: add Stripe gift checkout endpoint to Lab OS router"

git -C ~/polarity-site add fund.html
git -C ~/polarity-site commit -m "feat: add Stripe gift tier checkout to fund.html"
```

---

## Task 12: Deploy

**Step 1: Push polarity-os to both remotes**

```bash
cd ~/polarity-os
git push origin main
git push sh6drack main
```

**Step 2: Push polarity-site**

```bash
cd ~/polarity-site
git push origin main
```

**Step 3: Verify Vercel env vars are set**

In Vercel dashboard for `polarity-api-vercel` (sh6dracks-projects):
- `LAB_OS_ADMIN_PASSWORD` — set to strong random password
- `STRIPE_SECRET_KEY` — set to Stripe live key (or test key for now)
- `ANTHROPIC_API_KEY` — confirm already set

In Vercel dashboard for `polarity-os` (sh6dracks-projects):
- Same vars above if that deployment also needs them

**Step 4: Smoke test production**

```bash
# Login
curl -X POST https://polarity-api-vercel-red.vercel.app/api/lab-os/auth/login \
  -H "Content-Type: application/json" \
  -d '{"password": "your-admin-password"}'
```

Expected: `{"token": "..."}`

Open `https://polarity-lab.com/admin` in browser. Login. Add a test grant. Verify it saves and renders.

---

## Phase 1 Complete

After Task 12, Phase 1 delivers:
- Authenticated admin portal at `/admin`
- Grant prospecting pipeline with Claude-assisted draft generation
- Outreach pipeline with Claude-drafted cold emails
- Financial believer CRM
- Stripe gift checkout on `fund.html` (removes email friction for $10–$999)

Phase 2 plan covers: Growth Engine (content/SEO generation) and Lab Wiki.
Phase 3 plan covers: Full Doc Generator (pitch decks, onboarding packets, agreements).
