import { NOTICE_URL } from '@/feature/notice/request'
import { API_DOMAIN } from '@/feature/fetcher/consts'
import { createResponse, sleep } from '../utils'
import { data } from './data'
import { http } from 'msw'

export const publicNoticeHandler = http.get<Record<string, never>>(
  `${API_DOMAIN}${NOTICE_URL}`,
  async () => {
    await sleep(600)
    return createResponse(data)
  },
)
