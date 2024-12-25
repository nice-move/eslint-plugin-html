import globals from 'globals';

import plugin from './next.mjs';
import { files, pattern } from './utils.cjs';

export const base = [
  {
    files: ['*.html', '*.htm'],
    processor: '@nice-move/html/html',
    plugins: {
      '@nice-move/html': plugin,
    },
  },
  {
    files: [pattern(files.module)],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
    },
  },
  {
    files: [pattern(files.legacy)],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType:'script',
      globals: globals.browser,
    },
  },
];

export const recommended = [
  ...base,
  {
    files: base[1].files,
    rules: {
      'import/first': 0,
    },
  },
  {
    files: base[2].files,
    rules: {
      'unicorn/prefer-module': 0,
      'import/first': 0,
      strict: [1, 'global'],
    },
  },
];
