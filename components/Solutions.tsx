import { solutions, type SolutionIcon } from "@/content/site";
import { ArrowRightIcon, SolutionIcons } from "./icons";
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
            <li key={item.title}>
              {/* The whole card is one link */}
              <a
                href={item.href}
                className="group flex h-full flex-col rounded-card bg-surface p-6 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_rgba(11,18,32,0.25)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-input border border-line bg-bg text-accent">
                  <Icon name={item.icon} />
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-secondary">{item.text}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[15px] font-medium text-accent group-hover:text-accent-hover">
                  {solutions.linkLabel}
                  <ArrowRightIcon className="h-4 w-4 motion-safe:transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
