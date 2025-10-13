import React from 'react'
import { Eraser, Pencil, Redo2, Trash2, Undo2 } from 'lucide-react'
import clsx from 'clsx'
import type { DrawingTool } from './DrawingCanvas'

interface CanvasToolbarProps {
  activeTool: DrawingTool
  onToolChange: (tool: DrawingTool) => void
  onUndo: () => void
  onRedo: () => void
  onClear: () => void
  canUndo?: boolean
  canRedo?: boolean
  className?: string
}

const buttonBase =
  'flex h-12 w-12 items-center justify-center rounded-xl border border-[#A07D44] bg-white text-[#4B2E0F] shadow-sm transition-colors hover:bg-[#F4E5CF]'

export default function CanvasToolbar({
  activeTool,
  onToolChange,
  onUndo,
  onRedo,
  onClear,
  canUndo = false,
  canRedo = false,
  className,
}: CanvasToolbarProps) {
  return (
    <div className={clsx('grid grid-cols-3 gap-3', className)}>
      <button
        type="button"
        className={clsx(buttonBase, canUndo ? '' : 'opacity-40')}
        onClick={onUndo}
        disabled={!canUndo}
        aria-label="一つ戻す"
      >
        <Undo2 className="h-5 w-5" />
      </button>
      <button
        type="button"
        className={clsx(buttonBase, canRedo ? '' : 'opacity-40')}
        onClick={onRedo}
        disabled={!canRedo}
        aria-label="一つ進める"
      >
        <Redo2 className="h-5 w-5" />
      </button>
      <button
        type="button"
        className={buttonBase}
        onClick={onClear}
        aria-label="全て消す"
      >
        <Trash2 className="h-5 w-5" />
      </button>

      <button
        type="button"
        className={clsx(
          buttonBase,
          'col-span-3 gap-2 text-base font-semibold',
          activeTool === 'pen'
            ? 'border-[#2556EB] bg-[#E8EEFF] text-[#2556EB]'
            : '',
        )}
        onClick={() => onToolChange('pen')}
        aria-pressed={activeTool === 'pen'}
        aria-label="ペンツール"
      >
        <Pencil className="h-5 w-5" />
        ペン
      </button>

      <button
        type="button"
        className={clsx(
          buttonBase,
          'col-span-3 gap-2 text-base font-semibold',
          activeTool === 'eraser'
            ? 'border-[#A05E2A] bg-[#FFE9D6] text-[#A05E2A]'
            : '',
        )}
        onClick={() => onToolChange('eraser')}
        aria-pressed={activeTool === 'eraser'}
        aria-label="消しゴムツール"
      >
        <Eraser className="h-5 w-5" />
        消しゴム
      </button>
    </div>
  )
}
