import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      "plugin:storybook/recommended",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2020,
      sourceType: "module",
    },
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
    overrides: [
      {
        // or whatever matches stories specified in .storybook/main.js
        files: ["*.stories.@(ts|tsx|js|jsx|mjs|cjs)"],
        rules: {
          // example of overriding a rule
          "storybook/hierarchy-separator": "error",
          // example of disabling a rule
          "storybook/default-exports": "off",
        },
      },
    ],
  },
);
