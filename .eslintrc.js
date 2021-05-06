module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
    },
  ],
};
