/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#41246d",
        secondary: "#f24080",
        // hover: '#164081',
        // accent: '#E2E8F0',
      },
    },
  },
  plugins: [],
};
