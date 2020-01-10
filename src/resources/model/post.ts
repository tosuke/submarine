import { User } from './user'
import { Client } from './client'
import { File } from './file'

type PostBodyNode =
  | {
      kind: 'text'
      value: string
    }
  | {
      kind: 'link'
      url: string
      children: PostBody
    }
  | {
      kind: 'bold'
      children: PostBody
    }

export type PostBody = readonly PostBodyNode[]

export interface Post {
  readonly id: string
  readonly author: {
    readonly user: User
    readonly client: Client
  }
  readonly body: PostBody
  readonly files: readonly File[]
  readonly createdAt: Date
  readonly updatedAt: Date
}
