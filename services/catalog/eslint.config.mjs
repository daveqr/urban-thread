import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{ts}"] },
  { languageOptions: { globals: globals.browser } },
  { ignores: ["**/*js", "**/*test-double.ts"] },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
