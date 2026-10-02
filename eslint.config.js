import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";

import base from "./scripts/eslint-base.cjs";

export default [
  { ignores: [...base.generatedIgnores, "frontend/**", "backend/**"] },
  {
    files: base.codeFiles,
    languageOptions: {
      ecmaVersion: "latest",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: base.globals.node,
    },
    rules: base.js.configs.recommended.rules,
  },
  {
    files: base.typescriptFiles,
    languageOptions: { parser: tsParser },
    plugins: { "@typescript-eslint": tsPlugin },
    rules: {
      ...tsPlugin.configs["eslint-recommended"].overrides[0].rules,
      ...tsPlugin.configs.recommended.rules,
    },
  },
  // Keep formatting rules disabled after every other ruleset.
  prettierConfig,
];
