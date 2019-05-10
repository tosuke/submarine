export type Application = Readonly<{
  id: number
  name: string
}>

export function applicationFromJson(json: any): Application {
  return {
    id: json.id,
    name: json.name
  }
}