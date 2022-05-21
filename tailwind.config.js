const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{html,js}'],

  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
    },
    colors: {
      ...colors,
      'zinklar-pale': '#F1FAEE',
      'zinklar-sky': '#A8DADC',
      'zinklar-ocean': '#457B9D',
      'zinklar-dark-ocean': '#1D3557',
    },
    extend: {},
  },
  plugins: [],
};
