#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  maxEntries: 20,
  ignorePatterns: [
    /^Redeploy$/i,
    /^Trigger redeploy$/i,
    /^Merge branch/i,
    /^Merge pull request/i,
    /^chore:\s*auto-update/i,
    /\[skip ci\]/i,
    /^Initial commit$/i
  ],
  categoryMap: {
    'fix': { label: 'Bug Fix', color: 'coral' },
    'add': { label: 'New Feature', color: 'teal' },
    'update': { label: 'Enhancement', color: 'purple' },
    'improve': { label: 'Enhancement', color: 'purple' },
    'mobile': { label: 'Mobile', color: 'teal' },
    'style': { label: 'Design', color: 'purple' },
    'design': { label: 'Design', color: 'purple' },
    'refactor': { label: 'Refactor', color: 'text-secondary' },
    'remove': { label: 'Removed', color: 'coral' },
    'delete': { label: 'Removed', color: 'coral' }
  }
};

function getRecentCommits() {
  try {
    const log = execSync(
      'git log --pretty=format:"%H|%s|%ai" -100',
      { encoding: 'utf-8' }
    );

    return log.split('\n')
      .filter(line => line.trim())
      .map(line => {
        const [hash, message, date] = line.split('|');
        return { hash, message, date: new Date(date) };
      })
      .filter(commit => !CONFIG.ignorePatterns.some(p => p.test(commit.message)));
  } catch (error) {
    console.error('Error fetching git log:', error.message);
    return [];
  }
}

function categorizeCommit(message) {
  const lowerMsg = message.toLowerCase();
  for (const [keyword, meta] of Object.entries(CONFIG.categoryMap)) {
    if (lowerMsg.includes(keyword)) return meta;
  }
  return { label: 'Update', color: 'text-secondary' };
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function generateChangelog() {
  const commits = getRecentCommits().slice(0, CONFIG.maxEntries);

  if (commits.length === 0) {
    console.log('No commits found to generate changelog');
    return;
  }

  // Ensure public directory exists
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Generate JSON for frontend
  const json = commits.map(c => ({
    id: c.hash.slice(0, 7),
    date: c.date.toISOString().split('T')[0],
    title: c.message,
    category: categorizeCommit(c.message)
  }));

  fs.writeFileSync(
    path.join(publicDir, 'changelog.json'),
    JSON.stringify(json, null, 2)
  );

  // Generate Markdown
  const md = `# Changelog

Recent updates to the Polarity Lab website.

---

${commits.map(c =>
`### ${formatDate(c.date)}

- ${c.message} (\`${c.hash.slice(0, 7)}\`)
`).join('\n')}

---

*Auto-generated from git history*
`;

  fs.writeFileSync(path.join(process.cwd(), 'CHANGELOG.md'), md);

  console.log(`Generated changelog with ${commits.length} entries`);
}

generateChangelog();
