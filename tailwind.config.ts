import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: {
          DEFAULT: "#FAF7F2",
          subtle: "#F5F1E8",
          cream: "#FAF7F2",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          card: "#FFFFFF",
          subtle: "#F0EAE1",
          cream: "#FAF7F2",
          muted: "#E8E1D5",
          highlight: "#EBF3FC",
        },
        ink: {
          primary: "#0C1E38",
          secondary: "#4A5B73",
          tertiary: "#7D8CA3",
          muted: "#96A3B6",
        },
        brand: {
          royal: "#0F52BA",
          blue: "#136FC6",
          navy: "#0A2240",
          cyan: "#0284C7",
          sky: "#0EA5E9",
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444",
        },
        line: {
          DEFAULT: "#E5DEC9",
          subtle: "#EDE7DC",
          strong: "#D4CBB6",
        },
      },
      fontFamily: {
        heading: ["'Space Grotesk'", "sans-serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(12, 30, 56, 0.04), 0 1px 2px -1px rgba(12, 30, 56, 0.04)",
        card: "0 4px 6px -1px rgba(12, 30, 56, 0.05), 0 2px 4px -2px rgba(12, 30, 56, 0.05)",
        hover: "0 12px 28px -5px rgba(19, 111, 198, 0.16), 0 8px 10px -6px rgba(12, 30, 56, 0.04)",
        elevated: "0 20px 30px -8px rgba(12, 30, 56, 0.08), 0 10px 15px -3px rgba(12, 30, 56, 0.04)",
        glow: "0 0 25px -5px rgba(19, 111, 198, 0.35)",
        glass: "0 8px 32px 0 rgba(15, 82, 186, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
