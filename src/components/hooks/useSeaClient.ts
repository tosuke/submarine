import { createContext } from 'react'
import { SeaClient } from '../../infra/seaClient'
import { useAuthBloc } from './useAuthBloc'
import { useValueObservable } from './useObservable'

export const SeaClientContext = createContext<SeaClient | undefined>(undefined)

export function useSeaClient(): SeaClient {
  const authBloc = useAuthBloc()
  const seaClient = useValueObservable(() => authBloc.seaClient$)
  return seaClient!
}
