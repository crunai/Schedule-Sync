/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-stripe":
          "repeating-linear-gradient(70deg, #c90076,#c90076 10px, #e69138 10px, #e69138 20px)",
      },
    },
  },
  plugins: [require("daisyui")],
};
