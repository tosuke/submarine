import React from 'react'
import styled from 'styled-components/native'
import { TouchableRipple } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'

const ThumbnailView = styled(TouchableRipple)`
  border-radius: 4;
  width: 128;
  height: 128;
`

const ThubmnailImageBackground = styled.ImageBackground`
  width: 128;
  height: 128;
  justify-content: center;
  align-items: center;
`

const ThumbnailVideoIconView = styled.View`
  width: 32;
  height: 32;
  border-radius: 32;
  background-color: #000;
  justify-content: center;
  align-items: center;
`

export const Thumbnail: React.FC<{
  type: 'image' | 'video'
  thubmnailUri: string
  onPress: () => void
}> = ({ type, thubmnailUri, onPress }) => (
  <ThumbnailView onPress={onPress} borderless>
    <ThubmnailImageBackground source={{ uri: thubmnailUri, width: 128, height: 128 }}>
      {type === 'video' && (
        <ThumbnailVideoIconView>
          <MaterialIcons name="play-circle-outline" size={32} color="#fff" />
        </ThumbnailVideoIconView>
      )}
    </ThubmnailImageBackground>
  </ThumbnailView>
)
