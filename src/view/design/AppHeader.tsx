import styled from 'styled-components/native'
import { Appbar } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { dividerColor } from './color'
import { APPBAR_HEIGHT } from '../constants/header'

export const AppHeader = styled(Appbar.Header)`
  background-color: ${props => props.theme.colors.background};
  border-bottom-color: ${props => dividerColor(props.theme)};
  border-bottom-width: ${StyleSheet.hairlineWidth * 2};
  height: ${APPBAR_HEIGHT};
`
