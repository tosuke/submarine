import * as $ from 'transform-ts'

export type File = Readonly<{
  id: number
  name: string
  variants: FileVariant[]
}>

export type FileVariant = Readonly<{
  id: number
  score: number
  extension: string
  type: string
  size: number
  url: string
  mime: string
}>

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
