import { statusLabels, type AgentStatus } from "@/content/site";

export type ChipVariant = AgentStatus | "approved";

const styles: Record<ChipVariant, { chip: string; dot: string }> = {
  active: { chip: "bg-status-active-bg text-status-active-fg", dot: "bg-status-active-fg" },
  approved: { chip: "bg-status-active-bg text-status-active-fg", dot: "bg-status-active-fg" },
  awaiting: { chip: "bg-status-awaiting-bg text-status-awaiting-fg", dot: "bg-status-awaiting-fg" },
  paused: { chip: "bg-status-paused-bg text-status-paused-fg", dot: "bg-status-paused-fg" },
  blocked: { chip: "bg-status-blocked-bg text-status-blocked-fg", dot: "bg-status-blocked-fg" },
};

type Props = {
  variant: ChipVariant;
  /** Overrides the default label (e.g. "Approved ✓"). */
  label?: string;
  className?: string;
};

export default function StatusChip({ variant, label, className = "" }: Props) {
  const text = label ?? (variant === "approved" ? "Approved" : statusLabels[variant]);
  const s = styles[variant];
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill py-1 pl-2 pr-2.5 text-xs font-medium leading-none ${s.chip} ${className}`}
    >
      {variant !== "approved" && <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />}
      {text}
    </span>
  );
}
