/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/server.js"],
  ignorePatterns: ["node_modules", "dist", "jest.config.js", "coverage"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: "module",
  },
  overrides: [
    {
      files: [".eslintrc.js"],
      parserOptions: {
        project: null, // .eslintrc.js 파일에 대해 TypeScript 파싱을 비활성화
      },
    },
  ],
};
