/**
 * All text for the /why-agentic-trading essay page.
 * The essay body is a list of blocks: a paragraph ("p") or a bulleted list ("list").
 */
import { SITE_NAME } from "./site";

export const seo = {
  title: `Your users plan more trades than they place · ${SITE_NAME}`,
  description: "Agents turn your users' intent into orders, and into steadier volume for your platform.",
};

export const backLabel = "Back to home"; // arrow is added automatically
export const title = "Your users plan more trades than they place.";

export type Block = { type: "p"; text: string } | { type: "list"; items: string[] };

export const body: Block[] = [
  {
    type: "p",
    text: "They mean to buy every month and forget. They plan to sell if a price drops and miss the moment. They see the dollar jump and act a day too late.",
  },
  {
    type: "p",
    text: "The intent is there. The trade isn't. Getting from one to the other still takes too many steps: open the app, search for the asset, fill in the order, double-check it, then do it all again next week. Every extra step costs you users.",
  },
  {
    type: "p",
    text: `Agents remove those steps. Whether they're day traders, long-term investors or protecting their savings, your users say what they want once, in a short message: "buy $200 of Nvidia every Friday," "sell half if Tesla drops 10%," "move some cash into dollars if the lira slips." The agent sets it up, watches the market and places the orders, whether or not they open the app.`,
  },
  { type: "p", text: "They set it once. Your platform takes it from there." },
  {
    type: "p",
    text: "For you, that means steadier volume. And the volume that follows comes from your users' own plans, not from pushing them to trade more.",
  },
  { type: "p", text: "It adds up quickly. One sentence can mean dozens of orders a year:" },
  {
    type: "list",
    items: [
      `"Buy $20 of Bitcoin every day" is 365 orders a year from a single message.`,
      "Investing part of every salary into three ETFs is 36 orders a year, without opening an order screen.",
      `"If the dollar jumps 2% in a day, move 20% of my cash into dollars" trades exactly when most people freeze.`,
      `"Sell half at +10%, the rest at +20%" turns one decision into orders that run on their own.`,
    ],
  },
  {
    type: "p",
    text: "Those plans stay. A user with a weekly buy, a currency hedge and a stop on every position has built something on your platform that runs month after month. Moving elsewhere means setting it all up again.",
  },
  {
    type: "p",
    text: "Your users already talk to AI about their money. The platform that turns their intent into orders, under its own name, becomes the place they bring their plans.",
  },
  { type: "p", text: "They already have the plans. Agents help them follow through, on your platform." },
];

export const endLinks = {
  controlLabel: "See how control works", // arrow is added automatically
  controlHref: "/agentic-trading",
  demoLabel: "Request a demo",
  demoHref: "/#demo",
};
