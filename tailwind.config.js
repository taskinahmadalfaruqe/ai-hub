/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '10px',
        sm: '10px',
        lg: '1rem',
        xl: '2rem',
        '2xl': '3rem',
      },
    },

    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  plugins: [require("daisyui")],
}

