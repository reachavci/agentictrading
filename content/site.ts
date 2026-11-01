/**
 * ALL website text lives in this file.
 * Edit the words here; you don't need to touch anything in /components.
 */

// ── Company name ────────────────────────────────────────────────
// Change this one line to rename the company everywhere on the site.
export const SITE_NAME = "[Name]";

// ── Demo requests ───────────────────────────────────────────────
// Where demo requests go. The form opens the visitor's email app addressed here.
// TODO: replace the email-app approach with a real form service (e.g. Formspree, HubSpot).
export const DEMO_EMAIL = "[your email]";

// Public URL of the site (used for social-share previews).
// Vercel sets VERCEL_PROJECT_PRODUCTION_URL automatically; you can also
// set NEXT_PUBLIC_SITE_URL in Vercel → Settings → Environment Variables.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// ── SEO ─────────────────────────────────────────────────────────
export const seo = {
  title: `${SITE_NAME} · Let your users trade by chat and voice`,
  description:
    "Agentic trading for brokers, exchanges and fintechs. No trade runs without your users' approval. No agent goes beyond their limits.",
  ogImage: "/og-image.png", // placeholder; replace public/og-image.png later
};

// ── Header ──────────────────────────────────────────────────────
export const header = {
  ctaLabel: "Request a demo",
  ctaHref: "#demo",
  menuLabel: "Menu",
  // Menu links; each scrolls to the section with that id.
  nav: [
    { label: "Product", href: "#how-it-works" },
    { label: "Security", href: "#security" },
    { label: "Solutions", href: "#solutions" },
  ],
};

// ── Hero ────────────────────────────────────────────────────────
export const hero = {
  eyebrow: "Security layer for agentic trading",
  title: "Let your users trade by chat and voice",
  // Each entry is one line on desktop; on phones they flow together and wrap naturally.
  subline: [
    "No trade runs without their approval.",
    "No agent goes beyond their limits.",
  ],
  audience: "For brokers, exchanges and fintechs.",
  chatLabel: "Agent",
  ctaLabel: "Request a demo",
  secondaryCtaLabel: "How it works",
  secondaryCtaHref: "#how-it-works",
  statusAwaiting: "Awaiting approval",
  statusApproved: "Approved ✓",
  planTitle: "Proposed plan",
};

export type PlanRow = { label: string; value: string };
export type ChatExample = { prompt: string; plan: PlanRow[] };

// Shown one after another in the hero chat card, then it loops.
export const chatExamples: ChatExample[] = [
  {
    prompt: "Buy $500 of Nvidia every Friday",
    plan: [
      { label: "Action", value: "Buy NVDA · $500" },
      { label: "Trigger", value: "Every Friday, market open" },
      { label: "Limit", value: "Max $2,000 / month" },
    ],
  },
  {
    prompt: "If BTC drops below $90k, buy $200",
    plan: [
      { label: "Action", value: "Buy BTC · $200" },
      { label: "Trigger", value: "BTC below $90,000" },
      { label: "Limit", value: "Once · expires in 30 days" },
    ],
  },
  {
    prompt: "Sell half my ETH and split it into SOL and AVAX",
    plan: [
      { label: "Action", value: "Sell 50% ETH → SOL / AVAX" },
      { label: "Trigger", value: "Now" },
      { label: "Limit", value: "Max slippage 1%" },
    ],
  },
  {
    prompt: "Set a 10% stop-loss on Tesla",
    plan: [
      { label: "Action", value: "Sell all TSLA" },
      { label: "Trigger", value: "10% below average cost" },
      { label: "Limit", value: "Notify on trigger" },
    ],
  },
  {
    prompt: "If USD/TRY passes 45, move 30% of my cash to USDT",
    plan: [
      { label: "Action", value: "Convert 30% of cash → USDT" },
      { label: "Trigger", value: "USD/TRY above 45" },
      { label: "Limit", value: "Once per week" },
    ],
  },
  {
    prompt: "Rebalance my portfolio to 60/40 every month",
    plan: [
      { label: "Action", value: "Rebalance to 60 / 40" },
      { label: "Trigger", value: "1st of every month" },
      { label: "Limit", value: "Max 5 orders per run" },
    ],
  },
  {
    prompt: "Take profit on Apple at +25%",
    plan: [
      { label: "Action", value: "Sell all AAPL" },
      { label: "Trigger", value: "Gain of 25% or more" },
      { label: "Limit", value: "Notify on trigger" },
    ],
  },
];

// ── How it works ────────────────────────────────────────────────
export const howItWorks = {
  eyebrow: "How it works",
  title: "From a sentence to a trade, with your users in control",
  // Shown in order; step numbers (01–04) are added automatically.
  steps: [
    { title: "Say it", text: 'Users type or speak in plain language: "Buy $500 of Nvidia every Friday."' },
    { title: "Review plan", text: "An agent turns it into a clear plan: asset, amount, trigger and limits. If anything is missing, it asks." },
    { title: "Approve", text: "Nothing runs until users approve. Every order, every time." },
    { title: "Track", text: "Every action appears in a live feed, including checks that didn't trigger, and why." },
  ],
};

// ── Security ────────────────────────────────────────────────────
// icon must be one of: "identity", "approval", "limits", "alert", "record", "stop"
export type SecurityIcon = "identity" | "approval" | "limits" | "alert" | "record" | "stop";

export const security = {
  eyebrow: "Security layer",
  title: "Built so an agent can't do what your users didn't ask for",
  featured: {
    title: "AI plans. Users approve. Rules execute.",
    text: "AI turns a request into a plan. Only after the user approves do fixed rules carry it out, so the model never acts on its own judgment.",
    // Small three-step diagram shown inside the featured card.
    flow: ["AI plans", "User approves", "Rules execute"],
  },
  items: [
    { icon: "identity", title: "Every agent has an identity", text: "You always know which agent acted, and for whom." },
    { icon: "approval", title: "Nothing runs without approval", text: "Users confirm every plan before it executes." },
    { icon: "limits", title: "Limits users set", text: "Budgets, assets and frequency caps agents can't exceed." },
    { icon: "alert", title: "Mistakes and manipulation caught", text: "Unusual amounts and suspicious instructions are flagged or blocked." },
    { icon: "record", title: "Everything recorded", text: "A tamper-proof trail of every command, approval and order." },
    { icon: "stop", title: "One tap stops everything", text: "Pause any agent, or all of them, instantly." },
  ] satisfies { icon: SecurityIcon; title: string; text: string }[],
};

// ── Solutions ───────────────────────────────────────────────────
// icon must be one of: "broker", "exchange", "bank"
export type SolutionIcon = "broker" | "exchange" | "bank";

export const solutions = {
  eyebrow: "Solutions",
  title: "Built for platforms that move money",
  items: [
    { icon: "broker", title: "Brokers", text: "Let your users trade stocks by typing or speaking, under your brand." },
    { icon: "exchange", title: "Crypto exchanges", text: "Add an AI trading assistant with limits, approvals and a full audit trail." },
    { icon: "bank", title: "Fintechs and banks", text: "Offer AI money features without letting agents act on their own." },
  ] satisfies { icon: SolutionIcon; title: string; text: string }[],
};

// ── Agents row ──────────────────────────────────────────────────
export type AgentStatus = "active" | "awaiting" | "paused" | "blocked";

export const statusLabels: Record<AgentStatus, string> = {
  active: "Active",
  awaiting: "Awaiting approval",
  paused: "Paused",
  blocked: "Blocked",
};

export const agentsSection = {
  eyebrow: "Agents under control",
  title: "Every agent runs inside its mandate",
  text: "Active, waiting, paused or blocked. Every agent's status is visible at all times.",
  cardLabel: "Agent",
};

export type Agent = {
  name: string;
  status: AgentStatus;
  description: string;
  meta: string;
};

export const agents: Agent[] = [
  { name: "Friday NVDA buy", status: "active", description: "Buy $500 of Nvidia every Friday.", meta: "Limit $2,000 / month" },
  { name: "Dollar hedge", status: "active", description: "Move 30% of cash to USDT if USD/TRY passes 45.", meta: "Checked 2 min ago · not triggered" },
  { name: "BTC dip buy", status: "awaiting", description: "Buy $200 of BTC if it drops below $90,000.", meta: "Plan ready for review" },
  { name: "Tesla stop-loss", status: "active", description: "Sell Tesla if it falls 10% below cost.", meta: "Notify on trigger" },
  { name: "Withdrawal request", status: "blocked", description: "Send all funds to a new wallet address.", meta: "Outside mandate · logged" },
  { name: "Monthly rebalance", status: "paused", description: "Rebalance to 60/40 every month.", meta: "Paused by user" },
  { name: "Apple take-profit", status: "active", description: "Sell Apple at a 25% gain.", meta: "Notify on trigger" },
  { name: "Idle cash sweep", status: "awaiting", description: "Move cash above $20,000 into USDT.", meta: "Plan ready for review" },
];

// ── Footer ──────────────────────────────────────────────────────
export const footer = {
  tagline: "Security layer for agentic trading",
  copyright: `© ${new Date().getFullYear()} ${SITE_NAME}`,
};

// ── Request a demo ──────────────────────────────────────────────
export const demo = {
  title: "See it in action",
  text: "Book a short demo and bring your hardest trading commands.",
  fields: {
    name: { label: "Name", placeholder: "Jane Smith" },
    company: { label: "Company", placeholder: "Acme Securities" },
    role: { label: "Role", placeholder: "Head of Product" },
    email: { label: "Work email", placeholder: "jane@acme.com" },
  },
  submitLabel: "Request a demo",
  emailSubject: "Demo request",
  confirmTitle: "Thanks, your email is ready to send",
  confirmText: "Your email app should have opened with your details. Press send and we'll get back to you.",
  confirmFallback: "Nothing opened? Email us directly at",
};
