"use client";

import { useEffect, useState } from "react";
import { SITE_NAME, header } from "@/content/site";
import { ShieldCheckIcon } from "./icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 border-b bg-bg/85 backdrop-blur-md transition-colors duration-200 ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2 rounded-md text-[17px] font-semibold tracking-[-0.02em] text-ink">
          <ShieldCheckIcon className="h-[22px] w-[22px]" />
          <span>{SITE_NAME}</span>
        </a>
        <a
          href={header.ctaHref}
          className="inline-flex h-10 items-center rounded-pill bg-ink px-4 text-sm font-medium text-white transition-colors hover:bg-ink-secondary"
        >
          {header.ctaLabel}
        </a>
      </div>
    </header>
  );
}
