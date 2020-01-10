import { ImageFile } from './file'

export interface User {
  readonly id: string
  readonly name: string
  readonly screenName: string
  readonly avatar?: ImageFile
}
