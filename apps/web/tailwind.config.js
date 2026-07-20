/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fdf7ef",
          100: "#f7ead8",
          200: "#edd1b8",
          300: "#d8b28a",
          400: "#ba8a63",
          500: "#8a5c3d",
          600: "#6d472f",
          700: "#593a2a",
          800: "#4a2f1f",
          900: "#3d2518",
        },
        ink: {
          50: "#f4ede1",
          100: "#e6dcc8",
          200: "#d4c5ad",
          300: "#bfa186",
          400: "#9b7f63",
          500: "#7c5f46",
          600: "#6a4d37",
          700: "#5a402f",
          800: "#4b3427",
          900: "#3d2b1f",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 8px 24px -12px rgba(15,17,25,0.15)",
      },
    },
  },
  plugins: [],
};
