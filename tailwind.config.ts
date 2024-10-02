import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: "#1B2430",
        50: "#5E7CA4",
        100: "#567298",
        200: "#475F7E",
        300: "#384B64",
        400: "#2A384A",
        500: "#1B2430",
        600: "#07090C",
        700: "#000000",
      },
      secondary: {
        100: "#EDE8DC",
        200: "#FBFAF7",
        300: "#FFFFFF",
      },
      tertiary: {
        50: "#FFFFFF",
        100: "#FFFFFF",
        200: "#FFFEFF",
        300: "#F6D6FF",
        400: "#ECADFF",
        500: "#E384FF",
      },
      blue: {
        DEFAULT: "#4379F2",
        50: "#EFF3FE",
        100: "#DCE6FD",
        200: "#B5CBFA",
        300: "#8FAFF7",
        400: "#6994F5",
        500: "#4379F2",
      },
      "dark-primary": "#021526",
      "dark-secondary": "#C68FE6",
      "dark-tertiary": "#6EACDA",
      darken: "rgba(0,0,0,0.7)",
      fadedarken: "rgba(0,0,0,0.6)",
      "stroke-dark": "#4A4A4A",
      "dark-bg": "#121212",
      "neutral-500": "#6B7280",
      white: '#ffffff',
    },
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
      Varela: ["Varela Round", "sans-serif"],
      Inter: ["Inter", "sans-serif"],
      Rubik: ["Rubik", "sans-serif"],
      TitilliumWeb: ["Titillium Web", "sans-serif"],
    },

    extend: {
      boxShadow: {
        "3xl": "-1px 34px 47px -29px rgb(32 32 32 / 100%)",
        "4xl": " 0vw 0vw 0.5vw 0vw rgb(32 32 32 / 20%)",
        "5xl": " 0vw 0.5vw 0.5vw 0vw rgb(32 32 32 / 16%)",
        glass: "1px 5px 12px 1px rgba( 31, 38, 135, 0.37 )",
        "glass-card": "4px 4px 4px 4px rgba( 32, 32, 32, 0.37 )",
        "card-shadow": "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
        "dark-shadow": "10px 10px 5px 0px rgba(130,130,130,0.75)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({
      addComponents,
    }: {
      addComponents: (components: Record<string, any>) => void;
    }) {
      addComponents({
        ".flex-center": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        ".overlay-content": {
          position: "absolute",
          height: "100%",
          width: "100%",
          top: "0",
          left: "0",
        },
      });
    },
  ],
};
export default config;
