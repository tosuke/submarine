import React, { useState, useMemo } from 'react'
import { BottomNavigation, SceneProps } from 'react-native-paper'
import { AppBottomNavigation } from '../components/atoms/AppBottomNavigation'
import { HomeScreen } from '../components/pages/HomeScreen'
import { PreferencesScreen } from '../components/pages/Preferences'
import { withNavigationOptions } from '../components/hocs/withNavigationOption'

const routes = [
  { key: 'home', title: 'ホーム', icon: 'home' },
  { key: 'preferences', title: '設定', icon: 'settings' },
]

const scenes = BottomNavigation.SceneMap({
  home: HomeScreen as React.ComponentType<SceneProps<unknown>>,
  preferences: PreferencesScreen as React.ComponentType<SceneProps<unknown>>,
})

const MainTabImpl: React.FC = () => {
  const [index, updateIndex] = useState(0)
  const state = useMemo(
    () => ({
      index,
      routes,
    }),
    [index],
  )

  return (
    <AppBottomNavigation
      keyboardHidesNavigationBar={false}
      navigationState={state}
      onIndexChange={updateIndex}
      renderScene={scenes}
    />
  )
}

export const MainTab = withNavigationOptions({ header: null })(MainTabImpl)
