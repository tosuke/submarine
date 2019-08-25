import React from 'react'
import { View, StatusBar } from 'react-native'
import { Theme, withTheme, Appbar } from 'react-native-paper'
import { ImageFile } from '../../models/file'
import { ScreenView } from '../atoms/ScreenView'
import { ImageModal } from '../molecules/ImageModal'
import color from 'color'

type Props = {
  file: ImageFile
  onBackButtonPress?: () => void
}

const FileModalScreenViewImpl: React.FC<Props & { theme: Theme }> = ({ theme, file, onBackButtonPress }) => {
  return (
    <ScreenView>
      <View style={{ position: 'absolute', top: StatusBar.currentHeight, zIndex: 100 }}>
        <Appbar.BackAction
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: color(theme.colors.background)
              .alpha(0.5)
              .string(),
          }}
          color={theme.colors.text}
          size={24}
          onPress={onBackButtonPress}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ImageModal imageUri={file.imageVariant.url} thumbnailUri={file.thumbnailVariant.url} />
      </View>
    </ScreenView>
  )
}

export const FilemodalScreenView = withTheme(FileModalScreenViewImpl)
