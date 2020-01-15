import { Platform, Linking } from 'react-native'
import { openBrowserAsync, dismissBrowser, dismissAuthSession } from 'expo-web-browser'
import { DarkTheme } from '../view/constants/theme'

const deepLinkableMap = new Map<string, boolean>()

async function maybeDeepLinkable(url: string): Promise<boolean> {
  const { protocol, origin } = new URL(url)
  if (!['http:', 'https:'].includes(protocol)) return false
  if (deepLinkableMap.has(origin)) return deepLinkableMap.get(origin)!
  const result = await fetch(`${origin}/apple-app-site-association`).then(res => {
    return res.status === 200
  })
  deepLinkableMap.set(origin, result)
  return result
}

export async function openUrl(url: string): Promise<void> {
  if (!(await Linking.canOpenURL(url))) return
  if (Platform.OS === 'ios' && (await maybeDeepLinkable(url))) {
    await Linking.openURL(url)
    return
  }
  if (Platform.OS === 'ios') dismissBrowser()
  await openBrowserAsync(url, {
    enableBarCollapsing: true,
    ...Platform.select({
      android: {
        toolbarColor: DarkTheme.colors.background,
      },
    }),
  })
}

export async function openUrlWithInAppBrowser(url: string): Promise<void> {
  if (Platform.OS === 'ios') dismissAuthSession()
  await openBrowserAsync(url)
}
