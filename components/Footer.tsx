import { SITE_NAME, footer, header } from "@/content/site";
import { ShieldCheckIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 py-10 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em] text-ink">
            <ShieldCheckIcon className="h-5 w-5" />
            {SITE_NAME}
          </p>
          <p className="mt-2 text-sm text-ink-muted">{footer.tagline}</p>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {footer.nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="rounded-md text-ink-muted transition-colors hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={header.ctaHref} className="rounded-md font-medium text-ink transition-colors hover:text-ink-secondary">
                  {header.ctaLabel}
                </a>
              </li>
            </ul>
          </nav>
          <p className="text-sm text-ink-muted">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
