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

const controlButtonBase =
  'flex h-[59px] w-[59px] items-center justify-center rounded-lg border-[3px] border-[#4B2E0F] bg-white px-3 text-[#4B2E0F] transition-colors hover:bg-[#F4E5CF]'

const historyButtonBase =
  'flex h-[40px] w-[92px] items-center justify-center rounded-lg border-[3px] border-[#4B2E0F] bg-white text-[#4B2E0F] shadow-[0_3px_0_rgba(75,46,15,0.25)] transition-colors hover:bg-[#F4E5CF]'

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
    <div className={clsx('flex flex-col gap-4', className)}>
      <div className="grid h-[40px] w-[193px] grid-cols-2 gap-2">
        <button
          type="button"
          className={clsx(historyButtonBase, canUndo ? '' : 'opacity-40')}
          onClick={onUndo}
          disabled={!canUndo}
          aria-label="一つ戻す"
        >
          <Undo2
            className="text-[#462C05]"
            style={{
              width: '29.201px',
              height: '27.328px',
              transform: 'translate(0.3px, 0.3px)',
            }}
          />
        </button>
        <button
          type="button"
          className={clsx(historyButtonBase, canRedo ? '' : 'opacity-40')}
          onClick={onRedo}
          disabled={!canRedo}
          aria-label="一つ進める"
        >
          <Redo2
            className="text-[#462C05]"
            style={{
              width: '29.201px',
              height: '27.328px',
              transform: 'translate(0.3px, 0.3px)',
            }}
          />
        </button>
      </div>

      <div className="grid h-[59px] w-[193px] grid-cols-3 gap-2">
        <button
          type="button"
          className={clsx(
            controlButtonBase,
            activeTool === 'pen'
              ? 'border-[#2556EB] bg-[#E8EEFF] text-[#2556EB]'
              : '',
          )}
          onClick={() => onToolChange('pen')}
          aria-pressed={activeTool === 'pen'}
          aria-label="ペンツール"
        >
          <Pencil
            className="text-[#462C05]"
            style={{
              width: '34.481px',
              height: '34.492px',
              transform: 'translate(0.18px, 0.82px)',
            }}
          />
        </button>

        <button
          type="button"
          className={clsx(
            controlButtonBase,
            activeTool === 'eraser'
              ? 'border-[#A05E2A] bg-[#FFE9D6] text-[#A05E2A]'
              : '',
          )}
          onClick={() => onToolChange('eraser')}
          aria-pressed={activeTool === 'eraser'}
          aria-label="消しゴムツール"
        >
          <Eraser className="h-6 w-6" />
        </button>

        <button
          type="button"
          className={controlButtonBase}
          onClick={onClear}
          aria-label="全て消す"
        >
          <Trash2 className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
