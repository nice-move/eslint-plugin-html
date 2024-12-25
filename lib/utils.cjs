'use strict';

const { parse } = require('node-html-parser');

const files = {
  legacy: 'html-script-legacy.js',
  module: 'html-script-module.js',
};

const selectors = [
  ':not([type])',
  '[type="module"]',
  '[type="text/javascript"]',
  '[type="application/javascript"]',
]
  .map((selector) => `script${selector}:not(:empty)`)
  .join(',');

function toMeta(item) {
  return {
    range: item.childNodes[0].range,
    text: item.childNodes[0].textContent,
    isModule: !item.attributes.nomodule && item.attributes.type === 'module',
  };
}

function replaceRange(string, [start, end], value) {
  return (
    string.slice(0, start).replaceAll(/\S/g, ' ') +
    value +
    string.slice(end, value.length).replaceAll(/\S/g, ' ')
  );
}

module.exports = {
  files,
  pattern(name) {
    return `**/*.{htm,html}/**/${name}`;
  },
  parse(raw) {
    return parse(raw)
      .querySelectorAll(selectors)
      .map((element) => toMeta(element));
  },
  toFile({ text, isModule, range }, index, { code, filename }) {
    return {
      text: replaceRange(code, range, text),
      filename: [
        filename,
        String(index),
        isModule ? files.module : files.legacy,
      ].join('/'),
    };
  },
};
