import React, { useState } from 'react'
import clsx from 'clsx'
import type { DrawingTool } from './DrawingCanvas'
import EraserIcon from '@/components/icons/EraserIcon'
import PencilIcon from '@/components/icons/PencilIcon'
import RedoIcon from '@/components/icons/RedoIcon'
import TrashIcon from '@/components/icons/TrashIcon'
import UndoIcon from '@/components/icons/UndoIcon'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
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
  'flex h-[59px] w-[59px] items-center justify-center rounded-lg border-[3px] border-[#4B2E0F] bg-[rgba(255,255,255,0.7)] px-3 text-[#4B2E0F] shadow-[1px_1px_2px_rgba(0,0,0,0.5)] transition-colors hover:bg-[rgba(255,255,255,0.7)]'

const historyButtonBase =
  'flex h-[40px] w-[92px] items-center justify-center rounded-lg border-[3px] border-[#4B2E0F] bg-[rgba(255,255,255,0.7)] text-[#4B2E0F] shadow-[1px_1px_2px_rgba(0,0,0,0.5)] transition-colors hover:bg-[rgba(255,255,255,0.7)]'

export default function CanvasToolbar({
  activeTool,
  onToolChange,
  onUndo,
  onRedo,
  onClear,
  canUndo = false,
  canRedo = false,
  className,
}: Props) {
  const [isClearPressed, setIsClearPressed] = useState(false)

  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      <div className="grid h-[40px] w-[193px] grid-cols-2 gap-2">
        <Button
          type="button"
          variant="ghost"
          className={cn(historyButtonBase, canUndo ? '' : 'opacity-40')}
          onClick={onUndo}
          disabled={!canUndo}
          aria-label="一つ戻す"
        >
          <UndoIcon className="h-[28px] w-[30px] text-[#462C05]" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          className={cn(historyButtonBase, canRedo ? '' : 'opacity-40')}
          onClick={onRedo}
          disabled={!canRedo}
          aria-label="一つ進める"
        >
          <RedoIcon className="h-[28px] w-[30px] text-[#462C05]" />
        </Button>
      </div>

      <div className="grid h-[59px] w-[193px] grid-cols-3 gap-2">
        <Button
          type="button"
          variant="ghost"
          className={cn(
            controlButtonBase,
            activeTool === 'pen'
              ? 'bg-[var(--btn_color,#4F7EDE)] hover:bg-[var(--btn_color,#4F7EDE)] text-white'
              : '',
          )}
          onClick={() => onToolChange('pen')}
          aria-pressed={activeTool === 'pen'}
          aria-label="ペンツール"
        >
          <PencilIcon className="h-[34px] w-[34px] text-[#462C05]" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          className={cn(
            controlButtonBase,
            activeTool === 'eraser'
              ? 'bg-[var(--btn_color,#4F7EDE)] hover:bg-[var(--btn_color,#4F7EDE)] text-white'
              : '',
          )}
          onClick={() => onToolChange('eraser')}
          aria-pressed={activeTool === 'eraser'}
          aria-label="消しゴムツール"
        >
          <EraserIcon className="h-[30px] w-[30px] text-[#462C05]" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          className={cn(
            controlButtonBase,
            isClearPressed
              ? 'bg-[var(--btn_color,#4F7EDE)] hover:bg-[var(--btn_color,#4F7EDE)] text-white'
              : '',
          )}
          onMouseDown={() => setIsClearPressed(true)}
          onMouseUp={() => setIsClearPressed(false)}
          onMouseLeave={() => setIsClearPressed(false)}
          onTouchStart={() => setIsClearPressed(true)}
          onTouchEnd={() => setIsClearPressed(false)}
          onTouchCancel={() => setIsClearPressed(false)}
          onClick={() => {
            setIsClearPressed(false)
            onClear()
          }}
          aria-label="全て消す"
        >
          <TrashIcon className="h-[32px] w-[32px] text-[#462C05]" />
        </Button>
      </div>
    </div>
  )
}
