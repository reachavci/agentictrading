/**
 * All text for the /agentic-trading page.
 * Edit the words here; you don't need to touch anything in /components.
 */
import { SITE_NAME } from "./site";

export const seo = {
  title: `When agents act, control is the product · ${SITE_NAME}`,
  description:
    "AI models and standards will keep changing. What users need from an agent that moves money won't: a clear plan, their approval, firm limits and a record of everything.",
};

export const hero = {
  title: "When agents act, control is the product",
  subline:
    "AI models and standards will keep changing. What users need from an agent that moves money won't: a clear plan, their approval, firm limits and a record of everything.",
  ctaLabel: "Request a demo",
  ctaHref: "/#demo",
};

export const thesis = {
  title: "Build the control layer, not another chatbot",
  text: "Agentic trading is still taking shape. New models, assistants and standards arrive every few months, and you can't build around all of them. What you can build around is control: a layer that turns every request into a plan, checks it against your users' rules, and records what happens.",
};

// visual must be one of: "plan" (hero chat with plan card), "rules" (limits bar + blocked instruction),
// "record" (log lines + pause toggle)
export type PillarVisual = "plan" | "rules" | "record";

export const pillars: { title: string; text: string; bullets: string[]; visual: PillarVisual }[] = [
  {
    title: "Turn requests into approved plans",
    text: `Users don't speak in order forms. They say "sell half my ETH" or "buy every Friday." The agent turns that into a structured plan with asset, amount, trigger and limits, shows it in full, and asks whenever something is missing. Nothing runs until the user approves.`,
    bullets: ["Understand everyday language, by chat and voice", "Show the full plan before anything runs", "Ask when something is unclear"],
    visual: "plan",
  },
  {
    title: "Keep every agent inside the rules",
    text: "An agent that moves money should never decide what's allowed. Fixed rules, running separately from AI, check every action against the limits users set: budgets, assets and frequency. Unusual amounts go back to the user for confirmation, and suspicious instructions are blocked before they reach an order.",
    bullets: ["Enforce the limits users set", "Flag unusual amounts and block manipulation", "AI reads the data, never changes it"],
    visual: "rules",
  },
  {
    title: "Prove every action",
    text: "When something goes wrong, you need to know exactly what happened. Every request, plan, approval and order is recorded with the agent that handled it and the user it acted for. If anything looks off, one tap pauses one agent or all of them.",
    bullets: ["Know which agent acted, for whom, and when", "Keep a tamper-proof record", "Pause any agent, or all of them, instantly"],
    visual: "record",
  },
];

export const faq = {
  eyebrow: "FAQ",
  title: "Questions",
  items: [
    {
      q: "What is agentic trading?",
      a: "Agentic trading is when autonomous AI agents turn a user's intent into positions, without manual order entry, within limits the user approves. Powered by LLM reasoning, agents read market and on-chain data, build a plan toward the user's goal, execute it once approved, and monitor it until the goal is reached.",
    },
    {
      q: "Why does control matter more than the AI model?",
      a: "Models change every few months. Users' trust depends on something steadier: seeing the plan, approving it, and knowing agents stay within their limits.",
    },
    {
      q: "How do agents stay within users' limits?",
      a: "Fixed rules check every action against the user's limits, separately from AI. Anything outside them is flagged or blocked.",
    },
    {
      q: "How does a pilot start?",
      a: "With simulated trading, inside your app and under your brand, before any real money moves.",
    },
  ],
};

export const closing = {
  title: "Start with a pilot",
  text: "Simulated trading first, in your app, under your brand.",
  ctaLabel: "Request a demo",
  ctaHref: "/#demo",
};
