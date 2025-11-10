import { fetcher } from '../fetcher'
import { DemoData } from './types'

export const DEMO_URL = '/demo'

export const fetchDemo = async (controller?: AbortController) => {
  const url = `${DEMO_URL}`
  const response = await fetcher<DemoData>(url, undefined, controller)
  return response
}
