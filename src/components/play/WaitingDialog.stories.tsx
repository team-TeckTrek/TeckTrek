import { useState } from 'react'
import '../../app/globals.css'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import WaitingDialog, { type WaitingPlayer } from './WaitingDialog'

const meta: Meta<typeof WaitingDialog> = {
  title: 'Play/WaitingDialog',
  component: WaitingDialog,
  parameters: {
    layout: 'fullscreen',
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
  { id: 'player1', name: 'player1', iconUrl: '/image/cat.png' },
  { id: 'player2', name: 'player2', iconUrl: '/image/cat.png' },
  { id: 'player3', name: 'player3', iconUrl: '/image/cat.png' },
  { id: 'player4', name: 'player4', iconUrl: '/image/cat.png' },
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
        />
      </>
    )
  },
}

export const SinglePlayer: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const players: WaitingPlayer[] = [
      { id: 'player1', name: 'player1', iconUrl: '/image/cat.png' },
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
        />
      </>
    )
  },
}

export const TwoPlayers: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const players: WaitingPlayer[] = [
      { id: 'player1', name: 'player1', iconUrl: '/image/cat.png' },
      { id: 'player2', name: 'player2', iconUrl: '/image/cat.png' },
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
        />
      </>
    )
  },
}

export const ThreePlayers: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const players: WaitingPlayer[] = [
      { id: 'player1', name: 'player1', iconUrl: '/image/cat.png' },
      { id: 'player2', name: 'player2', iconUrl: '/image/cat.png' },
      { id: 'player3', name: 'player3', iconUrl: '/image/cat.png' },
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
        />
      </>
    )
  },
}

export const WithoutIcon: Story = {
  render: () => {
    const [open, setOpen] = useState(true)
    const players: WaitingPlayer[] = [
      { id: 'player1', name: 'player1' },
      { id: 'player2', name: 'player2', iconUrl: '/image/cat.png' },
      { id: 'player3', name: 'player3' },
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
        />
      </>
    )
  },
}

export const Dismissible: Story = {
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
          dismissible={true}
        />
      </>
    )
  },
}

export const CustomLabels: Story = {
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
          exitLabel="キャンセル"
          readyLabel="OK"
        />
      </>
    )
  },
}
