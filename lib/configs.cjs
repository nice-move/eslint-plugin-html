'use strict';

const { files } = require('./utils.cjs');

function pattern(name) {
  return `**/*.{htm,html}/**/${name}`;
}

const base = {
  overrides: [
    {
      files: ['*.html', '*.htm'],
      plugins: ['@nice-move/eslint-plugin-html'],
    },
    {
      files: [pattern(files.module)],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
    },
    {
      files: [pattern(files.legacy)],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'script',
        ecmaFeatures: {
          impliedStrict: false,
        },
      },
    },
  ],
};

const env = {
  browser: true,
  commonjs: false,
  node: false,
};

const recommended = {
  overrides: [
    base.overrides[0],
    {
      ...base.overrides[1],
      env,
      rules: {
        strict: [1, 'global'],
      },
    },
    {
      ...base.overrides[2],
      env,
      rules: {
        strict: [1, 'global'],
        'unicorn/prefer-module': 0,
      },
    },
  ],
};

module.exports = {
  base,
  recommended,
};
