import { useState } from 'react'
import '../../app/globals.css'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ColorPalette from './ColorPalette'

const meta: Meta<typeof ColorPalette> = {
  title: 'Play/ColorPalette',
  component: ColorPalette,
  parameters: {
    backgrounds: {
      default: 'beige',
      values: [{ name: 'beige', value: '#FFDEC5' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof ColorPalette>

const SAMPLE_COLORS = [
  '#000000',
  '#696969',
  '#D9D9D9',
  '#FFFFFF',
  '#F43545',
  '#F2A39C',
  '#FF8901',
  '#FFB986',
  '#AC7A24',
  '#D6C3A1',
  '#FFE346',
  '#FBFAC4',
  '#9CCD00',
  '#D0E6A5',
  '#00BA71',
  '#72F1BF',
  '#00C2DE',
  '#80C7FB',
  '#250F8D',
  '#799DFF',
  '#972DA9',
  '#ED81FF',
  '#F54393',
  '#FFCBE2',
]

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState(SAMPLE_COLORS[4])

    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--main_color1,#FFDEC5)] p-10">
        <ColorPalette
          colors={SAMPLE_COLORS}
          selectedColor={selected}
          onSelectColor={setSelected}
        />
      </div>
    )
  },
}
