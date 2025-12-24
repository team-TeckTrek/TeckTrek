import { DEMO_URL } from '@/feature/demo/request'
import { API_DOMAIN } from '@/feature/fetcher/consts'
import { createResponse, sleep } from '../utils'
import { data } from './data'
import { http } from 'msw'

// モックハンドラの定義
// `publicDemoHandler`を、`publicXxxHandler`の命名規則に従う
export const publicDemoHandler = http.get<Record<string, never>>(
  // `API_DOMAIN`とエンドポイントを組み合わせたエンドポイントを指定
  `${API_DOMAIN}${DEMO_URL}`,
  async () => {
    await sleep(2000)
    // 返して欲しいデータを引数に指定
    return createResponse(data)
  },
)
