/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors:{
      'primary':'#b68bdcb1',
      'secondary':'#2E4CFF',
    }
    },
  },
  plugins: [],
}

 