/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // 关键：通过在 <html> 或 <body> 上添加/移除 'dark' class 来切换主题
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        author: ["Montserrat", "sans-serif"],
        title: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
