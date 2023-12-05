import { basename } from 'node:path';

import test from 'ava';
import { Linter } from 'eslint';

import { processor } from '../lib/processor.cjs';

import { eslint, html } from './helper/utils.mjs';

const linter = new Linter();

test('preprocess', (t) => {
  const code = html`
    <script type="module">
      'use strict';
    </script>
    <script>
      alert();
    </script>
  `;

  const [first, second] = processor.preprocess(code, 'fake.htm');

  t.snapshot(first);
  t.snapshot(second);
});

test('module', async (t) => {
  const code = html`
    <script type="module">
      'use strict';
    </script>
  `;

  const [result] = await eslint.lintText(code, {
    filePath: 'fake.html',
  });

  result.filePath = basename(result.filePath);

  t.snapshot(result);
});

test('legacy', async (t) => {
  const code = html`
    <script>
      alert();
    </script>
  `;

  const [result] = await eslint.lintText(code, {
    filePath: 'fake.htm',
  });

  result.filePath = basename(result.filePath);

  t.snapshot(result);
});

test('fix', (t) => {
  const code = html`
    <script>
      'use strict';
      alert();
    </script>
    abc
  `;

  const messages = linter.verifyAndFix(
    code,
    {
      rules: {
        'padding-line-between-statements': [
          'warn',
          {
            blankLine: 'always',
            prev: 'directive',
            next: '*',
          },
        ],
      },
    },
    { filename: 'fake.htm', ...processor },
  );

  t.snapshot(messages);
});
