import { json, err, requireAdmin, PROJECTS } from '../_utils.js';

const DOC_INSTRUCTIONS = {
  pitch: `Write a pitch document for this project. Structure it with clear section headers. Sections:

1. THE PROBLEM — What specific, measurable harm or gap does this project address? Ground it in the cognitive harm thesis: how interaction with AI, media, or discovery systems degrades human cognition in a concrete, measurable way. Be specific to this project, not the lab in general.

2. OUR APPROACH — The methodology and what makes it different. This is where Polarity's work is most differentiated — lead with the measurement instrument. Be concrete: what is measured, how, what the output is. Distinguish from adjacent work that talks about the problem without measuring it.

3. EVIDENCE — What has already been validated. Be honest about stage. Pilot results, proof-of-concept, pre-registration status, partnerships in progress. Do not inflate. Credibility comes from specificity.

4. THE OPPORTUNITY — Why this research matters now. What becomes possible if the measurement problem is solved. What downstream applications open up (clinical, policy, product, regulatory). Keep it grounded — no "revolution" or "paradigm shift."

5. WHAT WE'RE BUILDING — The concrete research deliverables and product outputs. What will exist at the end of the grant/collaboration period that didn't exist before.

6. THE ASK — Tailor to the context provided. If no context given, write a general version covering: research funding, IRB sponsorship partnership, or collaboration. Be specific about what each type of support enables.

7. ABOUT POLARITY LAB — One paragraph. Independent research institute for the human condition, Providence RI. All four projects measure cognitive interaction with AI, media, and discovery systems. Independence from institutional incentives as a design choice, not a limitation.

Tone: clear, precise, intellectually serious. No buzzwords. No em dashes. Write for a reader who is smart and skeptical.`,

  onboarding: `Write an onboarding packet for a new contributor joining this project. Structure with clear section headers:

1. WELCOME — Brief, direct. What this project is in two sentences. What kind of contributor this packet is for (leave flexible — could be researcher, developer, producer, community partner).

2. THE RESEARCH QUESTION — The core question in plain language. Not the academic framing, not the pitch framing — the honest "here's what we're trying to figure out" version. One paragraph.

3. WHERE WE ARE — Current status. What has been built, validated, or produced so far. What is actively in progress. Be honest about what is done vs. what is planned.

4. HOW YOU CAN CONTRIBUTE — Specific contribution types based on the project's actual needs (varies by project: Integrity Delta needs ML researchers; AVDP needs producers and IRB partners; WAXFEED needs mobile developers; PolarityGPS needs community connectors). 3-5 concrete contribution types with a sentence on each.

5. GETTING STARTED — Practical next steps. First week actions. Key materials to review. Questions to ask. Keep it actionable.

6. NORMS AND EXPECTATIONS — How Polarity works. Independent, non-hierarchical, research-first. IP stays with the lab. Contributor credit is explicit and documented. Communication is async-first.

7. CONTACT — Placeholder for name/email. Note that polarity-lab.com has full project details.

Tone: welcoming but not corporate. Direct. Assumes intelligence.`,

  agreement: `Write a collaboration agreement draft between Polarity Lab and a collaborator. This is a working draft — not legal advice, but a usable starting template. Structure:

1. PARTIES — Polarity Lab (Providence RI, independent research institute) and [COLLABORATOR NAME / ORGANIZATION] (fill in). Effective date: [DATE].

2. PROJECT AND SCOPE — Description of the specific project and what this collaboration covers. Draw from the project description provided. Be specific about the scope boundary — what is included and what is not.

3. COLLABORATOR RESPONSIBILITIES — What the collaborator commits to: time, deliverables, access, participation. Use specific language with brackets for things that need to be filled in (e.g., [X hours per week], [specific deliverable]).

4. POLARITY LAB RESPONSIBILITIES — What the lab commits to: access to research materials, credit, compensation if applicable, communication cadence.

5. INTELLECTUAL PROPERTY — All research outputs, data, methodologies, and publications remain property of Polarity Lab. Collaborator receives explicit credit in all publications and public communications. Collaborator may not independently publish findings from this collaboration without written consent.

6. CONFIDENTIALITY — Both parties agree to keep pre-publication research findings, participant data, and internal processes confidential. Standard carve-outs for publicly available information.

7. COMPENSATION — [If applicable: describe arrangement. If volunteer/unpaid, state clearly with acknowledgment of contribution.]

8. DURATION AND TERMINATION — Term of agreement: [START DATE] to [END DATE] or until project completion. Either party may terminate with [30] days written notice.

9. GOVERNING LAW — State of Rhode Island.

10. SIGNATURES — Signature blocks for both parties with name, title, date.

Note at top: "DRAFT — prepared by Polarity Lab. Review with legal counsel before execution."

Tone: formal but readable. Plain language over legal jargon where possible.`
};

export async function onRequestPost({ request, env }) {
  const claims = await requireAdmin(request, env);
  if (!claims) return err('Unauthorized', 401);

  const body = await request.json().catch(() => null);
  if (!body?.type || !DOC_INSTRUCTIONS[body.type]) {
    return err(`type must be one of: ${Object.keys(DOC_INSTRUCTIONS).join(', ')}`);
  }
  if (!body?.project || !PROJECTS[body.project]) {
    return err(`project must be one of: ${Object.keys(PROJECTS).join(', ')}`);
  }

  const prompt = `You are writing a ${body.type} document for Polarity Lab, an independent research institute for the human condition in Providence, RI.

PROJECT: ${body.project}
${PROJECTS[body.project]}

${body.context ? `ADDITIONAL CONTEXT: ${body.context}\n` : ''}
${DOC_INSTRUCTIONS[body.type]}

Format the output in clean markdown with ## section headers. Write it ready to use — no placeholders except where explicitly instructed (like agreement party names and dates).`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const data = await res.json();
    const text = data.content?.[0]?.text;
    if (!text) return err('Generation failed', 502);
    return json({ type: body.type, project: body.project, content: text });
  } catch {
    return err('Generation failed', 502);
  }
}
