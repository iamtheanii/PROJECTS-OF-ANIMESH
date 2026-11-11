import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        salon: {
          dark: "#0b0b0d",
          card: "#131316",
          elevated: "#1a1a20",
          border: "#26262e",
          muted: "#9a9a9e",
          ivory: "#fcfbf7",
          cream: "#f4f1ea",
        },
        gold: {
          50: "#fcf9ee",
          100: "#f7f1d5",
          200: "#eee0a7",
          300: "#e2c972",
          400: "#d7b145",
          500: "#c7992a",
          600: "#ab7a20",
          700: "#86581c",
          800: "#6e471d",
          900: "#5d3b1e",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
