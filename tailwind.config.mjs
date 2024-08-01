import { colors } from "@mui/material";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Atkinson", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#00203f",
        secondary: "#03396c",
        tertiary: "#005b96",
      },

      typography: {
        DEFAULT: {
          css: {
            maxWidth: "full",
          },
        },
      },
    },
  },
};
