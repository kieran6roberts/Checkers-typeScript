module.exports = {
  verbose: true,
  preset: "ts-jest",
  transform: {},
  roots: ["<rootDir>/src/"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
};