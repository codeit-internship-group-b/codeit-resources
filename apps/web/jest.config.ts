import type { Config } from "jest";
import rootConfig from "jest-config/jest.config.base";

export const config: Config = {
  ...rootConfig,
  collectCoverageFrom: ["./components/**/*.{ts,tsx}"],
  setupFilesAfterEnv: ["./setupTests.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "./__mocks__/fileMock.ts",
  },
};

export default config;
