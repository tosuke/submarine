import 'core-js/features/url'

const seaUrl = new URL(process.env.SEA_URL ?? 'https://example.net')

export const endpoint = seaUrl.href
export const restEndpoint = new URL('/api', seaUrl).href
export const wsEndpoint = `wss://${seaUrl.host}`

export const clientId = process.env.CLIENT_ID ?? ''
export const clientSecret = process.env.CLIENT_SECRET ?? ''
