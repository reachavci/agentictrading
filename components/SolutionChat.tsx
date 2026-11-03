"use client";

import type { ChipTone } from "@/content/site";
import { Caret, TYPE_MS, useTyped } from "./motion/useTyped";
import { useSequence } from "./motion/useSequence";
import StatusChip, { type ChipVariant } from "./StatusChip";

const TONE: Record<ChipTone, ChipVariant> = { awaiting: "awaiting", neutral: "paused", approved: "approved" };

type Props = { request: string; chip: string; chipTone: ChipTone; delay: number };

/** Mini chat preview: the request types out in a bubble, then a plan chip appears (decorative). */
export default function SolutionChat({ request, chip, chipTone, delay }: Props) {
  const { ref, step, running, reduce } = useSequence(
    [500, request.length * TYPE_MS + 500, 2600, 400], // empty, typing, chip (final), fade
    { delay, finalStep: 2 },
  );
  const typed = useTyped(request, step >= 1, running, reduce);
  const visible = step !== 3;

  return (
    <div aria-hidden="true" ref={ref} className="flex h-[104px] flex-col justify-end gap-2 rounded-input border border-line bg-bg p-3">
      <div className={`flex flex-col gap-2 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>
        <div
          className={`ml-auto max-w-[90%] rounded-[14px_14px_4px_14px] bg-ink px-3 py-1.5 text-[13px] text-white transition-opacity duration-200 ${
            typed.length > 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          {typed || " "}
          {step === 1 && <Caret className="bg-white" />}
        </div>
        <span className={`transition-[opacity,transform] duration-300 ${step === 2 ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}>
          <StatusChip variant={TONE[chipTone]} label={chip} />
        </span>
      </div>
    </div>
  );
}
