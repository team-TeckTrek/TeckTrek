import type { Meta, StoryObj } from '@storybook/nextjs'

import OpenModalButton from './OpenModalButton'
import UserCreateModal from './UserCreateModal'

const meta: Meta<typeof OpenModalButton> = {
  title: 'top/OpenModalButton',
  component: OpenModalButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    onOpenChange: { action: 'openChange' },
  },
}
export default meta

type Story = StoryObj<typeof OpenModalButton>

export const Random: Story = {
  args: {
    label: 'ランダムマッチ',
    renderContent: (close) => <UserCreateModal mode="random" onClose={close} />,
  },
}

export const Friends: Story = {
  args: {
    label: '友達とマッチ',
    renderContent: (close) => (
      <UserCreateModal mode="friends" onClose={close} />
    ),
  },
}
