import Reveal from "./Reveal";

type Props = { id: string; eyebrow: string; title: string; text?: string };

/** Eyebrow + H2 on the left, optional intro text on the right (desktop). */
export default function SectionHeader({ id, eyebrow, title, text }: Props) {
  return (
    <Reveal className="mx-auto grid max-w-[1200px] gap-6 px-5 sm:px-8 lg:grid-cols-2 lg:items-end lg:gap-16">
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-accent">{eyebrow}</p>
        <h2 id={id} className="mt-4 text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] text-ink sm:text-[48px]">
          {title}
        </h2>
      </div>
      {text && <p className="max-w-[42ch] text-lg leading-relaxed text-ink-secondary [text-wrap:balance] lg:justify-self-end">{text}</p>}
    </Reveal>
  );
}
