import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRightIcon } from "@/components/icons";
import { primaryButton } from "@/components/ui";
import { SITE_NAME, seo as homeSeo } from "@/content/site";
import { backLabel, body, endLinks, seo, title } from "@/content/why-agentic-trading";

// Same noindex settings as the homepage come from app/layout.tsx and next.config.ts.
export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  alternates: { canonical: "/why-agentic-trading" },
  openGraph: {
    type: "article",
    siteName: SITE_NAME,
    title: seo.title,
    description: seo.description,
    url: "/why-agentic-trading",
    images: [{ url: homeSeo.ogImage, width: 1200, height: 630, alt: seo.title }],
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description, images: [homeSeo.ogImage] },
};

export default function WhyAgenticTradingPage() {
  return (
    <div id="top" className="min-h-screen overflow-x-clip">
      <Header />
      <main className="px-5 pb-24 pt-10 sm:px-8 sm:pb-32 sm:pt-16">
        <article className="mx-auto max-w-[680px]">
          <a href="/" className="group inline-flex items-center gap-1.5 rounded-md text-[15px] font-medium text-accent transition-colors hover:text-accent-hover">
            <ArrowRightIcon className="h-4 w-4 rotate-180 motion-safe:transition-transform group-hover:-translate-x-0.5" />
            {backLabel}
          </a>

          <h1 className="mt-10 text-[36px] font-semibold leading-[1.08] tracking-[-0.04em] text-ink [text-wrap:balance] sm:text-[48px]">
            {title}
          </h1>

          <div className="mt-10 flex flex-col gap-6 text-[18px] leading-[1.75] text-ink sm:text-[19px]">
            {body.map((block, i) =>
              block.type === "p" ? (
                <p key={i} className="[text-wrap:pretty]">
                  {block.text}
                </p>
              ) : (
                <ul key={i} className="flex flex-col gap-3 pl-1">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3 [text-wrap:pretty]">
                      <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ),
            )}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-10">
            <a
              href={endLinks.controlHref}
              className="group inline-flex items-center gap-1.5 rounded-md text-base font-medium text-accent transition-colors hover:text-accent-hover"
            >
              {endLinks.controlLabel}
              <ArrowRightIcon className="h-4 w-4 motion-safe:transition-transform group-hover:translate-x-0.5" />
            </a>
            <a href={endLinks.demoHref} className={`${primaryButton} h-12 px-7 text-base`}>
              {endLinks.demoLabel}
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
