# [LOGGEDIN]: landing page

Landing page for "[LOGGEDIN]: agentic trading infrastructure".
Built with Next.js (App Router), TypeScript, Tailwind CSS and Framer Motion. The page is
prerendered as static HTML at build time, so it's fast and cheap to host on Vercel.

> **Private notebook: hidden from search engines on purpose.** Every page sends
> `<meta name="robots" content="noindex, nofollow">` (in `app/layout.tsx`) and the header
> `X-Robots-Tag: noindex, nofollow` (in `next.config.ts`). `public/robots.txt` still allows
> crawling, so search engines can read those noindex signals, and there is no sitemap.
> There's no password: anyone with the link can open the site. To make it public later,
> remove the `robots` line in `app/layout.tsx` and the `headers()` block in `next.config.ts`.

## Change the company name or any text

**All text lives in one file: [`content/site.ts`](content/site.ts).** You don't need to touch anything else.

- **Company name:** change `SITE_NAME = "[LOGGEDIN]"` at the top. It updates the header, page title and share preview.
- **Demo request email:** change `DEMO_EMAIL` near the top. The demo form opens the visitor's email app addressed to it.
- **Headlines and buttons:** edit the `hero`, `header`, `agentsSection` and `footer` blocks.
- **Rotating headline verb:** edit `hero.titleVerbs` (first one is what search engines and screen readers get) plus `hero.titleStart` and `hero.titleEnd`.
- **How it works:** edit `howItWorks.steps`. Step numbers are added automatically.
- **Menu links:** edit `header.nav` (top menu) and `footer.nav` (footer).
- **FAQ:** edit `faq.items` (`q` = question, `a` = answer).
- **Solutions:** edit `solutions.items`. Each card's `chat` sets the mini chat preview: the `request` that types out, and the `chip` shown after it (`chipTone`: `"awaiting"`, `"neutral"` or `"approved"`).
- **Demo form:** edit `demo` (heading, field labels, button and confirmation text).
- **Security:** edit `security`. The `featured` block is the animated flow card (`flow` steps, `note` line, and the animation text: `example`, `awaiting`, `approved`, `result`). Each of the eight `items` has a `visual` (from the list in the comment); the text inside those small animations is in `security.visuals`.
- **Chat examples:** edit `chatExamples`. Each one has a `prompt` and either 3 `plan` rows (shown for approval) or an `answer` card (`title`, 3 `rows`, `note`) for read-only questions. You can add or remove examples, and the counter adjusts.
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

Then run `npx next start` to serve that build at http://localhost:3000.

## Folder structure

```
app/
  layout.tsx        Fonts, page title, SEO and share-preview tags
  page.tsx          Puts the sections together in order
  globals.css       Base styles and focus outlines
components/
  Header.tsx        Sticky header: logo, menu links (active one highlighted), mobile menu, "Request a demo"
  Hero.tsx          Headline, subline, chat card, demo button
  RotatingVerb.tsx  Rotating verb in the headline (trade → invest → hedge)
  HowItWorks.tsx    Four numbered steps
  Security.tsx      Featured flow card + eight security cards
  SecurityFlow.tsx  Animated AI plans → User approves → Rules execute
  SecurityVisuals.tsx  Small looping animation on each security card
  SolutionChat.tsx  Mini chat preview on each solutions card
  motion/           Shared animation helpers (looping steps, typing)
  Solutions.tsx     Three audience cards
  Faq.tsx           Questions accordion (one open at a time)
  Demo.tsx          "See it in action" section
  DemoForm.tsx      Demo form (opens the visitor's email app for now)
  ui.ts             Shared primary button style
  SectionHeader.tsx Eyebrow, heading and intro used by each section
  Reveal.tsx        Fade-up when a section scrolls into view
  Sentences.tsx     Keeps each sentence together when text wraps
  ChatDemo.tsx      The animated chat (typing → plan → approval loop)
  PlanCard.tsx      "Proposed plan" box
  StatusChip.tsx    Active / Awaiting approval / Paused / Blocked / Approved
  AgentsRow.tsx     "Live status" section + scrolling strip
  AgentCard.tsx     One agent card
  Footer.tsx        Name, tagline, section links, demo link, copyright
  icons.tsx         Shield, arrow and menu icons
  useReducedMotionSafe.ts  Reads the visitor's "reduce motion" setting
content/
  site.ts           ← ALL text, prompts, plans and agents
public/
  og-image.png      Share preview image (placeholder)
  robots.txt        Allows crawling (so the noindex signals can be seen)
tailwind.config.ts  Design tokens: colors, radii, shadows, fonts, animations
next.config.ts      Build settings + the X-Robots-Tag noindex header
```

## Behaviour notes

- **Design:** light theme, Geist and Geist Mono fonts, near-black text. Blue (#2563EB) is the brand accent: buttons, links, eyebrows, the rotating headline verb, active menu link and focus rings. Green, amber, red and grey are used only as status colours (green = active/approved/within limits, amber = awaiting, red = blocked/rejected, grey = paused). All colours are in `tailwind.config.ts`.
- **Animations:** the security and solutions animations start when they scroll into view, loop gently, and pause while off-screen.
- **Reduced motion:** visitors who turn on "reduce motion" in their device settings see the first chat example already approved, every security and solutions animation in its finished state, no scroll fade-ins, and a grid of agent cards instead of the moving strip.
- **Demo form:** there's no backend yet. Submitting opens the visitor's email app with their details filled in, addressed to `DEMO_EMAIL`, then shows a confirmation. `TODO`s in `content/site.ts` and `components/DemoForm.tsx` mark where to plug in a real form service.
- No analytics or tracking is included.

## Deploy on Vercel

1. Sign in at [vercel.com](https://vercel.com) with GitHub.
2. Click **Add New… → Project**, choose the `agentictrading` repository and click **Import**.
3. Leave the settings as they are (Vercel detects Next.js) and click **Deploy**.
4. Every push to `main` redeploys the site automatically.
