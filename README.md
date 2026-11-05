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

**All text lives in the content files:** [`content/site.ts`](content/site.ts) for the homepage, header and footer, [`content/agentic-trading.ts`](content/agentic-trading.ts) for the `/agentic-trading` page, and [`content/why-agentic-trading.ts`](content/why-agentic-trading.ts) for the `/why-agentic-trading` essay. You don't need to touch anything else.

- **Company name:** change `SITE_NAME = "[LOGGEDIN]"` at the top. It updates the header, page title and share preview.
- **Demo request email:** change `DEMO_EMAIL` near the top. The demo form opens the visitor's email app addressed to it.
- **Headlines and buttons:** edit the `hero`, `header` and `footer` blocks.
- **Hero:** `hero.title` is the headline. The large line under it is `hero.sublineStart` + rotating `hero.sublineVerbs` + `hero.sublineEnd`; screen readers and search engines read `hero.verbsReadable` ("trade, invest and hedge") in place of the rotating verb. `hero.floatingPrompts` are the faint prompts at the left and right edges (shown only on screens 1400px and wider, hidden with reduced motion).
- **Essay teaser (under the hero):** edit `essayTeaser` (heading, paragraph and the "Read more" link to `/why-agentic-trading`).
- **Essay page:** edit `content/why-agentic-trading.ts`. The body is a list of blocks: paragraphs (`"p"`) and bulleted lists (`"list"`).
- **Volume:** edit `volume` (`stat`, `prompt`, `text` per card). Numbers of 10 or more in a `stat` count up on scroll.
- **How it works:** edit `howItWorks` (`text` = intro on the right; each step has a `label`, `chip` and `text`; `chipTone: "approved"` shows the chip in green).
- **Menu links:** edit `header.nav` (top menu) and `footer.nav` (footer). They point to homepage sections as `/#section`, so they work from every page.
- **FAQ:** edit `faq.items` (`q` = question, `a` = answer).
- **Solutions (homepage cards):** edit `solutions.items` (`title`, `text`, `icon`: `"broker"`, `"exchange"` or `"bank"`, and `href` to its page). The whole card links to the page.
- **Solution pages:** edit `content/solutions.ts`. All three pages (`/solutions/brokers`, `/solutions/crypto-exchanges`, `/solutions/fintechs-and-banks`) share one template; each entry has the hero, prompts, number band, closing and trust line.
- **Demo form:** edit `demo` (heading, field labels, button and confirmation text).
- **Security:** edit `security` (`intro` is the short line under the heading). The `featured` block is the animated flow card (`flow` steps, `note` line, and the animation text: `example`, `awaiting`, `approved`, `result`). Each of the six `items` has a `visual` (from the list in the comment); the text inside those small animations is in `security.visuals`.
- **Chat examples:** edit `chatExamples`. Each one has a `prompt` and either 3 `plan` rows (shown for approval) or an `answer` card (`title`, 3 `rows`, `note`) for read-only questions. You can add or remove examples, and the counter adjusts.
- **Capabilities:** edit `capabilities` (`text` = intro on the right) and `capabilities.items` (`title`, example `prompt`, `text`, `status` line and `statusTone`: `"active"`, `"awaiting"` or `"answered"`).

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
  agentic-trading/page.tsx  The /agentic-trading page (hero, thesis, three pillars, FAQ, call to action)
  why-agentic-trading/page.tsx  The essay page (reading layout)
  solutions/[slug]/page.tsx  Shared template for the three solution pages
  layout.tsx        Fonts, page title, SEO and share-preview tags
  page.tsx          Puts the sections together in order
  globals.css       Base styles and focus outlines
components/
  Header.tsx        Sticky header: logo, menu links (active one highlighted), mobile menu, "Request a demo"
  Hero.tsx          Centered hero: headline, rotating-verb line, buttons, chat card below
  HeroPrompts.tsx   Faint floating prompts at the hero's edges
  RotatingVerb.tsx  Rotating verb in the hero line (trade → invest → hedge)
  EssayTeaser.tsx   Essay teaser below the hero
  CountUp.tsx       Counting numbers (Volume cards, solution pages)
  solutions/InTheirWords.tsx  Prompt bubbles with "Plan approved ✓" chips
  solutions/NumberBand.tsx  Large counting number + explanation
  Volume.tsx        "One sentence, months of orders" cards with counting numbers
  HowItWorks.tsx    Four step cards (same card style as Volume)
  FadeCard.tsx      Shared card shell: fade-up stagger on scroll (Volume, How it works, Capabilities)
  Capabilities.tsx  Five capability cards; prompts type out once on scroll
  Security.tsx      Featured flow card + six security cards
  SecurityFlow.tsx  Animated AI plans → User approves → Rules execute
  SecurityVisuals.tsx  Small looping animation on each security card
  motion/           Shared animation helpers (looping steps, typing)
  Solutions.tsx     Three audience cards with blue icons
  Faq.tsx           Questions accordion (one open at a time); used on both pages
  agentic/Pillars.tsx  The three alternating pillars on /agentic-trading
  agentic/HeroVisual.tsx  Dark hero card: plan card + shield check
  agentic/DecisionFlow.tsx  Pillar 2 flowchart: request → check limits → three branches
  agentic/DarkLog.tsx  Dark log-lines card in the closing section
  Demo.tsx          "See it in action" section
  DemoForm.tsx      Demo form (opens the visitor's email app for now)
  ui.ts             Shared button styles and the card styles used by Volume, How it works and Capabilities
  SectionHeader.tsx Eyebrow, heading and intro used by each section
  Reveal.tsx        Fade-up when a section scrolls into view
  ChatDemo.tsx      The animated chat (typing → plan → approval loop)
  PlanCard.tsx      "Proposed plan" box
  StatusChip.tsx    Active / Awaiting approval / Paused / Blocked / Approved
  Footer.tsx        Name, tagline, section links, demo link, copyright
  icons.tsx         Shield, arrow, menu and solutions icons
  useReducedMotionSafe.ts  Reads the visitor's "reduce motion" setting
content/
  agentic-trading.ts  ← text for the /agentic-trading page
  why-agentic-trading.ts  ← text for the essay page
  solutions.ts      ← text for the three solution pages
  site.ts           ← ALL text, prompts, plans and capabilities
public/
  og-image.png      Share preview image (placeholder)
  robots.txt        Allows crawling (so the noindex signals can be seen)
tailwind.config.ts  Design tokens: colors, radii, shadows, fonts, animations
next.config.ts      Build settings + the X-Robots-Tag noindex header
```

## Behaviour notes

- **Design:** light theme, Geist and Geist Mono fonts, near-black text. Blue (#2563EB) is the brand accent: buttons, links, eyebrows, the rotating headline verb, active menu link and focus rings. Green, amber, red and grey are used only as status colours (green = active/approved/within limits, amber = awaiting, red = blocked/rejected, grey = paused). All colours are in `tailwind.config.ts`.
- **Animations:** the security animations start when they scroll into view, loop gently, and pause while off-screen.
- **Reduced motion:** visitors who turn on "reduce motion" in their device settings see the first chat example already approved, the hero verb fixed on "trade", capability prompts already typed, every security animation in its finished state, and no scroll fade-ins.
- **Demo form:** there's no backend yet. Submitting opens the visitor's email app with their details filled in, addressed to `DEMO_EMAIL`, then shows a confirmation. `TODO`s in `content/site.ts` and `components/DemoForm.tsx` mark where to plug in a real form service.
- No analytics or tracking is included.

## Deploy on Vercel

1. Sign in at [vercel.com](https://vercel.com) with GitHub.
2. Click **Add New… → Project**, choose the `agentictrading` repository and click **Import**.
3. Leave the settings as they are (Vercel detects Next.js) and click **Deploy**.
4. Every push to `main` redeploys the site automatically.
