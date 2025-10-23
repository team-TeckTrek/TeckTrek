import { useState } from 'react'
import '../../app/globals.css'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import ToolPalettePanel from './ToolPalettePanel'
import type { DrawingTool } from './DrawingCanvas'

const meta: Meta<typeof ToolPalettePanel> = {
  title: 'Play/ToolPalettePanel',
  component: ToolPalettePanel,
  parameters: {
    backgrounds: {
      default: 'beige',
      values: [{ name: 'beige', value: '#FFDEC5' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof ToolPalettePanel>

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
    const [tool, setTool] = useState<DrawingTool>('pen')
    const [strokeWidth, setStrokeWidth] = useState<number>(8)
    const [selectedColor, setSelectedColor] = useState<string>(SAMPLE_COLORS[3])
    const [history, setHistory] = useState({ undo: 2, redo: 1 })

    const handleUndo = () => {
      setHistory((prev) =>
        prev.undo > 0 ? { undo: prev.undo - 1, redo: prev.redo + 1 } : prev,
      )
    }

    const handleRedo = () => {
      setHistory((prev) =>
        prev.redo > 0 ? { undo: prev.undo + 1, redo: prev.redo - 1 } : prev,
      )
    }

    const handleClear = () => {
      setHistory({ undo: 0, redo: 0 })
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--main_color1,#FFDEC5)] p-10">
        <ToolPalettePanel
          tool={tool}
          onToolChange={setTool}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onClear={handleClear}
          canUndo={history.undo > 0}
          canRedo={history.redo > 0}
          strokeWidth={strokeWidth}
          onStrokeWidthChange={setStrokeWidth}
          colors={SAMPLE_COLORS}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />
      </div>
    )
  },
}
