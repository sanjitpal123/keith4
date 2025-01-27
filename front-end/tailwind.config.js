import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heebo: ['"Heebo"', "sans-serif"],
        plex: ['"IBM Plex Mono"', "monospace"],
        montserrat: ['"Montserrat"', "sans-serif"],
        poppins: ['"Poppins"', "sans-serif"],
        roboto: ['"Roboto"', "sans-serif"],
      },
      colors: {
        orangeColor: '#FD5D14', 
        blueColor: '#02245B', 
      },
    },
  },
  plugins: [
    daisyui
  ],
}

