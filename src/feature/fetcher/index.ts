import {
  ABORT_ERROR_MESSAGE,
  API_DOMAIN,
  NETWORK_ERROR_MESSAGE,
  RETRY_COUNT,
  RETRY_DELAY_MS,
  TIMEOUT_ERROR_MESSAGE,
} from './consts'
import {
  AbortError,
  createErrorMessage,
  getSerializedError,
  isError,
  NetworkError,
  ResponseParseError,
  StatusCodeError,
  TimeoutError,
} from './errors'
import {
  captureException,
  createPromiseWithTimeout,
  defaultHeaders,
} from './utils'

import type { SerializedError, ServerError } from './errors'

const isRetriableError = (error: unknown): boolean =>
  error instanceof NetworkError || error instanceof TimeoutError

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const retry = async <T>(
  fn: () => Promise<T>,
  shouldRetry: (result: T) => boolean,
  retryCount: number,
  delayMs: number,
): Promise<T> => {
  const attempt = async (count: number): Promise<T> => {
    const result = await fn()
    if (shouldRetry(result) && count < retryCount - 1) {
      await delay(delayMs)
      return attempt(count + 1)
    }
    return result
  }
  return attempt(0)
}

export const fetcher = async <T>(
  url: string,
  init: RequestInit = {},
  controller: AbortController = new AbortController(), // TODO: Abort周りはライブラリとの整合性をとって最終確定とする
) => {
  const mergedInit = {
    ...init,
    headers: {
      ...defaultHeaders,
      ...init?.headers,
    },
    signal: controller.signal,
    keepAlive: false,
  }

  const response = await retry(
    () => request(url, mergedInit, controller),
    (res) => res instanceof Error && isRetriableError(res),
    RETRY_COUNT,
    RETRY_DELAY_MS,
  )

  if (isError(response)) return response as SerializedError

  if (!response.ok) return await createError(response)

  return parseResponse<T>(response)
}

export const request = async (
  url: string,
  init: RequestInit,
  controller: AbortController,
) => {
  try {
    return await createPromiseWithTimeout(
      () => fetch(`${API_DOMAIN}${url}`, init),
      timeoutHandler,
    )
  } catch (err) {
    console.log('catch', err)

    if (err instanceof TimeoutError) {
      console.log('TimeoutError', err)
      captureException(url, err)
      return getSerializedError(err)
    }

    if (controller.signal.aborted) {
      const error = new AbortError(
        createErrorMessage(url, ABORT_ERROR_MESSAGE, init),
      )
      console.log('AbortError', error)
      captureException(url, error)
      return getSerializedError(error)
    }

    const error = new NetworkError(
      createErrorMessage(url, NETWORK_ERROR_MESSAGE, init),
      { cause: err },
    )
    console.log('NetworkError', error)
    captureException(url, error)
    return getSerializedError(error)
  }
}

export const parseResponse = async <T>(response: Response) => {
  if (!response.body || response.status === 201) return undefined as T

  // AI提案：コードのロジック上bodyUsedがtrueになることはないように思われるがSentryでcatchされたため対応
  // レスポンスボディが既に消費されている場合は空のオブジェクトを返す
  if (response.bodyUsed) {
    console.warn('Response body has already been consumed')
    return {} as T
  }

  try {
    const text = await response.text()
    if (text) {
      return JSON.parse(text) as T
    }
    return {} as T
  } catch (err) {
    if (err instanceof Error) {
      const error = new ResponseParseError(err.message, { cause: err })
      captureException(response.url, error)
      return getSerializedError(error)
    }
    return undefined as never
  }
}

export const createError = async (response: Response) => {
  console.log('createError', response)

  // AI提案：コードのロジック上bodyUsedがtrueになることはないように思われるがSentryでcatchされたため対応
  // レスポンスボディが既に消費されている場合はundefinedを返す
  let data: ServerError | undefined = undefined
  try {
    if (!response.bodyUsed && response.body) {
      const parsedData = await response.json()
      // ServerError型であることを確認
      if (
        parsedData &&
        typeof parsedData === 'object' &&
        'messages' in parsedData
      ) {
        data = parsedData as ServerError
      }
    }
  } catch (err) {
    console.warn('Failed to parse response body as JSON:', err)
    data = undefined
  }

  captureException(
    response.url,
    new StatusCodeError(response.statusText, { response, data }),
  )

  switch (response.status) {
    // TODO: case追加
    // TODO: 422エラーとformInputとの結合
    case 400:
      // TODO: 400をClientRequestErrorに分ける
      return getSerializedError(
        new StatusCodeError(response.statusText, {
          response: {
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
            url: response.url,
          },
          data,
        }),
      )
    default:
      return getSerializedError(
        new StatusCodeError(response.statusText, {
          response: {
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
            url: response.url,
          },
          data,
        }),
      )
  }
}

const timeoutHandler = (url: string, init: RequestInit) => {
  console.warn('Timeout error occurred', url, init)
  return new TimeoutError(createErrorMessage(url, TIMEOUT_ERROR_MESSAGE, init))
}
