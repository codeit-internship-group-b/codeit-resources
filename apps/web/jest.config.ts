import type { Config } from "jest";
import rootConfig from "@/../../packages/jest-config/jest.config";

export const config: Config = {
  ...rootConfig,
  collectCoverageFrom: ["<rootDir>/apps/web/components/**/*.{ts,tsx}"],
  setupFilesAfterEnv: ["<rootDir>/apps/web/setupTests.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/apps/web/__mocks__/fileMock.ts",
  },
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.json",
    },
  },
};

export default config;
