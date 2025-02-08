import { FlatCompat } from '@eslint/eslintrc';
const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});
const eslintConfig = [
  ...compat.config({
    root: true,
    extends: ['next', 'plugin:prettier/recommended'],
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
    },
    ignorePatterns: ['.next/', 'node_modules'],
  }),
];
export default eslintConfig;
