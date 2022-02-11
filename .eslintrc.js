module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["/node_modules", ".next", "jest.config.js"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier", "jest"],
  rules: {
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/interactive-supports-focus": "off",
    "prettier/prettier": "error",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "warn",
    "react/react-in-jsx-scope": "off",
    "sort-keys": [
      "error",
      "asc",
      { caseSensitive: true, minKeys: 2, natural: false },
    ],
  },
};
