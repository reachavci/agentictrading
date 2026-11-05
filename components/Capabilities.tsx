"use client";

import { useEffect, useState } from "react";
import { capabilities, type CapabilityTone } from "@/content/site";
import FadeCard from "./FadeCard";
import { Caret, useTyped } from "./motion/useTyped";
import { useReducedMotionSafe } from "./useReducedMotionSafe";
import SectionHeader from "./SectionHeader";
import StatusChip, { type ChipVariant } from "./StatusChip";
import { card } from "./ui";

const STAGGER_MS = 450; // delay between cards in the same row starting to type
const FADE_MS = 300; // let the card fade up a little before typing starts
const TONE: Record<CapabilityTone, ChipVariant> = { active: "active", awaiting: "awaiting", answered: "paused" };

type Item = (typeof capabilities.items)[number];

/** How many cards sit side by side right now (matches the grid: 3 desktop, 2 tablet, 1 mobile). */
const columns = () => (window.matchMedia("(min-width: 1024px)").matches ? 3 : window.matchMedia("(min-width: 768px)").matches ? 2 : 1);

function CardBody({ item, index, inView, reduce }: { item: Item; index: number; inView: boolean; reduce: boolean | null }) {
  const [play, setPlay] = useState(false);

  // Each prompt types once, when its card scrolls into view. Cards in the same row stagger left to right.
  useEffect(() => {
    if (!inView || reduce !== false || play) return;
    const t = setTimeout(() => setPlay(true), FADE_MS + (index % columns()) * STAGGER_MS);
    return () => clearTimeout(t);
  }, [inView, reduce, play, index]);

  const typed = useTyped(item.prompt, play, true, reduce === true);
  const done = reduce === true || typed.length === item.prompt.length;

  return (
    <>
      <h3 className={card.label}>{item.title}</h3>

      {/* Example prompt. The real text is in the page once: the invisible copy that holds the
          final size, which screen readers and search engines read. The typing copy on top is
          drawn with CSS (content: attr(data-typed)), so it isn't page text, and it's aria-hidden. */}
      <p className={`relative ${card.chip}`}>
        <span className="opacity-0">{item.prompt}</span>
        <span aria-hidden="true" data-typed={typed} className="absolute inset-0 px-3.5 py-2.5 before:content-[attr(data-typed)]">
          {play && !done && <Caret />}
        </span>
      </p>

      <p className={card.text}>{item.text}</p>

      <div className="mt-auto pt-5">
        <div className={`border-t border-line pt-4 transition-opacity duration-500 ${done ? "opacity-100" : "opacity-0"}`}>
          <StatusChip variant={TONE[item.statusTone]} label={item.status} />
        </div>
      </div>
    </>
  );
}

export default function Capabilities() {
  const reduce = useReducedMotionSafe();
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className={card.section}>
      <SectionHeader id="capabilities-title" eyebrow={capabilities.eyebrow} title={capabilities.title} text={capabilities.text} />
      <div className={card.grid}>
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.items.map((item, i) => (
            <FadeCard key={item.title} index={i} reduce={reduce}>
              {(inView) => <CardBody item={item} index={i} inView={inView} reduce={reduce} />}
            </FadeCard>
          ))}
        </ul>
      </div>
    </section>
  );
}
