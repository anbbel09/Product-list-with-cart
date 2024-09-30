/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
    colors: {
        'primary': '#FCF8F5',
        'secondary': '#C83B0E',
      },
    fontFamily: {
        'title': ['Sofia-bold'],
        'subtitle': ['Sofia-Semibold'],
        'text': ['Sofia-Regular'],   
        'text-md': ['Sofia-Medium'], 
      },
    },
  },
  plugins: [],
}