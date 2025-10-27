import {
  delay as mswDelay,
  passthrough as mswPassthrough,
  http,
  HttpResponse,
} from 'msw'

import type { DefaultBodyType, ResponseResolver } from 'msw'

export const delay = () =>
  http.all('*', async () => {
    await mswDelay()
  })

export const passthrough = () => http.all('*', mswPassthrough)

export const sleep = (duration: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, duration)
  })

export const createResponse = <T>(data: T, init: Partial<ResponseInit> = {}) =>
  new HttpResponse(JSON.stringify(data), {
    ...init,
    headers: {
      ...init?.headers,
      'Content-Type': 'application/json',
    },
  })

export const withSearchParams =
  <P extends Record<string, unknown>, T extends DefaultBodyType>(
    predicate: (param: URLSearchParams) => boolean,
    resolver: ResponseResolver<P, T>,
  ): ResponseResolver<P, T> =>
  (args) => {
    const { request } = args
    const url = new URL(request.url)
    if (!predicate(url.searchParams)) return

    return resolver(args)
  }
