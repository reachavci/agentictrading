"use client";

import { useRef, useState } from "react";
import { faq } from "@/content/site";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

/**
 * Accordion: one answer open at a time, first one open on load.
 * Questions are real buttons (Enter/Space toggle); Up/Down/Home/End move between them.
 * Closed answers stay in the HTML (hidden from screen readers and keyboard via `inert`).
 */
export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    const last = faq.items.length - 1;
    const target =
      e.key === "ArrowDown" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowUp" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (target === null) return;
    e.preventDefault();
    buttons.current[target]?.focus();
  }

  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-16 border-t border-line py-16 sm:py-20">
      <SectionHeader id="faq-title" eyebrow={faq.eyebrow} title={faq.title} />

      <Reveal className="mx-auto mt-10 max-w-[1200px] px-5 sm:px-8" delay={0.08}>
        <ul className="max-w-[800px] border-t border-line">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-line">
                <h3>
                  <button
                    ref={(el) => {
                      buttons.current[i] = el;
                    }}
                    id={`faq-q-${i}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className="flex w-full items-center justify-between gap-6 rounded-md py-5 text-left text-lg font-semibold tracking-[-0.02em] text-ink"
                  >
                    {item.q}
                    <span aria-hidden="true" className="relative h-4 w-4 shrink-0 text-ink-muted">
                      <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 rounded bg-current" />
                      <span
                        className={`absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 rounded bg-current motion-safe:transition-transform motion-safe:duration-300 ${
                          isOpen ? "scale-y-0" : "scale-y-100"
                        }`}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  inert={!isOpen}
                  className={`grid motion-safe:transition-[grid-template-rows] motion-safe:duration-300 motion-safe:ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[60ch] pb-5 text-[15px] leading-relaxed text-ink-secondary">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
