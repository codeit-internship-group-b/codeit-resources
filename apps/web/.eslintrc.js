/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  ignorePatterns: ["postcss.config.cjs", "tailwind.config.ts", "__mocks__/**", "jest.config.ts", "out/", ".next/"],
  env: {
    jest: true,
  },
};
