module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
    // 'import/resolver': {
    //   'eslint-import-resolver-typescript': false
    // }
  },
  globals: {
    test: true,
    expect: true,
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  // babelOptions: {
  //   configFile: "./babel.config.json",
  //   rootMode: "upward"
  // },
  ignorePatterns: ['.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2019,
    sourceType: 'module',
    allowImportExportEverywhere: false
  },
  rules: {
    'no-use-before-define': 0,
    'no-unused-vars': 'off',
    camelcase: 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    indent: ['off', 2],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', args: 'after-used' }],
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-use-before-define': ['warn', { functions: false, classes: false }],
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-namespace': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'standard/no-callback-literal': 0,
    // 'no-console': ['error', { allow: ['warn', 'error'] }],
    'prefer-spread': 0,
    'prefer-rest-params': 0,
    'no-prototype-builtins': 0,
    'react/jsx-uses-vars': 'warn',
    'react/prop-types': 0,
    'react/no-find-dom-node': 0,
    'no-unused-expressions': 0,
    'import/no-unresolved': [0],
    'jest/expect-expect': 'warn',
    'jest/no-commented-out-tests': 'warn',
    'jest/no-conditional-expect': 'error',
    'jest/no-deprecated-functions': 'error',
    'jest/no-disabled-tests': 'warn',
    'jest/no-done-callback': 'error',
    'jest/no-export': 'error',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/no-interpolation-in-snapshots': 'error',
    'jest/no-jasmine-globals': 'error',
    'jest/no-jest-import': 'error',
    'jest/no-mocks-import': 'error',
    'jest/no-standalone-expect': 'error',
    'jest/no-test-prefixes': 'error',
    'jest/no-try-expect': 'error',
    'jest/valid-describe': 'error',
    'jest/valid-expect-in-promise': 'error',
    'jest/valid-expect': 'error',
    'jest/valid-title': 'error'

    // 'camelcase': ['error', {allow: ['^internal_', '^unstable_']}]
  }
}
