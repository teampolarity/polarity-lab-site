// Shared utilities for Lab OS Pages Functions

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });
}

export function err(message, status = 400) {
  return json({ error: message }, status);
}

// --- JWT (Web Crypto, no dependencies) ---

function b64url(buf) {
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function encodeObj(obj) {
  return b64url(new TextEncoder().encode(JSON.stringify(obj)));
}

export async function signJWT(payload, secret) {
  const header = encodeObj({ alg: 'HS256', typ: 'JWT' });
  const body = encodeObj(payload);
  const data = `${header}.${body}`;
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return `${data}.${b64url(sig)}`;
}

export async function verifyJWT(token, secret) {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, payload, sig] = parts;
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
  );
  const sigBytes = Uint8Array.from(
    atob(sig.replace(/-/g, '+').replace(/_/g, '/')),
    c => c.charCodeAt(0)
  );
  const valid = await crypto.subtle.verify(
    'HMAC', key, sigBytes, new TextEncoder().encode(`${header}.${payload}`)
  );
  if (!valid) return null;
  const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) return null;
  return decoded;
}

export async function requireAdmin(request, env) {
  const auth = request.headers.get('Authorization') || '';
  if (!auth.startsWith('Bearer ')) return null;
  return verifyJWT(auth.slice(7), env.LAB_OS_JWT_SECRET);
}

// Timing-safe password comparison via HMAC
export async function timingSafeEqual(a, b) {
  const nonce = crypto.getRandomValues(new Uint8Array(32));
  const [ka, kb] = await Promise.all([
    crypto.subtle.importKey('raw', new TextEncoder().encode(a), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']),
    crypto.subtle.importKey('raw', new TextEncoder().encode(b), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  ]);
  const [sa, sb] = await Promise.all([
    crypto.subtle.sign('HMAC', ka, nonce),
    crypto.subtle.sign('HMAC', kb, nonce)
  ]);
  const va = new Uint8Array(sa), vb = new Uint8Array(sb);
  let diff = 0;
  for (let i = 0; i < va.length; i++) diff |= va[i] ^ vb[i];
  return diff === 0;
}

export const PROJECTS = {
  'Integrity Delta': `Research into "Polite Malpractice" — AI systems trained on human preference data suppressing correct internal reasoning to produce preferred outputs. The Integrity Delta (IΔ) measures the signed gap between a model's internal correctness (via logit-lens analysis) and its final output. Pilot confirmed: Llama 3.1 8B correctly identified mild cardiomegaly internally but output aligned with adversarial label. Clinical risk: diagnostic AI that agrees when it shouldn't, atrophying clinician independent reasoning. Manuscript in prep, OSF pre-registration drafted. Based in Providence RI, independent lab.`,
  'AVDP': `A Very Distant Perspective — long-form video interview format as research instrument testing whether watching authentic human connection is measurably restorative. Format IS the methodology: removes phones, uses live-mixed ambient soundscapes, measures via post-session surveys and independent rater assessments. Produced in English and Mandarin Chinese. Grounded in narrative medicine literature (Charon 2001), emotional contagion (Kramer et al. 2014), phone-presence empathy reduction (Przybylski 2012). Not media as vague self-care — media as clinical intervention. Proof of concept established. IRB sponsorship through university partner needed for full validation study.`,
  'WAXFEED': `Music platform where the way you rate music reveals how you think — what you notice, ignore, who you agree with. Core question: does cognitive similarity measured through music response predict real lasting friendships? Song ratings train a model to predict responses to unheard music; prediction gaps become cognitive signal. Language data from global radio chat tracks emotional processing patterns. Relationship formation tracked at 30 and 90 days. Music response is harder to fake than self-report. Longer-term angle: baseline cognitive profiles from music as early detection instruments for neurological disease. Providence pilot upcoming.`,
  'Polarity GPS': `Location-based game where proximity-driven missions surface civic and cultural infrastructure invisible on standard discovery platforms. The Proximity Index measures the gap between cultural/civic output within a radius and what platforms actually surface. Providence pilot drew from MUSEOFRI network and manual audits of Google Maps, Yelp, and social tools. Problem is not community output but platform design — discovery platforms optimize for chains, burying neighborhood institutions. 90-day controlled study: does mission-based proximity discovery shift Proximity Scores vs. control group using standard platforms? Gap confirmed by Providence pilot. Controlled study upcoming.`,
  'Polarity Lab': `Independent research institute for the human condition, Providence RI. Thesis: how humans interact with AI, media, and discovery systems represents a new class of measurable harm to human cognition. Measurement reveals what design can change. Four active projects: Integrity Delta (AI systems suppressing correct internal reasoning — clinical risk in diagnostic AI), AVDP (long-form video as a measurable intervention for restorative human connection), WAXFEED (music response as cognitive proxy for friendship formation and neurological baseline), PolarityGPS (proximity-based discovery to surface civic infrastructure hidden by platform design). All four pair rigorous research questions with products that generate continuous behavioral data. Independent by design — no university affiliation, no PI requirement, no institutional incentives distorting the research agenda. Based in Providence RI.`
};

export const GRANT_SECTION_INSTRUCTIONS = {
  problem_statement: `Write a 3-paragraph problem statement for this grant application.

Paragraph 1 — The core problem: How humans interact with AI, media, and discovery systems represents a new class of measurable harm to human cognition. This is not a vague concern about screen time — it is a specific, quantifiable failure mode: systems designed to optimize for engagement or preference suppress the conditions required for accurate perception, genuine connection, and independent reasoning. Frame this for the specific funder's domain (documentary/arts: the conditions for empathy and connection; AI safety: systems that agree when they shouldn't; civic tech: platforms that hide community infrastructure by design).

Paragraph 2 — Why existing approaches fall short: Current research treats these harms as secondary effects of otherwise-neutral systems. Polarity Lab's thesis is that they are primary design outputs — measurable, predictable, and correctable. The gap is not awareness but instrumentation. We lack tools to measure the delta between what a system could surface and what it does, between internal correctness and external output, between cognitive similarity and platform-mediated connection.

Paragraph 3 — The specific problem this project addresses: Draw directly from the project description provided. Be concrete about the research question, the population affected, and what becomes possible if this measurement problem is solved. Do not overstate. Do not use the word "revolutionary."`,

  methods: `Write a 3-4 paragraph methods section for this grant application.

The methods section is where Polarity's work is most differentiated — lead with the measurement instrument, not the hypothesis.

For each project, the key methodological hook is:
- Integrity Delta: logit-lens analysis to access internal model representations; the IΔ metric as a signed gap score; the pilot replication protocol using Llama 3.1 8B and chest radiograph data; OSF pre-registration.
- AVDP: the format IS the methodology — controlled removal of phones, live-mixed ambient soundscapes, post-session surveys validated against independent rater assessments, dual-language production as a cross-cultural control.
- WAXFEED: song rating as a harder-to-fake cognitive proxy than self-report; prediction gap analysis; relationship formation tracked at 30 and 90 days; longitudinal cognitive baseline construction.
- Polarity GPS: the Proximity Index as a quantitative gap metric; controlled 90-day intervention vs. control group using standard platforms; platform audit methodology drawing from MUSEOFRI network and manual coverage mapping.

Write the methods clearly: what is measured, how it is measured, what controls are in place, what the deliverable is. Address IRB or ethical review status honestly — note where sponsorship is being sought if applicable. 300-400 words.`,

  team: `Write a 2-paragraph team qualifications section.

Paragraph 1 — Address the independent structure directly and positively: Polarity Lab is deliberately unaffiliated. Independence from institutional incentives is not a limitation — it is the structural condition that makes this research possible. Labs embedded in universities optimize for publication cycles, departmental politics, and PI career trajectories. Polarity optimizes for the research question. Note Providence RI base, active partnerships being developed for IRB sponsorship, and the multi-disciplinary nature of the work (AI/ML, clinical informatics, documentary film, cognitive science, civic technology).

Paragraph 2 — Specific qualifications relevant to this grant and project: Draw from the project description. Highlight what has already been built or validated — the Llama 3.1 8B pilot for Integrity Delta, the proof-of-concept AVDP sessions, the Providence pilot for Polarity GPS. Credibility comes from what has already been done, not from credentials. Be specific and honest about stage of development.`,

  budget_narrative: `Write a concise budget narrative (2-3 paragraphs) for this grant application.

Polarity is an independent lab — no indirect cost overhead, no institutional markup. Funds go directly to research activities. Frame this as a feature, not a disclaimer.

Cover the major categories relevant to this project:
- Researcher time: the primary cost. Be specific about what work this covers (data collection, analysis, production, software development).
- IRB sponsorship and ethics review: required for human subjects work; Polarity is actively securing university partnership for this.
- Equipment and infrastructure: what is needed and why (recording equipment for AVDP, compute for Integrity Delta analysis, mobile development for Polarity GPS/WAXFEED).
- Participant compensation: for studies involving human subjects — appropriate rates, ethical compensation.
- Dissemination: open-access publication, pre-registration, dataset release where applicable.

Be specific about numbers where possible. If amount is listed in the grant context, size the narrative accordingly. Do not include line items for things not relevant to this project.`
};
