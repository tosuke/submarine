import { useAuthBloc } from './useAuthBloc'
import { useValueObservable } from '../useObservable'

export function useSeaClient() {
  const authBloc = useAuthBloc()
  const seaClient = useValueObservable(() => authBloc.seaClient$)
  return seaClient
}
