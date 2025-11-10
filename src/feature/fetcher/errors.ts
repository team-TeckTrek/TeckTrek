// TODO: CustomErrorのextendsを検討する
export class AbortError extends Error {
  override readonly name = 'AbortError' as const
  constructor(message: string) {
    super(message)
  }
}

export class TimeoutError extends Error {
  override readonly name = 'TimeoutError' as const
  constructor(message: string) {
    super(message)
  }
}

export class AuthError extends Error {
  override readonly name = 'AuthError' as const
  constructor(message: string) {
    super(message)
  }
}

export class NetworkError extends Error {
  override readonly name = 'NetworkError' as const
  constructor(message: string, options?: { cause: unknown }) {
    super(message, options)
    this.cause = options?.cause
  }
}

export class ResponseParseError extends Error {
  override readonly name = 'ResponseParseError' as const
  constructor(message: string, options?: { cause: unknown }) {
    super(message, options)
    this.cause = options?.cause
  }
}

interface PartialResponse {
  ok: boolean
  status: number
  statusText: string
  url: string
}
export class StatusCodeError extends Error {
  override readonly name = 'StatusCodeError' as const
  readonly response: PartialResponse
  readonly data: ServerError | undefined
  constructor(
    message: string,
    options: { cause?: unknown; response: PartialResponse; data?: ServerError },
  ) {
    super(message, options)
    Object.setPrototypeOf(this, StatusCodeError.prototype)
    this.cause = options.cause
    this.response = options.response
    this.data = options.data
  }
}

export type FetchError =
  | AbortError
  | TimeoutError
  | AuthError
  | NetworkError
  | ResponseParseError
  | StatusCodeError

export interface ServerError {
  messages: ServerErrorMessage[]
}

interface ServerErrorMessage {
  type: 'ERROR'
  code: string
  message: string
}

export const createErrorMessage = (
  url: string,
  reason: string,
  init?: RequestInit,
) =>
  JSON.stringify({
    reason,
    url,
    ...(init?.body ? { body: init?.body } : {}),
  })

export const getClientRequestErrorMessages = (
  error: SerializedStatusCodeError,
) => {
  if (!error.data || !error.data.messages) return []
  return error.data.messages.map((m) => m.message)
}

const serializedErrorTypeName = 'SerializedError'

export interface SerializedError {
  __type: typeof serializedErrorTypeName
  name: string
  message: string
  cause?: unknown
}

interface SerializedStatusCodeError extends SerializedError {
  response: {
    ok: boolean
    status: number
    statusText: string
    url: string
  }
  data?: ServerError
}

const serializeCause = (cause: unknown): unknown => {
  if (cause === null || cause === undefined) {
    return cause
  }

  if (typeof cause === 'function') {
    return '[Function]'
  }

  if (typeof cause === 'object') {
    try {
      // Errorオブジェクトの場合は基本的な情報のみを抽出
      if (cause instanceof Error) {
        return {
          name: cause.name,
          message: cause.message,
          stack: cause.stack,
        }
      }

      // その他のオブジェクトはJSONシリアライズできるかチェック
      JSON.stringify(cause)
      return cause
    } catch {
      // シリアライズできない場合は文字列化
      return String(cause)
    }
  }

  return cause
}

export const getSerializedError = (error: FetchError) => {
  if (error instanceof StatusCodeError) {
    return {
      __type: serializedErrorTypeName,
      name: error.name,
      message: error.message,
      response: {
        ok: error.response.ok,
        status: error.response.status,
        statusText: error.response.statusText,
        url: error.response.url,
      },
      data: error.data,
    } as SerializedStatusCodeError
  }
  return {
    __type: serializedErrorTypeName,
    name: error.name,
    message: error.message,
    cause: serializeCause(error.cause),
  } as SerializedError
}

export const isSerializedError = (value: unknown): value is SerializedError => {
  return (value as SerializedError)?.__type === serializedErrorTypeName
}

export const isError = isSerializedError

export const isStatusCodeError = (
  value: unknown,
): value is SerializedStatusCodeError => {
  return !!(value as SerializedStatusCodeError).response
}
