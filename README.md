# crop-lqip

[![npm version](https://img.shields.io/npm/v/crop-lqip.svg?style=flat-square)](https://www.npmjs.com/package/crop-lqip)[![bundle size](https://img.shields.io/bundlephobia/minzip/crop-lqip.svg?style=flat-square)](https://bundlephobia.com/result?p=crop-lqip)[![Build Status](https://img.shields.io/travis/rexxars/crop-lqip/master.svg?style=flat-square)](https://travis-ci.org/rexxars/crop-lqip)

Applies crop definition to an LQIP (low-quality image placeholder). Uses canvas in the browser, [jimp](https://www.npmjs.com/package/jimp) in node.

## Targets

- Node.js >= 8
- All modern browsers (Edge, Chrome, Safari, Firefox etc)

## Installation

```bash
npm install --save crop-lqip
```

## Usage

```js
const cropLqip = require('crop-lqip')

const lqip = 'data:image/png;base64,iVBO...'
const crop = {
  top: 0.046875,
  left: 0.18164,
  bottom: 0.132812,
  right: 0.175781
}

cropLqip(lqip, crop)
  .then(croppedUrl => {
    someImageEl.src = croppedUrl
  })
  .catch(err => {
    console.error(err.message)
    someImageEl.src = lqip // Fall back to uncropped LQIP
  })
```

## Synchronous usage

** Note: ** This is only available in Node.js. Use `cropLqip.hasSync` to check whether or not the feature is available.

```js
const croppedUrl = cropLqip.sync(lqip, crop)
someImageEl.src = croppedUrl
```

## License

MIT © [Espen Hovlandsdal](https://espen.codes/)
