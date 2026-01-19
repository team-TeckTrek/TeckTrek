import { fetcher } from '../fetcher'
import type { NoticeListResponse } from './types'

export const NOTICE_URL = '/notices'

export const fetchNotices = async (controller?: AbortController) => {
  const response = await fetcher<NoticeListResponse>(
    NOTICE_URL,
    undefined,
    controller,
  )
  return response
}
