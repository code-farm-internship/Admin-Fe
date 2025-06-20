// eslint.config.js
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        ignores: [
            'dist',
            '.vite',
            '**/node_modules/**',
            '**/*.d.ts',
            '**/eslint.config.js',
            'vite.config.ts',
            'tailwind.config.js',
            'postcss.config.js',
            '.lintstagedrc.js',
            'commitlint.config.js',
        ],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: ['./tsconfig.app.json'],
                tsconfigRootDir: import.meta.dirname,
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                window: true,
                document: true,
                navigator: true,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            react: reactPlugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            prettier: prettierPlugin,
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-key': 'error',
            'react/no-unknown-property': ['error', { ignore: ['css'] }],
            'react/prop-types': 'off',
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            'prettier/prettier': [
                'warn',
                {
                    arrowParens: 'always',
                    semi: true,
                    trailingComma: 'es5',
                    tabWidth: 4,
                    endOfLine: 'auto',
                    useTabs: false,
                    singleQuote: true,
                    printWidth: 120,
                    jsxSingleQuote: true,
                },
            ],
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        files: ['*.js'],
        languageOptions: {
            ecmaVersion: 2020,
        },
    },
];
