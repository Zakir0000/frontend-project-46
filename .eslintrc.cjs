module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'eslint-config-airbnb-base',
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
    'import/extensions': ['error', 'ignorePackages'],
    'no-underscore-dangle': [2, { allow: ['__filename', '__dirname'] }],
  },
};
