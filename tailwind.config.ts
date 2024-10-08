import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      leaf_bp_520px: "520px",

      cl_bp_295: "295px",
      cl_bp_520: "520px",
      cl_bp_731: "731px",
      cl_bp_985: "985px",

      bp480: "480px",
      bp520: "520px",
      bp481: "481px",
      bp900: "900px",
      bp420: "420px",
      bp985: "985px",
      bp700: "700px",
      bp1000: "1000px",

      longNav_bp_600: "600px",

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // gridTemplateColumns:
      // {
      //   '20/80': '20% 80%',
      // },
      gridTemplateColumns: {
        // Simple 16 column grid
        longNav: "repeat(6, min-content)",
      },
      gridTemplateAreas: {
        home: ["one . two"],
        single: ["main"],
        story1: ["social social", "flexbox flexbox "],
        story2: ["flexbox flexbox social", "flexbox flexbox social"],
      },
      fontFamily: {
        fira: ["var(--font-fira)"],
      },
    },
  },

  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
};
export default config;
