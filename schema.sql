CREATE TABLE IF NOT EXISTS lab_os_grants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  funder TEXT NOT NULL,
  program TEXT,
  amount INTEGER,
  deadline TEXT,
  fit_score INTEGER,
  projects TEXT,
  stage TEXT NOT NULL DEFAULT 'identified',
  notes TEXT,
  url TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS lab_os_leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  organization TEXT,
  role TEXT,
  email TEXT,
  project TEXT,
  source TEXT,
  stage TEXT NOT NULL DEFAULT 'new',
  notes TEXT,
  last_contact TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS lab_os_believers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  project TEXT,
  amount INTEGER,
  stage TEXT NOT NULL DEFAULT 'lead',
  email TEXT,
  notes TEXT,
  last_contact TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS lab_os_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT,
  project TEXT,
  title TEXT,
  body TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  week TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS lab_os_commentary (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
