import { solutions, type SolutionIcon } from "@/content/site";
import { SolutionIcons } from "./icons";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

function Icon({ name }: { name: SolutionIcon }) {
  const Svg = SolutionIcons[name];
  return <Svg className="h-5 w-5" />;
}

export default function Solutions() {
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="scroll-mt-16 border-t border-line py-16 sm:py-20">
      <SectionHeader id="solutions-title" eyebrow={solutions.eyebrow} title={solutions.title} />

      <Reveal className="mx-auto mt-10 max-w-[1200px] px-5 sm:px-8" delay={0.08}>
        <ul className="grid gap-4 lg:grid-cols-3">
          {solutions.items.map((item) => (
            <li key={item.title} className="rounded-card bg-surface p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-input border border-line bg-bg text-accent">
                <Icon name={item.icon} />
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-secondary">{item.text}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
