"use client";

import { motion } from "framer-motion";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

type Props = { children: React.ReactNode; className?: string; delay?: number };

/**
 * Fades its content up slightly the first time it scrolls into view.
 * With "reduce motion" turned on, content is shown as-is with no animation.
 */
export default function Reveal({ children, className, delay = 0 }: Props) {
  const reduce = useReducedMotionSafe();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
