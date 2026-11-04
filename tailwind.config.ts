import type { Config } from "tailwindcss";

// Design tokens (light theme). Blue is the brand accent; green/amber/red/grey are status colours only.
// Use these names in components, e.g. `bg-surface`, `text-ink-muted`.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        surface: {
          DEFAULT: "#F6F7F9", // soft background: panels, cards
          raised: "#FFFFFF", // cards sitting on a panel
          sunken: "#F6F7F9", // inputs, plan card
        },
        line: {
          DEFAULT: "#E3E7ED", // borders
          strong: "#CDD4DE", // slightly stronger lines (connectors, dividers)
        },
        ink: {
          DEFAULT: "#0B1220", // primary text, dark buttons
          secondary: "#5B6474", // body text
          muted: "#5B6474", // labels, captions
        },
        // Brand accent: buttons, links, eyebrows, rotating verb, active nav, focus rings.
        accent: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
          soft: "#EEF2FF", // highlight backgrounds, subtle chips
        },
        // Status colours: strictly for meaning. Green only appears here.
        // Chip text for approved/blocked is one shade darker than the base hue for 4.5:1 contrast.
        status: {
          "active-bg": "#DCFCE7",
          "active-fg": "#15803D",
          "awaiting-bg": "#FEF3C7",
          "awaiting-fg": "#B45309",
          "paused-bg": "#F1F3F6",
          "paused-fg": "#5B6474",
          "blocked-bg": "#FEE2E2",
          "blocked-fg": "#B91C1C",
          live: "#16A34A", // non-text status marks: live dot, "Active" toggle
        },
      },
      borderRadius: {
        pill: "999px",
        panel: "28px",
        chat: "20px",
        card: "16px",
        input: "12px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        product: "0 1px 2px rgba(11,18,32,0.04), 0 12px 32px -8px rgba(11,18,32,0.12), 0 40px 80px -24px rgba(11,18,32,0.10)",
      },
      keyframes: {
        blink: { "0%, 49%": { opacity: "1" }, "50%, 100%": { opacity: "0" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        pulse: { "0%": { boxShadow: "0 0 0 0 rgba(22,163,74,0.45)" }, "70%, 100%": { boxShadow: "0 0 0 6px rgba(22,163,74,0)" } },
      },
      animation: {
        blink: "blink 1s step-end infinite",
        marquee: "marquee 48s linear infinite",
        pulse: "pulse 2s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
