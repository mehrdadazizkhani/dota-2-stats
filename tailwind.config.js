/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ["Plus Jakarta Sans", "sans-serif"],
    },
    colors: {
      light: {
        primary: "#181818",
        secondary: "#313131",
        accent: "#3563E9",
        heading: "rgba(255, 255, 255, 0.8)",
        content: "rgba(255, 255, 255, 0.6)",
        win: "#1fa3ef",
        draw: "#cbb02a",
        lose: "#ec041f",
        chart1: "#ef1f9c",
        chart2: "#9655d8",
      },
      dark: {
        primary: "#181818",
        secondary: "#313131",
        accent: "#3563E9",
        heading: "rgba(255, 255, 255, 0.8)",
        content: "rgba(255, 255, 255, 0.6)",
        win: "#1fa3ef",
        draw: "#cbb02a",
        lose: "#ec041f",
        chart1: "#ef1f9c",
        chart2: "#9655d8",
      },
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
