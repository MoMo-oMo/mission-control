/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        cosmic: {
          dark: '#0a0a0f',
          purple: '#1a0b2e',
          deepPurple: '#16213e',
          neonPurple: '#a855f7',
          neonMagenta: '#ec4899',
          neonBlue: '#3b82f6',
          neonCyan: '#06b6d4',
        },
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
