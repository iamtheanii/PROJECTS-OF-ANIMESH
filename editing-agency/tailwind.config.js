/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#08090C',
          card: '#0F1117',
          cardHover: '#161922',
          border: '#202433',
          cyan: '#00F0FF',
          purple: '#8B5CF6',
          violet: '#6366F1',
          accent: '#38BDF8',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Syne', 'Outfit', 'sans-serif'],
        hero: ['Outfit', 'Syne', 'sans-serif'],
        gaming: ['Chakra Petch', 'Rajdhani', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 35px -5px rgba(0, 240, 255, 0.35)',
        'glow-purple': '0 0 35px -5px rgba(139, 92, 246, 0.35)',
        'glow-card': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
