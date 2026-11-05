"use client";

import { hero } from "@/content/agentic-trading";
import { useSequence } from "../motion/useSequence";

/** Dark card: the plan card appears, then a blue shield with a check draws in. Loops gently. Decorative. */
export default function HeroVisual() {
  // empty, plan card, shield + check (final), fade
  const { ref, step } = useSequence([600, 900, 2800, 500], { finalStep: 2 });
  const plan = step >= 1 && step <= 2;
  const shield = step === 2;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative flex min-h-[340px] flex-col items-center justify-center gap-8 overflow-hidden rounded-panel bg-ink px-6 py-10 sm:min-h-[400px]"
    >
      {/* soft blue glow behind the shield */}
      <div className="pointer-events-none absolute left-1/2 top-[62%] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />

      <div
        className={`relative w-full max-w-[300px] rounded-input border border-white/10 bg-white/[0.06] px-4 py-3 transition-[opacity,transform] duration-500 ease-out ${
          plan ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/60">{hero.visual.planLabel}</p>
        <p className="mt-1.5 font-mono text-sm text-white">{hero.visual.plan}</p>
      </div>

      <svg
        viewBox="0 0 24 24"
        className={`relative h-24 w-24 text-accent transition-[opacity,transform] duration-500 ease-out sm:h-28 sm:w-28 ${
          shield ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" fill="currentColor" fillOpacity={0.12} />
        {/* check draws in after the shield appears */}
        <path
          d="M9 12l2 2 4-4"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={shield ? 0 : 1}
          strokeWidth={1.8}
          className="transition-[stroke-dashoffset] delay-300 duration-500 ease-out"
        />
      </svg>
    </div>
  );
}
