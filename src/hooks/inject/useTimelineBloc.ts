import React, { useContext } from 'react'
import { TimelineBloc } from '../../blocs/publicTimelineBloc'

export const TimelineBlocContext = React.createContext<TimelineBloc | undefined>(undefined)

export function useTimelineBloc(): TimelineBloc {
  return useContext(TimelineBlocContext)!
}
