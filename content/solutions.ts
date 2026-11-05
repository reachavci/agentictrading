/**
 * All text for the three solution pages (/solutions/...).
 * Each page uses the same template; edit the words here.
 */
import { SITE_NAME } from "./site";

// Labels shared by all solution pages
export const labels = {
  demoLabel: "Request a demo",
  demoHref: "/#demo",
  backLabel: "All solutions", // arrow is added automatically
  backHref: "/#solutions",
  inTheirWords: "In their words",
  planApproved: "Plan approved ✓",
  ctaTitle: "See it in action",
};

export type SolutionPage = {
  slug: string; // URL: /solutions/<slug>
  eyebrow: string;
  title: string;
  intro: string[];
  prompts: string[];
  afterPrompts: string;
  // Number band: `value` counts up; `suffix` (e.g. "+") is added after it
  number: { value: number; suffix?: string; label: string; explanation: string };
  closing?: string[];
  trust?: string; // shown in a light panel with a shield icon
};

export const solutionPages: SolutionPage[] = [
  {
    slug: "brokers",
    eyebrow: "Brokers",
    title: "Your users already know what they want to buy.",
    intro: [
      "Most people invest with a few simple rules in mind. Buy more when the market dips. Reinvest the dividends. Take some profit when a stock has a great run.",
      "Following those rules takes time. Users have to notice the moment, open the app and place the order. Most of the time, they don't.",
    ],
    prompts: [
      "Every time the S&P 500 falls 3% in a week, invest $500.",
      "Put every dividend back into the stock that paid it.",
      "If a stock I own doubles, sell enough to get my money back.",
      "Keep me at 70% stocks and 30% bonds. Check once a quarter.",
    ],
    afterPrompts: "The agent turns each one into a clear plan. The user approves it once. From then on, it runs by itself.",
    number: {
      value: 40,
      label: "orders a year",
      explanation:
        "A user with ten dividend stocks gets about 40 payouts a year. Reinvesting each one is 40 orders they never have to place. If 10,000 of your users do the same, that's 400,000 orders a year.",
    },
    closing: ["Orders come in steadily, all year. Users keep their plans with you. And your app finally does what they always meant to do."],
    trust: "Every plan is approved by the user. Every limit holds. Every order is recorded, with who approved it and when.",
  },
  {
    slug: "crypto-exchanges",
    eyebrow: "Crypto exchanges",
    title: "Crypto never closes. Your users have to sleep.",
    intro: [
      "Prices move most when people aren't looking. A 6% drop at 3 a.m. A spike on a Sunday afternoon. By the time users check, the moment is gone.",
    ],
    prompts: [
      "Buy $10 of Bitcoin every time it drops 1% in an hour.",
      "When ETH hits a new monthly high, sell 10%.",
      "Always keep 20% of my account in stablecoins.",
      "Every Sunday night, move half my weekly gains into USDT.",
    ],
    afterPrompts: "Users approve the plan once. The agent watches the market around the clock and acts the moment the rule is met.",
    number: {
      value: 30,
      suffix: "+",
      label: "orders a month",
      explanation: `In a choppy month, a single "buy every 1% drop" rule can place 30 orders or more. The user never lifts a finger, and every one of those orders runs through your exchange.`,
    },
    trust:
      "Crypto attracts scams, so agents are built to say no. They only trade inside each user's limits. They can't send funds anywhere. Suspicious instructions are blocked and logged.",
  },
  {
    slug: "fintechs-and-banks",
    eyebrow: "Fintechs and banks",
    title: "Your users want more than a balance screen.",
    intro: [
      "People open their banking app to see where their money went. Then they close it. The saving and investing they keep meaning to do never happens.",
    ],
    prompts: [
      "Round up every card payment and invest the change.",
      "When my salary comes in, keep $1,500 for bills and invest the rest.",
      "If I spend less than $400 on food this month, invest what's left.",
      "Set aside 10% of every freelance payment for taxes.",
    ],
    afterPrompts: "The user approves the plan once. After that, it just happens, inside your app.",
    number: {
      value: 700,
      label: "investments a year",
      explanation:
        "Someone who pays by card twice a day makes about 700 payments a year. With round-ups, that's 700 small investments without a single extra tap. Across 50,000 customers, that's 35 million.",
    },
    closing: [
      "You can start small. First, agents that only answer questions about spending and savings. When you're ready, let them act, with approvals and the limits your users set.",
    ],
  },
];

/** Page title: the H1 + " · [LOGGEDIN]". Description: the first sentence of the intro. */
export const pageSeo = (p: SolutionPage) => ({
  title: `${p.title} · ${SITE_NAME}`,
  description: p.intro[0].split(/(?<=\.)\s/)[0],
});
