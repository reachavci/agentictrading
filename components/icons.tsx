type IconProps = React.SVGProps<SVGSVGElement>;

export function ShieldCheckIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

function Stroke({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {children}
    </svg>
  );
}

/** Icons for the security cards, keyed by the `icon` names in content/site.ts. */
export const SecurityIcons = {
  // ID card
  identity: (p: IconProps) => (
    <Stroke {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2" />
      <path d="M6 16c.6-1.3 1.7-2 3-2s2.4.7 3 2" />
      <path d="M15 10h3M15 14h2" />
    </Stroke>
  ),
  // Check in a circle
  approval: (p: IconProps) => (
    <Stroke {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </Stroke>
  ),
  // Sliders
  limits: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2" />
      <circle cx="9" cy="17" r="2" />
    </Stroke>
  ),
  // Warning triangle
  alert: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M10.3 4.3L2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0z" />
      <path d="M12 10v4M12 17.5h.01" />
    </Stroke>
  ),
  // Document with lines
  record: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7l-4-4z" />
      <path d="M14 3v4h4M9 12h6M9 16h4" />
    </Stroke>
  ),
  // Pause in a circle
  stop: (p: IconProps) => (
    <Stroke {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 9v6M14 9v6" />
    </Stroke>
  ),
};

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/** Icons for the solutions cards, keyed by the `icon` names in content/site.ts. */
export const SolutionIcons = {
  // Candlestick chart
  broker: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M7 4v3M7 15v5M17 4v6M17 17v3" />
      <rect x="5" y="7" width="4" height="8" rx="1" />
      <rect x="15" y="10" width="4" height="7" rx="1" />
    </Stroke>
  ),
  // Two arrows swapping
  exchange: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M4 8h14l-3-3M20 16H6l3 3" />
    </Stroke>
  ),
  // Bank building
  bank: (p: IconProps) => (
    <Stroke {...p}>
      <path d="M3 9.5L12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18" />
    </Stroke>
  ),
};
