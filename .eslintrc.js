module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname, // this is the root ts directory, so the linter can correctly resolve the imports
  },
  // plugins that allow to add more rules to eslint
  // plugins: ['react', 'jest', '@typescript-eslint', 'prettier'],
  plugins: ['react', 'jest', 'prettier'],
  // base configuration we want to use. The order is important here,
  // since the last configurations will overrite the firts
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb-base',
    'airbnb-typescript',
    // 'airbnb', // Airbnb style guide
    // // 'airbnb-typescript', // Airbnb style guide adapted for Typescript support
    // 'eslint-config-airbnb-base',
    // 'airbnb/rules/react',
    // 'plugin:jest/recommended', // Jest
    // 'prettier', // Prettier for no-ts files
  ],
  env: {
    browser: true,
  },
  // these are the specific rules we use for the project
  rules: {
    'react/jsx-props-no-spreading': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/require-default-props': 0,
    'no-plusplus': 0,
    'lines-between-class-members': 0,
    'no-await-in-loop': 'off',
    'arrow-parens': [2, 'as-needed', { requireForBlockBody: false }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false }],
    'react/destructuring-assignment': 'off',
    'jsx-a11y/': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
