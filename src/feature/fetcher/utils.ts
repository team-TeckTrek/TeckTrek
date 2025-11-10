import { ABORT_ERROR_MESSAGE, TIMEOUT_DELAY_SECOND } from './consts'

export const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

const allowEndpoints: string[] = []

export type ErrorBody = {
  message: string
}

export const captureException = (url: string, err: Error) => {
  if (allowEndpoints.includes(url)) return

  console.log('captureException', err)
}

export const createAbortController = () => {
  const controller = new AbortController()
  return {
    controller,
    abort: () => controller.abort(ABORT_ERROR_MESSAGE),
  }
}

export const createPromiseWithTimeout = <T, U>(
  func: () => Promise<T>,
  rejected: U,
  delay: number = TIMEOUT_DELAY_SECOND,
) =>
  Promise.race([
    func().catch((err) => {
      console.warn('Native fetch error', err)
      return Promise.reject(err)
    }),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(rejected), delay),
    ),
  ])

export const getQueryString = <
  T extends { [key: string]: string | number | boolean },
>(
  param: T,
) => {
  return new URLSearchParams(
    Object.fromEntries(
      Object.entries(param).map(([key, value]) => [key, String(value)]),
    ),
  ).toString()
}
