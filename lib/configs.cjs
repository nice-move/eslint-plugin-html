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

const recommended = {
  overrides: [
    base.overrides[0],
    {
      files: [...base.overrides[1].files, ...base.overrides[2].files],
      env: {
        browser: true,
        commonjs: false,
        node: false,
      },
      rules: {
        strict: [1, 'global'],
        'import/first': 0,
      },
    },
    base.overrides[1],
    {
      ...base.overrides[2],
      rules: {
        'unicorn/prefer-module': 0,
      },
    },
  ],
};

module.exports = {
  base,
  recommended,
};
