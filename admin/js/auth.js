// admin/js/auth.js
const API_BASE = 'https://polarity-api-vercel-red.vercel.app';

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

function requireAuth() {
  if (!getToken()) window.location.href = '/admin/index.html';
}
