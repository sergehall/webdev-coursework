// backend/eslint.config.js
const tseslint = require("typescript-eslint");
const pluginTs = require("@typescript-eslint/eslint-plugin");
const prettier = require("eslint-config-prettier");
const importPlugin = require("eslint-plugin-import");
const path = require("path");

module.exports = [
  {
    ignores: ["dist/**", ".eslintrc.ts"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: path.resolve(__dirname),
        sourceType: "module",
        ecmaVersion: 2020,
        ecmaFeatures: {
          jsx: false,
        },
        experimentalDecorators: true,
      },
    },
    plugins: {
      "@typescript-eslint": pluginTs,
      import: importPlugin,
    },
    rules: {
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          js: "never",
        },
      ],
      ...prettier.rules,
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".ts"],
        },
      },
    },
  },
];
