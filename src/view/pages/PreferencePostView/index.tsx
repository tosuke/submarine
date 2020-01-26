import React, { useState, useMemo, useEffect } from 'react'
import { PreferenceContext, usePreference, usePreferenceUpdate } from '../../../hooks/inject'
import { RootStackPropsList } from '../../navigators/define'
import { MainView } from './MainView'
import { debounce, throttle } from 'lodash-es'

export const PreferencePostViewScreen = ({ navigation }: RootStackPropsList['PreferencePostView']) => {
  navigation.setOptions({
    headerTitle: '投稿の表示設定',
  })

  const initialState = usePreference()
  const originalUpdate = usePreferenceUpdate()
  const debouncedUpdate = useMemo(
    () =>
      debounce((state: typeof initialState) => {
        originalUpdate(_ => state)
      }, 1000),
    [originalUpdate],
  )

  const [state, update] = useState(initialState)

  useEffect(() => {
    debouncedUpdate(state)
  }, [state])

  const throttledUpdate = useMemo(() => throttle(update, 100), [update])
  const preference = useMemo(() => ({ state, update: throttledUpdate }), [state, throttledUpdate])

  return (
    <PreferenceContext.Provider value={preference}>
      <MainView />
    </PreferenceContext.Provider>
  )
}
