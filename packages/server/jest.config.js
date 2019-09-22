module.exports = {
  preset: 'ts-jest',
  testEnvironment: './tests/NodeTestEnvironment',
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,ts}",
  ],
}