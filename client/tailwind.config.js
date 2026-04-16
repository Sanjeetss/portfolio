/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: "#040814",
        panel: "rgba(8, 20, 40, 0.91)",
        accent: "#58f6ff",
        accentSoft: "#2ab6ff",
        text: "#e7fbff",
        muted: "#8eb9cc",
      },
      fontFamily: {
        display: ["Orbitron", "sans-serif"],
        body: ["Rajdhani", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(88, 246, 255, 0.22)",
        edge: "0 0 18px rgba(88, 246, 255, 0.35)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.15)", opacity: "0" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        scan: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
      },
      animation: {
        pulseRing: "pulseRing 1.8s ease-out infinite",
        floatY: "floatY 6s ease-in-out infinite",
        scan: "scan 4s linear infinite",
      },
    },
  },
  plugins: [],
};
