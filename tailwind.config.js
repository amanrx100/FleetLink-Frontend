// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#1a1a1a",
        "dark-orange": "#f97316",
        "dark-orange-hover": "#ea580c",
        "dark-gray": "#2d2d2d",
      },
    },
  },
  plugins: [],
};
