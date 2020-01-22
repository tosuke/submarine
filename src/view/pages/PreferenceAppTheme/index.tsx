import React, { useState, useEffect } from 'react'
import { InteractionManager } from 'react-native'
import { RootStackPropsList } from '../../navigators/define'
import { usePreference, usePreferenceDispatch, PreferenceType } from '../../../hooks/inject'
import { MainView } from './MainView'

export const PreferenceAppThemeScreen = ({ navigation }: RootStackPropsList['PreferenceAppTheme']) => {
  navigation.setOptions({
    headerTitle: '',
  })

  const { theme } = usePreference()
  const [themeState, updateTheme] = useState(theme)
  const dispatch = usePreferenceDispatch()
  useEffect(() => {
    const handle = InteractionManager.runAfterInteractions(() => {
      dispatch({ type: 'themeUpdated', theme: themeState as PreferenceType['theme'] })
    })
    return () => handle.cancel()
  }, [themeState])

  return <MainView value={themeState} onValueChange={updateTheme} />
}
