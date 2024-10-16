const nextJest = require("next/jest");
const rootConfig = require("@repo/jest-config/jest.config.base");

const createJestConfig = nextJest({
  // Next.js 앱의 경로 지정
  dir: "./",
});

// Jest 설정 객체
const customJestConfig = {
  ...rootConfig,
  collectCoverageFrom: ["./components/**/*.{ts,tsx}"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "./__mocks__/fileMock.ts",
    "^@ui/(.*)$": "<rootDir>/../../packages/ui/$1",
  },
};

// createJestConfig로 Jest 설정을 생성하여 export
module.exports = createJestConfig(customJestConfig);
