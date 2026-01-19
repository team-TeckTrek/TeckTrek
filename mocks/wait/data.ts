import type { WaitScreenResponse } from '@/feature/wait/types'

export const data = {
  messages: [
    'うまい！',
    'もしかして',
    'わかった！',
    'むずかしい…',
    'さすが！',
    'おてあげ',
  ],
  initialSeconds: 90,
  rulesText:
    'ルール説明などのテキストが入ります。\nルール説明などのテキストが入ります。ルール説明などのテキストが入ります。ルール説明などのテキストが入ります。ルール説明などのテキストが入ります。ルール説明などのテキストが入ります。ルール説明などのテキストが入ります。ルール説明などのテキストが入ります。',
  spectatorPlayers: [
    { id: 'player1', name: 'player1' },
    {
      id: 'player2',
      name: 'player2',
      isCurrent: true,
      iconUrl: '/image/cat.png',
    },
    { id: 'player3', name: 'player3' },
    { id: 'player4', name: 'player4', iconUrl: '/image/cat.png' },
  ],
  waitingPlayers: [
    {
      id: 'player1',
      name: 'player1',
      iconUrl: '/image/cat.png',
      isReady: false,
      isCurrent: false,
    },
    {
      id: 'player2',
      name: 'player2',
      iconUrl: '/image/cat.png',
      isReady: false,
      isCurrent: true,
    },
  ],
} as const satisfies WaitScreenResponse
