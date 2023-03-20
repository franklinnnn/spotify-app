/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*{.js,.jsx,.ts,.tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        mono: ["Roboto-Mono", "monospace"],
      },
      backgroundImage: {
        paperbg: "url('/src/assets/paperbg.png')",
      },
    },
  },
  plugins: [],
};
