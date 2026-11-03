import { solutions } from "@/content/site";
import SolutionChat from "./SolutionChat";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Solutions() {
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="scroll-mt-16 border-t border-line py-16 sm:py-20">
      <SectionHeader id="solutions-title" eyebrow={solutions.eyebrow} title={solutions.title} />

      <Reveal className="mx-auto mt-10 max-w-[1200px] px-5 sm:px-8" delay={0.08}>
        <ul className="grid gap-4 md:grid-cols-3">
          {solutions.items.map((item, i) => (
            <li key={item.title} className="rounded-card bg-surface p-6">
              <SolutionChat {...item.chat} delay={i * 500} />
              <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-secondary">{item.text}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
