/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        fb: {
          blue: '#1877F2',
          dark: '#242526',
          darker: '#18191A',
          darkborder: '#3A3B3C',
          darkcard: '#3A3B3C',
          darkhover: '#4E4F50',
        },
      },
    },
  },
  plugins: [],
}