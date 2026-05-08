import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        arabic: ['"IBM Plex Sans Arabic"', "Tajawal", "Cairo", "sans-serif"],
      },
      colors: {
        ink: "#122238",
        ocean: "#0F5F7A",
        aqua: "#28B7B6",
        violet: "#7661E8",
        mist: "#F8FAFC",
        amberSoft: "#F7B267",
        emeraldSoft: "#34D399",
        roseSoft: "#FB7185",
      },
      boxShadow: {
        soft: "0 4px 24px rgba(15, 40, 70, 0.08)",
        medium: "0 8px 32px rgba(15, 40, 70, 0.12)",
        large: "0 16px 48px rgba(15, 40, 70, 0.16)",
        glow: "0 0 30px rgba(40, 183, 182, 0.2)",
        "glow-violet": "0 0 30px rgba(118, 97, 232, 0.2)",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "24px",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "slide-up": "slide-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "bounce-soft": "bounce-soft 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
