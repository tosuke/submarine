import { Platform, Linking } from 'react-native'
import { openBrowserAsync } from 'expo-web-browser'

export async function openUrl(url: string): Promise<void> {
  if (Platform.OS === 'android') {
    await openBrowserAsync(url)
  } else {
    await Linking.openURL(url)
  }
}

export async function openUrlWithInAppBrowser(url: string): Promise<void> {
  await openBrowserAsync(url)
}
