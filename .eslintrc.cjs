module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'quote-props': 'off',
    'singlequote': 'off',
    'no-undef': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'one-var': 'off',
    'one-var-declaration-per-line': 'off',

    'import/extensions': ['error', 'ignorePackages'],
    'no-underscore-dangle': [2, { allow: ['__filename', '__dirname'] }],
  },
};
