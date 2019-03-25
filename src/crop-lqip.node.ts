import {Jimp} from '@jimp/custom'
import {calculateCrop} from './calculateCrop'
import {defaultHotspot} from './defaults'
import {Jimp as Jimper} from './jimp'
import {CropOptions} from './types'

export default cropLqip

const noop = () => {
  /* intentional noop */
}

function transform(img: Jimp, options: CropOptions) {
  const scale = options.scale || 1
  const imgWidth = img.bitmap.width * scale
  const imgHeight = img.bitmap.height * scale

  const rect = calculateCrop(
    options.crop,
    options.hotspot || defaultHotspot,
    {width: imgWidth, height: imgHeight},
    options.aspectRatio
  )

  if (options.scale && options.scale !== 1) {
    img.resize(img.bitmap.width * options.scale, img.bitmap.height * options.scale)
  }

  const {x, y, width, height} = rect
  img.crop(x, y, width, height)
  return img
}

function dataUrlToBuffer(url: string) {
  return Buffer.from(url.replace(/.*?;base64,/, ''), 'base64')
}

function cropLqip(dataUrl: string, options: CropOptions): Promise<string> {
  const buffer = dataUrlToBuffer(dataUrl)
  return Jimper.read(buffer)
    .then(img => transform(img, options))
    .then(img => img.getBase64Async(img.getMIME()))
}

cropLqip.hasSync = true

// Super hacky. Jimp only pretends to be async - none of the callbacks except
// the initial constructor call is actually deferred until the next nick.
// Since we want a sync way to do the crop in certain cases, we lock the Jimp
// dependencies (in case of sudden deferring) and simply depend on the callbacks
// being called syncronously.
cropLqip.sync = (dataUrl: string, options: CropOptions): string => {
  const buffer = dataUrlToBuffer(dataUrl)
  const img = new Jimper(buffer, noop)

  let returnValue: string = ''

  img.parseBitmap(buffer, null, (parseErr?: Error) => {
    if (parseErr) {
      throw parseErr
    }

    transform(img, options).getBase64(img.getMIME(), (err?: Error, val?: string) => {
      if (err) {
        throw err
      }

      returnValue = val || ''
    })
  })

  return returnValue
}
