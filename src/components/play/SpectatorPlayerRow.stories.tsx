import { useState } from 'react'
import '../../app/globals.css'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import SpectatorPlayerRow, { type SpectatorPlayer } from './SpectatorPlayerRow'

const meta: Meta<typeof SpectatorPlayerRow> = {
  title: 'Play/SpectatorPlayerRow',
  component: SpectatorPlayerRow,
  parameters: {
    backgrounds: {
      default: 'beige',
      values: [{ name: 'beige', value: '#FFDEC5' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof SpectatorPlayerRow>

const SAMPLE_PLAYERS: SpectatorPlayer[] = [
  { id: 'player1', name: 'player1' },
  { id: 'player2', name: 'player2' },
  { id: 'player3', name: 'player3' },
  { id: 'player4', name: 'player4' },
]

export const Default: Story = {
  render: () => {
    const [reactions] = useState<Record<string, string | undefined>>({
      player2: 'うまい！',
    })

    return (
      <div className="bg-[var(--main_color1,#FFDEC5)] p-8">
        <SpectatorPlayerRow players={SAMPLE_PLAYERS} reactions={reactions} />
      </div>
    )
  },
}
