import { ESLint } from 'eslint';

import plugin from '../../lib/index.cjs';

export const eslint = new ESLint({
  useEslintrc: false,
  baseConfig: {
    root: true,
    extends: ['plugin:@nice-move/html/recommended'],
  },
  plugins: {
    '@nice-move/html': plugin,
  },
});

export function html([string]) {
  // just for prettier
  return string;
}
