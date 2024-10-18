/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    "postcss.config.js",
    "tailwind.config.ts",
    "out/",
    ".next/",
    "__mocks__/**",
    "jest.config.ts",
    "out/",
    ".next/",
  ],
  env: {
    jest: true,
  },
};
