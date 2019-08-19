import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { View } from 'react-native'
import { DefaultTheme, Provider } from 'react-native-paper'
import { ThemeBlocProvider } from '../../src/components/hooks/useThemeBloc'
import { Post } from '../../src/components/presenters/Post'

const style = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginHorizontal: 10,
}

const CenteredView = ({ children }) => <View style={style}>{children}</View>

storiesOf('Post', module).add('default view', () => (
  <ThemeBlocProvider defaultTheme={DefaultTheme}>
    <Provider theme={DefaultTheme}>
      <CenteredView>
        <Post
          relativeTime="1s"
          post={{
            text: 'ああああ',
            user: {
              name: 'name',
              screenName: 'a',
            },
            application: {
              name: 'App',
              isAutomated: true,
            },
            files: [],
          }}
        />
      </CenteredView>
    </Provider>
  </ThemeBlocProvider>
))
