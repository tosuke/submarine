import React from 'react'
import { ViewStyle, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import { PrimaryFAB } from '../atoms/PrimaryFAB'
import { AppHeader } from '../atoms/AppHeader'

export const HomeScreenHeader: React.FC<{ onTouchEnd?: () => void; connectedToStream?: boolean }> = ({
  onTouchEnd,
  connectedToStream,
}) => (
  <AppHeader onTouchEnd={onTouchEnd}>
    <Appbar.Content title="ホーム" />
    <Appbar.Action icon="wifi" disabled={!connectedToStream} />
  </AppHeader>
)

const SendIcon: React.FC<{ size?: number; color?: string }> = ({ size, color }) => (
  <MaterialIcons style={{ paddingLeft: 3 }} name="send" size={size} color={color} />
)

export const HomeScreenFAB: React.FC<{ onPress?: () => void }> = ({ onPress }) => (
  <PrimaryFAB icon={SendIcon} onPress={onPress} />
)

const HomeScreenMainViewStyle: ViewStyle = {
  flex: 1,
  marginHorizontal: 10,
}

export const HomeScreenMainView: React.FC = ({ children }) => <View style={HomeScreenMainViewStyle}>{children}</View>
