/** @type {import('tailwindcss').Config} */
module.exports = {
     content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
     darkMode: "class",
     theme: {
          extend: {
               fontFamily: {
                    sans: ["Nunito", "sans-serif"],
               },
          },
     },
     plugins: [],
}
