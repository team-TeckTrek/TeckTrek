import { fetcher } from '../fetcher'
import type { PaletteResponse } from './types'

export const PALETTE_URL = '/palette'

export const fetchPalette = async (controller?: AbortController) => {
  const response = await fetcher<PaletteResponse>(
    PALETTE_URL,
    undefined,
    controller,
  )
  return response
}
