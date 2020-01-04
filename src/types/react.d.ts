import { ComponentType } from 'react'

declare module 'react' {
  export type PropTypeOf<C extends ComponentType<any>> = C extends ComponentType<infer P> ? P : never
}
