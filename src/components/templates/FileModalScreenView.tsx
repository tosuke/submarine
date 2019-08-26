import React from 'react'
import { View, StatusBar, ViewStyle } from 'react-native'
import { Theme, withTheme, Appbar } from 'react-native-paper'
import { ImageFile } from '../../models/file'
import { ScreenView } from '../atoms/ScreenView'
import { ImageModal } from '../molecules/ImageModal'
import color from 'color'
import { ScrollView } from 'react-native-gesture-handler'

type Props = {
  file: ImageFile
  onBackButtonPress?: () => void
}

const FileModalScreenViewImpl: React.FC<Props & { theme: Theme }> = ({ theme, file, onBackButtonPress }) => {
  const backButtonStyle: ViewStyle = {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: color(theme.colors.background)
      .alpha(0.5)
      .string(),
  }

  return (
    <ScreenView>
      <View style={{ position: 'absolute', top: StatusBar.currentHeight, zIndex: 100 }}>
        <Appbar.BackAction style={backButtonStyle} color={theme.colors.text} size={24} onPress={onBackButtonPress} />
      </View>
      <ScrollView
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        pagingEnabled
        horizontal
        pinchGestureEnabled
      >
        {file.isImageFile() ? (
          <ImageModal imageUri={file.imageVariant.url} thumbnailUri={file.thumbnailVariant.url} />
        ) : null}
      </ScrollView>
    </ScreenView>
  )
}

export const FilemodalScreenView = withTheme(FileModalScreenViewImpl)
