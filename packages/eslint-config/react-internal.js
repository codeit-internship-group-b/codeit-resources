const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use with
 * internal (bundled by their consumer) libraries
 * that utilize React.
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    "turbo",
    "plugin:@tanstack/query/recommended",
    require.resolve("@vercel/style-guide/eslint/typescript"),
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/react"),
    "eslint-config-turbo",
  ],
  plugins: ["only-warn"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "dist/",
    "coverage/**",
  ],
  overrides: [
    // Force ESLint to detect .tsx files
    { files: ["*.js?(x)", "*.ts?(x)"] },
  ],
  rules: {
    "eslint-comments/require-description": "off", // 린트 무시하는 주석 달았을 때 설명 요구하는 끄기
    "unicorn/filename-case": "off", // 파일명 케밥케이스로 요구하는 규칙 끄기
    "import/no-default-export": "off", // 기본 내보내기 사용 허용 규칙 끄기
    "@typescript-eslint/naming-convention": "off", // type 네이밍 규칙 끄기
  },
};
