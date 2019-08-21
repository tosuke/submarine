import $, { Transformer, ok } from 'transform-ts'
import { $Date } from './utils'
import { File, $File } from './file'

export interface User
  extends Readonly<{
    id: number
    name: string
    screenName: string
    postsCount: number
    createdAt: Date
    updatedAt: Date
    avatarFile: File | null
  }> {}

export class User {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly screenName: string,
    readonly postsCount: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly avatarFile: File | null,
  ) {}
}

export const $User: Transformer<unknown, User> = $.obj({
  id: $.number,
  name: $.string,
  screenName: $.string,
  postsCount: $.number,
  createdAt: $Date,
  updatedAt: $Date,
  avatarFile: $.nullable($File),
}).compose(
  new Transformer(
    ({ id, name, screenName, postsCount, createdAt, updatedAt, avatarFile }) =>
      ok(new User(id, name, screenName, postsCount, createdAt, updatedAt, avatarFile)),
    ok,
  ),
)
