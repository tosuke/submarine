export type User = Readonly<{
  id: number
  name: string
  screenName: string,
  postsCount: number
  createdAt: Date
  updatedAt: Date
}>

export function userFromJson(json: any): User {
  return {
    id: json.id,
    name: json.name,
    screenName: json.screenName,
    postsCount: json.postsCount,
    createdAt: new Date(json.createdAt),
    updatedAt: new Date(json.updatedAt)
  }
}