"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { floatingPrompts } from "@/content/site";

// Timing: every chip runs on a 9-tick cycle and is visible for 5 ticks.
const TICK_MS = 1100;
const CYCLE = 9;
const VISIBLE_TICKS = 5;

// The center column is 680px wide; chips live only in the space beside it.
// They need ~250px of side space, so they only appear on screens ≥ 1200px
// (the `min-[1200px]:block` class below). Lower it only if chips get shorter.
const HALF_COLUMN = 340;
const GAP = 16;
const MAX_CHIP_W = 240;

// Vertical position (% of hero height) and how far into the side space (0 = next to
// the column, 1 = near the screen edge) for each of the 6 chips per side.
const LAYOUT = [
  { top: 6, f: 0.55 },
  { top: 20, f: 0.1 },
  { top: 35, f: 0.75 },
  { top: 50, f: 0.25 },
  { top: 65, f: 0.65 },
  { top: 80, f: 0.15 },
];

// Staggered starting points so chips don't all appear together.
const PHASES = { left: [0, 4, 8, 3, 7, 2], right: [2, 6, 1, 5, 0, 4] };

function chipStyle(side: "left" | "right", i: number): React.CSSProperties {
  const { top, f } = LAYOUT[i];
  const offset = `calc(50% + ${HALF_COLUMN + GAP}px + (50% - ${HALF_COLUMN + GAP + MAX_CHIP_W}px) * ${f})`;
  return side === "left" ? { top: `${top}%`, right: offset } : { top: `${top}%`, left: offset };
}

export default function FloatingPrompts() {
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(-1); // -1 = everything hidden until mounted

  useEffect(() => {
    if (reduceMotion) return;
    setTick(0);
    const id = setInterval(() => setTick((t) => t + 1), TICK_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const render = (side: "left" | "right") =>
    floatingPrompts[side].map((text, i) => {
      const visible =
        reduceMotion || (tick >= 0 && (tick + PHASES[side][i]) % CYCLE < VISIBLE_TICKS);
      return (
        <span
          key={`${side}-${i}`}
          style={chipStyle(side, i)}
          className={`absolute max-w-[240px] whitespace-nowrap rounded-chip border border-line-soft bg-surface-card px-3 py-2 font-mono text-xs text-ink-muted ${
            reduceMotion ? "" : "transition-[opacity,transform] duration-[1400ms] ease-in-out"
          } ${visible ? "translate-y-[-5px] opacity-100" : "translate-y-[5px] opacity-0"}`}
        >
          {text}
        </span>
      );
    });

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden select-none min-[1200px]:block">
      {render("left")}
      {render("right")}
    </div>
  );
}
