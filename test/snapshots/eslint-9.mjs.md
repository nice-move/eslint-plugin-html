# Snapshot report for `test/eslint-9.mjs`

The actual snapshot is saved in `eslint-9.mjs.snap`.

Generated by [AVA](https://avajs.dev).

## preprocess

> Snapshot 1

    {
      filename: 'fake.htm/0/html-script-module.js',
      text: `␊
                                ␊
            'use strict';␊
          `,
    }

> Snapshot 2

    {
      filename: 'fake.htm/1/html-script-legacy.js',
      text: `␊
                                ␊
                         ␊
                   ␊
                  ␊
            alert();␊
          `,
    }

## module

> Snapshot 1

    {
      errorCount: 0,
      fatalErrorCount: 0,
      filePath: 'fake.html',
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      messages: [],
      suppressedMessages: [],
      usedDeprecatedRules: [
        {
          replacedBy: [],
          ruleId: 'padding-line-between-statements',
        },
      ],
      warningCount: 0,
    }

## legacy

> Snapshot 1

    {
      errorCount: 0,
      fatalErrorCount: 0,
      filePath: 'fake.htm',
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      messages: [
        {
          column: 7,
          endColumn: 15,
          endLine: 3,
          line: 3,
          message: 'Use the global form of \'use strict\'.',
          messageId: 'global',
          nodeType: 'Program',
          ruleId: 'strict',
          severity: 1,
        },
      ],
      source: `␊
          <script>␊
            alert();␊
          </script>␊
        `,
      suppressedMessages: [],
      usedDeprecatedRules: [
        {
          replacedBy: [],
          ruleId: 'padding-line-between-statements',
        },
      ],
      warningCount: 1,
    }

## fix

> Snapshot 1

    {
      errorCount: 0,
      fatalErrorCount: 0,
      filePath: 'fake.htm',
      fixableErrorCount: 0,
      fixableWarningCount: 0,
      messages: [],
      output: `␊
          <script>␊
            'use strict';␊
      ␊
            alert();␊
          </script>␊
          abc␊
        `,
      suppressedMessages: [],
      usedDeprecatedRules: [
        {
          replacedBy: [],
          ruleId: 'padding-line-between-statements',
        },
      ],
      warningCount: 0,
    }
