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
  'Integrity Delta': 'Clinical AI sycophancy study measuring how often AI changes correct diagnoses under pushback, across 1,000 chest radiographs. Building evidence for regulators.',
  'PolarityGPS': 'Location-based civic game that maps community opportunity gaps in real time. Players are researchers. Data belongs to the public.',
  'AVDP': 'Documentary series (A Very Distant Perspective) exploring death and mortality as therapeutic experience. Film therapeutics research.',
  'WAXFEED': 'Music discovery platform that surfaces cognitive signatures in listening history. Platform and research are the same product.',
  'General Fund': 'Polarity Lab general operations fund. Supports all active projects as determined by the lab.'
};

export const GRANT_SECTION_INSTRUCTIONS = {
  problem_statement: 'Write a compelling 2-3 paragraph problem statement for a grant application.',
  methods: 'Write a detailed methods section describing the research approach and methodology.',
  team: 'Write a team qualifications section highlighting relevant expertise.',
  budget_narrative: 'Write a budget narrative section explaining how funds will be used.'
};
