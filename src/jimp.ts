import configure from '@jimp/custom'
import jimpGif from '@jimp/gif'
import jimpJpeg from '@jimp/jpeg'
import jimpCrop from '@jimp/plugin-crop'
import jimpResize from '@jimp/plugin-resize'
import jimpPng from '@jimp/png'

export const Jimp = configure({
  types: [jimpJpeg, jimpPng, jimpGif],
  plugins: [jimpCrop, jimpResize]
})
