/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react")

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(20rem,1fr))",
      },
      fontFamily: {
        lobster: ["var(--font-lobster)"],
        roboto: ["var(--font-roboto)"],
      },
    },
  },
  darkMode: "class",
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: ["night", "black", "forest", "light", "synthwave"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "synthwave",
  },
}
