const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    "turbo",
    "eslint-config-turbo",
    "plugin:@typescript-eslint/recommended",
    "universe",
    "universe/native",
    "universe/web",
    "universe/shared/typescript-analysis",
  ],
  parserOptions: {
    project,
  },
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  rules: {
    "eslint-comments/require-description": "off", // 린트 무시하는 주석 달았을 때 설명 요구하는 끄기
    "unicorn/filename-case": "off", // 파일명 케밥케이스로 요구하는 규칙 끄기
    "import/no-default-export": "off", // 기본 내보내기 사용 허용 규칙 끄기
    "@typescript-eslint/restrict-template-expressions": "off", // 템플릿 리터럴에서 문자열이 아닌 타입 사용을 제한하는 규칙 끄기
    "@typescript-eslint/no-unsafe-call": "off", // 함수가 아니지만 함수처럼 호출하려고 시도했을 때 발생하는 에러 끄기
    "@typescript-eslint/no-unsafe-member-access": "off", // error 타입에서 객체의 속성에 접근하려고 할 때 발생하는 에러 끄기
    "node/no-unpublished-import": "off", // npm에 게시되지 않은 패키지 사용 => 모노레포 혹은 로컬 패키지와 같은 구조에서는 불필요하므로 끄기
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^size$" }], // tailwind className에서 "-" 사용시 나오는 경고 off
    "import/no-unresolved": "off",
  },
};
