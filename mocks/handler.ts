import { fetchTestHandler } from './test'
import { delay, passthrough } from './utils'

export const handlers = [delay(), fetchTestHandler, passthrough()]
