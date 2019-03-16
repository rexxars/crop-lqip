import * as Jimp from 'jimp'
import {Crop} from './types'

export default cropLqip

function cropLqip(dataUrl: string, crop: Crop): PromiseLike<string> {
  const buffer = Buffer.from(dataUrl.replace(/.*?;base64,/, ''), 'base64')
  return Jimp.read(buffer).then(image => doCrop(image, crop))
}

function doCrop(img: Jimp, crop: Crop) {
  const imgWidth = img.bitmap.width
  const imgHeight = img.bitmap.height

  const srcX = imgWidth * crop.left
  const srcY = imgHeight * crop.top
  const cropWidth = imgWidth - srcX - imgWidth * crop.right
  const cropHeight = imgHeight - srcY - imgHeight * crop.bottom

  img.crop(srcX, srcY, cropWidth, cropHeight)

  return img.getBase64Async(img.getMIME())
}
