import {Crop} from './types'

module.exports = cropLqip

function cropLqip(dataUrl: string, crop: Crop): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => doCrop(img, crop, resolve, reject)
    img.onerror = () => reject(new Error('Failed to load LQIP'))
    img.src = dataUrl
  })
}

cropLqip.hasSync = false
cropLqip.sync = (dataUrl: string, crop: Crop): string => {
  throw new Error('Sync API not implemented in browser')
}

function doCrop(
  img: HTMLImageElement,
  crop: Crop,
  resolve: (croppedLqip: string) => void,
  reject: (reason?: any) => void
) {
  const imgWidth = img.naturalWidth
  const imgHeight = img.naturalHeight

  const srcX = imgWidth * crop.left
  const srcY = imgHeight * crop.top
  const cropWidth = imgWidth - srcX - imgWidth * crop.right
  const cropHeight = imgHeight - srcY - imgHeight * crop.bottom

  const buffer = document.createElement('canvas')
  buffer.width = cropWidth
  buffer.height = cropHeight

  const context = buffer.getContext('2d')
  if (!context) {
    reject(new Error('Failed to initialize 2D context for canvas'))
    return
  }

  context.drawImage(img, srcX, srcY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)
  resolve(buffer.toDataURL())
}
