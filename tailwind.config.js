import { zinc } from 'tailwindcss/colors';


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      colors: {
        primary: {
          DEFAULT: zinc[500],
          ...zinc,
        },
      },
    },
  },
  plugins: [],
};
