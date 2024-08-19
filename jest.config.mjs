/**
 * @type {import("jest").Config}
 */
const config = {
  clearMocks: true,
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!**/*.d.ts", "!src/index.ts"],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  coverageReporters: ["lcov"],
  coverageThreshold: {
    // eslint-disable-next-line no-warning-comments -- Postponed
    // TODO: Better coverage
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["./jest.setup-after-env.tsx"],
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.(?:ts|tsx)$": [
      "ts-jest",
      {
        diagnostics: false,
        isolatedModules: true
      }
    ]
  }
};

export default config;
