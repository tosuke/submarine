import Constants from 'expo-constants'

const config = Constants.manifest.extra

const seaUrl = new URL(config.SEA_URL)

export const endpoint = seaUrl.href
export const restEndpoint = new URL('/api', seaUrl).href
export const wsEndpoint = `${seaUrl.protocol === 'https' ? 'wss' : 'ws'}://${seaUrl.host}`

export const clientId = config.CLIENT_ID
export const clientSecret = config.CLIENT_SECRET