# @nice-move/eslint-plugin-html

[ESLint] plugin to lint script tags in HTML.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[eslint]: https://eslint.org/
[npm-url]: https://www.npmjs.com/package/@nice-move/eslint-plugin-html
[npm-badge]: https://img.shields.io/npm/v/@nice-move/eslint-plugin-html.svg?style=flat-square&logo=npm
[github-url]: https://github.com/nice-move/eslint-plugin-html
[github-badge]: https://img.shields.io/npm/l/@nice-move/eslint-plugin-html.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/@nice-move/eslint-plugin-html.svg?style=flat-square&colorB=green&logo=node.js

## Installation

```bash
npm install @nice-move/eslint-plugin-html --save-dev
```

## Usage

```cjs
// eslintrc.js

module.exports = {
  extends: ['plugin:@nice-move/html/recommended']
};

// or

module.exports = {
  overrides: [
    {
      files: ['*.{htm,html}'],
      plugins: ['@nice-move/eslint-plugin-html']
    },
    {
      files: ['**/*.{htm,html}/**/html-script-legacy.js'],
      parserOptions: {
        sourceType: 'script'
      }
    },
    {
      files: ['**/*.{htm,html}/**/html-script-module.js'],
      parserOptions: {
        sourceType: 'module'
      }
    }
  ]
};
```

## Todos

- [ ] SVG support
- [ ] `vscode-eslint` support

## Tips

### Different from [eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html)

`@nice-move/eslint-plugin-html` using [processor](https://eslint.org/docs/developer-guide/working-with-plugins#processors-in-plugins) to treat `<script>` and `<script type="module">` differently.

See: https://github.com/BenoitZugmeyer/eslint-plugin-html/issues/139
