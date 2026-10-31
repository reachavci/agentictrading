# [Name]: landing page

Landing page for "[Name]: security layer for agentic trading".
Built with Next.js (App Router), TypeScript, Tailwind CSS and Framer Motion. It's exported as a
static site, so it's fast and cheap to host on Vercel.

## Change the company name or any text

**All text lives in one file: [`content/site.ts`](content/site.ts).** You don't need to touch anything else.

- **Company name:** change `SITE_NAME = "[Name]"` at the top. It updates the header, page title and share preview.
- **Demo request email:** change `DEMO_EMAIL` near the top. The demo form opens the visitor's email app addressed to it.
- **Headlines and buttons:** edit the `hero`, `header`, `agentsSection` and `footer` blocks.
- **How it works:** edit `howItWorks.steps`. Step numbers are added automatically.
- **Menu links:** edit `header.nav`.
- **Solutions:** edit `solutions.items` (icon must be `"broker"`, `"exchange"` or `"bank"`).
- **Demo form:** edit `demo` (heading, field labels, button and confirmation text).
- **Security:** edit `security`. The `featured` block is the wide card at the top; each of the six `items` needs an `icon` from the list in the comment.
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
  Header.tsx        Sticky header: logo, menu links (active one highlighted), mobile menu, "Request a demo"
  Hero.tsx          Headline, subline, chat card, demo button
  HowItWorks.tsx    Four numbered steps
  Security.tsx      Featured card + six security cards
  Solutions.tsx     Three audience cards
  Demo.tsx          "See it in action" section
  DemoForm.tsx      Demo form (opens the visitor's email app for now)
  ui.ts             Shared primary button style
  SectionHeader.tsx Eyebrow, heading and intro used by each section
  Reveal.tsx        Fade-up when a section scrolls into view
  Sentences.tsx     Keeps each sentence together when text wraps
  ChatDemo.tsx      The animated chat (typing → plan → approval loop)
  PlanCard.tsx      "Proposed plan" box
  StatusChip.tsx    Active / Awaiting approval / Paused / Blocked / Approved
  AgentsRow.tsx     "Agents under control" section + scrolling strip
  AgentCard.tsx     One agent card
  Footer.tsx        Name, tagline, demo link, copyright
  icons.tsx         Shield, arrow and security icons
  useReducedMotionSafe.ts  Reads the visitor's "reduce motion" setting
content/
  site.ts           ← ALL text, prompts, plans and agents
public/
  og-image.png      Share preview image (placeholder)
tailwind.config.ts  Design tokens: colors, radii, shadows, fonts, animations
next.config.ts      Static export settings
```

## Behaviour notes

- **Design:** light theme, Geist and Geist Mono fonts, near-black text and buttons. Deep green is the accent (eyebrows and "Request a demo" buttons); other colour is used only for status chips (green = active/approved, amber = awaiting, grey = paused, red = blocked). All colours are in `tailwind.config.ts`.
- **Reduced motion:** visitors who turn on "reduce motion" in their device settings see the first chat example already approved, no scroll fade-ins, and a grid of agent cards instead of the moving strip.
- **Demo form:** there's no backend yet. Submitting opens the visitor's email app with their details filled in, addressed to `DEMO_EMAIL`, then shows a confirmation. `TODO`s in `content/site.ts` and `components/DemoForm.tsx` mark where to plug in a real form service.
- No analytics or tracking is included.

## Deploy on Vercel

1. Sign in at [vercel.com](https://vercel.com) with GitHub.
2. Click **Add New… → Project**, choose the `agentictrading` repository and click **Import**.
3. Leave the settings as they are (Vercel detects Next.js) and click **Deploy**.
4. Every push to `main` redeploys the site automatically.
