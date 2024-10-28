const rootConfig = require("@repo/jest-config/jest.config.base");

const config = {
  ...rootConfig,
  collectCoverageFrom: ["./components/**/*.{ts,tsx}"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|svg)$": "./__mocks__/fileMock.js",
    "^@ui/(.*)$": "<rootDir>/$1",
  },
};

module.exports = config;
