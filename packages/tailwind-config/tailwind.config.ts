import type { Config } from "tailwindcss";

const config: Omit<Config, "content"> = {
  darkMode: ["selector"],
  theme: {
    extend: {
      colors: {
        // 테스트용 임시
        primary: "#6D6AFE",
      },
    },
  },
  plugins: [],
};

export default config;
