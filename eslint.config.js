// eslint.config.js
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config({
    extends: [...tseslint.configs.strictTypeChecked],
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
    ],

    languageOptions: {
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
        react: reactPlugin,
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        prettier: prettierPlugin,
    },

    rules: {
        // React plugin rules
        ...reactPlugin.configs.recommended.rules,
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-key': 'error',
        'react/no-unknown-property': ['error', { ignore: ['css'] }],

        // React Hooks
        ...reactHooks.configs.recommended.rules,

        // React Refresh
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

        // TypeScript-specific overrides
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

        // Prettier rules
        'prettier/prettier': [
            'warn',
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

    settings: {
        react: {
            version: 'detect',
        },
    },
});
