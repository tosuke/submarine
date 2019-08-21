import $, { Transformer, ok } from 'transform-ts'

export class File {
  constructor(readonly id: number, readonly name: string, readonly variants: FileVariant[]) {}
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
  variants: $.array($FileVariant),
}).compose(new Transformer(({ id, name, variants }) => ok(new File(id, name, variants)), ok))
