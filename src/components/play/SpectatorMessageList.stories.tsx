import '../../app/globals.css'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import SpectatorMessageList from './SpectatorMessageList'

const meta: Meta<typeof SpectatorMessageList> = {
  title: 'Play/SpectatorMessageList',
  component: SpectatorMessageList,
  parameters: {
    backgrounds: {
      default: 'beige',
      values: [{ name: 'beige', value: '#FFDEC5' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof SpectatorMessageList>

const MESSAGES = [
  'うまい！',
  'もしかして',
  'わかった！',
  'むずかしい…',
  'さすが！',
  'おてあげ',
  'おてあげ',
  'おてあげ',
]

export const Default: Story = {
  render: () => (
    <div className="flex min-h-screen items-center justify-center bg-[var(--main_color1,#FFDEC5)] p-8">
      <SpectatorMessageList messages={MESSAGES} onSelect={() => {}} />
    </div>
  ),
}
