module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: ["@typescript-eslint", "react"],
  rules: {
    // setup a custom rules
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-var-requires": 0,
  }
};
