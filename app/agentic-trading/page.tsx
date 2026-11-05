import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Faq from "@/components/Faq";
import Reveal from "@/components/Reveal";
import Pillars from "@/components/agentic/Pillars";
import HeroVisual from "@/components/agentic/HeroVisual";
import DarkLog from "@/components/agentic/DarkLog";
import { primaryButton } from "@/components/ui";
import { SITE_NAME, seo as homeSeo } from "@/content/site";
import { closing, faq, hero, seo, thesis } from "@/content/agentic-trading";

// Same noindex settings as the homepage come from app/layout.tsx and next.config.ts.
export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: "/agentic-trading" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: seo.title,
    description: seo.description,
    url: "/agentic-trading",
    images: [{ url: homeSeo.ogImage, width: 1200, height: 630, alt: seo.title }],
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: [homeSeo.ogImage] },
};

export default function AgenticTradingPage() {
  return (
    <div id="top" className="min-h-screen overflow-x-clip">
      <Header />
      <main>
        {/* Hero: text left, visual right (stacked on mobile) */}
        <section className="pb-16 pt-12 sm:pb-24 sm:pt-16 lg:pt-24">
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
            <Reveal className="min-w-0">
              <h1 className="text-[44px] font-semibold leading-[1] tracking-[-0.045em] text-ink [text-wrap:balance] sm:text-[60px] lg:text-[64px]">
                {hero.title}
              </h1>
              <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-ink-secondary [text-wrap:pretty] sm:text-xl">{hero.subline}</p>
              <a href={hero.ctaHref} className={`${primaryButton} mt-9 h-12 px-7 text-base`}>
                {hero.ctaLabel}
              </a>
            </Reveal>
            <Reveal className="min-w-0" delay={0.1}>
              <HeroVisual />
            </Reveal>
          </div>
        </section>

        {/* Thesis: centred */}
        <section aria-labelledby="thesis-title" className="border-t border-line px-5 py-16 sm:px-8 sm:py-24">
          <Reveal className="mx-auto max-w-[760px] text-center">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-accent">{thesis.eyebrow}</p>
            <h2 id="thesis-title" className="mt-4 text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] text-ink [text-wrap:balance] sm:text-[48px]">
              {thesis.title}
            </h2>
            <p className="mx-auto mt-6 max-w-[640px] text-lg leading-relaxed text-ink-secondary [text-wrap:balance] sm:text-xl">{thesis.text}</p>
          </Reveal>
        </section>

        <Pillars />

        <Faq content={faq} layout="split" />

        {/* Closing call to action: text left, dark log card right */}
        <section aria-labelledby="closing-title" className="border-t border-line py-16 sm:py-24">
          <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
            <Reveal className="min-w-0">
              <h2 id="closing-title" className="text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] text-ink sm:text-[48px]">
                {closing.title}
              </h2>
              <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-ink-secondary sm:text-xl">{closing.text}</p>
              <a href={closing.ctaHref} className={`${primaryButton} mt-9 h-12 px-7 text-base`}>
                {closing.ctaLabel}
              </a>
            </Reveal>
            <Reveal className="min-w-0" delay={0.1}>
              <DarkLog />
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
