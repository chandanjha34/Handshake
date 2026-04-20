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
        bg: '#050505',
        'bg-secondary': '#0f0f10',
        panel: '#111214',
        'panel-alt': '#16171a',
        border: '#2d2f35',
        accent: '#f4f4f5',
        'accent-dark': '#d4d4d8',
        'accent-light': '#ffffff',
        text: '#f5f5f7',
        'text-secondary': '#c8cad0',
        'text-tertiary': '#8f939e'
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
