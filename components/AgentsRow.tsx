"use client";

import { agents, agentsSection } from "@/content/site";
import AgentCard from "./AgentCard";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

export default function AgentsRow() {
  const reduce = useReducedMotionSafe();
  // The page HTML contains the 8 cards once. For the endless scroll, a second,
  // aria-hidden copy is added in the browser only. With reduce motion: a static grid.
  const marquee = reduce !== true;
  const animate = reduce === false;

  return (
    <section id="agents" aria-labelledby="agents-title" className="scroll-mt-16 border-t border-line py-16 sm:py-20">
      <SectionHeader id="agents-title" eyebrow={agentsSection.eyebrow} title={agentsSection.title} text={agentsSection.text} />

      <Reveal delay={0.08}>
        {marquee ? (
          <div className="group relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
            <div className={`flex w-max ${animate ? "animate-marquee group-hover:[animation-play-state:paused]" : ""}`}>
              <ul className="flex">
                {agents.map((agent) => (
                  <li key={agent.name} className="w-[320px] shrink-0 pr-4">
                    <AgentCard agent={agent} />
                  </li>
                ))}
              </ul>
              {animate && (
                <ul className="flex" aria-hidden="true">
                  {agents.map((agent) => (
                    <li key={agent.name} className="w-[320px] shrink-0 pr-4">
                      <AgentCard agent={agent} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <ul className="mx-auto mt-10 grid max-w-[1200px] grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 px-5 sm:px-8">
            {agents.map((agent) => (
              <li key={agent.name}>
                <AgentCard agent={agent} />
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </section>
  );
}
