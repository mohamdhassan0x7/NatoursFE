/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        satisty: ["Satisfy", "cursive"],
        dancing: ["Dancing Script", "cursive"],
        badscript: ["Bad Script", "cursive"],
        urbanist:["Urbanist", "sans-serif"],
        roboto : ["Roboto Flex", "sans-serif"]
      
      },
    },
  },
  plugins: [],
};
