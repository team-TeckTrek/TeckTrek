import { useState } from 'react'
import '../../app/globals.css'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import CanvasToolbar from './CanvasToolbar'
import type { DrawingTool } from './DrawingCanvas'

const meta: Meta<typeof CanvasToolbar> = {
  title: 'Play/CanvasToolbar',
  component: CanvasToolbar,
  parameters: {
    backgrounds: {
      default: 'beige',
      values: [{ name: 'beige', value: '#FFDEC5' }],
    },
  },
}

export default meta

type Story = StoryObj<typeof CanvasToolbar>

export const Default: Story = {
  render: () => {
    const [tool, setTool] = useState<DrawingTool>('pen')
    const [history, setHistory] = useState({ undo: 1, redo: 0 })

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
        <CanvasToolbar
          activeTool={tool}
          onToolChange={setTool}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onClear={handleClear}
          canUndo={history.undo > 0}
          canRedo={history.redo > 0}
        />
      </div>
    )
  },
}
