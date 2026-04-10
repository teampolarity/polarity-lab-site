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
  'PolarityGPS': `Location-based game where proximity-driven missions surface civic and cultural infrastructure invisible on standard discovery platforms. The Proximity Index measures the gap between cultural/civic output within a radius and what platforms actually surface. Providence pilot drew from MUSEOFRI network and manual audits of Google Maps, Yelp, and social tools. Problem is not community output but platform design — discovery platforms optimize for chains, burying neighborhood institutions. 90-day controlled study: does mission-based proximity discovery shift Proximity Scores vs. control group using standard platforms? Gap confirmed by Providence pilot. Controlled study upcoming.`,
  'General Fund': `Polarity Lab general operations fund — independent research institute in Providence RI. All four projects pair rigorous research questions with products generating continuous behavioral data. Lab thesis: how humans interact with AI, media, and discovery systems is a new class of harm to human cognition. Measurement reveals what design can change.`
};

export const GRANT_SECTION_INSTRUCTIONS = {
  problem_statement: 'Write a compelling 2-3 paragraph problem statement for a grant application.',
  methods: 'Write a detailed methods section describing the research approach and methodology.',
  team: 'Write a team qualifications section highlighting relevant expertise.',
  budget_narrative: 'Write a budget narrative section explaining how funds will be used.'
};
