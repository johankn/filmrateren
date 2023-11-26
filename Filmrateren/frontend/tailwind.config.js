/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        yellow: '#ffce00',
        darkblue: '#393C5C',
        gold: '#e1c26b',
        lightgrey: '#FFF7EE',
        darkgrey: '#3D3D3D',
        darkblue: '#413b5c',
        blue: '#295de3',
        red: '#d6353c',
        darkpurple: '#441c4c',
        screen: '#E5DCD8',
      },
      fontSize: {
        twoxl: '4rem',
        xl: '3.125rem',
        large: '2.188rem',
        medium: '1.8rem',
        base: '1.25rem',
        baseSmall: '1.15rem',
        small: '0.9rem',
        xsmall: '0.7rem',
      },
      backgroundImage: {
        redpurple: "url('/background.svg')",
      },
      screens: {
        small: '100px',
      },
      opacity: {
        15: '0.15',
      },
    },
    plugins: [],
  },
};
