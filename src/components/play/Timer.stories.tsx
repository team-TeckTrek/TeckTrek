import type { Meta, StoryObj } from '@storybook/nextjs'
import Timer from './Timer'

const meta = {
  title: 'Play/Timer',
  component: Timer,
  args: {
    initialTime: 60,
    isRunning: true,
  },
  argTypes: {
    initialTime: { control: { type: 'number', min: 0 } },
    isRunning: { control: 'boolean' },
    onComplete: { action: 'completed' },
  },
} satisfies Meta<typeof Timer>

export default meta
type Story = StoryObj<typeof meta>

export const Running: Story = {}

export const Paused: Story = {
  args: { isRunning: false },
}

export const ShortCountdown: Story = {
  args: { initialTime: 3, isRunning: true },
}
