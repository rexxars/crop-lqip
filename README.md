# crop-lqip

[![npm version](https://img.shields.io/npm/v/crop-lqip.svg?style=flat-square)](https://www.npmjs.com/package/crop-lqip)[![bundle size](https://img.shields.io/bundlephobia/minzip/crop-lqip.svg?style=flat-square)](https://bundlephobia.com/result?p=crop-lqip)[![Build Status](https://img.shields.io/travis/rexxars/crop-lqip/master.svg?style=flat-square)](https://travis-ci.org/rexxars/crop-lqip)

Applies crop (+ optional hotspot) definition to an LQIP (low-quality image placeholder). Uses canvas in the browser, [jimp](https://www.npmjs.com/package/jimp) in node.

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

// Optional
const hotspot =
  height: 0.6042441207142097,
  width: 0.4084778420038537,
  x: 0.5722543352601153,
  y: 0.3194544346323949
}

cropLqip(lqip, {crop, hotspot})
  .then(croppedUrl => {
    someImageEl.src = croppedUrl
  })
  .catch(err => {
    console.error(err.message)
    someImageEl.src = lqip // Fall back to uncropped LQIP
  })
```

## Specifying width/height

Specify `aspectRatio` in options. For instance, if the full-size, original image is 4240x2832 pixels, and you asked to get a cropped/hotspotted image at 700x380, the LQIP equivalent crop would be:

```js
cropLqip(lqip, {
  crop,
  hotspot,
  aspectRatio: 700 / 380
})
```

## Scaling

Normally, you'll want to scale the LQIP by setting the width/height in CSS in a browser. Should you really want to, you can still scale it within the library - just pass a `scale` property:

```js
cropLqip(lqip, {
  crop,
  scale: 3
})
```

## Synchronous usage

** Note: ** This is only available in Node.js. Use `cropLqip.hasSync` to check whether or not the feature is available.

```js
const croppedUrl = cropLqip.sync(lqip, {crop})
someImageEl.src = croppedUrl
```

## License

MIT © [Espen Hovlandsdal](https://espen.codes/)
