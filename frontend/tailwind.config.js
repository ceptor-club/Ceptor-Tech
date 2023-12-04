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
      },
      width: {
        '600': '600px',
      },
      colors: {
        'ceptor': '#FFFF00',
        'customOrange': '#ED670B',
        'customYellow': '#F8C522',
        'radioYellow': '#FFFD2F',
        'radioLightYellow': '#FFFfD6'
      },
    }
  },
  plugins: [],
};
