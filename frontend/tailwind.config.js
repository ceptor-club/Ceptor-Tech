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
<<<<<<< HEAD
      },
      colors: {
        'ceptor': '#FFFF00'
      },
    }
=======
        milonga: ["Milonga", "cursive"],
        oswald: ["Oswald", "sans-serif"],
        "nothing-you-could-do": ['"Nothing You Could Do"', "cursive"],
      },
      colors: {
        ceptor: "#FFFF00",
        "light-yellow": "#FED481",
        "light-orange": "#FF9D0A",
        "light-grey": "#2a2727",
        "light-pink": "#F55082",
      },
    },
>>>>>>> tech-dev
  },
  plugins: [],
};
