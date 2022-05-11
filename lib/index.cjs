'use strict';

const { processor } = require('./processor.cjs');
const { recommended } = require('./configs.cjs');

module.exports = {
  configs: {
    recommended,
  },
  processors: {
    '.html': processor,
    '.htm': processor,
  },
};
