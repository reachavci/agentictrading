"use client";

import { useState } from "react";
import { DEMO_EMAIL, demo } from "@/content/site";
import { primaryButton } from "./ui";

type Field = keyof typeof demo.fields;
const FIELDS: { key: Field; type: string; autoComplete: string }[] = [
  { key: "name", type: "text", autoComplete: "name" },
  { key: "company", type: "text", autoComplete: "organization" },
  { key: "role", type: "text", autoComplete: "organization-title" },
  { key: "email", type: "email", autoComplete: "email" },
];

/**
 * No backend yet: submitting opens the visitor's email app with the details filled in.
 * TODO: replace with a real form service (e.g. Formspree, HubSpot) and remove the mailto.
 */
export default function DemoForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = FIELDS.map(({ key }) => `${demo.fields[key].label}: ${String(data.get(key) ?? "").trim()}`);
    const href =
      `mailto:${DEMO_EMAIL}` +
      `?subject=${encodeURIComponent(`${demo.emailSubject}: ${String(data.get("company") ?? "").trim()}`)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = href;
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="rounded-panel bg-surface p-6 sm:p-8">
        <p className="text-lg font-semibold tracking-[-0.02em] text-ink">{demo.confirmTitle}</p>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-secondary">{demo.confirmText}</p>
        <p className="mt-4 text-sm text-ink-muted">
          {demo.confirmFallback}{" "}
          <span className="select-all font-medium text-ink">{DEMO_EMAIL}</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-panel bg-surface p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map(({ key, type, autoComplete }) => (
          <div key={key} className="flex flex-col gap-1.5">
            <label htmlFor={`demo-${key}`} className="text-sm font-medium text-ink">
              {demo.fields[key].label}
            </label>
            <input
              id={`demo-${key}`}
              name={key}
              type={type}
              required
              autoComplete={autoComplete}
              placeholder={demo.fields[key].placeholder}
              className="h-12 rounded-input border border-line bg-bg px-4 text-[15px] text-ink placeholder:text-ink-muted focus-visible:border-accent"
            />
          </div>
        ))}
      </div>
      <button type="submit" className={`${primaryButton} mt-6 h-12 w-full px-7 text-base sm:w-auto`}>
        {demo.submitLabel}
      </button>
    </form>
  );
}
