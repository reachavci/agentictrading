import { hero } from "@/content/site";
import ChatDemo from "./ChatDemo";
import { ArrowRightIcon } from "./icons";
import { primaryButton } from "./ui";

export default function Hero() {
  return (
    <section className="pb-16 pt-12 sm:pb-24 sm:pt-16 lg:pt-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,540px)] xl:gap-16">
        {/* Text */}
        <div className="min-w-0">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-accent [text-wrap:balance]">{hero.eyebrow}</p>
          <h1 className="mt-5 text-[44px] font-semibold leading-[1] tracking-[-0.045em] text-ink sm:text-[60px] lg:text-[60px] xl:text-[80px]">
            {hero.title}
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-secondary sm:text-xl">
            {hero.subline.map((line, i) => (
              <span key={i} className="sm:block">
                {i > 0 && " "}
                {line}
              </span>
            ))}
          </p>
          <p className="mt-4 text-[15px] text-ink-muted">{hero.audience}</p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href="#demo" className={`${primaryButton} h-12 px-7 text-base`}>
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
        <div className="min-w-0 rounded-panel bg-surface p-3 sm:p-8 lg:p-6 xl:p-10">
          <ChatDemo />
        </div>
      </div>
    </section>
  );
}
