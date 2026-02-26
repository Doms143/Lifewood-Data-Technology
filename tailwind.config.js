/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'paper': '#F5EEDB',
        'serpent': '#133020',
        'castleton': '#046241',
        'saffron': '#FFB347',
        'earth-yellow': '#FFC370',
        'sea-salt': '#F9F7F7',
        'white': '#FFFFFF',
      },
      fontFamily: {
        'sans': ['Manrope', 'Microsoft YaHei', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': '64px',
        'hero': '64px',
        'h1': '32px',
        'h2': '32px',
        'body': '16px',
      },
      borderRadius: {
        'brand': '16px',
        'card': '16px',
      },
      boxShadow: {
        'glossy': '0 24px 60px -32px rgba(19, 48, 32, 0.45), 0 10px 24px -16px rgba(19, 48, 32, 0.25)',
        'soft': '0 18px 40px -28px rgba(19, 48, 32, 0.35)',
        'inset-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.7)',
      },
      backgroundImage: {
        'glossy-radial': 'radial-gradient(120% 120% at 20% 0%, rgba(255, 255, 255, 0.6) 0%, rgba(245, 238, 219, 0.9) 40%, rgba(245, 238, 219, 1) 70%)',
        'serpent-glow': 'radial-gradient(80% 80% at 50% 0%, rgba(255, 179, 71, 0.15) 0%, rgba(19, 48, 32, 0) 60%)',
        'glass-sheen': 'linear-gradient(120deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.4) 35%, rgba(255, 255, 255, 0.1) 60%)',
      },
    },
  },
  plugins: [],
}
