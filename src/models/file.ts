import * as $ from 'transform-ts'

export interface File
  extends Readonly<{
    id: number
    name: string
    variants: FileVariant[]
  }> {}

export interface FileVariant
  extends Readonly<{
    id: number
    score: number
    extension: string
    type: string
    size: number
    url: string
    mime: string
  }> {}

export const $FileVariant: $.Transformer<unknown, FileVariant> = $.obj({
  id: $.number,
  score: $.number,
  extension: $.string,
  type: $.string,
  size: $.number,
  url: $.string,
  mime: $.string,
})

export const $File: $.Transformer<unknown, File> = $.obj({
  id: $.number,
  name: $.string,
  variants: $.array($FileVariant),
})
