/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  trailingComma: "es5",
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
  overrides: [{ files: "*.json", options: { printWidth: 100 } }],
};
