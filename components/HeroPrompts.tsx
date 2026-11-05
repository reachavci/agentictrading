"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { hero } from "@/content/site";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

// Each prompt runs on a 9-tick cycle, visible for 5 ticks, staggered so they don't move together.
const TICK_MS = 1100;
const CYCLE = 9;
const VISIBLE_TICKS = 5;
const PHASES = { left: [0, 4, 7], right: [2, 6, 1] };
// Vertical position (% of the text area) and how far into the side space (0 = next to the text)
const LAYOUT = [
  { top: 8, f: 0.35 },
  { top: 42, f: 0 },
  { top: 76, f: 0.5 },
];
// The text area is at most 940px wide; prompts live only in the space beside it.
const HALF_TEXT = 470;
const GAP = 24;
const MAX_CHIP = 200;

/**
 * Faint trade prompts floating at the left and right edges of the hero, never behind the text.
 * Wide screens only (≥1400px); hidden on mobile and with reduce motion. Decorative.
 */
export default function HeroPrompts() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotionSafe();
  const [tick, setTick] = useState(-1);
  const running = reduce === false && inView;

  useEffect(() => {
    if (!running) return;
    setTick((t) => (t < 0 ? 0 : t));
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(id);
  }, [running]);

  if (reduce) return null;

  const render = (side: "left" | "right") =>
    hero.floatingPrompts[side].map((text, i) => {
      const { top, f } = LAYOUT[i];
      const offset = `calc(50% + ${HALF_TEXT + GAP}px + (50% - ${HALF_TEXT + GAP + MAX_CHIP}px) * ${f})`;
      const visible = tick >= 0 && (tick + PHASES[side][i]) % CYCLE < VISIBLE_TICKS;
      return (
        <span
          key={text}
          style={{ top: `${top}%`, [side === "left" ? "right" : "left"]: offset }}
          className={`absolute max-w-[200px] whitespace-nowrap rounded-[10px] border border-line bg-bg/70 px-2.5 py-1.5 font-mono text-[11px] text-ink-muted transition-[opacity,transform] duration-[1400ms] ease-in-out ${
            visible ? "-translate-y-[5px] opacity-60" : "translate-y-[5px] opacity-0"
          }`}
        >
          {text}
        </span>
      );
    });

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 hidden select-none min-[1400px]:block">
      {render("left")}
      {render("right")}
    </div>
  );
}
