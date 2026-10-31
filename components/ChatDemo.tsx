"use client";

import { chatExamples, hero } from "@/content/site";
import { ArrowUpIcon } from "./icons";
import PlanCard from "./PlanCard";
import StatusChip from "./StatusChip";

const pad = (n: number) => String(n).padStart(2, "0");

export default function ChatDemo() {
  const example = chatExamples[0];
  const total = chatExamples.length;

  return (
    <div className="w-full rounded-chat border border-line bg-surface p-4 text-left shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:p-5">
      {/* Top row */}
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
        <span>{hero.chatLabel}</span>
        <span aria-label={`Example 1 of ${total}`}>
          {pad(1)} / {pad(total)}
        </span>
      </div>

      {/* Messages, anchored to the bottom */}
      <div className="mt-4 flex min-h-[250px] flex-col justify-end gap-3">
        <div className="ml-auto max-w-[85%] rounded-[14px_14px_4px_14px] bg-bubble px-3.5 py-2.5 text-sm text-ink">
          {example.prompt}
        </div>
        <PlanCard
          title={hero.planTitle}
          rows={example.plan}
          footer={<StatusChip variant="approved" label={hero.statusApproved} />}
        />
      </div>

      {/* Input row (decorative) */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex h-11 min-w-0 flex-1 items-center rounded-input border border-line bg-surface-inset px-3.5 font-mono text-[13px] text-ink">
          <span className="truncate" />
          <span aria-hidden="true" className="ml-px inline-block h-4 w-[2px] shrink-0 bg-accent" />
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
