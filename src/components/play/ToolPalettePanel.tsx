import React from 'react'
import clsx from 'clsx'
import CanvasToolbar from './CanvasToolbar'
import StrokeWidthSlider from './StrokeWidthSlider'
import ColorPalette from './ColorPalette'
import type { DrawingTool } from './DrawingCanvas'

interface ToolPalettePanelProps {
  tool: DrawingTool
  onToolChange: (tool: DrawingTool) => void
  onUndo: () => void
  onRedo: () => void
  onClear: () => void
  canUndo?: boolean
  canRedo?: boolean
  strokeWidth: number
  onStrokeWidthChange: (value: number) => void
  colors: string[]
  selectedColor: string
  onSelectColor: (color: string) => void
  className?: string
}

export default function ToolPalettePanel({
  tool,
  onToolChange,
  onUndo,
  onRedo,
  onClear,
  canUndo = false,
  canRedo = false,
  strokeWidth,
  onStrokeWidthChange,
  colors,
  selectedColor,
  onSelectColor,
  className,
}: ToolPalettePanelProps) {
  return (
    <aside
      className={clsx(
        'flex h-[466px] w-[225px] flex-col items-center gap-[10px] rounded-2xl border border-[#D3C9C1] p-4 text-[#4B2E0F]',
        className,
      )}
      style={{ background: 'rgba(255, 238, 221, 0.3)' }}
    >
      <CanvasToolbar
        activeTool={tool}
        onToolChange={onToolChange}
        onUndo={onUndo}
        onRedo={onRedo}
        onClear={onClear}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <div className="flex w-[193px] flex-col gap-3">
        <StrokeWidthSlider value={strokeWidth} onChange={onStrokeWidthChange} />
      </div>
      <div className="flex w-[193px] flex-col gap-3">
        <ColorPalette
          colors={colors}
          selectedColor={selectedColor}
          onSelectColor={onSelectColor}
        />
      </div>
    </aside>
  )
}
