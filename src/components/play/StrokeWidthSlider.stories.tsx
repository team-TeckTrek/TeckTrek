import { useState } from 'react'
import '../../app/globals.css'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import StrokeWidthSlider from './StrokeWidthSlider'

const meta: Meta<typeof StrokeWidthSlider> = {
  title: 'Play/StrokeWidthSlider',
  component: StrokeWidthSlider,
  parameters: {
    backgrounds: {
      default: 'beige',
      values: [{ name: 'beige', value: '#FFDEC5' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof StrokeWidthSlider>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<number>(8)

    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--main_color1,#FFDEC5)] p-10">
        <StrokeWidthSlider value={value} onChange={setValue} />
      </div>
    )
  },
}
