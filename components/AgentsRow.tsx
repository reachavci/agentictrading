import { agents, agentsSection } from "@/content/site";
import AgentCard from "./AgentCard";

export default function AgentsRow() {
  return (
    <section aria-labelledby="agents-title" className="border-t border-line-divider py-24 sm:py-28">
      <div className="mx-auto max-w-[680px] px-5 text-center sm:px-8">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-accent">{agentsSection.eyebrow}</p>
        <h2 id="agents-title" className="mt-4 text-[30px] font-bold leading-tight tracking-[-0.025em] text-ink [text-wrap:balance] sm:text-[40px]">
          {agentsSection.title}
        </h2>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-secondary [text-wrap:balance]">{agentsSection.text}</p>
      </div>

      {/* Moving strip (normal motion). The list is rendered twice for a seamless loop. */}
      <div
        className="group relative mt-14 overflow-hidden motion-reduce:hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex" aria-hidden={copy === 1 ? true : undefined}>
              {agents.map((agent) => (
                <li key={agent.name} className="w-[300px] shrink-0 pr-4">
                  <AgentCard agent={agent} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Static grid (reduced motion) */}
      <ul className="mx-auto mt-14 hidden max-w-6xl grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 px-5 motion-reduce:grid sm:px-8">
        {agents.map((agent) => (
          <li key={agent.name}>
            <AgentCard agent={agent} />
          </li>
        ))}
      </ul>
    </section>
  );
}
