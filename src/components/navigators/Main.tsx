import React, { useState, useMemo } from 'react'
import { BottomNavigation, SceneProps } from 'react-native-paper'
import { HomeScreen } from '../screens/HomeScreen'
import { PreferencesScreen } from '../screens/Preferences'
import { withNavigationOptions } from '../hocs/withNavigationOption'

const routes = [{ key: 'home', title: 'ホーム', icon: 'home' }, { key: 'preferences', title: '設定', icon: 'settings' }]

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

  return <BottomNavigation navigationState={state} onIndexChange={updateIndex} renderScene={scenes} />
}

export const MainTab = withNavigationOptions({ header: null })(MainTabImpl)
