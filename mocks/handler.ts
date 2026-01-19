import { publicDemoHandler } from './demo'
import { publicNoticeHandler } from './notice'
import { publicPaletteHandler } from './palette'
import { publicWaitHandler } from './wait'
import { fetchTestHandler } from './test'
import { delay, passthrough } from './utils'

export const handlers = [
  delay(),
  fetchTestHandler,
  publicDemoHandler,
  publicNoticeHandler,
  publicPaletteHandler,
  publicWaitHandler,

  passthrough(),
]
