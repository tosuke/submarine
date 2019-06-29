import React, { useCallback } from 'react'
import { View, Text, Button } from 'react-native'
import { withNavigationOptions } from '../hocs/withNavigationOption'
import { useNaviagtion } from '../hooks/useNavigation'

const DetailsScreenImpl: React.FC = () => {
  const { navigate, push, goBack } = useNaviagtion()
  const goToDetails = useCallback(() => push('Details'), [push])
  const goToHome = useCallback(() => navigate('Home'), [navigate])
  const back = useCallback(() => goBack(), [goBack])
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button title="Go to Details" onPress={goToDetails} />
      <Button title="Go to Home" onPress={goToHome} />
      <Button title="Go back" onPress={back} />
    </View>
  )
}

export const DetailsScreen = withNavigationOptions({ headerTitle: 'Details' })(DetailsScreenImpl)
