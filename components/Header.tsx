import { SITE_NAME, header } from "@/content/site";
import { ShieldCheckIcon } from "./icons";

export default function Header() {
  return (
    <header className="relative z-20">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5 rounded-md text-[17px] font-semibold tracking-tight text-ink">
          <ShieldCheckIcon className="h-6 w-6 text-accent" />
          <span>{SITE_NAME}</span>
        </a>
        <a
          href={header.ctaHref}
          className="rounded-pill border border-line-strong px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
        >
          {header.ctaLabel}
        </a>
      </div>
    </header>
  );
}
