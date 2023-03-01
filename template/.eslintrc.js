module.exports = {
  env: {
    es6: true,
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  ecmaFeatures: {
    modules: true,
  },
  globals: {
    wx: true,
    App: true,
    Page: true,
    getCurrentPages: true,
    getApp: true,
    Component: true,
    requirePlugin: true,
    requireMiniProgram: true,
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
  },
};
