module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    // Disable prettier/prettier — eslint-plugin-prettier 4.x is incompatible
    // with Prettier 3.x (resolveConfig.sync removed). Run `npm run format` separately.
    'prettier/prettier': 'off',
    // Stylistic rules — enforced by Prettier, not ESLint
    'curly': 'off',
    'no-void': 'off',
    'react-native/no-inline-styles': 'off',
    // Bitwise ops are used intentionally in colorUtils (hex parsing)
    'no-bitwise': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    // Disable eslint-comments check (causes spurious warnings for no-var-requires disables)
    'eslint-comments/no-unused-disable': 'off',
  },
  ignorePatterns: ['lib/', 'example/', 'node_modules/'],
};
