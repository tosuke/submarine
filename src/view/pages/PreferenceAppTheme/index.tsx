import React, { useState, useEffect } from 'react'
import { InteractionManager } from 'react-native'
import { RootStackPropsList } from '../../navigators/define'
import { usePreference, usePreferenceUpdate } from '../../../hooks/inject'
import { MainView } from './MainView'

export const PreferenceAppThemeScreen = ({ navigation }: RootStackPropsList['PreferenceAppTheme']) => {
  navigation.setOptions({
    headerTitle: 'テーマ',
  })

  const { theme } = usePreference()
  const [themeState, updateTheme] = useState(theme)
  const update = usePreferenceUpdate()
  useEffect(() => {
    const handle = InteractionManager.runAfterInteractions(() => {
      update(state => ({ ...state, theme: themeState }))
    })
    return () => handle.cancel()
  }, [themeState])

  return <MainView value={themeState} onValueChange={updateTheme} />
}
