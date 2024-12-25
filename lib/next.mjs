import pkg from '../package.json' with { type: 'json' };

import { processor } from './processor.cjs';

const { name, version } = pkg;

export default {
  meta: {
    name,
    version,
  },
  processors: {
    '.html': processor,
    '.htm': processor,
    'html': {
      meta: {
        name: 'html',
        version,
      },
      ...processor,
    },
  },
};
