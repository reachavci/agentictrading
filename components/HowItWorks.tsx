import { howItWorks } from "@/content/site";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const pad = (n: number) => String(n).padStart(2, "0");

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-16 border-t border-line py-16 sm:py-20">
      <SectionHeader id="how-title" eyebrow={howItWorks.eyebrow} title={howItWorks.title} />

      <Reveal className="mx-auto mt-12 max-w-[1200px] px-5 sm:px-8" delay={0.08}>
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {howItWorks.steps.map((step, i) => (
            <li
              key={step.title}
              className={`relative ${
                // Thin line from this step's number to the next one (desktop only)
                i < howItWorks.steps.length - 1
                  ? "lg:after:absolute lg:after:left-[60px] lg:after:right-[-20px] lg:after:top-4 lg:after:h-px lg:after:bg-line-strong lg:after:content-['']"
                  : ""
              }`}
            >
              <span className="inline-flex h-8 w-12 items-center justify-center rounded-pill border border-line bg-bg font-mono text-xs font-medium tabular-nums text-ink">
                {pad(i + 1)}
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-ink">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-secondary">{step.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
