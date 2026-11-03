"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotionSafe } from "../useReducedMotionSafe";

type Options = {
  /** Extra wait before the first step, used to stagger neighbouring animations. */
  delay?: number;
  /** Step to show when the visitor prefers reduced motion (the "finished" state). */
  finalStep: number;
};

/**
 * Drives a looping animation as a list of steps, each with a duration (ms).
 * - Starts when the element scrolls into view; pauses while it's off-screen.
 * - With "reduce motion", it stays on `finalStep` and never moves.
 */
export function useSequence<T extends HTMLElement = HTMLDivElement>(durations: number[], { delay = 0, finalStep }: Options) {
  const ref = useRef<T>(null);
  const reduce = useReducedMotionSafe();
  const inView = useInView(ref, { amount: 0.35 });
  const [step, setStep] = useState(0);
  const running = reduce === false && inView;

  useEffect(() => {
    if (!running) return;
    const ms = durations[step] + (step === 0 ? delay : 0);
    const t = setTimeout(() => setStep((s) => (s + 1) % durations.length), ms);
    return () => clearTimeout(t);
    // durations are constant per component
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, step, delay]);

  return { ref, step: reduce ? finalStep : step, running, reduce: reduce === true };
}
