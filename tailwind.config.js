/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"], // enable dark mode with the .dark class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)", // Blue
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "var(--secondary)", // Orange
          foreground: "#FFFFFF",
        },
        background: "var(--background)",
        surface: "var(--surface)",
        footer: {
          DEFAULT: "var(--footer-bg)",
          text: "var(--footer-text)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },
      },
      borderRadius: {
        lg: "0.625rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      keyframes: {
        // example custom animation
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
