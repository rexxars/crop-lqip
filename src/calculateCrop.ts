import {Coordinates, ImageSize, Rectangle} from './types'

export function calculateCrop(
  crop: Coordinates,
  hotspot: Rectangle,
  size: ImageSize,
  aspectRatio?: number
) {
  // Compute crop rect in terms of pixel coordinates in the raw source image
  const cropLeft = Math.round(crop.left * size.width)
  const cropTop = Math.round(crop.top * size.height)
  const cropCoordinates: Rectangle = {
    x: cropLeft,
    y: cropTop,
    width: Math.round(size.width - crop.right * size.width - cropLeft),
    height: Math.round(size.height - crop.bottom * size.height - cropTop)
  }

  // Compute hot spot rect in terms of pixel coordinates
  const hotSpotVerticalRadius = (hotspot.height * size.height) / 2
  const hotSpotHorizontalRadius = (hotspot.width * size.width) / 2
  const hotSpotCenterX = hotspot.x * size.width
  const hotSpotCenterY = hotspot.y * size.height
  const hotspotCoordinates: Coordinates = {
    left: hotSpotCenterX - hotSpotHorizontalRadius,
    top: hotSpotCenterY - hotSpotVerticalRadius,
    right: hotSpotCenterX + hotSpotHorizontalRadius,
    bottom: hotSpotCenterY + hotSpotVerticalRadius
  }

  return fit(cropCoordinates, hotspotCoordinates, aspectRatio)
}

function fit(crop: Rectangle, hotspot: Coordinates, aspectRatio?: number) {
  let cropRect: Rectangle

  // If we are not constraining the aspect ratio, we'll just use the whole crop
  if (!aspectRatio) {
    return crop
  }

  // If we are here, that means aspect ratio is locked and fitting will be a bit harder
  const cropAspectRatio = crop.width / crop.height

  if (cropAspectRatio > aspectRatio) {
    // The crop is wider than the desired aspect ratio. That means we are cutting from the sides
    const height = crop.height
    const width = height * aspectRatio
    const top = crop.y

    // Center output horizontally over hotspot
    const hotspotXCenter = (hotspot.right - hotspot.left) / 2 + hotspot.left
    let left = hotspotXCenter - width / 2

    // Keep output within crop
    if (left < crop.x) {
      left = crop.x
    } else if (left + width > crop.x + crop.width) {
      left = crop.x + crop.width - width
    }

    cropRect = {
      x: Math.round(left),
      y: Math.round(top),
      width: Math.round(width),
      height: Math.round(height)
    }
  } else {
    // The crop is taller than the desired ratio, we are cutting from top and bottom
    const width = crop.width
    const height = width / aspectRatio
    const left = crop.x

    // Center output vertically over hotspot
    const hotspotYCenter = (hotspot.bottom - hotspot.top) / 2 + hotspot.top
    let top = hotspotYCenter - height / 2

    // Keep output rect within crop
    if (top < crop.y) {
      top = crop.y
    } else if (top + height > crop.y + crop.height) {
      top = crop.y + crop.height - height
    }

    cropRect = {
      x: Math.max(0, Math.floor(left)),
      y: Math.max(0, Math.floor(top)),
      width: Math.round(width),
      height: Math.round(height)
    }
  }

  return cropRect
}
