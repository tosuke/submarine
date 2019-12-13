import React from 'react'
import { TimelineBloc } from '../../../blocs/publicTimelineBloc'
import { TimelineBlocContext } from '../../../hooks/inject'
import { TimelineActions, TimelineActionsContext } from './inject'
import { MainView } from './MainView'

export const Timeline = ({ timelineBloc, ...actions }: { timelineBloc: TimelineBloc } & TimelineActions) => {
  return (
    <TimelineBlocContext.Provider value={timelineBloc}>
      <TimelineActionsContext.Provider value={actions}>
        <MainView />
      </TimelineActionsContext.Provider>
    </TimelineBlocContext.Provider>
  )
}
