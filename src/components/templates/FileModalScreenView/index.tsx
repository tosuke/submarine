import React from 'react'
import { View, StatusBar, ViewStyle } from 'react-native'
import { Theme, withTheme, Appbar } from 'react-native-paper'
import { File } from '../../../models'
import { ScreenView } from '../../atoms/ScreenView'
import { ImageModal } from '../../molecules/ImageModal'
import color from 'color'
import { FlatList } from 'react-native-gesture-handler'

const FileModal: React.FC<{ item: File }> = ({ item: file }) => {
  if (file.isImageFile()) {
    return <ImageModal key={file.id} imageUri={file.imageVariant.url} thumbnailUri={file.thumbnailVariant.url} />
  } else {
    return null
  }
}

const keyExtractor = (file: File) => `${file.id}`

type Props = {
  files: File[]
  initialIndex?: number
  onBackButtonPress?: () => void
}

const FileModalScreenViewImpl: React.FC<Props & { theme: Theme }> = ({
  theme,
  files,
  initialIndex,
  onBackButtonPress,
}) => {
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
      <FlatList
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        initialScrollIndex={initialIndex}
        pagingEnabled
        horizontal
        pinchGestureEnabled
        data={files}
        renderItem={FileModal}
        keyExtractor={keyExtractor}
      />
    </ScreenView>
  )
}

export const FileModalScreenView = withTheme(FileModalScreenViewImpl)
