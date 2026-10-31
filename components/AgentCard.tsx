import { agentsSection, type Agent } from "@/content/site";
import StatusChip from "./StatusChip";

export default function AgentCard({ agent, className = "" }: { agent: Agent; className?: string }) {
  return (
    <article className={`flex h-full flex-col rounded-card border border-line bg-surface-card p-5 text-left ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">{agentsSection.cardLabel}</span>
        <StatusChip variant={agent.status} />
      </div>
      <h3 className="mt-4 text-[17px] font-semibold tracking-tight text-ink">{agent.name}</h3>
      <p className="mb-4 mt-1.5 text-sm leading-relaxed text-ink-secondary">{agent.description}</p>
      <p className="mt-auto border-t border-line-soft pt-3 font-mono text-[11.5px] text-ink-muted">
        {agent.meta}
      </p>
    </article>
  );
}
