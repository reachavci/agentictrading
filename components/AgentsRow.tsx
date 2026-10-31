import { agents, agentsSection } from "@/content/site";
import AgentCard from "./AgentCard";

export default function AgentsRow() {
  return (
    <section id="agents" aria-labelledby="agents-title" className="scroll-mt-16 border-t border-line py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1200px] gap-6 px-5 sm:px-8 lg:grid-cols-2 lg:items-end lg:gap-16">
        <div>
          <p className="text-sm font-medium text-ink-muted">{agentsSection.eyebrow}</p>
          <h2 id="agents-title" className="mt-4 text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] text-ink sm:text-[48px]">
            {agentsSection.title}
          </h2>
        </div>
        <p className="max-w-[42ch] text-lg leading-relaxed text-ink-secondary lg:justify-self-end">{agentsSection.text}</p>
      </div>

      {/* Moving strip (normal motion). The list is rendered twice for a seamless loop. */}
      <div className="group relative mt-14 overflow-hidden motion-reduce:hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex" aria-hidden={copy === 1 ? true : undefined}>
              {agents.map((agent) => (
                <li key={agent.name} className="w-[320px] shrink-0 pr-4">
                  <AgentCard agent={agent} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Static grid (reduced motion) */}
      <ul className="mx-auto mt-14 hidden max-w-[1200px] grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 px-5 motion-reduce:grid sm:px-8">
        {agents.map((agent) => (
          <li key={agent.name}>
            <AgentCard agent={agent} />
          </li>
        ))}
      </ul>
    </section>
  );
}
