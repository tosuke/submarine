import React from 'react'
import { AppLoading } from 'expo'
import { RootPropsList } from '../navigators'

export const LoadingScreen = (_: RootPropsList['Loading']) => <AppLoading />
