import {Jimp} from '@jimp/custom'
import {Jimp as Jimper} from './jimp'
import {Crop} from './types'

export default cropLqip

const noop = () => {
  /* intentional noop */
}

function getCoords(img: Jimp, crop: Crop) {
  const imgWidth = img.bitmap.width
  const imgHeight = img.bitmap.height

  const srcX = imgWidth * crop.left
  const srcY = imgHeight * crop.top
  const cropWidth = imgWidth - srcX - imgWidth * crop.right
  const cropHeight = imgHeight - srcY - imgHeight * crop.bottom
  return {srcX, srcY, cropWidth, cropHeight}
}

function dataUrlToBuffer(url: string) {
  return Buffer.from(url.replace(/.*?;base64,/, ''), 'base64')
}

function cropLqip(dataUrl: string, crop: Crop): Promise<string> {
  const buffer = dataUrlToBuffer(dataUrl)
  return Jimper.read(buffer).then(img => {
    const {srcX, srcY, cropWidth, cropHeight} = getCoords(img, crop)
    img.crop(srcX, srcY, cropWidth, cropHeight)
    return img.getBase64Async(img.getMIME())
  })
}

cropLqip.hasSync = true

// Super hacky. Jimp only pretends to be async - none of the callbacks except
// the initial constructor call is actually deferred until the next nick.
// Since we want a sync way to do the crop in certain cases, we lock the Jimp
// dependencies (in case of sudden deferring) and simply depend on the callbacks
// being called syncronously.
cropLqip.sync = (dataUrl: string, crop: Crop): string => {
  const buffer = dataUrlToBuffer(dataUrl)
  const img = new Jimper(buffer, noop)

  let returnValue: string = ''

  img.parseBitmap(buffer, null, (parseErr?: Error) => {
    if (parseErr) {
      throw parseErr
    }

    const {srcX, srcY, cropWidth, cropHeight} = getCoords(img, crop)
    img.crop(srcX, srcY, cropWidth, cropHeight)
    img.getBase64(img.getMIME(), (err?: Error, val?: string) => {
      if (err) {
        throw err
      }

      returnValue = val || ''
    })
  })

  return returnValue
}
