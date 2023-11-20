module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: "airbnb-base",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "quote-props": "off",
    quotes: ["error", "double"],
    singlequote: "off",
    "no-undef": "off",
    "comma-dangle": "off",
    "operator-linebreak": "off",
    "no-nested-ternary": "off",
    indent: "off",
    "no-console": "off",
    "no-unused-vars": "off",
    "one-var": "off",
    "one-var-declaration-per-line": "off",

    "import/extensions": ["error", "ignorePackages"],
    "no-underscore-dangle": [2, { allow: ["__filename", "__dirname"] }],
  },
};
