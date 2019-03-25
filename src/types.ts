export interface Coordinates {
  top: number
  bottom: number
  left: number
  right: number
}

export interface Rectangle {
  x: number
  y: number
  width: number
  height: number
}

export interface ImageSize {
  width: number
  height: number
}

export interface CropOptions {
  crop: Coordinates
  hotspot?: Rectangle
  aspectRatio?: number
  scale?: number
}
