import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  { files: ["**/*.{ts}"] },
  { languageOptions: { globals: globals.browser } },
  {
    ignores: [
      "**/*js",
      "**/*test-double.ts",
      "**/lib/**",
      "**/node_modules/**",
    ],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
