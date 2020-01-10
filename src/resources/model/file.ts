interface FileBase {
  readonly id: string
  readonly url: string
}

export interface ImageFile extends FileBase {
  readonly type: 'image'
  readonly thumbnailUrl: string
}

export interface VideoFile extends FileBase {
  readonly type: 'video'
  readonly thumbnailImageUrl: string
}

export interface NormalFile extends FileBase {
  readonly type: 'normal'
}

export type File = ImageFile | VideoFile | NormalFile
