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
    <div className="rounded-input border border-line bg-surface-sunken p-4">
      <p className="mb-3 text-xs font-medium text-ink-muted">{title}</p>
      <dl className="divide-y divide-line">
        {rows.map((row, i) => {
          const content = (
            <div className="flex items-baseline justify-between gap-4 py-2">
              <dt className="shrink-0 text-[13px] text-ink-muted">{row.label}</dt>
              <dd className="text-right text-sm font-medium tabular-nums text-ink">{row.value}</dd>
            </div>
          );
          return renderRow ? renderRow(row, i, content) : <div key={row.label}>{content}</div>;
        })}
      </dl>
      <div className="mt-2 flex h-6 items-center">{footer}</div>
    </div>
  );
}
