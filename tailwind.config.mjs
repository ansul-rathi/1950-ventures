import defaultTheme from "tailwindcss/defaultTheme"

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        "sans": ["Atkinson", ...defaultTheme.fontFamily.sans],
      },
  
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "full",
          },
        },
      },
    }
  }
};
