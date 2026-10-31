import type { Config } from "tailwindcss";

// Design tokens (dark theme). Use these names in components, e.g. `bg-surface`, `text-muted`.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0F1A",
        surface: {
          DEFAULT: "#111827", // chat card
          card: "#0E1522", // agent cards, floating chips
          inset: "#0B1220", // inputs, plan card
        },
        line: {
          DEFAULT: "#1F2A3A",
          strong: "#243044",
          soft: "#1C2636",
          divider: "#141C2B",
        },
        ink: {
          DEFAULT: "#E8ECF2", // primary text
          secondary: "#A9B4C4",
          muted: "#7C8AA0",
        },
        accent: {
          DEFAULT: "#34D399",
          ink: "#052E1F", // text on accent
        },
        bubble: "#1E293B",
        status: {
          "active-bg": "#0F2E24",
          "active-fg": "#34D399",
          "awaiting-bg": "#3A2E12",
          "awaiting-fg": "#F5B544",
          "paused-bg": "#1C2636",
          "paused-fg": "#A9B4C4",
          "blocked-bg": "#3A1418",
          "blocked-fg": "#FCA5A5",
        },
      },
      borderRadius: {
        pill: "999px",
        chat: "18px",
        card: "16px",
        input: "12px",
        chip: "10px",
      },
      keyframes: {
        blink: { "0%, 49%": { opacity: "1" }, "50%, 100%": { opacity: "0" } },
      },
      animation: {
        blink: "blink 1s step-end infinite",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
