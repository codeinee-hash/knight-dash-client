import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'max-sm': { raw: '(max-width: 639px)' },
        'max-md': { raw: '(max-width: 767px)' },
        'max-lg': { raw: '(max-width: 1023px)' },
        'max-xl': { raw: '(max-width: 1279px)' },

        'max-xs': { raw: '(max-width: 399px)' },
      },
    },
  },
  plugins: [],
};

export default config;
