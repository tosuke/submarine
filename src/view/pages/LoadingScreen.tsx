import React from 'react'
import { AppLoading } from 'expo'
import { AppPropsList } from '../navigators'

export const LoadingScreen = (_: AppPropsList['Loading']) => <AppLoading />
