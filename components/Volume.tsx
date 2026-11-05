"use client";

import { volume } from "@/content/site";
import { Stat } from "./CountUp";
import FadeCard from "./FadeCard";
import SectionHeader from "./SectionHeader";
import { card } from "./ui";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

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
