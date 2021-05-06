module.exports = {
  verbose: true,
  collectCoverageFrom: ['src/**/*.{ts}', '!**/node_modules/**', '!src/__tests__/**'],
  testRegex: 'src/__tests__/.*spec\\.tsx?$',
  setupFiles: ['./src/__tests__/setup.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
};
