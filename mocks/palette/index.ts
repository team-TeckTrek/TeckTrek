import { PALETTE_URL } from '@/feature/palette/request'
import { API_DOMAIN } from '@/feature/fetcher/consts'
import { createResponse, sleep } from '../utils'
import { data } from './data'
import { http } from 'msw'

export const publicPaletteHandler = http.get<Record<string, never>>(
  `${API_DOMAIN}${PALETTE_URL}`,
  async () => {
    await sleep(600)
    return createResponse(data)
  },
)
