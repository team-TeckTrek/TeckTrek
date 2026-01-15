import { fetcher } from '../fetcher'
import type { WaitScreenResponse } from './types'

export const WAIT_URL = '/wait'

export const fetchWaitData = async (controller?: AbortController) => {
  const response = await fetcher<WaitScreenResponse>(
    WAIT_URL,
    undefined,
    controller,
  )
  return response
}
