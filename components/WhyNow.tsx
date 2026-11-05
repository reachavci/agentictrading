"use client";

import { motion } from "framer-motion";
import { whyNow } from "@/content/site";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

const LINE_GAP = 0.4; // seconds between line 1 and line 2 (and then the paragraph)
const ease = [0.22, 1, 0.36, 1] as const;

/** Short "why now" statement between the hero and How it works. */
export default function WhyNow() {
  const reduce = useReducedMotionSafe();

  // Each part fades in one after another the first time the block scrolls into view.
  // With reduce motion everything is shown immediately.
  const fade = (i: number) =>
    reduce
      ? { initial: false as const, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "0px 0px -10% 0px" },
          transition: { duration: 0.6, ease, delay: i * LINE_GAP },
        };

  return (
    <section aria-labelledby="why-now-title" className="border-t border-line px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-[880px] text-center">
        <h2 id="why-now-title" className="text-[34px] font-semibold leading-[1.1] tracking-[-0.04em] text-ink sm:text-[48px]">
          {whyNow.lines.map((line, i) => (
            <span key={line}>
              {i > 0 && " "}
              <motion.span className="block [text-wrap:balance]" {...fade(i)}>
                {line}
              </motion.span>
            </span>
          ))}
        </h2>
        <motion.p
          className="mx-auto mt-6 max-w-[640px] text-lg leading-relaxed text-ink-muted [text-wrap:balance] sm:text-xl"
          {...fade(whyNow.lines.length)}
        >
          {whyNow.text}
        </motion.p>
        <motion.p className="mt-6" {...fade(whyNow.lines.length)}>
          <a href={whyNow.linkHref} className="rounded-md text-base font-medium text-accent transition-colors hover:text-accent-hover sm:text-lg">
            {whyNow.linkLabel}
          </a>
        </motion.p>
      </div>
    </section>
  );
}
