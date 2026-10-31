"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * The visitor's "reduce motion" setting, but only after the page has loaded in the
 * browser. Returns `null` during the first render so the server HTML and the first
 * browser render match (avoids a React hydration mismatch).
 */
export function useReducedMotionSafe(): boolean | null {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? Boolean(reduce) : null;
}
