import { hero } from "@/content/site";
import ChatDemo from "./ChatDemo";
import FloatingPrompts from "./FloatingPrompts";

export default function Hero() {
  return (
    <section className="relative px-5 pb-24 pt-12 sm:px-8 sm:pt-20">
      <FloatingPrompts />
      <div className="relative z-10 mx-auto flex max-w-[680px] flex-col items-center text-center">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">{hero.eyebrow}</p>
        <h1 className="mt-5 text-[40px] font-bold leading-[1.04] tracking-[-0.035em] text-ink sm:text-[54px] lg:text-[64px]">
          {hero.title}
        </h1>
        <p className="mt-5 max-w-[640px] text-[17px] leading-relaxed text-ink-secondary sm:text-[19px]">{hero.subline}</p>

        <div className="mt-12 w-full max-w-[560px]">
          <ChatDemo />
        </div>

        {/* TODO: replace this anchor with a real demo request form (e.g. email + company) */}
        <a
          id="demo"
          href="#demo"
          className="mt-10 scroll-mt-[40vh] rounded-pill bg-accent px-7 py-3.5 text-[15px] font-semibold text-accent-ink transition-opacity hover:opacity-90"
        >
          {hero.ctaLabel}
        </a>
      </div>
    </section>
  );
}
