import type { PlanRow } from "@/content/site";

type Props = {
  title: string;
  rows: PlanRow[];
  /** Rendered under the rows (the status chip). */
  footer?: React.ReactNode;
  /** Optional wrapper for each row, so the animated version can fade rows in. */
  renderRow?: (row: PlanRow, index: number, content: React.ReactNode) => React.ReactNode;
};

export default function PlanCard({ title, rows, footer, renderRow }: Props) {
  return (
    <div className="rounded-input border border-line-strong bg-surface-inset p-4">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">{title}</p>
      <dl className="space-y-2">
        {rows.map((row, i) => {
          const content = (
            <div className="flex items-baseline justify-between gap-4">
              <dt className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">{row.label}</dt>
              <dd className="text-right text-sm text-ink">{row.value}</dd>
            </div>
          );
          return renderRow ? renderRow(row, i, content) : <div key={row.label}>{content}</div>;
        })}
      </dl>
      <div className="mt-3 flex h-6 items-center">{footer}</div>
    </div>
  );
}
