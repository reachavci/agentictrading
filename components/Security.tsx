import { security } from "@/content/site";
import SecurityFlow from "./SecurityFlow";
import SecurityVisualStage from "./SecurityVisuals";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Security() {
  const { featured } = security;
  return (
    <section id="security" aria-labelledby="security-title" className="scroll-mt-16 border-t border-line py-16 sm:py-20">
      <SectionHeader id="security-title" eyebrow={security.eyebrow} title={security.title} />

      <div className="mx-auto mt-10 max-w-[1200px] px-5 sm:px-8">
        {/* Featured card: animated flow is the main element */}
        <Reveal delay={0.08}>
          <div className="flex flex-col items-center rounded-card border border-accent/25 bg-bg px-6 py-10 text-center shadow-[0_0_0_5px_rgba(37,99,235,0.06),0_24px_48px_-28px_rgba(37,99,235,0.35)] sm:px-10 sm:py-12">
            <SecurityFlow />
            <p className="mt-4 text-lg leading-relaxed text-ink-secondary [text-wrap:balance] sm:mt-5 sm:text-xl">{featured.note}</p>
          </div>
        </Reveal>

        {/* Security cards */}
        <Reveal delay={0.12}>
          <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {security.items.map((item, i) => (
              <li key={item.title} className="rounded-card bg-surface p-6">
                <SecurityVisualStage visual={item.visual} delay={i * 300} />
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-secondary">{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
