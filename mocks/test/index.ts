import { delay, http, HttpResponse } from 'msw'

import { createResponse } from '../utils'

const domain = 'http://localhost:3000'
const url = '/test-api/test'

export const fetchTestHandler = http.get(`${domain}${url}`, async () => {
  return createResponse({ id: 'abc-123' })
})

export const createTestHandler = http.post<
  Record<string, never>,
  { id: string }
>(`${domain}${url}`, async ({ request }) => {
  const { id } = await request.json()
  switch (id) {
    case 'net':
      return HttpResponse.error()
    case 'timeout':
      await delay('infinite')
      return HttpResponse.error()
    case '403':
      return createResponse(
        { message: 'アクセスが拒否されました。' },
        { status: 403 },
      )
    case '422':
      return createResponse(
        {
          message:
            '入力された内容に誤りがあります。ご確認のうえ再度お試しください。',
          errors: {
            email: [
              '使用できない文字が含まれています。',
              '文字数は100文字未満にしてください。',
            ],
          },
        },
        { status: 422 },
      )
    case '500':
      return createResponse(
        { message: 'Internal Server Error' },
        { status: 500 },
      )
    case '502':
      return createResponse({ message: 'Bad Gateway' }, { status: 502 })
    case '503':
      return createResponse({ message: 'Service Unavailable' }, { status: 503 })
    case '504':
      return createResponse({ message: 'Gateway Timeout' }, { status: 504 })
    default:
      return createResponse({ success: true }, { status: 200 })
  }
})
