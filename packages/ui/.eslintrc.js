/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/react-internal.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    "index.tsx",
    "postcss.config.js",
    "tailwind.config.ts",
    "svgr.d.ts",
    "styles/Toast.tsx",
    "postcss.config.mjs",
    "*.stories.tsx",
    "jest.config.mjs",
  ],
};
