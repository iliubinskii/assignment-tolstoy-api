/**
 * @type {import("jest").Config}
 */
const config = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!**/*.d.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  coverageReporters: ["lcov"],
  coverageThreshold: {
    // eslint-disable-next-line no-warning-comments -- Postponed
    // TODO: Better coverage
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10
    }
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["./jest.setup-after-env.tsx"],
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/"]
};

export default config;
