import type { Meta, StoryObj } from '@storybook/nextjs'

import TimeCounter from './Timer'

const meta = {
  component: TimeCounter,
  parameters: {},
} satisfies Meta<typeof TimeCounter>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    time: 10,
  },
}
