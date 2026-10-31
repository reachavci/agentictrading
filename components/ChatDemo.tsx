"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { chatExamples, hero } from "@/content/site";
import { ArrowUpIcon } from "./icons";
import PlanCard from "./PlanCard";
import StatusChip from "./StatusChip";

// Timings (milliseconds)
const TYPE_MS = 40; // per character
const SEND_DELAY = 450; // after typing, before the bubble appears
const PLAN_DELAY = 600; // after the bubble, before the plan card
const ROW_GAP = 380; // between plan rows
const APPROVE_DELAY = 1200; // "Awaiting approval" → "Approved ✓"
const HOLD = 2200; // pause before the next prompt

type Status = "none" | "awaiting" | "approved";

type State = {
  index: number;
  typed: string;
  sent: boolean;
  planVisible: boolean;
  rows: number;
  status: Status;
};

const EMPTY: State = { index: 0, typed: "", sent: false, planVisible: false, rows: 0, status: "none" };
const STATIC_DONE: State = { index: 0, typed: "", sent: true, planVisible: true, rows: 3, status: "approved" };

const pad = (n: number) => String(n).padStart(2, "0");
const ease = [0.22, 1, 0.36, 1] as const;

export default function ChatDemo() {
  const reduceMotion = useReducedMotion();
  const [s, setS] = useState<State>(EMPTY);
  const inputRef = useRef<HTMLDivElement>(null);

  // Keep the end of long prompts (and the cursor) in view while typing.
  useEffect(() => {
    const el = inputRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [s.typed]);

  useEffect(() => {
    if (reduceMotion) {
      setS(STATIC_DONE);
      return;
    }

    let cancelled = false;
    const timers = new Set<ReturnType<typeof setTimeout>>();
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const t = setTimeout(() => {
          timers.delete(t);
          resolve();
        }, ms);
        timers.add(t);
      });

    (async () => {
      for (let index = 0; !cancelled; index = (index + 1) % chatExamples.length) {
        const { prompt, plan } = chatExamples[index];
        setS({ ...EMPTY, index });

        // 1. Type the prompt
        for (let i = 1; i <= prompt.length; i++) {
          await sleep(TYPE_MS);
          if (cancelled) return;
          setS((p) => ({ ...p, typed: prompt.slice(0, i) }));
        }

        // 2. Send it
        await sleep(SEND_DELAY);
        if (cancelled) return;
        setS((p) => ({ ...p, typed: "", sent: true }));

        // 3. Show the plan, rows one by one
        await sleep(PLAN_DELAY);
        if (cancelled) return;
        setS((p) => ({ ...p, planVisible: true }));
        for (let r = 1; r <= plan.length; r++) {
          await sleep(ROW_GAP);
          if (cancelled) return;
          setS((p) => ({ ...p, rows: r }));
        }

        // 4. Awaiting approval → Approved
        await sleep(ROW_GAP);
        if (cancelled) return;
        setS((p) => ({ ...p, status: "awaiting" }));
        await sleep(APPROVE_DELAY);
        if (cancelled) return;
        setS((p) => ({ ...p, status: "approved" }));

        // 5. Hold, then next prompt
        await sleep(HOLD);
      }
    })();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reduceMotion]);

  const example = chatExamples[s.index];
  const total = chatExamples.length;

  return (
    <div className="w-full rounded-chat border border-line bg-surface p-4 text-left shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:p-5">
      {/* Top row */}
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
        <span>{hero.chatLabel}</span>
        <span aria-label={`Example ${s.index + 1} of ${total}`}>
          {pad(s.index + 1)} / {pad(total)}
        </span>
      </div>

      {/* Messages, anchored to the bottom */}
      <div className="mt-4 flex min-h-[290px] flex-col justify-end sm:min-h-[250px]">
        <AnimatePresence mode="wait" initial={false}>
          {s.sent && (
            <motion.div
              key={s.index}
              className="flex flex-col gap-3"
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
            >
              <motion.div
                layout="position"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease }}
                className="ml-auto max-w-[85%] rounded-[14px_14px_4px_14px] bg-bubble px-3.5 py-2.5 text-sm text-ink"
              >
                {example.prompt}
              </motion.div>

              {s.planVisible && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <PlanCard
                    title={hero.planTitle}
                    rows={example.plan}
                    renderRow={(row, i, content) => (
                      <motion.div
                        key={row.label}
                        initial={false}
                        animate={i < s.rows ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                        transition={{ duration: 0.35, ease }}
                      >
                        {content}
                      </motion.div>
                    )}
                    footer={
                      <AnimatePresence mode="wait" initial={false}>
                        {s.status !== "none" && (
                          <motion.span
                            key={s.status}
                            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.25 }}
                          >
                            {s.status === "awaiting" ? (
                              <StatusChip variant="awaiting" label={hero.statusAwaiting} />
                            ) : (
                              <StatusChip variant="approved" label={hero.statusApproved} />
                            )}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    }
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input row (decorative) */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex h-11 min-w-0 flex-1 items-center rounded-input border border-line bg-surface-inset px-3.5 font-mono text-[13px] text-ink">
          <div ref={inputRef} className="flex min-w-0 items-center overflow-hidden">
            <span className="shrink-0 whitespace-pre">{s.typed}</span>
            <span aria-hidden="true" className="ml-px inline-block h-4 w-[2px] shrink-0 bg-accent motion-safe:animate-blink" />
          </div>
        </div>
        <button
          type="button"
          aria-label="Send"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-accent text-accent-ink transition-opacity hover:opacity-90"
        >
          <ArrowUpIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
