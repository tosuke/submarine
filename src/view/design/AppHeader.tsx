import styled from 'styled-components/native'
import { Appbar } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { dividerColor } from './color'

export const AppHeader = styled(Appbar.Header)`
  background-color: ${props => props.theme.colors.background};
  elevation: 4;
  border-bottom-color: ${props => dividerColor(props.theme)};
  border-bottom-width: ${StyleSheet.hairlineWidth * 2};
`
