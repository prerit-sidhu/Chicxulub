/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'prehistoric': {
          100: '#f0e6d2',
          200: '#e0c9a6',
          300: '#c9a679',
          400: '#b28451',
          500: '#8c5e2a',
          600: '#6b4423',
          700: '#4a2e1c',
          800: '#2a1a15',
          900: '#0f0a0a',
        },
        'cosmic': {
          100: '#d0d7ff',
          200: '#a6b0ff',
          300: '#7c89ff',
          400: '#5262ff',
          500: '#283bff',
          600: '#1e2cc7',
          700: '#141e8f',
          800: '#0a1057',
          900: '#05051f',
        },
        'lava': {
          100: '#ffcccb',
          200: '#ff9997',
          300: '#ff6663',
          400: '#ff332f',
          500: '#ff0000',
          600: '#cc0000',
          700: '#990000',
          800: '#660000',
          900: '#330000',
        },
      },
      fontFamily: {
        'jurassic': ['Jurassic', 'sans-serif'],
        'fossil': ['Fossil', 'serif'],
      },
      backgroundImage: {
        'meteor-pattern': "url('/src/assets/meteor-bg.png')",
        'fossil-texture': "url('/src/assets/fossil-texture.png')",
        'cave-art': "url('/src/assets/cave-art.png')",
      },
      animation: {
        'meteor': 'meteor 3s linear infinite',
        'shake': 'shake 0.5s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        meteor: {
          '0%': { transform: 'translateY(-100%) translateX(-100%)', opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { transform: 'translateY(100%) translateX(100%)', opacity: 0 },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        glow: {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.3)' },
        },
      },
    },
  },
  plugins: [],
}