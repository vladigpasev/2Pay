import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      {
        paymentLight: {
          "primary-green": "#00b65d",
          "secondary-blue": "#217cce",
          "white": "#ffffff", 
          "black": "#1e1e1e", 
          "action-red": "#ea5234",
        }
      },
      {
        paymentDark: {
          "primary-dark": "#1e1e1e",
          "secondary-green": "#00b65d",
          "white": "#ffffff",
          "tetriary-blue": "#217cce",
          "action-red": "#ea5234"
        }
      }
      , "forest"],
  },
  plugins: [require("daisyui")],
};
export default config;
