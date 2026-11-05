import { essayTeaser } from "@/content/site";
import { ArrowRightIcon } from "./icons";
import Reveal from "./Reveal";

/** Short teaser of the /why-agentic-trading essay, under the hero. */
export default function EssayTeaser() {
  return (
    <section aria-labelledby="essay-teaser-title" className="border-t border-line px-5 py-20 sm:px-8 sm:py-28">
      <Reveal className="mx-auto max-w-[720px] text-center">
        <h2 id="essay-teaser-title" className="text-[34px] font-semibold leading-[1.08] tracking-[-0.04em] text-ink [text-wrap:balance] sm:text-[48px]">
          {essayTeaser.title}
        </h2>
        <p className="mx-auto mt-6 max-w-[640px] text-lg leading-relaxed text-ink-muted [text-wrap:balance] sm:text-xl">{essayTeaser.text}</p>
        <a
          href={essayTeaser.linkHref}
          className="group mt-6 inline-flex items-center gap-1.5 rounded-md text-base font-medium text-accent transition-colors hover:text-accent-hover sm:text-lg"
        >
          {essayTeaser.linkLabel}
          <ArrowRightIcon className="h-4 w-4 motion-safe:transition-transform group-hover:translate-x-0.5" />
        </a>
      </Reveal>
    </section>
  );
}
