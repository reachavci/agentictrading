import type { Config } from "tailwindcss";

// Design tokens (light theme). Colour is reserved for meaning: status chips only.
// Use these names in components, e.g. `bg-surface`, `text-ink-muted`.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#FFFFFF",
        surface: {
          DEFAULT: "#F4F4F5", // panels behind product shots, agent cards
          raised: "#FFFFFF", // cards sitting on a panel
          sunken: "#F8F8F9", // inputs, plan card
        },
        line: {
          DEFAULT: "#E6E6E9",
          strong: "#D4D4D8",
        },
        ink: {
          DEFAULT: "#0A0A0B", // primary text, buttons
          secondary: "#4A4A50",
          muted: "#6B6B72",
        },
        // Accent: eyebrows and primary buttons. Same deep green as the "Active" chip.
        accent: {
          DEFAULT: "#0A6B33", // eyebrows, primary buttons
          hover: "#08572A",
        },
        status: {
          "active-bg": "#E6F4EA",
          "active-fg": "#0A6B33",
          "awaiting-bg": "#FDF1D8",
          "awaiting-fg": "#7A4D00",
          "paused-bg": "#EEEEF0",
          "paused-fg": "#4A4A50",
          "blocked-bg": "#FCE8E7",
          "blocked-fg": "#A8201A",
          live: "#16A34A",
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
        product: "0 1px 2px rgba(10,10,11,0.04), 0 12px 32px -8px rgba(10,10,11,0.12), 0 40px 80px -24px rgba(10,10,11,0.10)",
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
