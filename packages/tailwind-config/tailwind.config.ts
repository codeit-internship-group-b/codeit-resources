import type { Config } from "tailwindcss";

const px0_10 = Object.fromEntries(Array.from(Array(11)).map((_, i) => [`${i}`, `${i}px`]));
const px0_100 = Object.fromEntries(Array.from(Array(101)).map((_, i) => [`${i}`, `${i}px`]));
const px0_200 = Object.fromEntries(Array.from(Array(201)).map((_, i) => [`${i}`, `${i}px`]));
const px0_2000 = Object.fromEntries(Array.from(Array(2001)).map((_, i) => [`${i}`, `${i}px`]));

const config: Omit<Config, "content"> = {
  darkMode: ["selector"],
  theme: {
    extend: {
      borderWidth: px0_10,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_2000,
      minHeight: px0_2000,
      spacing: px0_200,
      maxWidth: px0_2000,
      maxHeight: px0_2000,
      width: px0_2000,
      height: px0_2000,
      colors: {
        purple: {
          100: "#F8ECFF",
          200: "#E9CCFF",
          300: "#A64EFF",
          400: "#8F00FF",
          500: "#6500C2",
          600: "#54009E",
          700: "#9933FF",
          800: "#7200CC",
        },
        "custom-black": "#333236",
        gray: {
          100: "#DDDEE4",
          200: "#413B54",
        },
        magenta: {
          100: "##EB008D",
        },
      },
    },
    fontSize: {
      "4xl-bold": ["32px", { lineHeight: "46px", fontWeight: "700" }],

      "3xl-bold": ["28px", { lineHeight: "40px", fontWeight: "700" }],
      "3xl-semibold": ["28px", { lineHeight: "40px", fontWeight: "600" }],
      "3xl-medium": ["28px", { lineHeight: "40px", fontWeight: "500" }],
      "3xl-regular": ["28px", { lineHeight: "40px", fontWeight: "400" }],

      "2xl-bold": ["24px", { lineHeight: "32px", fontWeight: "700" }],
      "2xl-semibold": ["24px", { lineHeight: "32px", fontWeight: "600" }],
      "2xl-medium": ["24px", { lineHeight: "32px", fontWeight: "500" }],
      "2xl-regular": ["24px", { lineHeight: "32px", fontWeight: "400" }],

      "xl-bold": ["20px", { lineHeight: "32px", fontWeight: "700" }],
      "xl-semibold": ["20px", { lineHeight: "32px", fontWeight: "600" }],
      "xl-medium": ["20px", { lineHeight: "32px", fontWeight: "500" }],
      "xl-regular": ["20px", { lineHeight: "32px", fontWeight: "400" }],

      "2lg-bold": ["18px", { lineHeight: "26px", fontWeight: "700" }],
      "2lg-semibold": ["18px", { lineHeight: "26px", fontWeight: "600" }],
      "2lg-medium": ["18px", { lineHeight: "26px", fontWeight: "500" }],
      "2lg-regular": ["18px", { lineHeight: "26px", fontWeight: "400" }],

      "lg-bold": ["16px", { lineHeight: "26px", fontWeight: "700" }],
      "lg-semibold": ["16px", { lineHeight: "26px", fontWeight: "600" }],
      "lg-medium": ["16px", { lineHeight: "26px", fontWeight: "500" }],
      "lg-regular": ["16px", { lineHeight: "26px", fontWeight: "400" }],

      "md-bold": ["14px", { lineHeight: "24px", fontWeight: "700" }],
      "md-semibold": ["14px", { lineHeight: "24px", fontWeight: "600" }],
      "md-medium": ["14px", { lineHeight: "24px", fontWeight: "500" }],
      "md-regular": ["14px", { lineHeight: "24px", fontWeight: "400" }],

      "sm-semibold": ["13px", { lineHeight: "22px", fontWeight: "600" }],
      "sm-medium": ["13px", { lineHeight: "22px", fontWeight: "500" }],

      "xs-semibold": ["12px", { lineHeight: "20px", fontWeight: "600" }],
      "xs-medium": ["12px", { lineHeight: "20px", fontWeight: "500" }],
      "xs-regular": ["12px", { lineHeight: "20px", fontWeight: "400" }],
    },
  },
  plugins: [],
};

export default config;
