import { FlatCompat } from '@eslint/eslintrc';
const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    root: true,
    extends: ['next', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
    rules: {
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'import/no-unresolved': 'error',
      'import/no-extraneous-dependencies': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-magic-numbers': 'warn',
      'prettier/prettier': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
    ignorePatterns: ['.next/', 'node_modules'],
  }),
];
export default eslintConfig;
