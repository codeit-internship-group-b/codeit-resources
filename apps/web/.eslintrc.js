/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: "detect",
    },
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
    "out/",
    ".next/",
  ],
  env: {
    jest: true,
  },
};
