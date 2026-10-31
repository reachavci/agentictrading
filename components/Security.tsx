import { security, type SecurityIcon } from "@/content/site";
import { ArrowRightIcon, SecurityIcons } from "./icons";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const flowStyles = [
  "bg-surface text-ink-secondary", // AI drafts the plan
  "bg-status-active-bg text-status-active-fg", // User approves
  "bg-ink text-white", // Fixed rules execute
];

function Icon({ name }: { name: SecurityIcon }) {
  const Svg = SecurityIcons[name];
  return <Svg className="h-5 w-5" />;
}

export default function Security() {
  const { featured } = security;
  return (
    <section id="security" aria-labelledby="security-title" className="scroll-mt-16 border-t border-line py-20 sm:py-28">
      <SectionHeader id="security-title" eyebrow={security.eyebrow} title={security.title} text={security.subline} />

      <div className="mx-auto mt-14 max-w-[1200px] px-5 sm:px-8">
        {/* Featured card */}
        <Reveal delay={0.08}>
          <div className="rounded-card border border-accent/25 bg-bg p-7 shadow-[0_0_0_5px_rgba(10,107,51,0.05),0_24px_48px_-28px_rgba(10,107,51,0.35)] sm:p-10 xl:grid xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center xl:gap-12">
            <div>
              <h3 className="text-[28px] font-semibold leading-[1.1] tracking-[-0.035em] text-ink sm:text-[36px]">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-[52ch] text-lg leading-relaxed text-ink-secondary">{featured.text}</p>
            </div>
            <ol className="mt-8 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3 xl:mt-0">
              {featured.flow.map((step, i) => (
                <li key={step} className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                  {i > 0 && (
                    <ArrowRightIcon aria-hidden="true" className="ml-4 h-4 w-4 rotate-90 text-ink-muted sm:ml-0 sm:rotate-0" />
                  )}
                  <span className={`whitespace-nowrap rounded-pill px-3.5 py-2 font-mono text-xs font-medium ${flowStyles[i] ?? flowStyles[0]}`}>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
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
