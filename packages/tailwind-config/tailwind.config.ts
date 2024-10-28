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
      borderRadius: px0_100,
      lineHeight: px0_100,
      minWidth: px0_2000,
      minHeight: px0_2000,
      spacing: px0_200,
      maxWidth: px0_2000,
      maxHeight: px0_2000,
      width: px0_2000,
      height: px0_2000,
      //2자리수(10~99)는 Badge color로 사용하려고 추가했어요
      colors: {
        purple: {
          10: "#FDFAFF",
          20: "#760DDE",
          30: "#B363FD",
          40: "#D4A4F9",
          100: "#F8ECFF",
          200: "#E9CCFF",
          300: "#A64EFF",
          400: "#8F00FF",
          500: "#6500C2",
          600: "#54009E",
          700: "#9933FF",
          800: "#7200CC",
          900: "#760DDE",
        },
        "custom-black": "#333236",
        error: "#D6173A",
        gray: {
          10: "#EDEDF0",
          20: "#ADAEB8",
          30: "#888893",
          40: "#999CAC",
          50: "#181B28",
          60: "#F6F6F8",
          70: "#D5D6DD",
          80: "#66666E",
          90: "#4A494F",
          100: "#DDDEE4",
          200: "#413B54",
          300: "#3C3B40",
          400: "#EDEDF0",
          500: "#E5E5EA",
        },
        magenta: {
          100: "#EB008D",
        },
        green: {
          10: "#EBFFEB",
          20: "#00BE2F",
          30: "#80F188",
          40: "#025918",
        },
        pink: {
          10: "#FFEBF7",
          20: "#FF52B7",
          30: "#72004B",
          40: "#EB008D",
        },
        yellow: {
          10: "#FFF7E5",
          20: "#FF9100",
          30: "#FFE057",
          40: "#A34900",
          50: "#FFB200",
        },
        blue: {
          10: "#EBF3FF",
          20: "#1790FF",
          30: "#003078",
          40: "#85C2FF",
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

      "sm-bold": ["13px", { lineHeight: "22px", fontWeight: "700" }],
      "sm-semibold": ["13px", { lineHeight: "22px", fontWeight: "600" }],
      "sm-medium": ["13px", { lineHeight: "22px", fontWeight: "500" }],

      "xs-semibold": ["12px", { lineHeight: "20px", fontWeight: "600" }],
      "xs-medium": ["12px", { lineHeight: "20px", fontWeight: "500" }],
      "xs-regular": ["12px", { lineHeight: "20px", fontWeight: "400" }],

      "xxs-semibold": ["11px", { lineHeight: "18px", fontWeight: "600" }],
      "xxs-medium": ["11px", { lineHeight: "18px", fontWeight: "500" }],
      "xxs-regular": ["11px", { lineHeight: "18px", fontWeight: "400" }],
    },
    keyframes: {
      rotateIn: {
        "0%": { transform: "rotate(0deg)" },
        "100%": { transform: "rotate(180deg)" },
      },
      rotateOut: {
        "0%": { transform: "rotate(180deg)" },
        "100%": { transform: "rotate(0deg)" },
      },
    },
    animation: {
      "rotate-in": "rotateIn 0.3s ease-in-out",
      "rotate-out": "rotateOut 0.3s ease-in-out",
    },
    backgroundImage: {
      "custom-gradient": "linear-gradient(90deg, rgba(251, 251, 251, 0) 0%, #FBFBFB 50%)",
    },
    boxShadow: {
      custom: "0 2px 4px 0 rgba(51, 50, 54, 0.06)", // X: 0, Y: 2, Blur: 4, Spread: 0, 색상: #333236/6
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text)-(purple|green|pink|yellow|gray|blue)-(10|20|30|40|50|100|200|300)/,
    },
  ],
};

export default config;
