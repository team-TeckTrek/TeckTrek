import '../../app/globals.css'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import DrawingBoard from './DrawingBoard'

const meta: Meta<typeof DrawingBoard> = {
  title: 'Play/DrawingBoard',
  component: DrawingBoard,
  parameters: {
    backgrounds: {
      default: 'beige',
      values: [{ name: 'beige', value: '#FFDEC5' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof DrawingBoard>

export const Default: Story = {
  render: () => (
    <div className="flex h-screen items-center justify-center bg-[var(--main_color1,#FFDEC5)]">
      <DrawingBoard />
    </div>
  ),
}
