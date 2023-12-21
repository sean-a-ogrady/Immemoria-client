/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-background': '#1E1E1E',
        'dark-primary-text': '#E0E0E0',
        'dark-secondary-text': '#A0A0A0',
        'dark-accent': '#4A90E2',
        'dark-interactive': '#E67E22',
        'dark-navbar': '#333333',
        'dark-sidebar': '#2C3E50',
        'light-background': '#FFFFFF',
        'light-primary-text': '#333333',
        'light-secondary-text': '#595959',
        'light-accent': '#3498DB',
        'light-interactive': '#D35400',
        'light-navbar': '#EFEFEF',
        'light-sidebar': '#BDC3C7',
      },
      fontFamily: {
        garamond: ['Cormorant Garamond', 'serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-slow': 'fadeIn 2s ease-out',
        'fade-out': 'fadeOut 0.5s ease-out',
        'fade-out-slow': 'fadeOut 2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      }
    },
  },
  plugins: [],
}
