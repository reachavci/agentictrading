import { agentsSection, type Agent } from "@/content/site";
import StatusChip from "./StatusChip";

export default function AgentCard({ agent, className = "" }: { agent: Agent; className?: string }) {
  return (
    <article className={`flex h-full flex-col rounded-card bg-surface p-6 text-left ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-ink-muted">{agentsSection.cardLabel}</span>
        <StatusChip variant={agent.status} />
      </div>
      <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-ink">{agent.name}</h3>
      <p className="mb-6 mt-1.5 text-[15px] leading-relaxed text-ink-secondary">{agent.description}</p>
      <p className="mt-auto border-t border-line-strong/60 pt-4 font-mono text-xs text-ink-muted">{agent.meta}</p>
    </article>
  );
}
