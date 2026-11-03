import { security, type SecurityIcon } from "@/content/site";
import { ArrowRightIcon, SecurityIcons } from "./icons";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const flowStyles = [
  "bg-surface text-ink-secondary", // AI plans
  "bg-status-active-bg text-status-active-fg", // User approves
  "bg-ink text-white", // Rules execute
];

function Icon({ name }: { name: SecurityIcon }) {
  const Svg = SecurityIcons[name];
  return <Svg className="h-5 w-5" />;
}

export default function Security() {
  const { featured } = security;
  return (
    <section id="security" aria-labelledby="security-title" className="scroll-mt-16 border-t border-line py-16 sm:py-20">
      <SectionHeader id="security-title" eyebrow={security.eyebrow} title={security.title} />

      <div className="mx-auto mt-10 max-w-[1200px] px-5 sm:px-8">
        {/* Featured card: the flow is the main element */}
        <Reveal delay={0.08}>
          <div className="flex flex-col items-center rounded-card border border-accent/25 bg-bg px-6 py-10 text-center shadow-[0_0_0_5px_rgba(10,107,51,0.05),0_24px_48px_-28px_rgba(10,107,51,0.35)] sm:px-10 sm:py-12">
            <ol className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
              {featured.flow.map((step, i) => (
                <li key={step} className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
                  {i > 0 && <ArrowRightIcon aria-hidden="true" className="h-5 w-5 rotate-90 text-ink-muted md:rotate-0" />}
                  <span
                    className={`inline-flex h-12 items-center whitespace-nowrap rounded-pill px-6 font-mono text-base font-medium lg:h-14 lg:px-7 lg:text-lg ${
                      flowStyles[i] ?? flowStyles[0]
                    }`}
                  >
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-lg leading-relaxed text-ink-secondary [text-wrap:balance] sm:mt-7 sm:text-xl">{featured.note}</p>
          </div>
        </Reveal>

        {/* Six cards */}
        <Reveal delay={0.12}>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {security.items.map((item) => (
              <li key={item.title} className="rounded-card bg-surface p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-input border border-line bg-bg text-ink">
                  <Icon name={item.icon} />
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-secondary">{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
