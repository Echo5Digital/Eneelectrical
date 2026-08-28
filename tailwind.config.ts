import type { Config } from "tailwindcss";

// NOTE: theme.extend.colors is overwritten per-generated-project by
// projectWriter.ts using the Design System output. This file is the
// fallback shape only.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B1F3A",
        secondary: "#F5A623",
      },
      borderRadius: {
        DEFAULT: "0.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
