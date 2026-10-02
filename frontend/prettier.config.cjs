/** @type {import("prettier").Config} */
module.exports = {
  ...require("../prettier.config.cjs"),
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};
