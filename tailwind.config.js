module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height'
      }
    },
  },
  plugins: [require('@tailwindcss/forms'), require('daisyui')],
  daisyui: {
    styled: true,
    themes: ['halloween'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'halloween',
  },
}
