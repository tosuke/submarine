import React, { useMemo, useEffect, useContext } from 'react'
import { PublicTimelineBloc, TimelineBloc } from '../../blocs/publicTimelineBloc'
import { useSeaClient } from './useSeaClient'

export const PublicTimelineBlocContext = React.createContext<TimelineBloc | undefined>(undefined)

export const PublicTimelineBlocProvider: React.FC<{ firstLoad?: number }> = ({ children, firstLoad = 20 }) => {
  const seaClient = useSeaClient()
  const publicTLBloc = useMemo(() => new PublicTimelineBloc(seaClient, firstLoad), [])
  useEffect(() => () => publicTLBloc.dispose(), [publicTLBloc])
  return React.createElement(PublicTimelineBlocContext.Provider, { value: publicTLBloc }, children)
}

export function usePublicTimelineBloc(): TimelineBloc {
  return useContext(PublicTimelineBlocContext)!
}
