import { Fragment } from "react";
import { hero } from "@/content/site";
import ChatDemo from "./ChatDemo";
import { ArrowRightIcon } from "./icons";

export default function Hero() {
  return (
    <section className="pb-20 pt-12 sm:pb-28 sm:pt-16 lg:pt-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] lg:gap-16">
        {/* Text */}
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink-muted">{hero.eyebrow}</p>
          <h1 className="mt-5 text-[44px] font-semibold leading-[1] tracking-[-0.045em] text-ink sm:text-[60px] lg:text-[72px] xl:text-[80px]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-secondary [text-wrap:balance] sm:text-xl">
            {/* Lines only break between sentences */}
            {hero.subline.split(/(?<=\.)\s+/).map((sentence, i) => (
              <Fragment key={i}>
                {i > 0 && " "}
                <span className="whitespace-nowrap">{sentence}</span>
              </Fragment>
            ))}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            {/* TODO: replace this anchor with a real demo request form (e.g. email + company) */}
            <a
              id="demo"
              href="#demo"
              className="inline-flex h-12 scroll-mt-[40vh] items-center rounded-pill bg-ink px-6 text-[15px] font-medium text-white transition-colors hover:bg-ink-secondary"
            >
              {hero.ctaLabel}
            </a>
            <a
              href={hero.secondaryCtaHref}
              className="group inline-flex items-center gap-1.5 rounded-md text-[15px] font-medium text-ink"
            >
              {hero.secondaryCtaLabel}
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* Product shot */}
        <div className="min-w-0 rounded-panel bg-surface p-3 sm:p-8 lg:p-10">
          <ChatDemo />
        </div>
      </div>
    </section>
  );
}
