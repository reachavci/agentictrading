"use client";

import { useEffect, useState } from "react";
import { SITE_NAME, header } from "@/content/site";
import { CloseIcon, MenuIcon, ShieldCheckIcon } from "./icons";
import { primaryButton } from "./ui";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Blur + hairline once the page is scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the menu link whose section is in the middle of the screen
  useEffect(() => {
    const sections = header.nav
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = `#${e.target.id}`;
          if (e.isIntersecting) setActive(id);
          else setActive((prev) => (prev === id ? null : prev));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-30 border-b transition-colors duration-200 ${
        solid ? "border-line bg-bg/85 backdrop-blur-md" : "border-transparent bg-bg"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-3 px-5 max-[359px]:px-4 sm:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2 rounded-md text-[17px] font-semibold tracking-[-0.02em] text-ink max-[359px]:gap-1.5 max-[359px]:text-[15px]">
          <ShieldCheckIcon className="h-[22px] w-[22px] max-[359px]:h-5 max-[359px]:w-5" />
          <span>{SITE_NAME}</span>
        </a>

        <div className="flex items-center gap-2 max-[359px]:gap-1 md:gap-8">
          {/* Desktop links */}
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {header.nav.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "location" : undefined}
                      className={`rounded-md text-sm font-medium transition-colors ${
                        isActive ? "text-ink" : "text-ink-muted hover:text-ink"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <a href={header.ctaHref} className={`${primaryButton} h-10 whitespace-nowrap px-4 text-sm max-[359px]:px-3 max-[359px]:text-[13px]`}>
            {header.ctaLabel}
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill text-ink hover:bg-surface max-[359px]:w-9 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={header.menuLabel}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <nav
        id="mobile-menu"
        aria-label="Main"
        hidden={!open}
        className="border-t border-line bg-bg md:hidden"
      >
        <ul className="mx-auto max-w-[1200px] px-5 py-2 sm:px-8">
          {header.nav.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active === link.href ? "location" : undefined}
                className={`block rounded-md py-3 text-base font-medium ${
                  active === link.href ? "text-ink" : "text-ink-secondary"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
