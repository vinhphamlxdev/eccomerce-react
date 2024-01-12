/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#B21E02",
        secondary: "#DFCA00",
        bgFooter: "#EDEDED",
        bgbtn: "#1C8DD9",
        bgCategoryItem: "#48322A",
        primaryBtn: "#1C8DD9",
        errBg: "#CC0000",
      },
    },
  },
  plugins: [],
};
