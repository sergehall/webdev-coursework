module.exports = {
  rootDir: ".",
  roots: ["<rootDir>/src", "<rootDir>/test"],
  testMatch: ["<rootDir>/src/**/*.spec.ts", "<rootDir>/test/**/*.spec.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  clearMocks: true,
  restoreMocks: true,
  resetMocks: false,
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.spec.ts",
    "!src/main.ts",
    "!src/db/data-source.ts",
    "!src/db/migrations/**",
    "!src/**/*.module.ts",
    "!src/**/dto/**",
    "!src/**/entities/**",
  ],
  coveragePathIgnorePatterns: ["/dist/", "/public/"],
  coverageDirectory: "../coverage",
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 70,
      functions: 65,
      lines: 80,
    },
  },
  testEnvironment: "node",
};
