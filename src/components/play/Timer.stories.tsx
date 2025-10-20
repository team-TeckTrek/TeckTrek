import type { Meta, StoryObj } from '@storybook/nextjs'
import Timer from './Timer'

const meta: Meta<typeof Timer> = {
  title: 'Play/Timer',
  component: Timer,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Timer>

export const Default: Story = {}

export const Paused: Story = {
  args: {
    initialTime: 10,
    isRunning: false,
  },
}

export const Completed: Story = {
  args: {
    initialTime: 0,
    isRunning: false,
  },
}
