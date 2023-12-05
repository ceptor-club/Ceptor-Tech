const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-oswald)", ...fontFamily.sans],
        milonga: ["Milonga", "cursive"],
        oswald: ["Oswald", "sans-serif"],
        "nothing-you-could-do": ['"Nothing You Could Do"', "cursive"],
      },
      colors: {
        ceptor: "#FFFF00",
      },
    },
  },
  plugins: [],
};
