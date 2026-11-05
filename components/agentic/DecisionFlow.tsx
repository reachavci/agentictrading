"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { decisionFlow } from "@/content/agentic-trading";
import { useSequence } from "../motion/useSequence";
import StatusChip from "../StatusChip";

type Pt = { x: number; y: number };
const TONE_RING = {
  active: "border-status-active-fg/50 bg-status-active-bg/40",
  awaiting: "border-status-awaiting-fg/50 bg-status-awaiting-bg/40",
  blocked: "border-status-blocked-fg/50 bg-status-blocked-bg/40",
} as const;

// Dot travels along the connector lines only (never over node text):
// 0 below request → 1 top of "Check limits" (lit) → 2 hop to its bottom (hidden) → 3 split line
// → 4 above the branch column → 5 top of the branch (lit) → 6 hold → 7 fade.
const STEPS = [600, 650, 250, 400, 450, 450, 1500, 400];
const FINAL = 6;

/**
 * Flowchart: Request → Check limits → three branches. A dot travels the path and the
 * branches take turns. Reduce motion: no dot, all three branches shown. Decorative.
 */
export default function DecisionFlow() {
  const { ref, step, reduce } = useSequence<HTMLDivElement>(STEPS, { finalStep: FINAL });
  const req = useRef<HTMLDivElement>(null);
  const check = useRef<HTMLDivElement>(null);
  const split = useRef<HTMLDivElement>(null);
  const branchEls = useRef<(HTMLDivElement | null)[]>([]);
  const [pts, setPts] = useState<{ reqBottom: Pt; checkTop: Pt; checkBottom: Pt; split: number; branchTops: Pt[] } | null>(null);
  const [branch, setBranch] = useState(0);
  const prevStep = useRef(step);

  // Next branch each time the loop starts again.
  useEffect(() => {
    if (step === 0 && prevStep.current !== 0) setBranch((b) => (b + 1) % decisionFlow.branches.length);
    prevStep.current = step;
  }, [step]);

  // Measure node centres so the dot follows the real layout at any width.
  useLayoutEffect(() => {
    const box = ref.current;
    if (!box) return;
    const measure = () => {
      const o = box.getBoundingClientRect();
      const edge = (el: Element | null, side: "top" | "bottom"): Pt => {
        const r = el!.getBoundingClientRect();
        return { x: r.left - o.left + r.width / 2, y: (side === "top" ? r.top : r.bottom) - o.top };
      };
      setPts({
        reqBottom: edge(req.current, "bottom"),
        checkTop: edge(check.current, "top"),
        checkBottom: edge(check.current, "bottom"),
        split: split.current!.getBoundingClientRect().top - o.top,
        branchTops: branchEls.current.map((el) => edge(el, "top")),
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    return () => ro.disconnect();
  }, [ref]);

  const dot: Pt | null = pts
    ? [
        pts.reqBottom,
        pts.checkTop,
        pts.checkBottom,
        { x: pts.checkBottom.x, y: pts.split },
        { x: pts.branchTops[branch].x, y: pts.split },
        pts.branchTops[branch],
        pts.branchTops[branch],
        pts.branchTops[branch],
      ][step]
    : null;
  const dotVisible = step !== 2 && step !== 7;
  const nodeOn = (on: boolean) =>
    `rounded-input border bg-bg px-3 py-2 text-center text-xs font-medium text-ink transition-[border-color,box-shadow] duration-300 ${
      on ? "border-accent shadow-[0_0_0_3px_rgba(37,99,235,0.12)]" : "border-line"
    }`;

  return (
    <div ref={ref} aria-hidden="true" className="relative mx-auto w-full max-w-[520px] py-2">
      <div className="flex flex-col items-center">
        <div ref={req} className={nodeOn(!reduce && step === 0)}>
          <span className="font-mono">{decisionFlow.request}</span>
        </div>
        <span className="h-6 w-px bg-line-strong" />
        <div ref={check} className={nodeOn(!reduce && step >= 1 && step <= 3)}>
          {decisionFlow.check}
        </div>
        <span className="h-5 w-px bg-line-strong" />
      </div>

      {/* Split into three branches */}
      <div ref={split} className="relative grid grid-cols-3 gap-2 sm:gap-3">
        <span className="absolute left-[16.66%] right-[16.66%] top-0 h-px bg-line-strong" />
        {decisionFlow.branches.map((b, i) => {
          const on = reduce || ((step === 5 || step === 6) && branch === i);
          return (
            <div key={b.action} className="flex flex-col items-center">
              <span className="h-5 w-px bg-line-strong" />
              <div
                ref={(el) => {
                  branchEls.current[i] = el;
                }}
                className={`flex w-full flex-col items-center gap-2 rounded-input border bg-bg px-2 py-3 text-center transition-colors duration-300 ${
                  on ? TONE_RING[b.tone] : "border-line"
                }`}
              >
                <span className="text-[11px] leading-snug text-ink-muted">{b.condition}</span>
                <StatusChip variant={b.tone} label={b.action} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Travelling dot */}
      {dot && !reduce && (
        <span
          className={`pointer-events-none absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(37,99,235,0.2)] ${
            step === 0 || step === 2 ? "" : "transition-[left,top,opacity] duration-500 ease-in-out"
          } ${dotVisible ? "opacity-100" : "opacity-0"}`}
          style={{ left: dot.x, top: dot.y }}
        />
      )}
    </div>
  );
}
