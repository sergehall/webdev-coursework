const tseslint = require("typescript-eslint");
const pluginTs = require("@typescript-eslint/eslint-plugin");
const prettier = require("eslint-config-prettier");
const importPlugin = require("eslint-plugin-import");
const path = require("node:path");

const base = require("../scripts/eslint-base.cjs");

module.exports = [
  { ignores: base.generatedIgnores },
  {
    files: base.codeFiles,
    languageOptions: {
      ecmaVersion: "latest",
      globals: base.globals.node,
    },
    rules: base.js.configs.recommended.rules,
  },
  {
    files: base.typescriptFiles,
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        tsconfigRootDir: path.resolve(__dirname),
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
      },
    },
    plugins: {
      "@typescript-eslint": pluginTs,
      import: importPlugin,
    },
    rules: {
      ...pluginTs.configs["eslint-recommended"].overrides[0].rules,
      ...pluginTs.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
      // TypeScript import-equals preserves CommonJS callable exports (supertest).
      "@typescript-eslint/no-require-imports": [
        "error",
        { allowAsImport: true },
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
      "import/extensions": [
        "error",
        "ignorePackages",
        { ts: "never", js: "never" },
      ],
    },
    settings: {
      "import/resolver": { node: { extensions: [".js", ".ts"] } },
    },
  },
  {
    files: ["src/**/*.ts", "test/**/*.ts"],
    languageOptions: { parserOptions: { project: "./tsconfig.json" } },
  },
  {
    files: ["**/*.{spec,test}.{js,ts}", "test/**/*.{js,ts}"],
    languageOptions: { globals: base.globals.jest },
  },
  // Keep formatting rules disabled after every other ruleset.
  prettier,
];
