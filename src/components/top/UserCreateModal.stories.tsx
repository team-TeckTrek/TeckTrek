import React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs'

import UserCreateModalContent from '@/components/top/UserCreateModal'
import { Dialog, DialogContent } from '@/components/ui/dialog'

type UCProps = React.ComponentProps<typeof UserCreateModalContent>

const meta = {
  title: 'User/UserCreateModalContent',
  component: UserCreateModalContent,
  parameters: { layout: 'centered' },
  argTypes: {
    mode: { control: 'inline-radio', options: ['random', 'friends'] },
  },
} satisfies Meta<typeof UserCreateModalContent>

export default meta
type Story = StoryObj<typeof meta>

const Wrapper = (props: UCProps) => (
  <Dialog open>
    <DialogContent className="sm:max-w-[680px]">
      <UserCreateModalContent {...props} />
    </DialogContent>
  </Dialog>
)

const logOnClose = () => console.log('onClose called')
const logOnConfirm: UCProps['onConfirm'] = (data) =>
  console.log('onConfirm', data)

export const Random: Story = {
  args: {
    mode: 'random',
    onClose: logOnClose,
    onConfirm: logOnConfirm,
  } satisfies UCProps,
  render: (args) => <Wrapper {...(args as UCProps)} />,
}

export const Friends: Story = {
  args: {
    mode: 'friends',
    onClose: logOnClose,
    onConfirm: logOnConfirm,
  } satisfies UCProps,
  render: (args) => <Wrapper {...(args as UCProps)} />,
}
