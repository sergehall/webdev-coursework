import tseslintPlugin from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import vitestPlugin from "@vitest/eslint-plugin";
import importPlugin from "eslint-plugin-import-x";
import prettierConfig from "eslint-config-prettier";

import base from "../scripts/eslint-base.cjs";

export default [
  { ignores: base.generatedIgnores },
  {
    files: base.codeFiles,
    languageOptions: {
      ecmaVersion: "latest",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: base.globals.browser,
    },
    rules: {
      ...base.js.configs.recommended.rules,
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
    },
  },
  {
    files: [
      "*.{js,mjs,cjs,ts,mts,cts}",
      "scripts/**/*.{js,mjs,cjs,ts,mts,cts}",
    ],
    languageOptions: { globals: base.globals.node },
  },
  {
    files: ["public/workers/**/*.js"],
    languageOptions: {
      globals: { ...base.globals.worker, loadPyodide: "readonly" },
    },
  },
  {
    files: base.typescriptFiles,
    languageOptions: { parser: tseslintParser },
    plugins: { "@typescript-eslint": tseslintPlugin },
    rules: {
      ...tseslintPlugin.configs["eslint-recommended"].overrides[0].rules,
      ...tseslintPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": "allow-with-description",
          "ts-expect-error": "allow-with-description",
          minimumDescriptionLength: 3,
        },
      ],
      "@typescript-eslint/consistent-type-imports": "warn",
      "no-redeclare": "off",
      "@typescript-eslint/no-redeclare": "off",
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "import-x": importPlugin,
    },
    rules: {
      "react/prop-types": "off",
      "react/no-children-prop": "error",
      "react/require-render-return": "error",
      "react/jsx-no-undef": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import-x/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],
    },
    settings: { react: { version: "detect" } },
  },
  {
    files: ["**/*.{test,spec}.{js,jsx,ts,tsx}", "setupTests.ts", "src/test/**"],
    languageOptions: {
      globals: { ...base.globals.vitest, ...base.globals.node },
    },
    plugins: { vitest: vitestPlugin },
    rules: {
      "vitest/no-disabled-tests": "warn",
      "vitest/no-focused-tests": "error",
      "vitest/no-identical-title": "error",
      "vitest/prefer-to-be": "warn",
    },
  },
  // Keep formatting rules disabled after every other ruleset.
  prettierConfig,
];
