import type { Meta, StoryObj } from '@storybook/nextjs'
import Demo from './demo'

const meta = {
  component: Demo,
  parameters: {},
} satisfies Meta<typeof Demo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
