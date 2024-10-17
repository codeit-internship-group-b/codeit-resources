/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  ignorePatterns: [
    "postcss.config.js",
    "tailwind.config.ts",
    "__mocks__/**",
    "jest.config.cjs",
    "out/_next/**",
    "**/*.buildManifest.js",
    "**/*.ssgManifest.js",
    "**/*.chunks/**/*.js",
  ],
  env: {
    jest: true,
  },
};
