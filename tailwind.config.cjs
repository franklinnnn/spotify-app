/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*{.js,.jsx,.ts,.tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "280px",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        mono: ["Roboto-Mono", "monospace"],
        disp: ["Contrail One", "display"],
        num: ["Big Shoulders Display", "display"],
      },
      backgroundImage: {
        paperbg: "url('/src/assets/paperbg.png')",
      },
      colors: {
        primary: "#f70a8d",
        popularity: {
          100: "#d97706",
          80: "#7c3aed",
          60: "#0284c7",
          40: "#059669",
          20: "#475569",
        },
      },
    },
  },
  plugins: [],
};
