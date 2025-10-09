import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ExitButton from './ExitButton'

const meta: Meta<typeof ExitButton> = {
  title: 'Play/ExitButton',
  component: ExitButton,
}

export default meta
type Story = StoryObj<typeof ExitButton>

export const Default: Story = {}
