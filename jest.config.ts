import type { Config } from "jest";

const config: Config = {
  // Stop running tests after `n` failures
  bail: 1,

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // todo
  collectCoverageFrom: ["apps/web/src/components/**/*.{ts,tsx}"],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ["/node_modules/"],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // An array of file extensions your modules use
  moduleFileExtensions: ["js", "mjs", "cjs", "jsx", "ts", "tsx", "json", "node"],

  // The paths to modules that run some code to configure or set up the testing environment before each test
  // setupFiles: [],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  // todo
  setupFilesAfterEnv: [],

  // The glob patterns Jest uses to detect test files
  testMatch: ["**/?(*.)+(test).[tj]s?(x)"],

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};

export default config;
