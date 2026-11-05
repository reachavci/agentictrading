"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { card } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  index: number; // position in the grid, for the stagger
  reduce: boolean | null;
  children: (inView: boolean) => React.ReactNode;
  className?: string;
};

/**
 * Card shell shared by Volume, How it works and Capabilities: fades up in a stagger the first
 * time it scrolls into view. With reduce motion it's shown immediately. Passes `inView` to its
 * children so they can start their own animation (counting, typing) at the same moment.
 */
const FadeCard = forwardRef<HTMLLIElement, Props>(function FadeCard({ index, reduce, children, className = "" }, outer) {
  const ref = useRef<HTMLLIElement>(null);
  useImperativeHandle(outer, () => ref.current as HTMLLIElement);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const animate = reduce === false;

  return (
    <motion.li
      ref={ref}
      className={`${card.item} ${className}`}
      initial={false}
      animate={
        animate && !inView
          ? { opacity: 0, y: 16, transition: { duration: 0 } } // waiting below the fold
          : { opacity: 1, y: 0, transition: { duration: animate ? 0.5 : 0, ease, delay: animate ? index * 0.1 : 0 } }
      }
    >
      {children(inView)}
    </motion.li>
  );
});

export default FadeCard;
