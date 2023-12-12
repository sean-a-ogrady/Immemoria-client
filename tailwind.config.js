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
    },
  },
  plugins: [],
}
