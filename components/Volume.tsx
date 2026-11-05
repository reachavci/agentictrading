"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { volume } from "@/content/site";
import SectionHeader from "./SectionHeader";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

const COUNT_MS = 1200;
const MIN_COUNT = 10; // smaller numbers just appear
const ease = [0.22, 1, 0.36, 1] as const;

/**
 * A number that counts up from 0 once `start` is true. The final value is always in the page
 * (invisible while counting), so screen readers and search engines read it; the moving digits
 * are drawn with CSS and aria-hidden.
 */
function CountUp({ value, text, start, reduce }: { value: number; text: string; start: boolean; reduce: boolean }) {
  const [n, setN] = useState<number | null>(null); // null = not started

  useEffect(() => {
    if (!start || reduce) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / COUNT_MS);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3)))); // ease-out
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, reduce, value]);

  const counting = !reduce && n !== value;
  return (
    <span className="relative inline-block tabular-nums">
      <span className={counting ? "opacity-0" : ""}>{text}</span>
      {counting && (
        <span aria-hidden="true" data-n={n ?? 0} className="absolute inset-y-0 right-0 before:content-[attr(data-n)]" />
      )}
    </span>
  );
}

/** Splits "365 orders a year" into text and numbers; numbers ≥ 10 count up. */
function Stat({ label, start, reduce }: { label: string; start: boolean; reduce: boolean }) {
  const parts = label.split(/(\d[\d,]*)/);
  return (
    <>
      {parts.map((part, i) => {
        const value = /^\d/.test(part) ? Number(part.replace(/,/g, "")) : NaN;
        return value >= MIN_COUNT ? <CountUp key={i} value={value} text={part} start={start} reduce={reduce} /> : <span key={i}>{part}</span>;
      })}
    </>
  );
}

function VolumeCard({ item, index, reduce }: { item: (typeof volume.items)[number]; index: number; reduce: boolean | null }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const animate = reduce === false;

  return (
    <motion.li
      ref={ref}
      className="flex flex-col rounded-card bg-surface p-6"
      initial={false}
      animate={
        animate && !inView
          ? { opacity: 0, y: 16, transition: { duration: 0 } } // waiting below the fold
          : { opacity: 1, y: 0, transition: { duration: animate ? 0.5 : 0, ease, delay: animate ? index * 0.1 : 0 } }
      }
    >
      <p className="text-[28px] font-semibold leading-[1.1] tracking-[-0.03em] text-accent [text-wrap:balance] lg:text-[30px] xl:min-h-[2.2em]">
        <Stat label={item.stat} start={inView} reduce={reduce === true} />
      </p>
      <p className="mt-5 rounded-input border border-line bg-bg px-3.5 py-2.5 font-mono text-[13px] leading-relaxed text-ink">{item.prompt}</p>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-secondary">{item.text}</p>
    </motion.li>
  );
}

export default function Volume() {
  const reduce = useReducedMotionSafe();
  return (
    <section id="volume" aria-labelledby="volume-title" className="scroll-mt-16 border-t border-line py-16 sm:py-20">
      <SectionHeader id="volume-title" eyebrow={volume.eyebrow} title={volume.title} text={volume.text} />
      <div className="mx-auto mt-10 max-w-[1200px] px-5 sm:px-8">
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {volume.items.map((item, i) => (
            <VolumeCard key={item.stat} item={item} index={i} reduce={reduce} />
          ))}
        </ul>
      </div>
    </section>
  );
}
