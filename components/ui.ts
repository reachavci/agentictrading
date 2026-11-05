/** Shared class names so every primary button looks identical. */
// Solid blue in every state; `print-color-adjust: exact` keeps the blue background when printed
// (browsers drop background colours in print by default).
export const primaryButton =
  "inline-flex items-center justify-center rounded-pill bg-accent font-medium text-white shadow-[0_1px_2px_rgba(11,18,32,0.08)] transition-colors [-webkit-print-color-adjust:exact] [print-color-adjust:exact] visited:text-white hover:bg-accent-hover hover:text-white focus-visible:text-white active:bg-accent-hover";

/** Soft secondary button: light blue background, blue text. */
export const softButton =
  "inline-flex items-center justify-center gap-1.5 rounded-pill bg-accent-soft font-medium text-accent transition-colors hover:bg-accent-soft-hover hover:text-accent-hover";

/** Shared card system used by Volume, How it works and Capabilities. */
export const card = {
  grid: "mx-auto mt-10 max-w-[1200px] px-5 sm:px-8",
  item: "flex flex-col rounded-card bg-surface p-6",
  label: "text-[28px] font-semibold leading-[1.1] tracking-[-0.03em] text-accent [text-wrap:balance] lg:text-[30px]",
  chip: "mt-5 rounded-input border border-line bg-bg px-3.5 py-2.5 font-mono text-[13px] leading-relaxed text-ink",
  text: "mt-4 text-[15px] leading-relaxed text-ink-secondary",
  section: "scroll-mt-16 border-t border-line py-16 sm:py-20",
};
