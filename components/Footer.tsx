import { SITE_NAME, footer, header } from "@/content/site";
import { ShieldCheckIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em] text-ink">
            <ShieldCheckIcon className="h-5 w-5" />
            {SITE_NAME}
          </p>
          <p className="mt-2 text-sm text-ink-muted">{footer.tagline}</p>
        </div>
        <div className="flex items-center gap-6 text-sm text-ink-muted">
          <a href={header.ctaHref} className="rounded-md font-medium text-ink hover:text-ink-secondary">
            {header.ctaLabel}
          </a>
          <span>{footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
