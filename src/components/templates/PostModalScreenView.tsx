import React, { useMemo, useCallback } from 'react'
import { Observable, EMPTY } from 'rxjs'
import { useObservableEffect } from '../../hooks/useObservableEffect'
import { ToastAndroid, ViewStyle, StatusBar, TextInput, View, TextStyle } from 'react-native'
import { ScreenView } from '../atoms/ScreenView'
import { Header } from 'react-navigation'
import { Appbar } from 'react-native-paper'
import { useTheme } from '../../hooks/useTheme'
import { KeyboardAvoidingView } from '../atoms/KeyboardAvoidingView'
import { AppHeader } from '../atoms/AppHeader'
import { headerColor } from '../color'

type Props = Partial<{
  text: string
  onChangeText: (text: string) => void
  sendButtonIsDisabled: boolean
  onSendButtonPress: () => void
  emptyTextError$: Observable<void>
}>

const viewStyle: ViewStyle = {
  flex: 1,
}

const screenViewStyle: ViewStyle = {
  ...viewStyle,
  justifyContent: 'space-between',
}

export const PostModalScreenView: React.FC<Props> = ({
  text,
  onChangeText,
  sendButtonIsDisabled,
  onSendButtonPress,
  emptyTextError$,
}) => {
  useObservableEffect(
    () => emptyTextError$ || EMPTY,
    () => {
      // TODO: iOS 対応
      ToastAndroid.show('本文を入力してください', 0.5)
    },
    [emptyTextError$],
  )

  const keyboardVerticalOffset = Header.HEIGHT + StatusBar.currentHeight!

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
  const appbarStyle = useMemo<ViewStyle>(
    () => ({
      maxHeight: 44,
      backgroundColor: headerColor(theme),
    }),
    [theme],
  )

  const onTextInputMounted = useCallback((textInput: TextInput) => {
    if (textInput == null) return
    setTimeout(() => {
      textInput.focus()
    }, 20)
  }, [])

  // TODO: iOS では InputAccessoryView を用いるとよい？これはキーボードが消える時に消えるので UI の検討が必要そう
  return (
    <ScreenView style={screenViewStyle}>
      <KeyboardAvoidingView style={viewStyle} keyboardVerticalOffset={keyboardVerticalOffset}>
        <View style={viewStyle}>
          <TextInput
            ref={onTextInputMounted}
            style={textInputStyle}
            placeholder="What's up Otaku?"
            multiline
            value={text}
            onChangeText={onChangeText}
          />
        </View>
        <Appbar style={appbarStyle}>
          <Appbar.Content title="" />
          <Appbar.Action
            icon="send"
            accessibilityLabel="Send"
            disabled={sendButtonIsDisabled}
            color={sendButtonIsDisabled ? theme.colors.disabled : theme.colors.primary}
            onPress={onSendButtonPress}
          />
        </Appbar>
      </KeyboardAvoidingView>
    </ScreenView>
  )
}

export const PostModalScreenHeaderView: React.FC<{ onCloseButtonPress?: () => void }> = ({ onCloseButtonPress }) => {
  const theme = useTheme()

  return (
    <AppHeader>
      <Appbar.Action icon="close" color={theme.colors.primary} onPress={onCloseButtonPress} />
      <Appbar.Content title="投稿" />
    </AppHeader>
  )
}
