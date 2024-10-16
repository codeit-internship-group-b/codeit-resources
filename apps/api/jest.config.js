const rootConfig = require("@repo/jest-config/jest.config.base");

const config = {
  ...rootConfig,
  preset: "ts-jest",
  testEnvironment: "node",
};

module.exports = config;
