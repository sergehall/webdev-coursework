module.exports = {
  rootDir: ".",
  testMatch: ["**/test/**/*.spec.ts", "**/?(*.)+(spec).ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
};
