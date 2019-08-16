import $, { Transformer } from 'transform-ts'
import { $Date } from './utils'
import { Application, $Application } from './application'
import { File, $File } from './file'
import { User, $User } from './user'

export interface Post
  extends Readonly<{
    id: number
    text: string
    user: User
    application: Application
    createdAt: Date
    updatedAt: Date
    files: File[]
  }> {}

export const $Post: Transformer<unknown, Post> = $.obj({
  id: $.number,
  text: $.string,
  user: $User,
  application: $Application,
  createdAt: $Date,
  updatedAt: $Date,
  files: $.array($File),
})
