"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { capabilities, type CapabilityTone } from "@/content/site";
import { Caret, useTyped } from "./motion/useTyped";
import { useReducedMotionSafe } from "./useReducedMotionSafe";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import StatusChip, { type ChipVariant } from "./StatusChip";

const STAGGER_MS = 450; // delay between cards in the same row starting to type
const TONE: Record<CapabilityTone, ChipVariant> = { active: "active", awaiting: "awaiting", answered: "paused" };

type Item = (typeof capabilities.items)[number];

/** How many cards sit side by side right now (matches the grid: 3 desktop, 2 tablet, 1 mobile). */
const columns = () => (window.matchMedia("(min-width: 1024px)").matches ? 3 : window.matchMedia("(min-width: 768px)").matches ? 2 : 1);

function CapabilityCard({ item, index, reduce }: { item: Item; index: number; reduce: boolean | null }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [play, setPlay] = useState(false);

  // Each card types once, when it scrolls into view. Cards in the same row stagger left to right.
  useEffect(() => {
    if (!inView || reduce !== false || play) return;
    const t = setTimeout(() => setPlay(true), (index % columns()) * STAGGER_MS);
    return () => clearTimeout(t);
  }, [inView, reduce, play, index]);

  const typed = useTyped(item.prompt, play, true, reduce === true);
  const done = reduce === true || typed.length === item.prompt.length;

  return (
    <li ref={ref} className="flex flex-col rounded-card bg-surface p-6">
      <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>

      {/* Example prompt. The real text is in the page once: the invisible copy that holds the
          final size, which screen readers and search engines read. The typing copy on top is
          drawn with CSS (content: attr(data-typed)), so it isn't page text, and it's aria-hidden. */}
      <p className="relative mt-4 rounded-input border border-line bg-bg px-3.5 py-2.5 font-mono text-[13px] leading-relaxed text-ink">
        <span className="opacity-0">{item.prompt}</span>
        <span
          aria-hidden="true"
          data-typed={typed}
          className="absolute inset-0 px-3.5 py-2.5 before:content-[attr(data-typed)]"
        >
          {play && !done && <Caret />}
        </span>
      </p>

      <p className="mt-4 text-[15px] leading-relaxed text-ink-secondary">{item.text}</p>

      <div className="mt-auto pt-5">
        <div className={`border-t border-line pt-4 transition-opacity duration-500 ${done ? "opacity-100" : "opacity-0"}`}>
          <StatusChip variant={TONE[item.statusTone]} label={item.status} />
        </div>
      </div>
    </li>
  );
}

export default function Capabilities() {
  const reduce = useReducedMotionSafe();

  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="scroll-mt-16 border-t border-line py-16 sm:py-20">
      <SectionHeader id="capabilities-title" eyebrow={capabilities.eyebrow} title={capabilities.title} />
      <Reveal className="mx-auto mt-10 max-w-[1200px] px-5 sm:px-8" delay={0.08}>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.items.map((item, i) => (
            <CapabilityCard key={item.title} item={item} index={i} reduce={reduce} />
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
