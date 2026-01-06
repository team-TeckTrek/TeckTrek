import { useState } from 'react'
import '../../app/globals.css'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import WaitingDialog, { type WaitingPlayer } from './WaitingDialog'

const meta: Meta<typeof WaitingDialog> = {
  title: 'Play/WaitingDialog',
  component: WaitingDialog,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: 'rgba(0,0,0,0.5)' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof WaitingDialog>

const RULES_TEXT = `ルール説明などのテキストが入ります。
ルール説明などのテキストが入ります。ルール説明などのテキストが入ります。ルール説明などのテキストが入ります。ルール説明などのテキストが入ります。ルール説明などのテキストが入ります。ルール説明などのテキストが入ります。ルール説明などのテキストが入ります。`

const SAMPLE_PLAYERS: WaitingPlayer[] = [
  { id: 'player1', name: 'player1', iconUrl: '/image/cat.png', isReady: false },
  { id: 'player2', name: 'player2', iconUrl: '/image/cat.png', isReady: false },
  { id: 'player3', name: 'player3', iconUrl: '/image/cat.png', isReady: false },
  { id: 'player4', name: 'player4', iconUrl: '/image/cat.png', isReady: false },
]

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(true)

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          モーダルを開く
        </button>
        <WaitingDialog
          open={open}
          remainingSeconds={60}
          players={SAMPLE_PLAYERS}
          rulesText={RULES_TEXT}
          onExit={() => setOpen(false)}
          onReady={() => console.log('準備完了')}
          isCurrentUserReady={false}
        />
      </>
    )
  },
}

export const SomeReady: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const players: WaitingPlayer[] = [
      {
        id: 'player1',
        name: 'player1',
        iconUrl: '/image/cat.png',
        isReady: true,
      },
      {
        id: 'player2',
        name: 'player2',
        iconUrl: '/image/cat.png',
        isReady: true,
      },
      {
        id: 'player3',
        name: 'player3',
        iconUrl: '/image/cat.png',
        isReady: false,
      },
      {
        id: 'player4',
        name: 'player4',
        iconUrl: '/image/cat.png',
        isReady: false,
      },
    ]

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          モーダルを開く
        </button>
        <WaitingDialog
          open={open}
          remainingSeconds={45}
          players={players}
          rulesText={RULES_TEXT}
          onExit={() => setOpen(false)}
          onReady={() => console.log('準備完了')}
          isCurrentUserReady={false}
        />
      </>
    )
  },
}

export const AllReady: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const players: WaitingPlayer[] = SAMPLE_PLAYERS.map((p) => ({
      ...p,
      isReady: true,
    }))

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          モーダルを開く
        </button>
        <WaitingDialog
          open={open}
          remainingSeconds={30}
          players={players}
          rulesText={RULES_TEXT}
          onExit={() => setOpen(false)}
          onReady={() => console.log('準備完了')}
          isCurrentUserReady={true}
          onGameStart={(readyPlayers) =>
            console.log('ゲーム開始！', readyPlayers)
          }
        />
      </>
    )
  },
}

export const SinglePlayer: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const players: WaitingPlayer[] = [
      {
        id: 'player1',
        name: 'player1',
        iconUrl: '/image/cat.png',
        isReady: false,
      },
    ]

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          モーダルを開く
        </button>
        <WaitingDialog
          open={open}
          remainingSeconds={60}
          players={players}
          rulesText={RULES_TEXT}
          onExit={() => setOpen(false)}
          onReady={() => console.log('準備完了')}
          isCurrentUserReady={false}
        />
      </>
    )
  },
}

export const TwoPlayers: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const players: WaitingPlayer[] = [
      {
        id: 'player1',
        name: 'player1',
        iconUrl: '/image/cat.png',
        isReady: true,
      },
      {
        id: 'player2',
        name: 'player2',
        iconUrl: '/image/cat.png',
        isReady: false,
      },
    ]

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          モーダルを開く
        </button>
        <WaitingDialog
          open={open}
          remainingSeconds={50}
          players={players}
          rulesText={RULES_TEXT}
          onExit={() => setOpen(false)}
          onReady={() => console.log('準備完了')}
          isCurrentUserReady={false}
        />
      </>
    )
  },
}

export const LowTimer: Story = {
  render: () => {
    const [open, setOpen] = useState(true)

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          モーダルを開く
        </button>
        <WaitingDialog
          open={open}
          remainingSeconds={5}
          players={SAMPLE_PLAYERS}
          rulesText={RULES_TEXT}
          onExit={() => setOpen(false)}
          onReady={() => console.log('準備完了')}
          isCurrentUserReady={false}
        />
      </>
    )
  },
}

export const CurrentUserReady: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const players: WaitingPlayer[] = [
      {
        id: 'player1',
        name: 'player1',
        iconUrl: '/image/cat.png',
        isReady: true,
      },
      {
        id: 'player2',
        name: 'player2',
        iconUrl: '/image/cat.png',
        isReady: false,
      },
      {
        id: 'player3',
        name: 'player3',
        iconUrl: '/image/cat.png',
        isReady: false,
      },
      {
        id: 'player4',
        name: 'player4',
        iconUrl: '/image/cat.png',
        isReady: false,
      },
    ]

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          モーダルを開く
        </button>
        <WaitingDialog
          open={open}
          remainingSeconds={40}
          players={players}
          rulesText={RULES_TEXT}
          onExit={() => setOpen(false)}
          onReady={() => console.log('準備完了')}
          isCurrentUserReady={true}
        />
      </>
    )
  },
}

export const WithoutIcon: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const players: WaitingPlayer[] = [
      { id: 'player1', name: 'player1', isReady: false },
      {
        id: 'player2',
        name: 'player2',
        iconUrl: '/image/cat.png',
        isReady: true,
      },
      { id: 'player3', name: 'player3', isReady: false },
    ]

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          モーダルを開く
        </button>
        <WaitingDialog
          open={open}
          remainingSeconds={55}
          players={players}
          rulesText={RULES_TEXT}
          onExit={() => setOpen(false)}
          onReady={() => console.log('準備完了')}
          isCurrentUserReady={false}
        />
      </>
    )
  },
}

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const [isReady, setIsReady] = useState(false)
    const [players, setPlayers] = useState<WaitingPlayer[]>([
      {
        id: 'player1',
        name: 'あなた',
        iconUrl: '/image/cat.png',
        isReady: false,
      },
      {
        id: 'player2',
        name: 'player2',
        iconUrl: '/image/cat.png',
        isReady: false,
      },
      {
        id: 'player3',
        name: 'player3',
        iconUrl: '/image/cat.png',
        isReady: true,
      },
    ])

    const handleReady = () => {
      setIsReady(true)
      setPlayers((prev) =>
        prev.map((p) => (p.id === 'player1' ? { ...p, isReady: true } : p)),
      )
    }

    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="rounded bg-blue-500 px-4 py-2 text-white"
        >
          モーダルを開く
        </button>
        <WaitingDialog
          open={open}
          remainingSeconds={60}
          players={players}
          rulesText={RULES_TEXT}
          onExit={() => setOpen(false)}
          onReady={handleReady}
          isCurrentUserReady={isReady}
          onGameStart={(readyPlayers) =>
            alert(
              `ゲーム開始！参加者: ${readyPlayers.map((p) => p.name).join(', ')}`,
            )
          }
        />
      </>
    )
  },
}
