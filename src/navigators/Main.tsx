import React, { useState, useMemo } from 'react'
import { BottomNavigation } from 'react-native-paper'
import { AppBottomNavigation } from '../view/design/AppBottomNavigation'
import { HomeScreen } from '../view/pages/HomeScreen'
import { PreferenceScreen } from '../view/pages/PreferanceScreen'
import { withNavigationOptions } from '../view/hocs/withNavigationOption'

const routes = [
  { key: 'home', title: 'ホーム', icon: 'home' },
  { key: 'preferences', title: '設定', icon: 'settings' },
]

type SceneProps = {
  route: any
  jumpTo: (key: string) => void
}

const scenes = BottomNavigation.SceneMap({
  home: HomeScreen as React.ComponentType<SceneProps>,
  preferences: PreferenceScreen as React.ComponentType<SceneProps>,
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
