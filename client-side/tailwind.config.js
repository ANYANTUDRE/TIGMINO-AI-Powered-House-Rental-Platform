/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "beige-primary-bg": "#F5F5DC",
        "dark-brown": "#7B5741",
        "terracotta": "#E2725B",
        "saffron": "#F4C430",
        "coral": '#FF7F50',
        "indigo": '#4B0082',
      },
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      content: {
        zeligePattern: "url('./assets/header-bg.png')",
        mainBg: "url('./assets/main-bg.png')",
        zeligBg: "url('./assets/zelig-bg.jpg')",
      },
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
};