// frontend/eslint.config.js

import js from "@eslint/js";
import tseslintPlugin from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import vitestPlugin from "eslint-plugin-vitest";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

const { browser, node, jest } = globals;

export default [
  {
    ignores: [
      "node_modules/**",
      ".pnp.*",
      ".yarn/**",
      "dist/**",
      "build/**",
      "coverage/**",
      ".vite/**",
      ".storybook-out/**",
      "__mocks__/**",
      "*.config.js",
      "*.config.cjs",
      "*.config.mjs",
      "*.log",
      ".cache/**",
      "temp/**",
      "tmp/**",
      "public/code-playground/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...browser,
        ...node,
        ...jest,
        global: "readonly",
        IntersectionObserver: "readonly",
        IntersectionObserverCallback: "readonly",
        IntersectionObserverInit: "readonly",
        RequestInit: "readonly",
        importScripts: "readonly",
        loadPyodide: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslintPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
      vitest: vitestPlugin,
    },
    rules: {
      ...tseslintPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,

      "prettier/prettier": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "no-redeclare": "off",
      "@typescript-eslint/no-redeclare": "off",

      "react/prop-types": "off",
      "react/no-children-prop": "error",
      "react/require-render-return": "error",
      "react/jsx-no-undef": "error",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "vitest/no-disabled-tests": "warn",
      "vitest/no-focused-tests": "error",
      "vitest/no-identical-title": "error",
      "vitest/prefer-to-be": "warn",

      "import/order": [
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
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  prettierConfig,
];
