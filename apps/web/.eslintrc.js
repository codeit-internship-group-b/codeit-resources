/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["postcss.config.cjs", "tailwind.config.ts", "__mocks__/**", "jest.config.cjs", "out/", ".next/"],
  env: {
    jest: true,
  },
};
