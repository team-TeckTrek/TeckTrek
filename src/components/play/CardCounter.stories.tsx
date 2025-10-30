import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import CardCounter from './CardCounter'

const meta = {
  title: 'Play/CardCounter',
  component: CardCounter,
  args: {
    current: 3,
    total: 10,
  },
} satisfies Meta<typeof CardCounter>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
