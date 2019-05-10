import { Application, applicationFromJson} from './application'
import { User, userFromJson} from './user'

export type Post = Readonly<{
  id: number
  text: string
  user: User
  application: Application
  createdAt: Date
  updatedAt: Date
}>

export function postFromJson(json: any): Post {
  return {
    id: json.id,
    text: json.text,
    user: userFromJson(json.user),
    application: applicationFromJson(json.application),
    createdAt: new Date(json.createdAt),
    updatedAt: new Date(json.updatedAt)
  }
}