'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import SpectatorPlayerRow, {
  type SpectatorPlayer,
} from '@/components/play/SpectatorPlayerRow'
import SpectatorMessageList from '@/components/play/SpectatorMessageList'
import WaitingDialog, {
  type WaitingPlayer,
} from '@/components/play/WaitingDialog'

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

const INITIAL_SECONDS = 90

export default function WaitPage() {
  const router = useRouter()

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
  const [remainingSeconds, setRemainingSeconds] = useState(INITIAL_SECONDS)
  const [isCurrentUserReady, setIsCurrentUserReady] = useState(false)
  const [waitingPlayers, setWaitingPlayers] = useState<WaitingPlayer[]>([
    { id: 'player1', name: 'player1', isReady: false },
    { id: 'player2', name: 'player2', isReady: false },
  ])

  useEffect(() => {
    if (!openWaiting) return
    if (remainingSeconds <= 0) return
    const id = window.setInterval(() => {
      setRemainingSeconds((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [openWaiting, remainingSeconds])

  const handleReady = useCallback(() => {
    setIsCurrentUserReady(true)
    setWaitingPlayers((prev) =>
      prev.map((p) => (p.id === 'player2' ? { ...p, isReady: true } : p)),
    )
  }, [])

  const handleExit = useCallback(() => {
    setOpenWaiting(false)
  }, [])

  const handleGameStart = useCallback((readyPlayers: WaitingPlayer[]) => {
    alert(`ゲーム開始！参加者: ${readyPlayers.map((p) => p.name).join(', ')}`)
    setOpenWaiting(false)
  }, [])

  const handleTimeoutKick = useCallback(() => {
    alert('タイムアウトしました。TOPに戻ります。')
    setOpenWaiting(false)
    router.replace('/top')
  }, [router])

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
    <div className="flex min-h-screen items-center justify-center bg-(--main_color1,#FFDEC5) py-8">
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
        players={waitingPlayers}
        rulesText={
          'ルール説明などのテキストが入ります。\nルール説明などのテキストが入ります。ルール説明などのテキストが入ります。ルール説明などのテキストが入ります。ルール説明などのテキストが入ります。ルール説明などのテキストが入ります。ルール説明などのテキストが入ります。ルール説明などのテキストが入ります。'
        }
        isCurrentUserReady={isCurrentUserReady}
        onExit={handleExit}
        onReady={handleReady}
        onGameStart={handleGameStart}
        onTimeoutKick={handleTimeoutKick}
      />
    </div>
  )
}
