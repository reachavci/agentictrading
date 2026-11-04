import { whyNow } from "@/content/site";
import Reveal from "./Reveal";

/** Short "why now" statement between the hero and How it works. */
export default function WhyNow() {
  return (
    <section aria-labelledby="why-now-title" className="border-t border-line px-5 py-20 sm:px-8 sm:py-28">
      <Reveal className="mx-auto max-w-[760px] text-center">
        <h2 id="why-now-title" className="text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] text-ink sm:text-[48px]">
          {whyNow.title}
        </h2>
        <p className="mx-auto mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-secondary [text-wrap:pretty] sm:text-xl">
          <span className="font-medium text-ink">{whyNow.lead}</span> {whyNow.text}
        </p>
        {/* TODO: add a "Read why →" link here, to the essay "From attention to intent" once it's published. */}
      </Reveal>
    </section>
  );
}
