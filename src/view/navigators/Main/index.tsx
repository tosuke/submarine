import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { RootStackPropsList, RootStack } from '../define'
import { MainTab, StackNavigationContext } from './defines'
import { HomeScreen } from '../../pages/HomeScreen'
import { PreferenceScreen } from '../../pages/PreferanceScreen'

const MainNavigator = ({ navigation }: RootStackPropsList['Main']) => {
  return (
    <StackNavigationContext.Provider value={navigation}>
      <MainTab.Navigator initialRouteName="Home">
        <MainTab.Screen
          name="Home"
          options={{
            title: 'ホーム',
            tabBarIcon: props => <MaterialIcons {...props} name="home" />,
          }}
          component={HomeScreen}
        />
        <MainTab.Screen
          name="Preference"
          options={{
            title: '設定',
            tabBarIcon: props => <MaterialIcons {...props} name="settings" />,
          }}
          component={PreferenceScreen}
        />
      </MainTab.Navigator>
    </StackNavigationContext.Provider>
  )
}

export const MainStackScreen = () => <RootStack.Screen name="Main" component={MainNavigator} />
