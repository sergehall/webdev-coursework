// backend/prettier.config.cjs
/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  singleQuote: false,
  printWidth: 80,
  tabWidth: 2,
  trailingComma: "es5",
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
  jsxSingleQuote: false,
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 100,
      },
    },
  ],
};
