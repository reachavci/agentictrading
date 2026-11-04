"use client";

import { security, type SecurityVisual } from "@/content/site";
import { useSequence } from "./motion/useSequence";
import StatusChip from "./StatusChip";

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

/** An unusual amount asks for confirmation; a manipulation attempt is struck through and blocked. */
function Alert({ delay }: Props) {
  // empty, amount, Confirm?, attempt, struck + Blocked (final), fade
  const { ref, step } = useSequence([500, 600, 900, 800, 2200, 400], { delay, finalStep: 4 });
  const on = (from: number) => step >= from && step <= 4;
  return (
    <div ref={ref} className="flex w-full flex-col gap-2">
      <div className={`flex items-center justify-between gap-2 ${fade(on(1))}`}>
        <span className="whitespace-nowrap font-mono text-[11px] text-ink">{v.unusualAmount}</span>
        <span className={`shrink-0 ${fade(on(2))}`}>
          <StatusChip variant="awaiting" label={v.confirm} />
        </span>
      </div>
      <div className={`flex items-start justify-between gap-2 ${fade(on(3))}`}>
        <span
          className={`min-w-0 font-mono text-[11px] leading-snug line-through transition-[text-decoration-color,color] duration-500 ${
            on(4) ? "text-ink-muted decoration-status-blocked-fg" : "text-ink decoration-transparent"
          }`}
        >
          &quot;{v.attempt}&quot;
        </span>
        <span className={`shrink-0 ${fade(on(4))}`}>
          <StatusChip variant="blocked" label={v.blocked} />
        </span>
      </div>
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
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-[0_1px_2px_rgba(11,18,32,0.2)] transition-transform duration-300 ${
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
  limits: Limits,
  alert: Alert,
  record: Log,
  stop: Stop,
};

/** The small looping animation shown at the top of a security card (decorative). */
export default function SecurityVisualStage({ visual, delay }: { visual: SecurityVisual; delay: number }) {
  const V = VISUALS[visual];
  return (
    <div aria-hidden="true" className="flex h-[88px] items-center overflow-hidden rounded-input border border-line bg-bg px-4">
      <V delay={delay} />
    </div>
  );
}
