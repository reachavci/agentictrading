"use client";

import { security, type SecurityVisual } from "@/content/site";
import { Caret, TYPE_MS, useTyped } from "./motion/useTyped";
import { useSequence } from "./motion/useSequence";
import StatusChip from "./StatusChip";
import { primaryButton } from "./ui";

const v = security.visuals;
type Props = { delay: number };
const fade = (show: boolean) => `transition-opacity duration-500 ${show ? "opacity-100" : "opacity-0"}`;

/** Read-only balance; an attempted edit appears, gets struck through and rejected. */
function Data({ delay }: Props) {
  const { ref, step } = useSequence([900, 900, 2200, 400], { delay, finalStep: 2 });
  const attempt = step >= 1 && step <= 2;
  const rejected = step === 2;
  return (
    <div ref={ref} className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="whitespace-nowrap font-mono text-xs font-medium text-ink">{v.balance}</span>
        <span
          className={`flex items-center gap-1 whitespace-nowrap text-[11px] font-medium transition-colors duration-300 ${
            rejected ? "text-ink" : "text-ink-muted"
          }`}
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          {v.readOnly}
        </span>
      </div>
      <div className={`flex items-center gap-2 transition-opacity duration-500 ${attempt ? "opacity-100" : "opacity-0"}`}>
        <span
          className={`whitespace-nowrap font-mono text-[11px] line-through transition-[text-decoration-color,color] duration-500 ${
            rejected ? "text-ink-muted decoration-status-blocked-fg" : "text-ink decoration-transparent"
          }`}
        >
          {v.editAttempt}
        </span>
        <span className={fade(rejected)}>
          <StatusChip variant="blocked" label={v.rejected} />
        </span>
      </div>
    </div>
  );
}

/** A small order passes within limits; a larger one stops for approval. */
function Autonomy({ delay }: Props) {
  const { ref, step } = useSequence([500, 500, 900, 600, 2200, 400], { delay, finalStep: 4 });
  const on = (from: number) => step >= from && step <= 4;
  const row = (show: boolean) =>
    `flex items-center justify-between gap-2 transition-[opacity,transform] duration-300 ${show ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`;
  return (
    <div ref={ref} className="flex w-full flex-col gap-2">
      <div className={row(on(1))}>
        <span className="whitespace-nowrap font-mono text-[11px] text-ink">{v.smallOrder}</span>
        <span className={fade(on(2))}>
          <StatusChip variant="approved" label={v.withinLimits} />
        </span>
      </div>
      <div className={row(on(3))}>
        <span className="whitespace-nowrap font-mono text-[11px] text-ink">{v.largeOrder}</span>
        <span className={fade(on(4))}>
          <StatusChip variant="awaiting" label={v.needsApproval} />
        </span>
      </div>
    </div>
  );
}

/** ID line typing out. */
function Identity({ delay }: Props) {
  const { ref, step, running, reduce } = useSequence([500, v.identity.length * TYPE_MS + 2400, 400], { delay, finalStep: 1 });
  const typed = useTyped(v.identity, step >= 1, running, reduce);
  return (
    <div ref={ref} className={fade(step !== 2)}>
      <span className="inline-flex h-7 items-center whitespace-nowrap rounded-pill bg-surface px-3 font-mono text-[11px] text-ink">
        {typed}
        {step === 1 && <Caret />}
      </span>
    </div>
  );
}

/** Approve button gets pressed, then a check appears. */
function Approval({ delay }: Props) {
  const { ref, step } = useSequence([1000, 220, 2200, 400], { delay, finalStep: 2 });
  const pressed = step === 1;
  return (
    <div ref={ref} className="flex items-center gap-3">
      <span
        className={`${primaryButton} h-8 px-4 text-xs transition-transform duration-150 ${pressed ? "scale-95 bg-accent-hover" : "scale-100"}`}
      >
        {v.approveButton}
      </span>
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full bg-status-active-bg text-status-active-fg transition-[opacity,transform] duration-300 ${
          step === 2 ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      </span>
    </div>
  );
}

/** Bar fills toward the cap and stops exactly at the line. */
const CAP = 78; // % of the bar where the cap line sits
function Limits({ delay }: Props) {
  const { ref, step } = useSequence([600, 3400, 400], { delay, finalStep: 1 });
  const filled = step >= 1;
  return (
    <div ref={ref} className="w-full">
      <div className="relative h-5">
        <span className="absolute bottom-1 font-mono text-[11px] text-ink-muted" style={{ right: `${100 - CAP}%` }}>
          {v.limitCap}
        </span>
      </div>
      <div className="relative h-2 w-full rounded-pill bg-surface">
        <span
          className={`absolute inset-y-0 left-0 rounded-pill bg-ink ${step === 1 ? "transition-[width] duration-[1600ms] ease-out" : "transition-opacity duration-300"} ${
            step === 2 ? "opacity-0" : "opacity-100"
          }`}
          style={{ width: filled ? `${CAP}%` : "0%" }}
        />
        <span className="absolute -inset-y-1.5 w-px bg-ink" style={{ left: `${CAP}%` }} />
      </div>
    </div>
  );
}

/** Instruction appears, gets struck through, "Blocked" chip appears. */
function Alert({ delay }: Props) {
  const { ref, step } = useSequence([500, 900, 600, 2200, 400], { delay, finalStep: 3 });
  const shown = step >= 1 && step <= 3;
  return (
    <div ref={ref} className="flex flex-col items-start gap-2">
      <span
        className={`font-mono text-[11px] leading-snug line-through transition-[opacity,text-decoration-color,color] duration-500 ${
          step >= 2 && step <= 3 ? "text-ink-muted decoration-status-blocked-fg" : "text-ink decoration-transparent"
        } ${shown ? "opacity-100" : "opacity-0"}`}
      >
        &quot;{v.attempt}&quot;
      </span>
      <span className={fade(step === 3)}>
        <StatusChip variant="blocked" label={v.blocked} />
      </span>
    </div>
  );
}

/** Log lines appear one by one. */
function Log({ delay }: Props) {
  const { ref, step } = useSequence<HTMLUListElement>([500, 600, 600, 2200, 400], { delay, finalStep: 3 });
  return (
    <ul ref={ref} className="flex flex-col gap-1">
      {v.log.map((line, i) => {
        const show = step >= i + 1 && step <= 3;
        return (
          <li
            key={line}
            className={`flex items-center gap-2 font-mono text-xs text-ink transition-[opacity,transform] duration-300 ${
              show ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ink-muted" />
            {line}
          </li>
        );
      })}
    </ul>
  );
}

/** Toggle switches from Active to Paused. */
function Stop({ delay }: Props) {
  const { ref, step } = useSequence([1600, 2400], { delay, finalStep: 1 });
  const paused = step === 1;
  return (
    <div ref={ref} className="flex items-center gap-3">
      <span className={`relative h-6 w-10 rounded-pill transition-colors duration-300 ${paused ? "bg-line-strong" : "bg-status-live"}`}>
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_1px_2px_rgba(10,10,11,0.2)] transition-transform duration-300 ${
            paused ? "translate-x-0" : "translate-x-4"
          }`}
        />
      </span>
      {paused ? <StatusChip variant="paused" label={v.toggleOff} /> : <StatusChip variant="active" label={v.toggleOn} />}
    </div>
  );
}

const VISUALS: Record<SecurityVisual, (p: Props) => React.JSX.Element> = {
  data: Data,
  autonomy: Autonomy,
  identity: Identity,
  approval: Approval,
  limits: Limits,
  alert: Alert,
  record: Log,
  stop: Stop,
};

/** The small looping animation shown at the top of a security card (decorative). */
export default function SecurityVisualStage({ visual, delay }: { visual: SecurityVisual; delay: number }) {
  const V = VISUALS[visual];
  return (
    <div aria-hidden="true" className="flex h-[88px] items-center overflow-hidden rounded-input border border-line bg-bg px-4 xl:px-3">
      <V delay={delay} />
    </div>
  );
}
