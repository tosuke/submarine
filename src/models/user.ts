import * as $ from 'transform-ts'
import { $Date } from './utils'
import { File, $File } from './file'

export type User = Readonly<{
  id: number
  name: string
  screenName: string
  postsCount: number
  createdAt: Date
  updatedAt: Date
  avatarFile: File | null
}>

export const $User: $.Transformer<unknown, User> = $.obj({
  id: $.number,
  name: $.string,
  screenName: $.string,
  postsCount: $.number,
  createdAt: $Date,
  updatedAt: $Date,
  avatarFile: $.nullable($File),
})
