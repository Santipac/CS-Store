import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        arg: "#7AC5E8",
        gold: "#FFB81C",
      },
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
