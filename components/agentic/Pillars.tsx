import { pillars, type PillarVisual } from "@/content/agentic-trading";
import ChatDemo from "../ChatDemo";
import Reveal from "../Reveal";
import SecurityVisualStage from "../SecurityVisuals";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </svg>
  );
}

/** Visuals reused from the homepage (they keep their own animations and reduced-motion states). */
function Visual({ name }: { name: PillarVisual }) {
  if (name === "plan") return <ChatDemo />;
  const [a, b] = name === "rules" ? (["limits", "alert"] as const) : (["record", "stop"] as const);
  return (
    <div className="flex flex-col gap-3">
      <SecurityVisualStage visual={a} delay={0} />
      <SecurityVisualStage visual={b} delay={400} />
    </div>
  );
}

export default function Pillars() {
  return (
    <section aria-label="How the control layer works" className="border-t border-line py-16 sm:py-20">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-20 px-5 sm:px-8 lg:gap-28">
        {pillars.map((p, i) => (
          <Reveal key={p.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Text (alternates sides on desktop) */}
            <div className={`min-w-0 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
              <h3 className="text-[28px] font-semibold leading-[1.1] tracking-[-0.035em] text-ink [text-wrap:balance] sm:text-[34px]">{p.title}</h3>
              <p className="mt-4 text-lg leading-relaxed text-ink-secondary [text-wrap:pretty]">{p.text}</p>
              <ul className="mt-6 flex flex-col gap-3">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                    <CheckIcon />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            {/* Visual */}
            <div className="min-w-0 rounded-panel bg-surface p-3 sm:p-8">
              <Visual name={p.visual} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
