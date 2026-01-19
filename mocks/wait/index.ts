import { WAIT_URL } from '@/feature/wait/request'
import { API_DOMAIN } from '@/feature/fetcher/consts'
import { createResponse, sleep } from '../utils'
import { data } from './data'
import { http } from 'msw'

export const publicWaitHandler = http.get<Record<string, never>>(
  `${API_DOMAIN}${WAIT_URL}`,
  async () => {
    await sleep(600)
    return createResponse(data)
  },
)
