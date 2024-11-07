/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': { max: '640px'},
      'md': { min: '768px' },
      'lg': { min: '1024px' },
      'xl': { min: '1280px' },
      '2xl': { min: '1536px' },
      'm-sm': { min: '1280px' },
      'm-md': { min: '1536px' },
      'm-lg': { min: '1920px' },
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

