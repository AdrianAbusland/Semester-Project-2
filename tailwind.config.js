/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/**.{html,js,ts}","!./node_modules/**/*"],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6', // Bright blue
        secondary: '#1D4ED8', // Darker blue
        dark: {
          100: '#2d2d2d',
          200: '#252525',
          300: '#1a1a1a',
          400: '#171717',
        },
        light: '#e5e5e5',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}

