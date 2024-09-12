const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  daisyui: {
    darkTheme: "light",
  },
  theme: {
    extend: {
      colors: {
        primary: "#399918", //green
        secondary: "#ECFFE6", //white
        lgpink: "#FFAAAA", //light pnik
        main: "#FF7777", //pink
        danger: "#f44336",
      },
      fontFamily: {
        heading: ["Prompt", "sans-serif"],
        "sub-heading": ["Merriweather", "serif"],
        "super-sub-font": ["Quicksand", "sans-serif"],
      },
      backgroundImage: {
        "signbg":
          "url('https://i1.pickpik.com/photos/129/906/546/blur-breakfast-catering-celebration-preview.jpg')",
      },
    },
  },
  plugins: [require("daisyui"), flowbite.plugin()],
};
