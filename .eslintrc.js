module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    'plugin:jest/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'prettier','jest'],
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    'import/resolver': {
      'eslint-import-resolver-typescript': true,
  }
  },
  globals: {
    test: true,
    expect: true,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  babelOptions: {
    configFile: "./babel.config.json",
    rootMode: "upward"
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
   'no-console': [
      error,
      {
        "allow": [
          "warn",
          "error"
        ]
      }
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
