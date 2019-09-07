import React, { useState, useCallback } from 'react'
import { ViewStyle, View, Dimensions, StatusBar } from 'react-native'
import { useFullScreenImageSize } from '../../hooks/useFullScreenImageSize'
import { Video } from 'expo-av'

export const VideoModal: React.FC<{ style?: ViewStyle; videoUri: string; thumbnailUri: string }> = ({
  style,
  videoUri,
  thumbnailUri,
}) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('screen')
  const videoSizeStyle = useFullScreenImageSize(thumbnailUri)

  const [usePoster, setUsePoster] = useState(true)
  const readyForDisplay = useCallback(() => setUsePoster(false), [])

  return (
    <View
      style={[
        style,
        {
          width: screenWidth,
          height: screenHeight - (StatusBar.currentHeight || 0),
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <Video
        style={videoSizeStyle}
        source={{ uri: videoUri }}
        posterSource={{ uri: thumbnailUri }}
        resizeMode="stretch"
        useNativeControls
        usePoster={usePoster}
        onReadyForDisplay={readyForDisplay}
        isLooping
        shouldPlay
      />
    </View>
  )
}
