import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FFFBF5',
        'bg-secondary': '#FFF8F0',
        panel: '#FFFFFF',
        'panel-alt': '#FFF5ED',
        border: '#FFDCC4',
        accent: '#F4A87A',
        'accent-dark': '#E8965A',
        'accent-light': '#FFB996',
        text: '#3D2817',
        'text-secondary': '#6B4423',
        'text-tertiary': '#8B5A3C'
      },
      borderRadius: {
        'xl2': '1rem',
        'quirky-1': '20px 25px 18px 22px',
        'quirky-2': '24px 18px 22px 20px',
        'quirky-3': '18px 22px 20px 24px',
        'quirky-4': '22px 20px 24px 18px'
      }
    }
  },
  plugins: []
};

export default config;
