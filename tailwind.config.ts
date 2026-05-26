import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Passion One'", "sans-serif"],
        body: ["'Poppins'", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
