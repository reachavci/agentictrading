"use client";

import { security } from "@/content/site";
import { Caret, TYPE_MS, useTyped } from "./motion/useTyped";
import { useSequence } from "./motion/useSequence";
import StatusChip from "./StatusChip";

const f = security.featured;

// Steps of the loop (ms). Step 6 is the finished state (all lit) shown for reduced motion.
const STEPS = [
  700, // 0  reset, all dim
  f.example.length * TYPE_MS + 700, // 1  "AI plans" lights up, example types out
  800, // 2  dot travels to "User approves"
  1200, // 3  "User approves" lights up, chip: Awaiting approval
  1000, // 4  chip: Approved
  800, // 5  dot travels to "Rules execute"
  2600, // 6  "Rules execute" lights up: Order sent (hold)
  600, // 7  fade back
];
const FINAL = 6;

// Lit style per step; dim style is shared.
const LIT = [
  "bg-surface text-ink ring-1 ring-line-strong",
  "bg-accent-soft text-accent ring-1 ring-accent/30",
  "bg-ink text-white",
];
const DIM = "bg-surface text-ink-muted";

function Connector({ lit, moving, arrived }: { lit: boolean; moving: boolean; arrived: boolean }) {
  return (
    <span aria-hidden="true" className="relative my-2 h-8 w-px shrink-0 md:mx-3 md:my-0 md:mt-6 md:h-px md:w-14 lg:mt-7 lg:w-20">
      <span className={`absolute inset-0 transition-colors duration-500 ${lit ? "bg-accent/60" : "bg-line-strong"}`} />
      {/* Travelling dot */}
      <span
        className={`absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(37,99,235,0.18)] transition-[left,top,opacity] duration-700 ease-in-out ${
          arrived ? "left-1/2 top-full md:left-full md:top-1/2" : "left-1/2 top-0 md:left-0 md:top-1/2"
        } ${moving ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  );
}

export default function SecurityFlow() {
  const { ref, step, running, reduce } = useSequence<HTMLOListElement>(STEPS, { finalStep: FINAL });
  const typed = useTyped(f.example, step >= 1, running, reduce);

  const on = (from: number, to = FINAL) => step >= from && step <= to;
  const lit = [on(1), on(3), on(6)];

  // What appears under each step
  const details = [
    <span key="plan" className={`inline-flex items-center font-mono text-xs text-ink-secondary transition-opacity duration-500 ${on(1) ? "opacity-100" : "opacity-0"}`}>
      {typed}
      {step === 1 && <Caret />}
    </span>,
    <span key="approve" className={`transition-opacity duration-500 ${on(3) ? "opacity-100" : "opacity-0"}`}>
      {step >= 4 ? <StatusChip variant="approved" label={f.approved} /> : <StatusChip variant="awaiting" label={f.awaiting} />}
    </span>,
    <span key="exec" className={`font-mono text-xs font-medium text-ink transition-opacity duration-500 ${on(6) ? "opacity-100" : "opacity-0"}`}>
      {f.result}
    </span>,
  ];

  return (
    <ol ref={ref} className="flex flex-col items-center md:flex-row md:items-start">
      {f.flow.map((label, i) => (
        <li key={label} className="flex flex-col items-center md:flex-row md:items-start">
          {i > 0 && <Connector lit={i === 1 ? on(3) : on(6)} moving={step === (i === 1 ? 2 : 5)} arrived={step >= (i === 1 ? 2 : 5) && step <= FINAL} />}
          <div className="flex flex-col items-center">
            <span
              className={`inline-flex h-12 items-center whitespace-nowrap rounded-pill px-6 font-mono text-base font-medium transition-[background-color,color,box-shadow] duration-500 lg:h-14 lg:px-7 lg:text-lg ${
                lit[i] ? LIT[i] : DIM
              }`}
            >
              {label}
            </span>
            {/* Animated detail (decorative) */}
            <span aria-hidden="true" className="mt-3 flex h-7 items-center">
              {details[i]}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}
