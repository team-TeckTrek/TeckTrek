import type { Meta, StoryObj } from '@storybook/nextjs'

import OpenModalButton from './OpenModalButton'

const meta = {
  component: OpenModalButton,
  parameters: {},
} satisfies Meta<typeof OpenModalButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'モーダルを開く',
    renderContent: (close: () => void) => (
      <div>
        <p>モーダルの中身です</p>
        <button onClick={close}>閉じる</button>
      </div>
    ),
  },
}
