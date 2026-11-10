"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { labels } from "@/content/solutions";
import StatusChip from "../StatusChip";
import { useReducedMotionSafe } from "../useReducedMotionSafe";

const BUBBLE_GAP_MS = 1100; // time between prompts
const CHIP_DELAY_MS = 500; // bubble → "Plan approved ✓"

/**
 * The four prompts appear one by one as user chat bubbles, each followed by a green
 * "Plan approved ✓" chip. Plays once when scrolled into view. Everything is laid out from the
 * start (only opacity changes), so the panel never jumps. Reduce motion: all shown at once.
 */
export default function InTheirWords({ prompts }: { prompts: string[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotionSafe();
  const [shown, setShown] = useState(0); // number of visible "steps" (bubble, chip, bubble, chip, ...)

  useEffect(() => {
    if (reduce !== false || !inView) return;
    const timers = prompts.flatMap((_, i) => [
      setTimeout(() => setShown((s) => Math.max(s, i * 2 + 1)), 200 + i * BUBBLE_GAP_MS),
      setTimeout(() => setShown((s) => Math.max(s, i * 2 + 2)), 200 + i * BUBBLE_GAP_MS + CHIP_DELAY_MS),
    ]);
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce, prompts]);

  const all = reduce === true;
  const fade = (on: boolean) => `motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out ${on ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"}`;

  return (
    <ol ref={ref} className="mx-auto flex max-w-[720px] flex-col gap-5 rounded-panel bg-surface p-5 sm:p-10">
      {prompts.map((prompt, i) => (
        <li key={prompt} className="flex flex-col items-end gap-2">
          <p className={`max-w-[88%] rounded-[16px_16px_4px_16px] bg-ink px-4 py-3 text-[15px] leading-relaxed text-white ${fade(all || shown > i * 2)}`}>
            {prompt}
          </p>
          <span className={fade(all || shown > i * 2 + 1)}>
            <StatusChip variant="approved" label={labels.planApproved} />
          </span>
        </li>
      ))}
    </ol>
  );
}
