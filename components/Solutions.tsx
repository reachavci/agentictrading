"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { solutions } from "@/content/site";
import { CountUp } from "./CountUp";
import { ArrowRightIcon } from "./icons";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

type Item = (typeof solutions.items)[number];

function SolutionCard({ item, reduce }: { item: Item; reduce: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  return (
    // The whole card is one link
    <a
      ref={ref}
      href={item.href}
      className="group flex h-full flex-col rounded-card bg-surface p-6 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_-20px_rgba(11,18,32,0.25)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7"
    >
      <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">{item.label}</p>
      <h3 className="mt-3 text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-ink [text-wrap:balance]">{item.headline}</h3>
      <p className="mt-6 text-[44px] font-semibold leading-none tracking-[-0.04em] text-accent">
        <CountUp value={item.number.value} text={String(item.number.value)} start={inView} reduce={reduce} />
        {item.number.suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-ink">{item.number.label}</p>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-secondary">{item.text}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[15px] font-medium text-accent group-hover:text-accent-hover">
        {solutions.linkLabel}
        <ArrowRightIcon className="h-4 w-4 motion-safe:transition-transform group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}

export default function Solutions() {
  const reduce = useReducedMotionSafe();
  return (
    <section id="solutions" aria-labelledby="solutions-title" className="scroll-mt-16 border-t border-line py-16 sm:py-20">
      <SectionHeader id="solutions-title" eyebrow={solutions.eyebrow} title={solutions.title} text={solutions.text} />

      <Reveal className="mx-auto mt-10 max-w-[1200px] px-5 sm:px-8" delay={0.08}>
        <ul className="grid gap-4 lg:grid-cols-3">
          {solutions.items.map((item) => (
            <li key={item.href}>
              <SolutionCard item={item} reduce={reduce === true} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
