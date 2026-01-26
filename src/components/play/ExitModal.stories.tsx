// src/components/play/ExitModal.stories.tsx
import type { Meta, StoryObj } from '@storybook/nextjs'
import ExitModal from './ExitModal'
import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog'

const meta: Meta<typeof ExitModal> = {
  title: 'play/ExitModal',
  component: ExitModal,
  parameters: { layout: 'centered' },
  argTypes: {
    onConfirm: { action: 'confirm' },
    onCancel: { action: 'cancel' },
  },
}
export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    message: '退出しますか？',
    confirmLabel: '退出',
    cancelLabel: 'キャンセル',
    loading: false,
  },
  render: (args) => (
    <AlertDialog open>
      <AlertDialogContent className="w-[92vw] sm:max-w-[520px]">
        <ExitModal {...args} />
      </AlertDialogContent>
    </AlertDialog>
  ),
}
