import {calculateCrop} from './calculateCrop'
import {defaultHotspot} from './defaults'
import {Coordinates, CropOptions} from './types'

module.exports = cropLqip

function cropLqip(dataUrl: string, options: CropOptions): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => doCrop(img, options, resolve)
    img.onerror = () => reject(new Error('Failed to load LQIP'))
    img.src = dataUrl
  })
}

cropLqip.hasSync = false
cropLqip.sync = (dataUrl: string, crop: Coordinates): string => {
  throw new Error('Sync API not implemented in browser')
}

function doCrop(
  img: HTMLImageElement,
  options: CropOptions,
  resolve: (croppedLqip: string) => void
) {
  const {crop, hotspot, aspectRatio} = options
  const scale = options.scale || 1

  const imgWidth = img.naturalWidth * scale
  const imgHeight = img.naturalHeight * scale

  const rect = calculateCrop(
    crop,
    hotspot || defaultHotspot,
    {width: imgWidth, height: imgHeight},
    aspectRatio
  )

  let imgSource: HTMLImageElement | HTMLCanvasElement = img
  if (options.scale && options.scale !== 1) {
    const resized = document.createElement('canvas')
    resized.width = imgWidth
    resized.height = imgHeight
    const resizeCtx = resized.getContext('2d') as CanvasRenderingContext2D
    resizeCtx.drawImage(img, 0, 0, imgWidth, imgHeight)
    imgSource = resized
  }

  const buffer = document.createElement('canvas')
  buffer.width = rect.width
  buffer.height = rect.height

  const context = buffer.getContext('2d') as CanvasRenderingContext2D
  context.drawImage(
    imgSource,
    rect.x,
    rect.y,
    rect.width,
    rect.height,
    0,
    0,
    rect.width,
    rect.height
  )

  resolve(buffer.toDataURL())
}
