/** @type {import("eslint").Linter.Config} */
// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  root: true,
  extends: ["expo", "@repo/eslint-config/react-native.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["metro.config.js", "/.expo", "scripts/", "tailwind.config.js", "babel.config.js", ".eslintrc.js"],
};
