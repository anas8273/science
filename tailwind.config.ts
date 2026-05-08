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
        mist: "#F4F7FB",
        amberSoft: "#F7B267",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(15, 40, 70, 0.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;
