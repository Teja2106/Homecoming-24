/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': { max: '640px'}, //For phone
      'md': { min: '768px' },
      'lg': { min: '1024px' },
      'xl': { min: '1280px' },
      '2xl': { min: '1536px' },
      'd-sm': { min: '1280px' }, //For desktop with 150% zoom
      'd-md': { min: '1536px' }, //For desktop with 125% zoom
      'd-lg': { min: '1920px' }, //For desktop with 100% zoom
    },
    extend: {
      fontFamily: {
        'SpaceGrotesk': ['Space Grotesk', 'sans'],
        'AlumniSansPinstripe': ['Alumni Sans Pinstripe', 'sans'],
        'Tourney': ['Tourney', 'sans'],
        'ZenDots': ['Zen Dots', 'sans']
      }
    },
  },
  plugins: [],
}