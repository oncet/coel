module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
