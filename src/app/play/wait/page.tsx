'use client'

import { useEffect, useMemo, useState } from 'react'
import SpectatorPlayerRow, {
  type SpectatorPlayer,
} from '@/components/play/SpectatorPlayerRow'
import SpectatorMessageList from '@/components/play/SpectatorMessageList'
import WaitingDialog from '@/components/play/WaitingDialog'

const MESSAGES = [
  'うまい！',
  'もしかして',
  'わかった！',
  'むずかしい…',
  'さすが！',
  'おてあげ',
  'Sample1',
  'Sample2',
]

export default function WaitPage() {
  const players = useMemo<SpectatorPlayer[]>(
    () => [
      { id: 'player1', name: 'player1' },
      { id: 'player2', name: 'player2', isCurrent: true },
      { id: 'player3', name: 'player3' },
      { id: 'player4', name: 'player4' },
    ],
    [],
  )

  const [openWaiting, setOpenWaiting] = useState(true)
  const [remainingSeconds, setRemainingSeconds] = useState(90)

  useEffect(() => {
    if (!openWaiting) return
    if (remainingSeconds <= 0) return
    const id = window.setInterval(() => {
      setRemainingSeconds((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [openWaiting, remainingSeconds])

  const activePlayerId = players.find((player) => player.isCurrent)?.id

  const [reactions, setReactions] = useState<
    Record<string, string | undefined>
  >({})

  const handleChooseMessage = (message: string) => {
    if (!activePlayerId) return
    setReactions((prev) => ({
      ...prev,
      [activePlayerId]: message,
    }))
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--main_color1,#FFDEC5)] py-8">
      <div
        className="flex items-start gap-6 rounded-[24px] border border-[#D3C9C1]"
        style={{
          width: 1024,
          height: 720,
          paddingTop: 158,
          paddingRight: 26,
          background:
            'repeating-linear-gradient(to right, var(--sub_color1,#FFEADA) 0px, var(--sub_color1,#FFEADA) 31px, var(--main_color1,#FFDEC5) 31px, var(--main_color1,#FFDEC5) 62px)',
        }}
      >
        <div className="relative flex h-full flex-1 flex-col justify-between">
          <div className="flex flex-1 items-start gap-6">
            <div className="flex flex-1" />
            <SpectatorMessageList
              messages={MESSAGES}
              onSelect={handleChooseMessage}
              className="w-[160px] self-start"
            />
          </div>
          <SpectatorPlayerRow
            players={players}
            reactions={reactions}
            className="absolute bottom-[23px] left-[31px]"
          />
        </div>
      </div>

      <WaitingDialog
        open={openWaiting}
        remainingSeconds={remainingSeconds}
        players={[
          { id: 'player1', name: 'player1' },
          { id: 'player2', name: 'player2' },
        ]}
        rulesText={
          'ルール説明などのテキストが入ります。\nルール説明などのテキストが入ります。ルール説明などのテキストが入ります。ルール説明などのテキストが入ります。'
        }
        onExit={() => setOpenWaiting(false)}
        onReady={() => {
          setOpenWaiting(false)
        }}
      />
    </div>
  )
}
