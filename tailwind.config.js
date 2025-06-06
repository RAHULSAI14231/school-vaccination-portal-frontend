/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        Monteserrat: ["Montserrat", "sans"],
        inter: ["Inter", "sans"],
        sans: ["Open Sans", "sans"],
      },
    },
  },
};
