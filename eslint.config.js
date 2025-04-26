// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsParser from '@typescript-eslint/parser';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
    // Base config
    {
        ignores: ['dist', '.vite', '**/node_modules/**', '**/*.d.ts', '**/eslint.config.js', 'vite.config.ts'],
    },

    // JavaScript standard config
    js.configs.recommended,

    // React config
    {
        files: ['**/*.{jsx,tsx}'],
        plugins: {
            react: reactPlugin,
            '@typescript-eslint': tsEslintPlugin,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-key': 'error',
            'react/no-unknown-property': ['error', { ignore: ['css'] }],
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },

    // TypeScript config
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            '@typescript-eslint': tsEslintPlugin,
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        rules: {
            ...tsEslintPlugin.configs.recommended.rules,
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
        },
    },

    // React Hooks & Refresh
    {
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        },
    },

    // Prettier config (phải đặt cuối cùng)
    {
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': [
                'error',
                {
                    arrowParens: 'always',
                    semi: true,
                    trailingComma: 'all',
                    tabWidth: 4,
                    endOfLine: 'auto',
                    useTabs: false,
                    singleQuote: true,
                    printWidth: 120,
                    jsxSingleQuote: true,
                },
            ],
        },
    },
];
