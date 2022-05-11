'use strict';

const { files } = require('./utils.cjs');

const extensions = '*.{htm,html}';

function pattern(name) {
  return `**/${extensions}/**/${name}`;
}

const recommended = {
  overrides: [
    {
      files: [extensions],
      plugins: ['@nice-move/eslint-plugin-html'],
    },
    {
      files: [pattern(files.legacy), pattern(files.module)],
      env: {
        browser: true,
        commonjs: false,
        node: false,
      },
      parserOptions: {
        ecmaVersion: 'latest',
      },
      rules: {
        strict: [1, 'global'],
      },
    },
    {
      files: [pattern(files.legacy)],
      parserOptions: {
        sourceType: 'script',
        ecmaFeatures: {
          impliedStrict: false,
        },
      },
    },
    {
      files: [pattern(files.module)],
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
    },
  ],
};

module.exports = { recommended, files };
