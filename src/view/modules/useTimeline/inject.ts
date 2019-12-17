import { createContext, useContext } from 'react'
import { File } from '../../../models'

export type TimelineActions = {
  navigateToFileModal: (files: File[], index: number) => void
  openUrl: (url: string) => void
}

const nop = () => {}

export const TimelineActionsContext = createContext<TimelineActions>({
  navigateToFileModal: nop,
  openUrl: nop,
})

export const useTimelineActions = () => useContext(TimelineActionsContext)
