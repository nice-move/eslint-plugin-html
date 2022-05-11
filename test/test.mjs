// eslint-disable-next-line import/no-unresolved
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

  t.deepEqual(first, {
    filename: 'fake.htm/0/html-script-module.js',
    text: "\n                          \n      'use strict';\n    ",
  });
  t.deepEqual(second, {
    filename: 'fake.htm/1/html-script-legacy.js',
    text: '\n                          \n                   \n             \n            \n      alert();\n    ',
  });
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

  t.true(
    result.messages.some(
      (message) =>
        message.ruleId === 'strict' &&
        message.column === 7 &&
        message.severity === 1,
    ),
  );
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

  t.true(
    result.messages.some(
      (message) =>
        message.ruleId === 'strict' &&
        message.column === 7 &&
        message.severity === 1,
    ),
  );
});

test('fix', (t) => {
  const code = html`
    <script>
      'use strict';
      alert();
    </script>
    abc
  `;

  const expected = html`
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

  t.true(messages.fixed);
  t.is(messages.output, expected);
  t.deepEqual(messages.messages, []);
});
