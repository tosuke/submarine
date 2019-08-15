import React from 'react'
import { ViewStyle, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import { PrimaryFAB } from '../atoms/PrimaryFAB'

export const HomeScreenHeader: React.FC<{ onTouchEnd?: () => void; connectedToStream?: boolean }> = ({
  onTouchEnd,
  connectedToStream,
}) => (
  <Appbar.Header onTouchEnd={onTouchEnd}>
    <Appbar.Content title="ホーム" />
    <Appbar.Action icon="wifi" disabled={!connectedToStream} />
  </Appbar.Header>
)

export const HomeScreenFAB: React.FC<{ onPress?: () => void }> = ({ onPress }) => (
  <PrimaryFAB icon="send" onPress={onPress} />
)

const HomeScreenMainViewStyle: ViewStyle = {
  flex: 1,
  marginHorizontal: 10,
}

export const HomeScreenMainView: React.FC = ({ children }) => <View style={HomeScreenMainViewStyle}>{children}</View>
