const rootConfig = require("../../jest.config");

module.exports = {
  ...rootConfig,
  setupFilesAfterEnv: ["<rootDir>/apps/web/setupTests.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "<rootDir>/apps/web/__mocks__/fileMock.ts",
  },
};
