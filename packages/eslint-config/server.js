module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    "turbo",
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    "eslint-config-turbo",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:node/recommended",
  ],
  plugins: ["@typescript-eslint", "import", "security", "node"],
  env: {
    node: true,
    es6: true,
  },
  overrides: [
    {
      files: ["**/__tests__/**/*", "**/*.ts", "**/*.tsx"],
      env: {
        jest: true,
      },
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
      },
    },
  ],
  settings: {
    "import/resolver": {
      typescript: {}, // TypeScript 모듈 해석 지원
    },
  },
  rules: {
    "node/no-unsupported-features/es-syntax": ["error", { ignores: ["modules"] }], // Node.js에서 지원하지 않는 ES 문법 사용 금지
    "node/no-missing-import": "off", // TypeScript에서 처리하므로 비활성화
    "import/no-unresolved": "error", // 모듈 해석 오류 검사
    "@typescript-eslint/explicit-function-return-type": "warn", // 함수 반환 타입 명시
    "@typescript-eslint/no-explicit-any": "warn", // any 타입 사용 금지
    "unicorn/filename-case": "off", // 파일이름 케밥케이스 강제 금지
    "@typescript-eslint/require-await": "off", // 비동기 함수 사용 금지
    "no-console": ["error", { allow: ["warn", "error", "log"] }], // console 사용 금지 - log, warn, error만 사용 가능
    "import/prefer-named-exports": "off", // named exports 사용 금지
    "import/no-default-export": "off", // default export 사용 금지
    "@typescript-eslint/restrict-template-expressions": "off", // 템플릿 리터럴 내에서 string이 아닌 값 (예: number)을 허용하지 않도록 하는 설정
    "func-names": "off", // 익명 함수사용 가능으로 설정
    "node/no-unpublished-import": "off", // npm에 게시되지 않은 패키지 사용 => 모노레포 혹은 로컬 패키지와 같은 구조에서는 불필요하므로 끄기
    "tsdoc/syntax": "off", // swagger 태그 인식 오류로 문서 작성을 위해 설정
  },
};
