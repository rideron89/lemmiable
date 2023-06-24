/* eslint-env node */

module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh"],
  rules: {
    "indent": ["warn", 2],
    "react-hooks/exhaustive-deps": ["warn", {
      "additionalHooks": "useDebouncedEffect"
    }],
    "react-refresh/only-export-components": "warn",

    "quotes": ["warn", "double"],
  },
};
