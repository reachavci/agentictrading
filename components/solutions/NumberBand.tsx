"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import type { SolutionPage } from "@/content/solutions";
import { CountUp } from "../CountUp";
import Reveal from "../Reveal";
import { useReducedMotionSafe } from "../useReducedMotionSafe";

/** Large blue number that counts up when in view (left), its explanation (right). Stacked on mobile. */
export default function NumberBand({ number }: { number: SolutionPage["number"] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotionSafe();

  return (
    <section aria-label={`${number.value}${number.suffix ?? ""} ${number.label}`} className="border-t border-line py-16 sm:py-20">
      <Reveal className="mx-auto grid max-w-[1000px] items-center gap-6 px-5 sm:px-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
        <div ref={ref}>
          <p className="text-[80px] font-semibold leading-none tracking-[-0.05em] text-accent sm:text-[112px]">
            <CountUp value={number.value} text={String(number.value)} start={inView} reduce={reduce === true} />
            {number.suffix}
          </p>
          <p className="mt-3 text-xl font-semibold tracking-[-0.02em] text-ink sm:text-2xl">{number.label}</p>
        </div>
        <p className="text-lg leading-relaxed text-ink-secondary [text-wrap:pretty] sm:text-xl">{number.explanation}</p>
      </Reveal>
    </section>
  );
}
