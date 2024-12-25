import test from 'ava';
import { basename } from 'node:path';
import { processor } from '../lib/processor.cjs';

import { eslint8 as eslint, ESLint8 as ESLint, html } from './helper/utils.mjs';

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

  const result = await eslint.lintText(code, {
    filePath: 'fake.html',
  });

  const io = structuredClone(result[0]);

  io.filePath = basename(io.filePath);

  t.snapshot(io);
});

test('legacy', async (t) => {
  const code = html`
    <script>
      alert();
    </script>
  `;

  const result = await eslint.lintText(code, {
    filePath: 'fake.htm',
  });

  const io = structuredClone(result[0]);

  io.filePath = basename(io.filePath);

  t.snapshot(io);
});

test('fix', async (t) => {
  const code = html`
    <script>
      'use strict';
      alert();
    </script>
    abc
  `;

  const result = await eslint.lintText(code, { filePath: 'fake.htm' });

  await ESLint.outputFixes(result);

  const io = structuredClone(result[0]);

  io.filePath = basename(io.filePath);

  t.snapshot(io);
});
