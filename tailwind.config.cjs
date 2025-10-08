/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(128, 214, 247)',
        primaryLight: 'rgba(128, 214, 247, 0.1)'
      },
    },
  },
  plugins: [],
}
