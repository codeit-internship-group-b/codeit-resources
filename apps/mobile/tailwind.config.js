import sharedConfig from "@repo/tailwind-config/tailwind.config";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("nativewind/preset"), sharedConfig],
  theme: {
    extend: {},
  },
  plugins: [],
};
