import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { ArrowRightIcon, ShieldCheckIcon } from "@/components/icons";
import InTheirWords from "@/components/solutions/InTheirWords";
import NumberBand from "@/components/solutions/NumberBand";
import { primaryButton } from "@/components/ui";
import { SITE_NAME, seo as homeSeo } from "@/content/site";
import { labels, pageSeo, solutionPages } from "@/content/solutions";

// Only the three pages in content/solutions.ts exist; they're built ahead of time.
export const dynamicParams = false;
export function generateStaticParams() {
  return solutionPages.map((p) => ({ slug: p.slug }));
}

type Params = { params: Promise<{ slug: string }> };
const find = async (params: Params["params"]) => {
  const { slug } = await params;
  return solutionPages.find((p) => p.slug === slug);
};

// Same noindex settings as the rest of the site come from app/layout.tsx and next.config.ts.
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = await find(params);
  if (!page) return {};
  const { title, description } = pageSeo(page);
  const url = `/solutions/${page.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", siteName: SITE_NAME, title, description, url, images: [{ url: homeSeo.ogImage, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [homeSeo.ogImage] },
  };
}

export default async function SolutionPageRoute({ params }: Params) {
  const page = await find(params);
  if (!page) notFound();

  return (
    <div id="top" className="min-h-screen overflow-x-clip">
      <Header />
      <main>
        {/* 1. Hero */}
        <section className="px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:pt-28">
          <Reveal className="mx-auto max-w-[760px] text-center">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-accent">{page.eyebrow}</p>
            <h1 className="mt-5 text-[40px] font-semibold leading-[1.05] tracking-[-0.045em] text-ink [text-wrap:balance] sm:text-[56px]">
              {page.title}
            </h1>
            <div className="mx-auto mt-6 flex max-w-[640px] flex-col gap-4 text-lg leading-relaxed text-ink-secondary [text-wrap:pretty] sm:text-xl">
              {page.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-7">
              <a href={labels.demoHref} className={`${primaryButton} h-12 w-full px-7 text-base sm:w-auto`}>
                {labels.demoLabel}
              </a>
              <a href={labels.backHref} className="group inline-flex items-center gap-1.5 rounded-md text-[15px] font-medium text-accent transition-colors hover:text-accent-hover">
                <ArrowRightIcon className="h-4 w-4 rotate-180 motion-safe:transition-transform group-hover:-translate-x-0.5" />
                {labels.backLabel}
              </a>
            </div>
          </Reveal>
        </section>

        {/* 2. In their words */}
        <section aria-labelledby="words-title" className="border-t border-line px-5 py-16 sm:px-8 sm:py-20">
          <Reveal className="mx-auto max-w-[720px]">
            <h2 id="words-title" className="text-center text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] text-ink sm:text-[48px]">
              {labels.inTheirWords}
            </h2>
          </Reveal>
          <div className="mt-10">
            <InTheirWords prompts={page.prompts} />
          </div>
          <Reveal className="mx-auto mt-8 max-w-[640px] text-center">
            <p className="text-lg leading-relaxed text-ink-secondary [text-wrap:balance] sm:text-xl">{page.afterPrompts}</p>
          </Reveal>
        </section>

        {/* 3. Number band */}
        <NumberBand number={page.number} />

        {/* 4. Closing: remaining paragraphs and the trust line */}
        {(page.closing?.length || page.trust) && (
          <section className="border-t border-line px-5 py-16 sm:px-8 sm:py-20">
            <Reveal className="mx-auto flex max-w-[720px] flex-col gap-8">
              {page.closing?.map((p) => (
                <p key={p} className="text-center text-xl leading-relaxed text-ink [text-wrap:balance] sm:text-2xl">
                  {p}
                </p>
              ))}
              {page.trust && (
                <div className="flex gap-4 rounded-card bg-surface p-6 sm:p-8">
                  <ShieldCheckIcon className="h-7 w-7 shrink-0 text-accent" />
                  <p className="text-base leading-relaxed text-ink [text-wrap:pretty] sm:text-lg">{page.trust}</p>
                </div>
              )}
            </Reveal>
          </section>
        )}

        {/* Call to action band */}
        <section aria-labelledby="cta-title" className="border-t border-line bg-accent-soft px-5 py-16 sm:px-8 sm:py-20">
          <Reveal className="mx-auto flex max-w-[760px] flex-col items-center text-center">
            <h2 id="cta-title" className="text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] text-ink sm:text-[48px]">
              {labels.ctaTitle}
            </h2>
            <a href={labels.demoHref} className={`${primaryButton} mt-8 h-12 px-7 text-base`}>
              {labels.demoLabel}
            </a>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
