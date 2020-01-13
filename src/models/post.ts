import $, { Transformer, ok } from 'transform-ts'
import parseText, { NodeType } from '@linkage-community/bottlemail'
import { $Date } from './utils'
import { Application, $Application } from './application'
import { File, $File } from './file'
import { User, $User } from './user'

export class Post {
  constructor(
    readonly id: number,
    readonly text: string,
    readonly user: User,
    readonly application: Application,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly files: File[],
  ) {}

  parse(): NodeType[] {
    return parseText(this.text)
  }
}

export const $Post: Transformer<unknown, Post> = $.obj({
  id: $.number,
  text: $.string,
  user: $User,
  application: $Application,
  createdAt: $Date,
  updatedAt: $Date,
  files: $.array($File),
}).compose(
  Transformer.from(({ id, text, user, application, createdAt, updatedAt, files }) =>
    ok(new Post(id, text, user, application, createdAt, updatedAt, files)),
  ),
)
