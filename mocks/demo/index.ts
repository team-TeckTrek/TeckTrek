import { DEMO_URL } from '@/feature/demo/request'
import { API_DOMAIN } from '@/feature/fetcher/consts'
import { createResponse, sleep } from '../utils'
import { data } from './data'
import { http } from 'msw'

export const publicDemoHandler = http.get<Record<string, never>>(
  `${API_DOMAIN}${DEMO_URL}`,
  async () => {
    await sleep(2000)
    return createResponse(data)
  },
)
