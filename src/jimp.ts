import configure from '@jimp/custom'
import jimpGif from '@jimp/gif'
import jimpJpeg from '@jimp/jpeg'
import jimpCrop from '@jimp/plugin-crop'
import jimpPng from '@jimp/png'

export const Jimp = configure({
  types: [jimpJpeg, jimpPng, jimpGif],
  plugins: [jimpCrop]
})
