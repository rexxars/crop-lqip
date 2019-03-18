const Jimp = require('jimp')
const noop = () => null

const source =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEz0lEQVQ4ywHEBDv7AKqkm8fDvuDe2+Db1cnAs7CjjaSWe6CSe5yNe6iYgsSzlsm6mcO4msbAqM7MuNbVxs/Mvb24qLOrna2lmACknYyup5q7tqzGwrq/urKvpJWpmYGgjXWQfGeTfWWnkHO3oYDDs5PHv6THxbDR0cLU0sO+uamspZWnn5EAmZJ+npeCnpeFko6BgXx3hn11mIZ2hXFfZ1NEX0s6ZlA9fWZNpI5vva+SwLqjxMGuzMm4w72sr6iWpZ6NAH13aYZ/boR+bG1pW1FNR15VUHxqYXNeVVtGP085MVM7L2dNO490WbOghMK5pL65pr65p7+5qbCpmZqThABdWVNlYFdlYFZWUktFQj5UTEt6aGiMcnOCYl93UUmFWkugeGG7m37MuJ7TyrvIw7a3saC2sKC0r6OemI0ARUM+SkhBSkdCQ0A9Pjs6WlFTjXiEpYSWnXB0nGRYtXhj2aOG7cak6c+w4NTE2tbNxsKyu7ajvLipr6ibADQzLzg3MTg2MTQyLzQyMVdNVJB4kaR+nJxqcaRnWr57Zd2fg/LAnu7JpuDMuOTf19rWyMK9qK+olKKZhwAqKiYsLCgsLCcqKiYqKShGPUx8ZYaUb4yNX2OVXlGra1i7fGXKlXrYro/dxrHm39XXzby2o4eeiWuXh2wAJCQhJiUiJSUiJCQhKScmRTlIcFh2fV5wbUxLdEtBj1pLlGBOjWNSq4Rs1bmm697R4MepyJ1ovJBZu5xvACAgHSIhHyEhHyEhHjAoJlc/SndWb3ZWY2RGRGZEP4dYTZVkVIpgUKV5Y9SxnO7czOvLotynYtmlXty2fgAdHBoeHhweHhweHhwvJSRdPUaAVmyIXWqCVlN5TkyTXlm3e2q/hW7OlXvku6bs2cvRt5eshFGwi1fNsIEAGhoYHBwaHBwaGhsZJB8dSjM5dk9gjl9okl1Wgk9LjldUuXhn0I1y256B4ryo1se7pZJ+cVg+d2VMopV6ABgYFhkZFxkZFxgYFxoZFywjJVY9Rn5VV4dVS3RFPnZFQJddTrR2Xb+Kb7GWhJCGe2xdTllDMWpbSpOLewAWFhQXFxUXFxQXFxUVFhMZGBc8LzNsS0x5TkZrPzluPTeIUEOialSkeWB+bFtRTD9EOSxXQjKBbVm0pY0AFRUTFhYUFhYTFhYTFRYUIyMiTUJHb1NWdk9Kc0Y/e0Y+mFxLrXZdnHpkdGlXY11Kc2ZOln9iwaeD4sqiABQUERQUERcXFCAgHjEwL1RSV4B1gohudndUUXFJQoBQQ6NsVb2PdrGbiJiRgKCYgb2tkNe8lunKnfPVpwAWFRMeHhsyMS5QTkpraGaJhIuakqOVg493XV1lRT91TUCYbFm6mYnKuq3PyLfY0r7i2MDeyqzTuJTPsowAQkA/V1RRcm5ogHt1hH96j4qKioSPgXeFbVxkYUZFcE1Eh2Rcl35+r5+d1Mq76eLM6+XN3dO8tqaQkHxmAJCLipeRi5aPhYJ8c3ZwaXp2cW9rbl5XYldIVVtGTGJKS2lRVG9aY4RzebSpn9fPud/ZwNzVvrasmX9wYACqo56el4yNhXl0bmVtZ19wbGRgXFxJQ0pMOkVVQEpSREtWSE1dSVBsV1ybjobHv6rTy7LTzLW7sJ2Lfm1zSjgV38p9xwAAAABJRU5ErkJggg=='

const buffer = Buffer.from(source.replace(/.*?;base64,/, ''), 'base64')

process.nextTick(() => {
  console.log('scheduled next tick')
})

console.log('load it')

const img = new Jimp(buffer, noop)
img.parseBitmap(buffer, null, () => {
  console.log('yeah done')
  img.crop(0, 0, 10, 10)
  img.getBase64(img.getMIME(), (lolErr, lolVal) => {
    console.log('lol val')
    console.log(lolVal)
  })
})

console.log('actual next tick')

/*
new Jimp(buffer, (err, img) => {
  console.log('lol load')
  img.crop(0, 0, 10, 10)
  img.getBase64(img.getMIME(), (lolErr, lolVal) => {
    console.log('lol val')
    console.log(lolVal)
  })
})
*/
