# [Name]: landing page

Landing page for "[Name]: security layer for agentic trading".
Built with Next.js (App Router), TypeScript, Tailwind CSS and Framer Motion. It's exported as a
static site, so it's fast and cheap to host on Vercel.

## Change the company name or any text

**All text lives in one file: [`content/site.ts`](content/site.ts).** You don't need to touch anything else.

- **Company name:** change `SITE_NAME = "[Name]"` at the top. It updates the header, page title and share preview.
- **Headlines and buttons:** edit the `hero`, `header`, `agentsSection` and `footer` blocks.
- **Chat examples:** edit `chatExamples`. Each one has a `prompt` and 3 `plan` rows. You can add or remove examples, and the counter adjusts.
- **Agent cards:** edit `agents`. `status` must be one of `"active"`, `"awaiting"`, `"paused"` or `"blocked"`.

Keep the quotes and commas as they are. If the site fails to build after an edit, a missing quote or comma is the usual cause.

**Share image:** replace `public/og-image.png` (1200×630 px). The current one is a placeholder.

## Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000. Edits to files show up in the browser immediately.

To test the production build:

```bash
npm run build
```

This writes the finished static site to the `out/` folder.

## Folder structure

```
app/
  layout.tsx        Fonts, page title, SEO and share-preview tags
  page.tsx          Puts the sections together in order
  globals.css       Base styles and focus outlines
components/
  Header.tsx        Logo + "Request a demo"
  Hero.tsx          Headline, subline, chat card, demo button
  ChatDemo.tsx      The animated chat (typing → plan → approval loop)
  PlanCard.tsx      "Proposed plan" box
  StatusChip.tsx    Active / Awaiting approval / Paused / Blocked / Approved
  AgentsRow.tsx     "Agents under control" section + scrolling strip
  AgentCard.tsx     One agent card
  Footer.tsx        Name, tagline, demo link, copyright
  icons.tsx         Shield and arrow icons
  useReducedMotionSafe.ts  Reads the visitor's "reduce motion" setting
content/
  site.ts           ← ALL text, prompts, plans and agents
public/
  og-image.png      Share preview image (placeholder)
tailwind.config.ts  Design tokens: colors, radii, shadows, fonts, animations
next.config.ts      Static export settings
```

## Behaviour notes

- **Design:** light theme, Geist and Geist Mono fonts, near-black text and buttons. Colour is used only for status chips (green = active/approved, amber = awaiting, grey = paused, red = blocked). All colours are in `tailwind.config.ts`.
- **Reduced motion:** visitors who turn on "reduce motion" in their device settings see the first chat example already approved and a grid of agent cards instead of the moving strip.
- **Demo form:** "Request a demo" currently just scrolls to the button in the hero. A `TODO` in `components/Hero.tsx` marks where a real form will go.
- No analytics or tracking is included.

## Deploy on Vercel

1. Sign in at [vercel.com](https://vercel.com) with GitHub.
2. Click **Add New… → Project**, choose the `agentictrading` repository and click **Import**.
3. Leave the settings as they are (Vercel detects Next.js) and click **Deploy**.
4. Every push to `main` redeploys the site automatically.
