import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

/*
 * Monochrome system. Every hue-carrying palette Tailwind ships is remapped to
 * neutral grey, so no utility anywhere in the app can produce colour — even in
 * components that haven't been hand-restyled yet.
 */
const grey = colors.neutral;
const hueless = Object.fromEntries(
  [
    "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan",
    "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose",
  ].map((name) => [name, grey]),
);

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...hueless,
        ink: "#161616",
        graphite: "#3b3b39",
        smoke: "#878784",
        mist: "#d9d9d6",
        paper: "#ececea",
        chalk: "#f7f7f6",
        // Legacy token names kept so older markup lands on the new values.
        // `red` is the old accent; it now follows --accent (ink on light, white on dark).
        rocco: {
          black: "#161616",
          dark: "#262625",
          tan: "#c4c4c1",
          tanLight: "#e2e2df",
          tanDark: "#7a7a77",
          red: "rgb(var(--accent) / <alpha-value>)",
          redHover: "rgb(var(--accent-strong) / <alpha-value>)",
          cream: "#ececea",
          glaze: "#bdbdbb",
          chocolate: "#2a2a29",
        },
      },
      fontFamily: {
        display: ["var(--font-archivo)", "Arial Narrow", "sans-serif"],
        sans: ["var(--font-archivo)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      borderRadius: {
        frame: "28px",
      },
      keyframes: {
        marquee: { to: { transform: "translate3d(-50%,0,0)" } },
      },
      animation: {
        marquee: "marquee 42s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
