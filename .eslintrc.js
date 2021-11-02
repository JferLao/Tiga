module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  ignorePatterns: ['.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2019,
    sourceType: 'module',
    allowImportExportEverywhere: false,
    project: './tsconfig.json',
  },
  rules: {
    'linebreak-style': 'off',
    'object-curly-newline': [
      'error',
      {
        consistent: true,
      },
    ],
    'no-plusplus': 0,
    'no-underscore-dangle': 0,
    'react/static-property-placement': 0,
    'import/prefer-default-export': 0,
    'react/jsx-props-no-spreading': 1,
    'prettier/prettier': 1,
    '@typescript-eslint/no-empty-interface': 1,
    // 统一使用 LF
    'linebreak-style': ['error', 'unix'],
    'no-param-reassign': 0,
  },
};
