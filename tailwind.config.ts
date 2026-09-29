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
        background: "var(--background)",
        foreground: "var(--foreground)",
        ocean: {
          deep: "#030b1e",
          abyss: "#010612",
          glow: "#00f0ff",
          coral: "#ff007f",
          bio: "#00ffb3",
        },
        cyber: {
          dark: "#0a071b",
          neonPink: "#ff0055",
          neonCyan: "#00f3ff",
          neonYellow: "#ffe600",
          neonPurple: "#9d00ff",
        },
        celestial: {
          sky: "#0d1b2a",
          dusk: "#1b263b",
          gold: "#fca311",
          aurora: "#48cae4",
        },
        void: {
          space: "#02010a",
          nebula1: "#6a0dad",
          nebula2: "#e01a4f",
          star: "#ffffff",
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'spin-very-slow': 'spin 30s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 10px currentColor)' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 25px currentColor)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
