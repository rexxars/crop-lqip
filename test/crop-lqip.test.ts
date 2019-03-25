import sizeOf from 'image-size'
import cropLqip from '../src/crop-lqip.node'

const landscape = {
  source:
    'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAABwAFCP/EACoQAAEDAwEFCQEAAAAAAAAAAAECAwQABQYRBxIhMUEIExUjJDJhcXKh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAv/EABoRAAICAwAAAAAAAAAAAAAAAAABAhIRIjH/2gAMAwEAAhEDEQA/ANvHsTzJNmkpvs5ttp1B7wOH2j7oDXfRYsrc9c7LituKQrdVzT8V1VtMwNy5W65y3MguSBzQylXloB6adaO8c7P9jnxG5c65SnCRvFCUBIP9oVS4OzYfq2i2XXhGlEfoVUzt7IcRaQEeHhW7w1UTqaqGIi2P/9k=',
  crop: {
    bottom: 0.03748125937031466,
    left: 0.2,
    right: 0,
    top: 0
  },
  hotspot: {
    height: 0.6042441207142097,
    width: 0.4084778420038537,
    x: 0.5722543352601153,
    y: 0.3194544346323949
  }
}

const portrait = {
  source:
    'data:image/png;base64,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',
  crop: {
    top: 0.04106666666666665,
    bottom: 0.10640000000000005,
    left: 0.055999999999999994,
    right: 0
  },
  hotspot: {
    x: 0.6120000000000003,
    y: 0.28160000000000024,
    height: 0.4101333333333334,
    width: 0.6160000000000005
  }
}

function getImageSize(lqip: string) {
  return sizeOf(Buffer.from(lqip.replace(/.*?;base64,/, ''), 'base64'))
}

/**
 * /---------------------\
 * | New aspect ratio    |
 * \---------------------/
 */
it('[async, landscape] new aspect ratio', async () => {
  // Lets say the original (4240x2832) was asked for as 700x380,
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = landscape
  const cropped = await cropLqip(source, {
    crop,
    hotspot,
    aspectRatio: 700 / 380
  })

  expect(getImageSize(cropped)).toMatchObject({width: 16, height: 9})
})

it('[sync, landscape] new aspect ratio', () => {
  // Lets say the original (4240x2832) was asked for as 700x380,
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = landscape
  const cropped = cropLqip.sync(source, {
    crop,
    hotspot,
    aspectRatio: 700 / 380
  })

  expect(getImageSize(cropped)).toMatchObject({width: 16, height: 9})
})

it('[async, landscape] new aspect ratio, scaled', async () => {
  // Lets say the original (4240x2832) was asked for as 700x380,
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = landscape
  const cropped = await cropLqip(source, {
    crop,
    hotspot,
    aspectRatio: 700 / 380,
    scale: 2
  })

  expect(getImageSize(cropped)).toMatchObject({width: 32, height: 17})
})

it('[sync, landscape] new aspect ratio, scaled', () => {
  // Lets say the original (4240x2832) was asked for as 700x380,
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = landscape
  const cropped = cropLqip.sync(source, {
    crop,
    hotspot,
    aspectRatio: 700 / 380,
    scale: 2
  })

  expect(getImageSize(cropped)).toMatchObject({width: 32, height: 17})
})

it('[async, portrait] new aspect ratio', async () => {
  // Lets say the original (1122x1600) was asked for as 600x1200,
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = portrait
  const cropped = await cropLqip(source, {
    crop,
    hotspot,
    aspectRatio: 600 / 1200
  })

  expect(getImageSize(cropped)).toMatchObject({width: 12, height: 24})
})

it('[sync, portrait] new aspect ratio', () => {
  // Lets say the original (1122x1600) was asked for as 600x1200,
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = portrait
  const cropped = cropLqip.sync(source, {
    crop,
    hotspot,
    aspectRatio: 600 / 1200
  })

  expect(getImageSize(cropped)).toMatchObject({width: 12, height: 24})
})

it('[async, portrait] new aspect ratio, scaled', async () => {
  // Lets say the original (1122x1600) was asked for as 600x1200,
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = portrait
  const cropped = await cropLqip(source, {
    crop,
    hotspot,
    aspectRatio: 600 / 1200,
    scale: 2
  })

  expect(getImageSize(cropped)).toMatchObject({width: 24, height: 48})
})

it('[sync, portrait] new aspect ratio, scaled', () => {
  // Lets say the original (1122x1600) was asked for as 600x1200,
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = portrait
  const cropped = cropLqip.sync(source, {
    crop,
    hotspot,
    aspectRatio: 600 / 1200,
    scale: 2
  })

  expect(getImageSize(cropped)).toMatchObject({width: 24, height: 48})
})

/**
 * /---------------------\
 * | New width specified |
 * \---------------------/
 */

it('[async, landscape] new width', async () => {
  // Lets say the original (4240x2832) was asked for as 700w
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = landscape
  const cropped = await cropLqip(source, {
    crop,
    hotspot
  })

  expect(getImageSize(cropped)).toMatchObject({width: 16, height: 13})
})

it('[sync, landscape] new width', () => {
  // Lets say the original (4240x2832) was asked for as 700w
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = landscape
  const cropped = cropLqip.sync(source, {
    crop,
    hotspot
  })

  expect(getImageSize(cropped)).toMatchObject({width: 16, height: 13})
})

it('[async, landscape] new width, scaled', async () => {
  // Lets say the original (4240x2832) was asked for as 700w
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = landscape
  const cropped = await cropLqip(source, {
    crop,
    hotspot,
    scale: 3
  })

  expect(getImageSize(cropped)).toMatchObject({width: 48, height: 38})
})

it('[sync, landscape] new width, scaled', () => {
  // Lets say the original (4240x2832) was asked for as 700w
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = landscape
  const cropped = cropLqip.sync(source, {
    crop,
    hotspot,
    scale: 3
  })

  expect(getImageSize(cropped)).toMatchObject({width: 48, height: 38})
})

it('[async, portrait] new width', async () => {
  // Lets say the original (1122x1600) was asked for as 700w
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = portrait
  const cropped = await cropLqip(source, {
    crop,
    hotspot
  })

  expect(getImageSize(cropped)).toMatchObject({width: 19, height: 24})
})

it('[sync, portrait] new width', () => {
  // Lets say the original (1122x1600) was asked for as 700w
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = portrait
  const cropped = cropLqip.sync(source, {
    crop,
    hotspot
  })

  expect(getImageSize(cropped)).toMatchObject({width: 19, height: 24})
})

it('[async, portrait] new width, scaled', async () => {
  // Lets say the original (1122x1600) was asked for as 700w
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = portrait
  const cropped = await cropLqip(source, {
    crop,
    hotspot,
    scale: 3
  })

  expect(getImageSize(cropped)).toMatchObject({width: 57, height: 72})
})

it('[sync, portrait] new width, scaled', () => {
  // Lets say the original (1122x1600) was asked for as 700w
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = portrait
  const cropped = cropLqip.sync(source, {
    crop,
    hotspot,
    scale: 3
  })

  expect(getImageSize(cropped)).toMatchObject({width: 57, height: 72})
})

/**
 * /----------------------\
 * | New height specified |
 * \----------------------/
 */

it('[async, landscape] new height', async () => {
  // Lets say the original (4240x2832) was asked for as 2000h,
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = landscape
  const cropped = await cropLqip(source, {
    crop,
    hotspot
  })

  expect(getImageSize(cropped)).toMatchObject({width: 16, height: 13})
})

it('[sync, landscape] new height', () => {
  // Lets say the original (4240x2832) was asked for as 2000h,
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = landscape
  const cropped = cropLqip.sync(source, {
    crop,
    hotspot
  })

  expect(getImageSize(cropped)).toMatchObject({width: 16, height: 13})
})

it('[async, landscape] new height, scaled', async () => {
  // Lets say the original (4240x2832) was asked for as 2000h,
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = landscape
  const cropped = await cropLqip(source, {
    crop,
    hotspot,
    scale: 3
  })

  expect(getImageSize(cropped)).toMatchObject({width: 48, height: 38})
})

it('[sync, landscape] new height, scaled', () => {
  // Lets say the original (4240x2832) was asked for as 2000h,
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = landscape
  const cropped = cropLqip.sync(source, {
    crop,
    hotspot,
    scale: 3
  })

  expect(getImageSize(cropped)).toMatchObject({width: 48, height: 38})
})

it('[async, portrait] new height', async () => {
  // Lets say the original (1122x1600) was asked for as 2000h,
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = portrait
  const cropped = await cropLqip(source, {
    crop,
    hotspot
  })

  expect(getImageSize(cropped)).toMatchObject({width: 19, height: 24})
})

it('[sync, portrait] new height', () => {
  // Lets say the original (1122x1600) was asked for as 2000h,
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = portrait
  const cropped = cropLqip.sync(source, {
    crop,
    hotspot
  })

  expect(getImageSize(cropped)).toMatchObject({width: 19, height: 24})
})

it('[async, portrait] new height, scaled', async () => {
  // Lets say the original (1122x1600) was asked for as 2000h,
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = portrait
  const cropped = await cropLqip(source, {
    crop,
    hotspot,
    scale: 3
  })

  expect(getImageSize(cropped)).toMatchObject({width: 57, height: 72})
})

it('[sync, portrait] new height, scaled', () => {
  // Lets say the original (1122x1600) was asked for as 2000h,
  // and we wanted the LQIP to represent the same area of the image
  const {source, crop, hotspot} = portrait
  const cropped = cropLqip.sync(source, {
    crop,
    hotspot,
    scale: 3
  })

  expect(getImageSize(cropped)).toMatchObject({width: 57, height: 72})
})

it('reports hasSync in node', () => {
  expect(cropLqip.hasSync).toBe(true)
})
