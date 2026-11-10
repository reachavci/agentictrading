"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ownership } from "@/content/site";
import Reveal from "./Reveal";
import StatusChip from "./StatusChip";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

const STEP_MS = [300, 1000, 1700]; // bubble, plan card, "Approved ✓"

/** Phone labelled "Your app": the bubble, then the plan card, then the chip appear once on scroll. Decorative. */
function Phone() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotionSafe();
  const [step, setStep] = useState(0);
  const v = ownership.visual;

  useEffect(() => {
    if (reduce !== false || !inView) return;
    const timers = STEP_MS.map((ms, i) => setTimeout(() => setStep((s) => Math.max(s, i + 1)), ms));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce]);

  const on = (n: number) => reduce === true || step >= n;
  const fade = (show: boolean) => `motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out ${show ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"}`;

  return (
    <div ref={ref} aria-hidden="true" className="flex flex-col items-center">
      <div className="w-full max-w-[300px] rounded-[40px] border border-line-strong bg-bg p-3 shadow-[0_30px_60px_-30px_rgba(11,18,32,0.3)]">
        <div className="flex h-[440px] flex-col overflow-hidden rounded-[30px] bg-surface">
          {/* App bar */}
          <div className="flex items-center justify-center border-b border-line bg-bg px-4 py-3">
            <span className="text-sm font-semibold tracking-[-0.01em] text-ink">{v.appLabel}</span>
          </div>
          {/* Conversation, anchored to the bottom */}
          <div className="flex flex-1 flex-col justify-end gap-3 p-4">
            <p className={`ml-auto max-w-[85%] rounded-[16px_16px_4px_16px] bg-ink px-3.5 py-2.5 text-[13px] leading-snug text-white ${fade(on(1))}`}>
              {v.prompt}
            </p>
            <div className={`rounded-input border border-line bg-bg p-3.5 ${fade(on(2))}`}>
              <p className="text-[11px] font-medium text-ink-muted">{v.planLabel}</p>
              <p className="mt-1 font-mono text-[12px] text-ink">{v.plan}</p>
              <div className={`mt-3 ${fade(on(3))}`}>
                <StatusChip variant="approved" label={v.approved} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-[13px] text-ink-muted">{v.caption}</p>
    </div>
  );
}

export default function Ownership() {
  return (
    <section id="ownership" aria-labelledby="ownership-title" className="scroll-mt-16 border-t border-line py-16 sm:py-20">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Reveal className="min-w-0">
          <h2 id="ownership-title" className="text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] text-ink [text-wrap:balance] sm:text-[48px]">
            {ownership.title}
          </h2>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-secondary [text-wrap:pretty] sm:text-xl">{ownership.text}</p>
          <p className="mt-5 text-lg font-medium text-ink [text-wrap:pretty] sm:text-xl">{ownership.closing}</p>
        </Reveal>
        <Reveal className="min-w-0" delay={0.1}>
          <Phone />
        </Reveal>
      </div>
    </section>
  );
}
