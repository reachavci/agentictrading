"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotionSafe } from "./useReducedMotionSafe";
import { chatExamples, hero, tryDemo, type ChatExample, type PlanRow } from "@/content/site";
import { ArrowUpIcon } from "./icons";
import PlanCard from "./PlanCard";
import StatusChip from "./StatusChip";
import { primaryButton } from "./ui";

// Timings (milliseconds)
const TYPE_MS = 40; // per character
const SEND_DELAY = 450; // after typing, before the bubble appears
const PLAN_DELAY = 600; // after the bubble, before the plan card
const ROW_GAP = 380; // between plan rows
const APPROVE_DELAY = 1200; // "Awaiting approval" → "Approved ✓" (automatic loop only)
const HOLD = 2200; // pause before the next prompt

// What the agent shows after a message
type Card =
  | { kind: "plan"; rows: PlanRow[] }
  | { kind: "answer"; title: string; rows: PlanRow[]; note: string }
  | { kind: "message"; text: string }; // friendly reply to free text (no parsing)

// "info" = read-only answer label; "saved" = approved by the visitor in the demo
type Status = "none" | "awaiting" | "approved" | "info" | "saved";

type State = {
  key: number; // changes per conversation (for the exit animation)
  mode: "auto" | "user";
  counter: number; // automatic-loop position, for the "01 / 08" counter
  prompt: string;
  sent: boolean;
  card: Card;
  cardVisible: boolean;
  rows: number;
  status: Status;
};

const cardFor = (ex: ChatExample): Card =>
  "plan" in ex ? { kind: "plan", rows: ex.plan } : { kind: "answer", title: ex.answer.title, rows: ex.answer.rows, note: ex.answer.note };

const first = chatExamples[0];
const EMPTY: State = { key: 0, mode: "auto", counter: 0, prompt: first.prompt, sent: false, card: cardFor(first), cardVisible: false, rows: 0, status: "none" };
// Reduced motion: the first example, already approved
const STATIC_DONE: State = { ...EMPTY, sent: true, cardVisible: true, rows: 3, status: "approved" };

const pad = (n: number) => String(n).padStart(2, "0");
const ease = [0.22, 1, 0.36, 1] as const;

class Cancelled extends Error {}

/**
 * Hero chat card. Plays the sample conversations in a loop.
 * With `interactive`, it also has "Try:" chips, a real input and an Approve button: any interaction
 * pauses the loop, which resumes after `tryDemo.resumeAfterMs` without interaction.
 */
export default function ChatDemo({ interactive = false }: { interactive?: boolean }) {
  const reduceMotion = useReducedMotionSafe();
  const [s, setS] = useState<State>(EMPTY);
  const [input, setInput] = useState(""); // text in the input box (typed by the script or the visitor)
  const [focused, setFocused] = useState(false);
  const runId = useRef(0); // bumping it cancels whatever is playing
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the end of long prompts (and the cursor) in view while typing.
  useEffect(() => {
    for (const el of [scrollRef.current, inputRef.current]) if (el) el.scrollLeft = el.scrollWidth;
  }, [input]);

  /** Starts a new run and returns helpers bound to it; anything older is cancelled. */
  const startRun = useCallback(() => {
    const id = ++runId.current;
    timers.current.forEach(clearTimeout);
    timers.current.clear();
    const sleep = (ms: number) =>
      new Promise<void>((resolve, reject) => {
        const t = setTimeout(() => {
          timers.current.delete(t);
          if (runId.current === id) resolve();
          else reject(new Cancelled());
        }, ms);
        timers.current.add(t);
      });
    const alive = () => {
      if (runId.current !== id) throw new Cancelled();
    };
    return { sleep, alive };
  }, []);

  /** Plays one conversation: type → send → card (rows one by one) → status. */
  const play = useCallback(
    async (
      run: ReturnType<typeof startRun>,
      opts: { prompt: string; card: Card; mode: State["mode"]; counter?: number; type: boolean; autoApprove: boolean; instant: boolean },
    ) => {
      const { sleep, alive } = run;
      const wait = (ms: number) => (opts.instant ? Promise.resolve(alive()) : sleep(ms));
      setS((p) => ({ ...EMPTY, key: p.key + 1, mode: opts.mode, counter: opts.counter ?? p.counter, prompt: opts.prompt, card: opts.card }));

      if (opts.type && !opts.instant) {
        for (let i = 1; i <= opts.prompt.length; i++) {
          await sleep(TYPE_MS);
          setInput(opts.prompt.slice(0, i));
        }
      }
      await wait(SEND_DELAY);
      setInput("");
      setS((p) => ({ ...p, sent: true }));

      if (opts.card.kind === "message") {
        await wait(PLAN_DELAY);
        setS((p) => ({ ...p, cardVisible: true }));
        return;
      }
      await wait(PLAN_DELAY);
      setS((p) => ({ ...p, cardVisible: true, rows: opts.instant ? 3 : 0 }));
      if (!opts.instant) {
        for (let r = 1; r <= opts.card.rows.length; r++) {
          await sleep(ROW_GAP);
          setS((p) => ({ ...p, rows: r }));
        }
        await sleep(ROW_GAP);
      }
      if (opts.card.kind === "answer") {
        setS((p) => ({ ...p, status: "info" }));
        return;
      }
      setS((p) => ({ ...p, status: "awaiting" }));
      if (opts.autoApprove) {
        await wait(APPROVE_DELAY);
        setS((p) => ({ ...p, status: "approved" }));
      }
    },
    [],
  );

  /** The automatic loop through all sample conversations. */
  const startLoop = useCallback(() => {
    if (reduceMotion === null) return;
    const run = startRun();
    setInput("");
    if (reduceMotion) {
      setS((p) => ({ ...STATIC_DONE, key: p.key + 1 }));
      return;
    }
    (async () => {
      try {
        for (let index = 0; ; index = (index + 1) % chatExamples.length) {
          const ex = chatExamples[index];
          await play(run, { prompt: ex.prompt, card: cardFor(ex), mode: "auto", counter: index, type: true, autoApprove: true, instant: false });
          await run.sleep(HOLD);
        }
      } catch (e) {
        if (!(e instanceof Cancelled)) throw e;
      }
    })();
  }, [reduceMotion, startRun, play]);

  // Start the loop once mounted; stop everything on unmount.
  useEffect(() => {
    startLoop();
    const t = timers.current;
    return () => {
      runId.current++;
      t.forEach(clearTimeout);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [startLoop]);

  /** Any interaction: pause the loop, and resume it after a quiet period. */
  const touch = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      inputRef.current?.blur();
      startLoop();
    }, tryDemo.resumeAfterMs);
  }, [startLoop]);

  const runUser = (prompt: string, card: Card, type: boolean) => {
    touch();
    const run = startRun();
    play(run, { prompt, card, mode: "user", type, autoApprove: false, instant: reduceMotion === true }).catch((e) => {
      if (!(e instanceof Cancelled)) throw e;
    });
  };

  const onSample = (ex: ChatExample) => runUser(ex.prompt, cardFor(ex), true);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput(text);
    runUser(text, { kind: "message", text: tryDemo.freeTextReply }, false);
  };

  const onType = (value: string) => {
    if (s.mode === "auto") {
      startRun(); // pause the loop where it is
      setS((p) => ({ ...p, mode: "user" }));
    }
    touch();
    setInput(value);
  };

  const onFocus = () => {
    setFocused(true);
    if (s.mode === "auto") {
      startRun();
      setInput("");
      setS((p) => ({ ...p, mode: "user" }));
    }
    touch();
  };

  const onApprove = () => {
    touch();
    setS((p) => ({ ...p, status: "saved" }));
  };

  const total = chatExamples.length;
  const card = s.card;
  const userTurn = s.mode === "user";

  const statusChip = (() => {
    if (card.kind === "answer" && s.status === "info") {
      return (
        <span className="inline-flex items-center whitespace-nowrap rounded-pill bg-status-paused-bg px-2.5 py-1 text-xs font-medium leading-none text-status-paused-fg">
          {card.note}
        </span>
      );
    }
    if (s.status === "awaiting") {
      return (
        <span className="flex flex-wrap items-center gap-2">
          <StatusChip variant="awaiting" label={hero.statusAwaiting} />
          {interactive && userTurn && (
            <button type="button" onClick={onApprove} className={`${primaryButton} h-7 px-3 text-xs`}>
              {tryDemo.approveLabel}
            </button>
          )}
        </span>
      );
    }
    if (s.status === "saved") {
      return (
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <StatusChip variant="approved" label={hero.statusApproved} />
          <span className="text-xs text-ink-muted">{tryDemo.savedLine}</span>
        </span>
      );
    }
    return <StatusChip variant="approved" label={hero.statusApproved} />;
  })();

  const chatCard = (
    <div className="w-full rounded-chat border border-line bg-surface-raised p-4 text-left shadow-product sm:p-5">
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[13px] font-medium text-ink">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-status-live motion-safe:animate-pulse" />
          {hero.chatLabel}
        </span>
        <span
          className={`font-mono text-xs tabular-nums text-ink-muted transition-opacity ${userTurn ? "opacity-0" : ""}`}
          aria-label={`Example ${s.counter + 1} of ${total}`}
          aria-hidden={userTurn || undefined}
        >
          {pad(s.counter + 1)} / {pad(total)}
        </span>
      </div>

      {/* Messages, anchored to the bottom. Announced to screen readers when the visitor is driving. */}
      <div className="mt-4 flex min-h-[300px] flex-col justify-end max-[359px]:min-h-[348px] sm:min-h-[284px]" aria-live={userTurn ? "polite" : undefined}>
        <AnimatePresence mode="wait" initial={false}>
          {s.sent && (
            <motion.div key={s.key} className="flex flex-col gap-3" exit={{ opacity: 0, transition: { duration: 0.25 } }}>
              <motion.div
                layout="position"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease }}
                className="ml-auto max-w-[85%] rounded-[16px_16px_4px_16px] bg-ink px-3.5 py-2.5 text-sm text-white"
              >
                {s.prompt}
              </motion.div>

              {s.cardVisible &&
                (card.kind === "message" ? (
                  <motion.p
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="mr-auto max-w-[85%] rounded-[16px_16px_16px_4px] border border-line bg-surface-sunken px-3.5 py-2.5 text-sm leading-relaxed text-ink"
                  >
                    {card.text}
                  </motion.p>
                ) : (
                  <motion.div initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
                    <PlanCard
                      title={card.kind === "plan" ? hero.planTitle : card.title}
                      rows={card.rows}
                      renderRow={(row, i, content) => (
                        <motion.div
                          key={row.label}
                          initial={false}
                          animate={i < s.rows ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                          transition={{ duration: reduceMotion ? 0 : 0.35, ease }}
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
                              {statusChip}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      }
                    />
                  </motion.div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input row */}
      {interactive ? (
        <form onSubmit={onSubmit} className="mt-4 flex items-center gap-2">
          <div className="relative flex h-11 min-w-0 flex-1 items-center rounded-input border border-line bg-surface-sunken text-sm text-ink focus-within:border-accent">
            <input
              ref={inputRef}
              id="chat-demo-input"
              type="text"
              autoComplete="off"
              aria-label={tryDemo.inputLabel}
              value={input}
              onChange={(e) => onType(e.target.value)}
              onFocus={onFocus}
              onBlur={() => setFocused(false)}
              className={`h-full w-full min-w-0 rounded-input bg-transparent px-3.5 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ${
                focused ? "" : "text-transparent caret-transparent"
              }`}
            />
            {/* While not focused, show the text with the blinking cursor (the automatic loop types here) */}
            {!focused && (
              <div ref={scrollRef} aria-hidden="true" className="pointer-events-none absolute inset-0 flex min-w-0 items-center overflow-hidden px-3.5">
                <span className="shrink-0 whitespace-pre">{input}</span>
                <span className="ml-px inline-block h-[18px] w-[1.5px] shrink-0 bg-ink motion-safe:animate-blink" />
              </div>
            )}
          </div>
          <button
            type="submit"
            aria-label="Send"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-ink text-white transition-colors hover:bg-ink-secondary"
          >
            <ArrowUpIcon className="h-5 w-5" />
          </button>
        </form>
      ) : (
        <div className="mt-4 flex items-center gap-2">
          <div className="flex h-11 min-w-0 flex-1 items-center rounded-input border border-line bg-surface-sunken px-3.5 text-sm text-ink">
            <div ref={scrollRef} className="flex min-w-0 items-center overflow-hidden">
              <span className="shrink-0 whitespace-pre">{input}</span>
              <span aria-hidden="true" className="ml-px inline-block h-[18px] w-[1.5px] shrink-0 bg-ink motion-safe:animate-blink" />
            </div>
          </div>
          <button
            type="button"
            aria-label="Send"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-pill bg-ink text-white transition-colors hover:bg-ink-secondary"
          >
            <ArrowUpIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );

  if (!interactive) return chatCard;

  return (
    <div>
      {chatCard}
      {/* "Try:" sample commands */}
      <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label={tryDemo.chipsLabel}>
        <span className="mr-1 text-[13px] font-medium text-ink-muted">{tryDemo.label}</span>
        {tryDemo.samples.map((ex) => (
          <button
            key={ex.prompt}
            type="button"
            onClick={() => onSample(ex)}
            className="rounded-pill border border-line bg-bg px-3 py-1.5 text-left text-[13px] text-ink transition-colors hover:border-accent hover:text-accent"
          >
            {ex.prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
