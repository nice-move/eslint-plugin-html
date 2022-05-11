'use strict';

const { parse, toFile } = require('./utils.cjs');

const processor = {
  preprocess(code, filename = '') {
    return parse(code).map((element, index) =>
      toFile(element, index, { code, filename }),
    );
  },
  postprocess(messages) {
    return messages.filter((message) => message.length > 0).flat();
  },
  supportsAutofix: true,
};

module.exports = { processor };
