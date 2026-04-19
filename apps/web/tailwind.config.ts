import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        panel: '#111214',
        border: '#25262b',
        accent: '#5A67D8'
      },
      borderRadius: {
        xl2: '1rem'
      }
    }
  },
  plugins: []
};

export default config;
