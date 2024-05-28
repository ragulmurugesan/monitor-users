import { fixupConfigRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";
import tseslint from "typescript-eslint";


export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off"
    }
  },
  {
    settings: {
      react: {
        version: '18.3.1',
      },
    }
  }
];