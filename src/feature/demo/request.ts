import { fetcher } from '../fetcher'
import { DemoData } from './types'

export const DEMO_URL = '/demo'

// `fetchDemo`の関数名
// `fetchXxx`の命名規則に従う
export const fetchDemo = async (controller?: AbortController) => {
  // エンドポイントを定義
  const url = `${DEMO_URL}`
  // `DemoData`の部分を自分の好きな型に置き換える
  const response = await fetcher<DemoData>(url, undefined, controller)
  return response
}
