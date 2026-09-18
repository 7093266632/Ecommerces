/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0284c7',
          600: '#0284c7',
          700: '#0369a1',
          900: '#0c4a6e',
        },
        mall: {
          dark: '#0f172a',
          card: '#1e293b',
          gold: '#f59e0b',
          accent: '#ec4899',
          emerald: '#10b981'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif']
      }
    },
  },
  plugins: [],
}
