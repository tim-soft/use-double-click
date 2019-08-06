/**
 * Configure Jest as the test runner for @testing-library
 *
 * @see https://jestjs.io/docs/en/configuration
 */
module.exports = {
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    '@testing-library/react/cleanup-after-each'
  ],
  collectCoverage: true
};
