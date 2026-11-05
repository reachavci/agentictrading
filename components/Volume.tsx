"use client";

import { useEffect, useState } from "react";
import { volume } from "@/content/site";
import FadeCard from "./FadeCard";
import SectionHeader from "./SectionHeader";
import { card } from "./ui";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

const COUNT_MS = 1200;
const MIN_COUNT = 10; // smaller numbers just appear

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
  return (
    <FadeCard index={index} reduce={reduce}>
      {(inView) => (
        <>
          <p className={`${card.label} xl:min-h-[2.2em]`}>
            <Stat label={item.stat} start={inView} reduce={reduce === true} />
          </p>
          <p className={card.chip}>{item.prompt}</p>
          <p className={card.text}>{item.text}</p>
        </>
      )}
    </FadeCard>
  );
}

export default function Volume() {
  const reduce = useReducedMotionSafe();
  return (
    <section id="volume" aria-labelledby="volume-title" className={card.section}>
      <SectionHeader id="volume-title" eyebrow={volume.eyebrow} title={volume.title} text={volume.text} />
      <div className={card.grid}>
        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {volume.items.map((item, i) => (
            <VolumeCard key={item.stat} item={item} index={i} reduce={reduce} />
          ))}
        </ul>
      </div>
    </section>
  );
}
