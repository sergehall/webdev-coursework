const js = require("@eslint/js");
const globals = require("globals");

const codeFiles = ["**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}"];
const typescriptFiles = ["**/*.{ts,tsx,mts,cts}"];
const generatedIgnores = [
  "**/node_modules/**",
  "**/.yarn/**",
  "**/.pnp.*",
  "**/dist/**",
  "**/build/**",
  "**/coverage/**",
  "**/.nyc_output/**",
  "**/.vite/**",
  "**/.cache/**",
  "**/.storybook-out/**",
  "**/.vercel/**",
  "**/.idea/**",
  "**/.vscode/**",
  "**/.claude/**",
  "**/.temp/**",
  "**/.tmp/**",
  "**/temp/**",
  "**/tmp/**",
  "**/public/course-materials/**",
  "**/public/assets/**",
];

module.exports = { codeFiles, typescriptFiles, generatedIgnores, js, globals };
