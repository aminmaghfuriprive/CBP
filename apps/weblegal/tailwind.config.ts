
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Path untuk App Router Next.js
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}", // Path untuk package UI
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      colors: {
        cbp: {
          navy: "#0f172a",
          gold: "#d4af37",
          goldlight: "#e5c158",
          golddark: "#b39024",
          surface: {
            light: "#ffffff",
            dark: "#1e293b",
            darker: "#0f172a",
            deep: "#020617",
          },
        },
      },
      backgroundImage: {
        "gradient-gold": "linear-gradient(135deg, #d4af37 0%, #f3e5ab 100%)",
        "gradient-navy": "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        "gradient-subtle":
          "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 100%)",
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
        'marquee-reverse': 'marquee-reverse 60s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
