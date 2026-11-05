"use client";

import { howItWorks } from "@/content/site";
import FadeCard from "./FadeCard";
import SectionHeader from "./SectionHeader";
import { card } from "./ui";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

const APPROVED_CHIP = "border-status-active-fg/25 bg-status-active-bg text-status-active-fg";

export default function HowItWorks() {
  const reduce = useReducedMotionSafe();
  return (
    <section id="how-it-works" aria-labelledby="how-title" className={card.section}>
      <SectionHeader id="how-title" eyebrow={howItWorks.eyebrow} title={howItWorks.title} text={howItWorks.text} />
      <div className={card.grid}>
        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {howItWorks.steps.map((step, i) => (
            <FadeCard key={step.label} index={i} reduce={reduce}>
              {() => (
                <>
                  <h3 className={card.label}>{step.label}</h3>
                  <p className={`${card.chip} ${step.chipTone === "approved" ? APPROVED_CHIP : ""}`}>{step.chip}</p>
                  <p className={card.text}>{step.text}</p>
                </>
              )}
            </FadeCard>
          ))}
        </ol>
      </div>
    </section>
  );
}
