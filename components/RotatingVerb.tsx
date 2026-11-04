"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

const SHOW_MS = 2500;

/**
 * Rotating headline verb (e.g. trade → invest → hedge).
 * - Assistive tech and search engines get only the first verb (visually hidden text).
 * - The visible verbs are drawn with CSS (`content: attr(data-word)`), so they aren't part
 *   of the heading's text, and they're aria-hidden.
 * - All verbs share one grid cell, so the slot is always as wide as the longest verb.
 * - Reduce motion: the first verb only, no rotation. Pauses while off-screen.
 */
export default function RotatingVerb({ verbs }: { verbs: string[] }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotionSafe();
  const inView = useInView(ref);
  const [i, setI] = useState(0);
  const running = reduce === false && inView && verbs.length > 1;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setI((n) => (n + 1) % verbs.length), SHOW_MS);
    return () => clearTimeout(t);
  }, [running, i, verbs.length]);

  const current = reduce ? 0 : i;
  const previous = (current - 1 + verbs.length) % verbs.length;

  return (
    <span ref={ref} className="relative inline-grid justify-items-start text-accent">
      <span className="sr-only">{verbs[0]}</span>
      {verbs.map((verb, n) => (
        <span
          key={verb}
          aria-hidden="true"
          data-word={verb}
          className={`col-start-1 row-start-1 before:content-[attr(data-word)] motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out ${
            n === current
              ? "translate-y-0 opacity-100"
              : n === previous && running
                ? "-translate-y-[0.22em] opacity-0"
                : "translate-y-[0.22em] opacity-0"
          }`}
        />
      ))}
    </span>
  );
}
