import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "rangoon-green": {
          "50": "#f6f7f6",
          "100": "#e1e6e2",
          "200": "#c3ccc5",
          "300": "#9eaaa1",
          "400": "#79887d",
          "500": "#5f6d64",
          "600": "#4b564f",
          "700": "#3e4741",
          "800": "#343b36",
          "900": "#2e3330",
          "950": "#1f2421",
        },

        "persian-blue": {
          "50": "#eaf4ff",
          "100": "#dae9ff",
          "200": "#bcd6ff",
          "300": "#93baff",
          "400": "#6891ff",
          "500": "#4569ff",
          "600": "#253cff",
          "700": "#1a2de8",
          "800": "#192bc2",
          "900": "#1d2d92",
          "950": "#111855",
        },

        "gray-nurse": {
          "50": "#f6f7f7",
          "100": "#dce1de",
          "200": "#c3ccc7",
          "300": "#9eaaa3",
          "400": "#798880",
          "500": "#5f6d67",
          "600": "#4a5750",
          "700": "#3e4743",
          "800": "#343b38",
          "900": "#2e3331",
          "950": "#181b1a",
        },

        "spring-green": {
          "50": "#eefff2",
          "100": "#d7ffe3",
          "200": "#b1ffca",
          "300": "#74ffa1",
          "400": "#44f87e",
          "500": "#06e14e",
          "600": "#00bb3c",
          "700": "#039232",
          "800": "#09722d",
          "900": "#095e27",
          "950": "#003513",
        },

        text: "#151e01",
        background: "#dbe1de",
        primary: "#192ac2",
        secondary: "#1f2320",
        accent: "#44f87e",
      },
    },
  },
  plugins: [],
};
export default config;
