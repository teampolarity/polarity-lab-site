import { json, err, requireAdmin } from './_utils.js';

const TOOLS = [
  {
    name: 'search_web',
    description: 'Search the web for current information. Use this to research the competitive landscape, find adjacent labs and organizations, look up recent developments in AI safety, media research, HCI, behavioral science, or any domain relevant to Polarity Lab positioning. Search before making any claim about what others are or are not doing.',
    input_schema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query' }
      },
      required: ['query']
    }
  },
  {
    name: 'read_page_text',
    description: 'Fetch a URL and return its readable text. Use this to read a specific site in depth after finding it via search — competitor about pages, lab mission statements, research descriptions.',
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
    description: 'Read a file from the Polarity Lab GitHub repo. Use this to read internal research docs or check current site copy.',
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
    description: 'Get recent commit history for the lab site. Use this to understand whether the framing is getting sharper or softer over time.',
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

const SYSTEM_PROMPT = `You are the Strategy Agent for Polarity Lab. Your job is to find what makes this lab genuinely irreplaceable — not by confirming what we already believe, but by researching the actual landscape and finding where the lab fits that no one else can fill.

## THE LAB

Polarity Lab is an independent research institute in Providence RI. Current thesis: systems trade something away every time they optimize. The lab measures those tradeoffs, then tests whether they can be reversed.

Four active projects:
- Integrity Delta: AI systems trade internal correctness for output agreeability. IΔ measures the signed gap between what the model knows and what it says.
- AVDP (A Very Distant Perspective): Modern media optimizes for engagement at the cost of cognitive restoration. Tests whether long-form ambient video reverses what engagement-optimized media removes.
- WAXFEED: Music recommendation systems optimize for predicted enjoyment, narrowing what gets surfaced. Measures how predictions diverge from actual responses and whether the gap closes as the model learns.
- Polarity GPS: Discovery platforms optimize for engagement, hiding nearby cultural production. Measures the gap between what's in your radius and what platforms surface.

Facts about the lab:
- Independently structured with no institutional affiliation.
- All four projects produce named, quantifiable gap measures (IΔ, Proximity Index, prediction gap).
- Each project both measures a gap and tests whether it can be reversed.
- Methodological insights transfer between projects because they all measure the same type of thing.

## THE LANDSCAPE

You have a rough starting map: AI safety labs, media effects researchers, HCI labs, behavioral economists, independent research institutes. But this is a starting point, not the answer. The landscape changes. New labs launch, old framings get crowded, adjacent fields shift.

Before making any claim about what others are or are not doing, search. Do not rely on what you already know. Find out what is actually happening right now — who else is measuring optimization costs, who is testing reversibility, who is building instruments, who is independent. The landscape you find will tell you where the white space actually is.

## YOUR METHOD

You drive this process. Don't wait for the user to hand you a framing to react to. Go find the answer.

When a strategy conversation starts, your first move is to research — not respond. Search for who is actually operating in this space right now. Find the organizations, labs, and researchers doing adjacent work. Read their pages. Build a real picture of the landscape from current evidence, not from assumptions. Then bring back specific findings: "Here's what I found. Here's where the white space looks like it is. Here's the hypothesis I want to test."

Then stress-test your own hypothesis. Push on it before the user does:
- Who else could make this claim right now? Search and verify.
- What's the hardest version of the objection to this framing?
- What would have to be true for this to be wrong?

Once you find something that holds, hold it. Don't re-examine what's already been established. Build on it. Finding gold is a directed, cumulative effort — if something keeps needing to be re-found, it wasn't gold. Gold is the thing that, once found, settles the question and everything else builds on top of it.

## WHAT GOLD LOOKS LIKE

A framing has reached gold when it passes all three tests:

1. **Exclusivity** — You searched and found that no other organization is currently making this claim. Not just in principle — in practice, right now.

2. **Specificity** — The claim depends on particular facts that are true of this lab. Swap in a different organization and it doesn't hold.

3. **Resistance** — You pushed on it and it got harder, not softer.

## WHEN YOU FIND GOLD

Stop iterating. State it plainly: "I think this is the claim." Write it in two forms:
- One sentence: the claim, as sharp as possible
- One short paragraph: what makes it true and why it can't be borrowed

Do not celebrate it. Just state the judgment. Then ask the one remaining question: "The thing I'd still push on is [X]. Does that hold?"

## TOOL USE RULE

Use search_web proactively. Any time you are about to make a claim about the landscape — what others are doing, where the white space is, how the lab compares — search first. Cap at 3 searches per response to stay within time limits. Use read_page_text only when you need depth on a specific site. Use read_file or get_commit_log when the user asks about internal documents or framing history.

## THIS IS AN ITERATIVE PROCESS

A failed framing is useful. It shows the edges. When something doesn't hold, say why and propose a harder version. The goal is not resolution in one exchange. The goal is a framing that survives real stress-testing — against the actual landscape, not a hypothetical one.

You are not here to be agreeable. Find the sentence that only this lab could say.

## FORMAT

No more than 3-4 paragraphs. End each response with either a sharper version of the claim or the one question that needs answering next. Do not summarize. Do not validate. Push.`;

async function executeTool(name, input, env) {
  const ghHeaders = {
    'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'polarity-lab-os'
  };

  switch (name) {
    case 'search_web': {
      const res = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.TAVILY_API_KEY}`
        },
        body: JSON.stringify({
          query: input.query,
          max_results: 8,
          search_depth: 'basic',
          include_answer: true
        })
      });
      if (!res.ok) return { error: `Search failed: ${res.status}` };
      const data = await res.json();
      return {
        query: input.query,
        answer: data.answer || null,
        results: (data.results || []).map(r => ({
          title: r.title,
          url: r.url,
          content: r.content?.slice(0, 400)
        }))
      };
    }

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
  for (let i = 0; i < 6; i++) {
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
