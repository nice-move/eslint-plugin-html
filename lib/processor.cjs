'use strict';

const { join } = require('path');
const { parse } = require('node-html-parser');
const { files } = require('./recommended.cjs');

function toMeta(item) {
  return {
    range: item.childNodes[0].range,
    text: item.childNodes[0].textContent,
    isModule: !item.attributes.nomodule && item.attributes.type === 'module',
  };
}

function toFile({ text, range, isModule }, index, { code, filename }) {
  const type = isModule ? files.module : files.legacy;

  const start = code.slice(0, range[0]).replace(/\S/g, ' ');

  const end = code.slice(range[1]).replace(/\S/g, ' ');

  return {
    text: start + text + end,
    filename: join(filename, String(index), type),
  };
}

const selectors = [
  ':not([type])',
  '[type="module"]',
  '[type="text/javascript"]',
  '[type="application/javascript"]',
]
  .map((selector) => `script${selector}:not(:empty)`)
  .join(',');

const processor = {
  preprocess(code, filename = '') {
    return parse(code)
      .querySelectorAll(selectors)
      .map((element) => toMeta(element))
      .map((element, index) => toFile(element, index, { code, filename }));
  },
  postprocess(messages) {
    return messages.filter((message) => message.length > 0).flat();
  },
  supportsAutofix: true,
};

module.exports = { processor };
