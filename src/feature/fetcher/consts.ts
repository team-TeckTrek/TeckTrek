export const TIMEOUT_DELAY_SECOND = 20_000 // 20秒

export const NETWORK_ERROR_MESSAGE = 'Failed to fetch'
export const ABORT_ERROR_MESSAGE = 'Request aborted'
export const TIMEOUT_ERROR_MESSAGE = 'Request timeout'
export const AUTH_ERROR_MESSAGE = 'Authentication error'

export const MOCK_URL = 'https://request.mock'
export const API_DOMAIN =
  process.env.NEXT_PUBLIC_MOCK_ENABLED === 'true'
    ? MOCK_URL
    : process.env.NEXT_PUBLIC_API_DOMAIN

export const RETRY_COUNT = 3
export const RETRY_DELAY_MS = 500
