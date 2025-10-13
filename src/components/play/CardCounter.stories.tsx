import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import CardCounter from './CardCounter'

const meta: Meta<typeof CardCounter> = {
  title: 'Play/CardCounter',
  component: CardCounter,
}

export default meta
type Story = StoryObj<typeof CardCounter>

export const Default: Story = {
  args: {
    current: 3,
    total: 10,
  },
}
