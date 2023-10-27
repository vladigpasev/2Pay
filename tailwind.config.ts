import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      "paytone-one" : ['"Paytone One"', "sans-serif"]
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "paytone-one" : ['Paytone One', 'sans-serif']
      }
    },
  },
  daisyui: {
    themes: [
      {
        paymentLight : {
          "primary": "#ffffff",
          "secondary": "#00b65d",
          "accent": "#ea5234",
          "neutral": "#217cce", 
          "base-100": "#1e1e1e", 
          "info": "#3abff8",
          "success": "#36d399",       
          "warning": "#fbbd23",        
          "error": "#f87272",
        }
      },
      {
        paymentDark : {
          "primary": "#1e1e1e",
          "secondary": "#00b65d",
          "accent": "#ea5234",
          "neutral": "#ffffff",
          "base-100": "#217cce",
          "info": "#3abff8",
          "success": "#36d399",               
          "warning": "#fbbd23",           
          "error": "#f87272",
        }
      }
      ,"forest", "garden"],
  },
  plugins: [require("daisyui")],
};
export default config;
