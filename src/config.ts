import Constants from 'expo-constants'
import 'core-js/features/url'

const config = Constants.manifest.extra

const seaUrl = new URL(config.SEA_URL)

export const endpoint = seaUrl.href
export const restEndpoint = new URL('/api', seaUrl).href
export const wsEndpoint = `wss://${seaUrl.host}`

export const clientId = config.CLIENT_ID
export const clientSecret = config.CLIENT_SECRET
