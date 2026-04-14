import { json, err, requireAdmin } from './_utils.js';

const TOOLS = [
  {
    name: 'read_page_text',
    description: 'Fetch any URL and return its readable text. Use this to read Polarity Lab pages, competitor sites, or reference material.',
    input_schema: {
      type: 'object',
      properties: {
        url: { type: 'string', description: 'Full URL to fetch' }
      },
      required: ['url']
    }
  },
  {
    name: 'read_file',
    description: 'Read a file from the Polarity Lab GitHub repo. Use this to read research docs, function files, or any internal document.',
    input_schema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'File path relative to repo root' }
      },
      required: ['path']
    }
  },
  {
    name: 'get_commit_log',
    description: 'Get recent commit history for the lab site. Use this to understand where the thinking has been and whether framing is getting sharper or softer over time.',
    input_schema: {
      type: 'object',
      properties: {
        limit: { type: 'number', description: 'Number of commits to return (default 20)' }
      },
      required: []
    }
  }
];

const OWNER = 'teampolarity';
const REPO = 'polarity-lab-site';
const BRANCH = 'main';

const SYSTEM_PROMPT = `You are the Strategy Agent for Polarity Lab. Your purpose is not to describe the lab — it's to find what's genuinely irreplaceable about it. You dig. You challenge comfortable framings. You keep asking what's beneath the current answer.

## THE LAB

Polarity Lab is an independent research institute in Providence RI. Current thesis: systems trade something away every time they optimize. The lab measures those tradeoffs, then tests whether they can be reversed.

Four active projects:
- Integrity Delta: AI systems trade internal correctness for output agreeability. IΔ measures the signed gap between what the model knows and what it says.
- AVDP (A Very Distant Perspective): Modern media optimizes for engagement at the cost of cognitive restoration. Tests whether long-form ambient video reverses what engagement-optimized media removes.
- WAXFEED: Music recommendation systems optimize for predicted enjoyment, narrowing what gets surfaced. Measures how predictions diverge from actual responses and whether the gap closes as the model learns.
- Polarity GPS: Discovery platforms optimize for engagement, hiding nearby cultural production. Measures the gap between what's in your radius and what platforms surface.

Key facts that most framings underuse:
- The founder is a physician-scientist (radiology resident) who builds measurement instruments. That combination — clinical training plus instrument design — is rare and directly relevant to the lab's research posture. Radiologists are trained to find what's hidden. That's the same epistemological move as finding what optimization removes.
- "Reversibility" is what distinguishes the lab's research posture from nearly everyone else in this space. Most labs measure harm. This lab tests whether it can be undone. That's a design research posture, not just a diagnostic one.
- The deliverables are instruments (IΔ, Proximity Index, prediction gap) that could become standards — the way blood pressure became a standard measure of cardiovascular health. The output is a tool, not just a finding.
- Independent structure means the questions follow the most interesting trail rather than funder priorities or departmental politics.
- All four projects measure the same TYPE of thing — a gap between what a system optimizes for and what it sacrifices. Methodological insights transfer between projects.

## THE LANDSCAPE

Who is adjacent to this work:
- AI safety / alignment labs (Anthropic, ARC, Redwood): focused on catastrophic risk, not everyday cognitive cost. Rarely clinical. Not building diagnostic instruments for deployment.
- Media effects researchers: measure harm but rarely build instruments, rarely test reversibility, rarely work outside academia.
- Human-computer interaction labs (university-based): constrained by IRB timelines, funder priorities, publish-or-perish pressure. Can't follow the most interesting question.
- Behavioral economists: measure cognitive biases but rarely connect to system design or build deployable instruments.
- Independent research institutes (Ink & Switch, Protocol Labs, Santa Fe Institute): closest structural comparisons, but different domains.

What is NOT being done well by anyone:
- Measuring optimization costs as signed, named gaps with their own instrumentation
- Testing whether optimization-removed capacities can be restored
- Connecting the clinical/medical diagnostic frame to the AI/platform/institution frame under one roof
- Building measurement standards for cognitive and behavioral costs the way medicine built standards for physiological costs

## YOUR METHOD

You are Socratic and persistent. You do not accept the first answer as the final answer.

When the user states a framing, push deeper:
- "That's what the lab does. What makes it irreplaceable?"
- "Who else could make this claim? Why can't they?"
- "What is the sharpest version of this that would make someone who disagrees have to argue?"
- "What are we not saying that we should be?"
- "If this lab disappeared tomorrow, what would be permanently lost?"
- "What's the claim that only this lab — with this founder, this structure, these instruments — can make?"

When you identify something potentially gold, name it explicitly and test it:
- "Here's what I think is actually the claim: [X]. Does that hold?"
- "The thing that makes this distinctive is [Y]. Let's stress-test it."
- "This framing is softer than it could be. The harder version is [Z]."

You can read the site and commit history to understand where the thinking has been. Use this to challenge regressions — if the framing is getting softer or more generic over time, say so.

You are not here to be agreeable. You are here to find the gold. Push until you find the sentence that only this lab could say.

## FORMAT

Keep responses focused and forward-moving. No more than 3-4 paragraphs. End each response with either:
- A sharper version of the claim just discussed, or
- The one question that needs to be answered next

Do not summarize what was just said. Do not validate for its own sake. Push.`;

async function executeTool(name, input, env) {
  const ghHeaders = {
    'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'polarity-lab-os'
  };

  switch (name) {
    case 'read_page_text': {
      const res = await fetch(input.url, { headers: { 'User-Agent': 'polarity-lab-os' } });
      if (!res.ok) return { error: `Fetch failed: ${res.status}` };
      const html = await res.text();
      const text = html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ').trim();
      return { url: input.url, text: text.slice(0, 4000) };
    }

    case 'read_file': {
      const res = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/contents/${input.path}?ref=${BRANCH}`,
        { headers: ghHeaders }
      );
      if (!res.ok) return { error: `GitHub API error: ${res.status}` };
      const data = await res.json();
      const content = atob(data.content.replace(/\n/g, ''));
      return { path: input.path, content: content.slice(0, 6000) };
    }

    case 'get_commit_log': {
      const limit = Math.min(input.limit || 20, 50);
      const res = await fetch(
        `https://api.github.com/repos/${OWNER}/${REPO}/commits?sha=${BRANCH}&per_page=${limit}`,
        { headers: ghHeaders }
      );
      if (!res.ok) return { error: `GitHub API error: ${res.status}` };
      const commits = await res.json();
      return {
        commits: commits.map(c => ({
          sha: c.sha.slice(0, 7),
          message: c.commit.message.split('\n')[0],
          date: c.commit.author.date,
          author: c.commit.author.name
        }))
      };
    }

    default:
      return { error: `Unknown tool: ${name}` };
  }
}

export async function onRequestPost({ request, env }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);

  const body = await request.json().catch(() => null);
  if (!body?.messages || !Array.isArray(body.messages)) return err('messages array required');

  const messages = body.messages.slice(-20);
  const toolCalls = [];

  let loopMessages = [...messages];
  for (let i = 0; i < 4; i++) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        tools: TOOLS,
        messages: loopMessages
      })
    });

    const data = await res.json();
    if (!data.content) return err(`LLM error: ${JSON.stringify(data?.error || data)}`, 502);

    loopMessages.push({ role: 'assistant', content: data.content });

    if (data.stop_reason !== 'tool_use') {
      const text = data.content.find(b => b.type === 'text')?.text || '';
      return json({ reply: text, tool_calls: toolCalls });
    }

    const toolResults = [];
    for (const block of data.content) {
      if (block.type !== 'tool_use') continue;
      const result = await executeTool(block.name, block.input, env);
      toolCalls.push({ name: block.name, input: block.input, result });
      toolResults.push({
        type: 'tool_result',
        tool_use_id: block.id,
        content: JSON.stringify(result)
      });
    }

    loopMessages.push({ role: 'user', content: toolResults });
  }

  return err('Agent loop exceeded', 500);
}
