declare module '@jimp/custom' {
  interface CreatorOptions {
    types: Function[]
    plugins: Function[]
  }

  interface Bitmap {
    width: number
    height: number
  }

  export class Jimp {
    bitmap: Bitmap

    constructor(buf: Buffer, cb: Function)
    crop(x: number, y: number, w: number, h: number): Jimp
    parseBitmap(buf: Buffer, path: string | null, cb: (err?: Error) => void): void
    getMIME(): string
    getBase64(mime: string, cb: (err?: Error, val?: string) => void): void
    getBase64Async(mime: string): Promise<string>

    static read(buf: Buffer): Promise<Jimp>
  }

  export default factory
  function factory(options: CreatorOptions): typeof Jimp
}
