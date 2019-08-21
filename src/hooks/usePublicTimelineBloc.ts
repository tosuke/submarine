import React, { useMemo, useEffect, useContext } from 'react'
import { PublicTimelineBloc } from '../blocs/publicTimelineBloc'
import { useSeaClient } from './useSeaClient'

const PublicTLBlocCtx = React.createContext<PublicTimelineBloc | undefined>(undefined)

export const PublicTimelineBlocProvider: React.FC<{ firstLoad?: number }> = ({ children, firstLoad = 20 }) => {
  const seaClient = useSeaClient()
  const publicTLBloc = useMemo(() => new PublicTimelineBloc(seaClient, firstLoad), [])
  useEffect(() => () => publicTLBloc.dispose(), [publicTLBloc])
  return React.createElement(PublicTLBlocCtx.Provider, { value: publicTLBloc }, children)
}

export function usePublicTimelineBloc(): PublicTimelineBloc {
  return useContext(PublicTLBlocCtx)!
}
