import { fixupConfigRules } from '@eslint/compat'
import pluginJs from '@eslint/js'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    ...fixupConfigRules(pluginReactConfig),
    {
        rules: {
            'no-unused-vars': 'error',
            'no-undef': 'error',
            'react/react-in-jsx-scope': 'off',
        },
    },
    {
        ignores: ["**/node_modules/", ".git/", '.config/*', '**/build/'],
    },
]
