/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        yellow: '#ffce00',
        darkblue: '#393C5C',
        gold: '#e1c26b',
        lightgrey: '#FFF7EE',
        darkgrey: '#3D3D3D',
        darkblue: '#413b5c',
        red: '#d6353c',
        darkpurple: '#441c4c',
        screen: '#E5DCD8',
      },
      fontFamily: {
        inter: '@apply sans-serif',
        roboto: '@aaply sans-serif',
      },
      fontSize: {
        twoxl: '4rem',
        xl: '3.125rem',
        large: '2.188rem',
        medium: '1.8rem',
        base: '1.25rem',
        small: '0.9rem',
        xsmall: '0.7rem',
      },
      backgroundImage: {
        redpurple: "url('/background.svg')",
      },
    },
    plugins: [],
  },
};
