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
    className: 'text-2xl font-bold text-center text-red-500 text-[48px]',
  },
}
