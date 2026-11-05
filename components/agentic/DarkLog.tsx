"use client";

import { security } from "@/content/site";
import { useSequence } from "../motion/useSequence";

/** Log lines appearing one by one on a dark card (same timing as the homepage version). Decorative. */
export default function DarkLog() {
  const { ref, step } = useSequence<HTMLDivElement>([500, 600, 600, 2200, 400], { finalStep: 3 });
  return (
    <div ref={ref} aria-hidden="true" className="flex min-h-[240px] items-center justify-center rounded-panel bg-ink px-8 py-10">
      <ul className="flex w-full max-w-[260px] flex-col gap-3">
        {security.visuals.log.map((line, i) => {
          const show = step >= i + 1 && step <= 3;
          return (
            <li
              key={line}
              className={`flex items-center gap-3 font-mono text-sm text-white transition-[opacity,transform] duration-300 ${
                show ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-accent" />
              {line}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
