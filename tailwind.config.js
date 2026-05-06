/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#FDFBF7", 
        ink: "#2D2A26", 
        terracotta: "#E56B55", 
        forest: "#2A4B46", 
        sand: "#EFEBE0", 
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'tactile': '0 10px 30px -10px rgba(42, 75, 70, 0.15)',
        'tactile-hover': '0 20px 40px -10px rgba(42, 75, 70, 0.25)',
      }
    },
  },
  plugins: [],
}