import { statusLabels, type AgentStatus } from "@/content/site";

export type ChipVariant = AgentStatus | "approved";

const styles: Record<ChipVariant, string> = {
  active: "bg-status-active-bg text-status-active-fg",
  approved: "bg-status-active-bg text-status-active-fg",
  awaiting: "bg-status-awaiting-bg text-status-awaiting-fg",
  paused: "bg-status-paused-bg text-status-paused-fg",
  blocked: "bg-status-blocked-bg text-status-blocked-fg",
};

type Props = {
  variant: ChipVariant;
  /** Overrides the default label (e.g. "Approved ✓"). */
  label?: string;
  className?: string;
};

export default function StatusChip({ variant, label, className = "" }: Props) {
  const text = label ?? (variant === "approved" ? "Approved" : statusLabels[variant]);
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-pill px-2.5 py-1 text-xs font-medium leading-none ${styles[variant]} ${className}`}
    >
      {text}
    </span>
  );
}
