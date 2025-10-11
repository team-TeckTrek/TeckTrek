import type { Notice } from '@/components/notification/types'

export const DEFAULT_NOTICES = [
  {
    id: '1',
    title: 'お知らせ内容が入りますお知らせ内容が入りますお知らせ３０文字まで',
    date: '2025.8.15',
    content:
      'お知らせの詳細本文が入ります。ここにはユーザーに伝えたい内容を自由に記述できます。',
  },
  {
    id: '2',
    title: 'メンテナンスのお知らせ',
    date: '2025.8.9',
    content:
      'お知らせテキストお知らせテキストお知らせテキストお知らせテキストお知らせテキストお知らせテキストお知らせテキストお知らせテキストお知らせテキストお知らせテキストお知らせテキストお知らせテキスト',
  },
  {
    id: '3',
    title: 'アプリをリリースしました',
    date: '2025.8.1',
    content:
      'Teck Trek 絵しりとりアプリの正式リリースをお知らせします。ぜひ遊んでみてください。',
  },
] satisfies Notice[]
