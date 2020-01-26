import React from 'react'
import { Text, useTheme } from 'react-native-paper'
import { memoize } from 'lodash-es'
import { ViewStyle, ImageStyle, TextStyle, View, Image } from 'react-native'
import { usePreference } from '../../../../hooks/inject'

const createAvatarViewStyle = memoize(
  (size: number, dark: boolean): ViewStyle => ({
    borderRadius: 4,
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: dark ? '#000' : '#fff',
  }),
)

const createAvatarImageStyle = memoize(
  (size: number): ImageStyle => ({
    borderRadius: 4,
    width: size,
    height: size,
  }),
)

const createAvatarTextStyle = memoize(
  (size: number, dark: boolean): TextStyle => ({
    color: dark ? '#fff' : '#000',
    fontSize: size / 2,
    lineHeight: size,
  }),
)

export const Avatar: React.FC<{ name?: string; thumbnailUri?: string }> = ({ name, thumbnailUri }) => {
  const theme = useTheme()
  const { postAvatarSize } = usePreference()

  const avatarViewStyle = createAvatarViewStyle(postAvatarSize, theme.dark)
  const avatarImageStyle = createAvatarImageStyle(postAvatarSize)
  const avatarTextStyle = createAvatarTextStyle(postAvatarSize, theme.dark)

  return (
    <View style={avatarViewStyle}>
      {thumbnailUri ? (
        <Image style={avatarImageStyle} source={{ uri: thumbnailUri, width: postAvatarSize, height: postAvatarSize }} />
      ) : (
        <Text style={avatarTextStyle}>{String.fromCodePoint((name || ' ').codePointAt(0)!)}</Text>
      )}
    </View>
  )
}
