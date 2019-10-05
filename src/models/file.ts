import $, { Transformer, ok } from 'transform-ts'
import { Platform } from 'react-native'

export class File {
  constructor(readonly id: number, readonly name: string, readonly type: string, readonly variants: FileVariant[]) {}

  isImageFile(): this is ImageFile {
    return this.type === 'image'
  }

  isVideoFile(): this is VideoFile {
    return this.type === 'video'
  }

  get thumbnailVariant(): FileVariant | null {
    const thumbVariants = this.variants.filter(v => v.type === 'thumbnail')
    if (thumbVariants.length === 0) return null

    return findProperImageVariant(thumbVariants)
  }

  get imageVariant(): FileVariant | null {
    const imageVariants = this.variants.filter(v => v.type === 'image')
    if (imageVariants.length === 0) return null

    return findProperImageVariant(imageVariants)
  }

  get videoVariant(): FileVariant | null {
    const videoVariant = this.variants.find(v => v.type === 'video')
    return videoVariant || null
  }
}

function findProperImageVariant(variants: ReadonlyArray<FileVariant>): FileVariant {
  if (Platform.OS === 'android') {
    const webpVariant = variants.find(v => v.mime === 'image/webp')
    if (webpVariant) return webpVariant
  }
  const pngOrJpegVariant = variants.find(v => ['image/png', 'image/jpeg'].includes(v.mime))
  if (pngOrJpegVariant) return pngOrJpegVariant
  throw 'Invalid File'
}

export interface ImageFile extends File {
  readonly type: 'image'
  isImageFile(): true
  thumbnailVariant: FileVariant
  imageVariant: FileVariant
}

export interface VideoFile extends File {
  readonly type: 'video'
  isVideoFile(): true
  thumbnailVariant: FileVariant
  videoVariant: FileVariant
}

export interface FileVariant {
  readonly id: number
  readonly score: number
  readonly extension: string
  readonly type: string
  readonly size: number
  readonly url: string
  readonly mime: string
}

export const $FileVariant: Transformer<unknown, FileVariant> = $.obj({
  id: $.number,
  score: $.number,
  extension: $.string,
  type: $.string,
  size: $.number,
  url: $.string,
  mime: $.string,
})

export const $File: Transformer<unknown, File> = $.obj({
  id: $.number,
  name: $.string,
  type: $.string,
  variants: $.array($FileVariant),
}).compose(new Transformer(({ id, name, type, variants }) => ok(new File(id, name, type, variants)), ok))
