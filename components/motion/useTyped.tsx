"use client";

import { useEffect, useState } from "react";

export const TYPE_MS = 45;

/** Types `text` out one character at a time while `play` is true; resets when it's false. */
export function useTyped(text: string, play: boolean, running: boolean, reduce: boolean) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!play) setN(0);
  }, [play]);

  useEffect(() => {
    if (!play || !running || n >= text.length) return;
    const t = setTimeout(() => setN((v) => v + 1), TYPE_MS);
    return () => clearTimeout(t);
  }, [play, running, n, text.length]);

  return reduce ? text : text.slice(0, n);
}

/** Blinking text cursor, matching the hero chat input. */
export function Caret({ className = "bg-ink" }: { className?: string }) {
  return <span aria-hidden="true" className={`ml-px inline-block h-3.5 w-px shrink-0 align-middle motion-safe:animate-blink ${className}`} />;
}
