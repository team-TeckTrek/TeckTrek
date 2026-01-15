import { publicDemoHandler } from './demo'
import { publicWaitHandler } from './wait'
import { fetchTestHandler } from './test'
import { delay, passthrough } from './utils'

export const handlers = [
  delay(),
  fetchTestHandler,
  publicDemoHandler,
  publicWaitHandler,

  passthrough(),
]
