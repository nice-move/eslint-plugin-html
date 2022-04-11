// eslint-disable-next-line import/no-unresolved
import test from 'ava';

import { eslint, html } from './helper/utils.mjs';

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
