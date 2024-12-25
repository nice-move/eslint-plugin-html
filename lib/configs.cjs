'use strict';

const { files, pattern } = require('./utils.cjs');

const base = {
  overrides: [
    {
      files: ['*.html', '*.htm'],
      plugins: ['@nice-move/eslint-plugin-html'],
    },
    {
      files: [pattern(files.module)],
      env: {
        browser: true,
        commonjs: false,
        node: false,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
      rules: {
        strict: [1, 'global'],
      },
    },
    {
      files: [pattern(files.legacy)],
      env: {
        browser: true,
        commonjs: false,
        node: false,
      },
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

const recommended = {
  overrides: [
    ...base.overrides,
    {
      files: base.overrides[1].files,
      rules: {
        'import/first': 0,
      },
    },
    {
      files: base.overrides[2].files,
      rules: {
        'unicorn/prefer-module': 0,
        'import/first': 0,
        strict: [1, 'global'],
      },
    },
  ],
};

module.exports = {
  base,
  recommended,
};
