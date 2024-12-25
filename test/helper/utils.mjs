import { ESLint as ESLint8 } from 'eslint';
import { ESLint as ESLint9 } from 'eslint-9';

import { recommended } from '../../lib/configs-next.mjs';
import plugin from '../../lib/index.cjs';

export { ESLint8, ESLint9 };

const rules = {
  'padding-line-between-statements': [
    'warn',
    {
      blankLine: 'always',
      prev: 'directive',
      next: '*',
    },
  ],
};

export const eslint8 = new ESLint8({
  useEslintrc: false,
  fix: true,
  baseConfig: {
    root: true,
    rules,
    extends: ['plugin:@nice-move/html/recommended'],
  },
  plugins: {
    '@nice-move/html': plugin,
  },
});

export const eslint9 = new ESLint9({
  overrideConfigFile: true,
  fix: true,
  baseConfig: [...recommended, { rules }],
});

export function html([string]) {
  // just for prettier
  return string;
}
