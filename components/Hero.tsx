import { header, hero } from "@/content/site";
import ChatDemo from "./ChatDemo";
import HeroPrompts from "./HeroPrompts";
import RotatingVerb from "./RotatingVerb";
import { ArrowRightIcon } from "./icons";
import { primaryButton, softButton } from "./ui";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20 lg:pt-[120px]">
      {/* Soft blue-to-white atmosphere behind the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[760px] bg-[radial-gradient(60%_55%_at_50%_28%,theme(colors.accent.soft)_0%,rgba(238,242,255,0.55)_45%,theme(colors.bg)_100%)]"
      />

      {/* Text (centered). Floating prompts sit beside it on wide screens. */}
      <div className="relative px-5 sm:px-8">
        <HeroPrompts />
        <div className="relative mx-auto flex max-w-[940px] flex-col items-center text-center">
          <h1 className="text-[40px] font-semibold leading-[1.02] tracking-[-0.045em] text-ink [text-wrap:balance] sm:text-[56px] lg:text-[64px] xl:text-[72px]">
            {hero.title}
          </h1>
          {/* Screen readers hear "Let your users trade, invest and hedge by chat and voice". */}
          <p className="mt-6 text-[22px] font-medium leading-[1.3] tracking-[-0.02em] text-ink [text-wrap:balance] sm:text-[28px] lg:text-[30px]">
            {hero.sublineStart} <RotatingVerb verbs={hero.sublineVerbs} readable={hero.verbsReadable} /> {hero.sublineEnd}
          </p>

          <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <a href={header.ctaHref} className={`${primaryButton} h-12 px-7 text-base`}>
              {hero.ctaLabel}
            </a>
            <a href={hero.secondaryCtaHref} className={`group ${softButton} h-12 px-6 text-base`}>
              {hero.secondaryCtaLabel}
              <ArrowRightIcon className="h-4 w-4 motion-safe:transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Product window */}
      <div className="relative mx-auto mt-14 max-w-[848px] px-5 sm:mt-16 sm:px-8">
        <div className="rounded-panel bg-surface p-3 shadow-[0_30px_80px_-40px_rgba(11,18,32,0.25)] sm:p-8">
          <ChatDemo interactive />
        </div>
      </div>
    </section>
  );
}
