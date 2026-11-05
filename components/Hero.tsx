import { hero } from "@/content/site";
import ChatDemo from "./ChatDemo";
import RotatingVerb from "./RotatingVerb";
import { ArrowRightIcon } from "./icons";
import { primaryButton } from "./ui";

export default function Hero() {
  return (
    <section className="pb-16 pt-12 sm:pb-24 sm:pt-16 lg:pt-24">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(0,540px)] xl:gap-16">
        {/* Text */}
        <div className="min-w-0">
          <h1 className="text-[40px] font-semibold leading-[1.02] tracking-[-0.045em] text-ink [text-wrap:balance] sm:text-[52px] xl:text-[60px]">
            {hero.title}
          </h1>
          {/* Large subline with the rotating verb. Screen readers hear
              "Let your users trade, invest and hedge by chat and voice". */}
          <p className="mt-6 text-[24px] font-medium leading-[1.25] tracking-[-0.025em] text-ink [text-wrap:balance] sm:text-[30px] xl:text-[34px]">
            {hero.sublineStart} <RotatingVerb verbs={hero.sublineVerbs} readable={hero.verbsReadable} /> {hero.sublineEnd}
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-muted">{hero.supporting}</p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href="#demo" className={`${primaryButton} h-12 px-7 text-base`}>
              {hero.ctaLabel}
            </a>
            <a
              href={hero.secondaryCtaHref}
              className="group inline-flex items-center gap-1.5 rounded-md text-[15px] font-medium text-accent hover:text-accent-hover"
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
