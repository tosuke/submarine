import React, { useCallback, useMemo, useState } from 'react'
import { ViewStyle, TextInput, TextStyle, StatusBar, ToastAndroid } from 'react-native'
import { Header } from 'react-navigation'
import { Appbar } from 'react-native-paper'
import { KeyboardAvoidingView } from '../atoms/KeyboardAvoidingView'
import { ScreenView } from '../atoms/ScreenView'
import { withNavigationOptions } from '../hocs/withNavigationOption'
import { useNaviagtion } from '../hooks/useNavigation'
import { useTheme } from '../hooks/useTheme'
import { usePostSendBloc } from '../hooks/usePostSendBloc'
import { useObservableEffect } from '../hooks/useObservableEffect';

const screenStyle: ViewStyle = {
  flex: 1,
  justifyContent: 'space-between',
}

const PostModalScreenImpl: React.FC = () => {
  const theme = useTheme()
  const textInputStyle = useMemo<TextStyle>(
    () => ({
      marginHorizontal: 10,
      marginTop: 5,
      color: theme.colors.text,
      fontSize: 18,
    }),
    [theme],
  )

  const { navigate } = useNaviagtion()

  const postSendBloc = usePostSendBloc()
  const [text, updateText] = useState('')
  const onPostButtonPressed = useCallback(() => {
    postSendBloc.send$.next(text)
  }, [text])

  useObservableEffect(() => postSendBloc.sendComplete$, () => {
    navigate('Main')
  }, [postSendBloc])

  useObservableEffect(() => postSendBloc.emptyTextError$, () => {
    ToastAndroid.show('本文を入力してください', 0.5)
  })

  return (
    <ScreenView style={screenStyle}>
      <KeyboardAvoidingView style={{ flex: 1 }} keyboardVerticalOffset={Header.HEIGHT + StatusBar.currentHeight!}>
        <ScreenView style={{ flex: 1 }}>
          <TextInput
            style={textInputStyle}
            placeholder="What's up Otaku?"
            autoFocus={true}
            multiline={true}
            value={text}
            onChangeText={updateText}
          />
        </ScreenView>
        <Appbar style={{ maxHeight: 44 }}>
          <Appbar.Content title="" />
          <Appbar.Action icon="send" onPress={onPostButtonPressed} />
        </Appbar>
      </KeyboardAvoidingView>
    </ScreenView>
  )
}

const PostModalScreenHeader: React.FC = () => {
  const { navigate } = useNaviagtion()
  const onBackButtonPressed = useCallback(() => {
    navigate('Main')
  }, [navigate])
  return (
    <Appbar.Header>
      <Appbar.Action icon="close" onPress={onBackButtonPressed} />
      <Appbar.Content title="投稿" />
    </Appbar.Header>
  )
}

export const PostModalScreen = withNavigationOptions({
  header: <PostModalScreenHeader />,
})(PostModalScreenImpl)
