console.log("Running unit tests");

module.exports = {
  verbose: true,
  coverageDirectory: "./coverage/",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/*.js",
    "src/**/*.js"
  ],
  testMatch: ["**/tests/**/*.spec.js"]
};