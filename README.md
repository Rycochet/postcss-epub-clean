# postcss-epub-clean [![Build Status](https://travis-ci.org/Rycochet/postcss-epub-clean.png)](https://travis-ci.org/Rycochet/postcss-epub-clean)

> [PostCSS](https://github.com/postcss/postcss) plugin to produce valid epub3 css.

See the [EPUB 3 CSS Profile](http://www.idpf.org/epub/30/spec/epub30-contentdocs.html#sec-css-text) for more information.

See [postcss-epub](https://github.com/Rycochet/postcss-epub) if you're only wishing to add prefixed css properties.

@font-face requires both font-weight and font-style, so both are set to "normal" if not present (it's not clear in the spec, but required in some readers).

The "-epub-" prefix is added to anything needing it per the spec and all non "-epub-*" prefixes are removed.

**Note:** This will leave the unprefixed property.

## Installation

    $ npm install postcss-epub-clean

## Usage

```js
// dependencies
var fs = require("fs")
var postcss = require("postcss")
var epub = require("postcss-epub-clean")

// css to be processed
var css = fs.readFileSync("input.css", "utf8")

// process css
var output = postcss()
  .use(epub)
  .process(css)
  .css
```

---

## [License](LICENSE)
