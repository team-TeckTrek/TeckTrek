'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import DrawingCanvas, {
  DrawingCanvasHandle,
  DrawingTool,
} from './DrawingCanvas'
import ToolPalettePanel from './ToolPalettePanel'

const DEFAULT_COLORS = [
  '#000000',
  '#696969',
  '#9E9E9E',
  '#D6D6D6',
  '#F3F3F3',
  '#FFFFFF',
  '#F26B6B',
  '#F3966B',
  '#F5C16B',
  '#F6E06B',
  '#B26D40',
  '#6B4F2F',
  '#9BD36A',
  '#67B773',
  '#54C0C6',
  '#6AC8F3',
  '#3E8FE3',
  '#2B5BBA',
  '#A972E5',
  '#D46BD3',
  '#F58BD4',
  '#F5B6D9',
  '#F9C7EA',
  '#F9E1F5',
]

interface DrawingBoardProps {
  width?: number
  height?: number
  colors?: string[]
  className?: string
}

export default function DrawingBoard({
  width = 687,
  height = 368,
  colors,
  className,
}: DrawingBoardProps) {
  const framePadding = 16
  const palette = useMemo(() => colors ?? DEFAULT_COLORS, [colors])
  const canvasRef = useRef<DrawingCanvasHandle | null>(null)
  const [tool, setTool] = useState<DrawingTool>('pen')
  const [strokeWidth, setStrokeWidth] = useState<number>(6)
  const [strokeColor, setStrokeColor] = useState<string>(
    palette[0] ?? '#1F1F1F',
  )
  const [{ canUndo, canRedo }, setHistoryState] = useState({
    canUndo: false,
    canRedo: false,
  })

  const handleUndo = () => {
    canvasRef.current?.undo()
  }

  const handleRedo = () => {
    canvasRef.current?.redo()
  }

  const handleClear = () => {
    canvasRef.current?.clear()
  }

  const handleToolChange = (nextTool: DrawingTool) => {
    setTool(nextTool)
  }

  const handleColorChange = (color: string) => {
    setStrokeColor(color)
    setTool('pen')
  }

  useEffect(() => {
    const containsColor = palette.some(
      (color) => color.toLowerCase() === strokeColor.toLowerCase(),
    )
    if (!containsColor) {
      setStrokeColor(palette[0] ?? '#1F1F1F')
    }
  }, [palette, strokeColor])

  return (
    <div
      className={clsx(
        'flex items-start gap-6 rounded-[24px] border border-[#D3C9C1] bg-[rgba(255,238,221,0.3)]',
        className,
      )}
      style={{
        width: 1024,
        height: 720,
        paddingTop: 158,
        paddingRight: 28,
        paddingBottom: 48,
        paddingLeft: 28,
      }}
    >
      <div
        className="flex-shrink-0 rounded-[20px] border-[5px] border-[#D9D9D9] bg-white"
        style={{
          width: width + framePadding * 2,
          height: height + framePadding * 2,
          padding: framePadding,
        }}
      >
        <DrawingCanvas
          ref={canvasRef}
          width={width}
          height={height}
          strokeColor={strokeColor}
          lineWidth={strokeWidth}
          tool={tool}
          backgroundColor="#FFFFFF"
          onHistoryChange={setHistoryState}
          className="h-full w-full touch-none"
        />
      </div>

      <ToolPalettePanel
        tool={tool}
        onToolChange={handleToolChange}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onClear={handleClear}
        canUndo={canUndo}
        canRedo={canRedo}
        strokeWidth={strokeWidth}
        onStrokeWidthChange={setStrokeWidth}
        colors={palette}
        selectedColor={strokeColor}
        onSelectColor={handleColorChange}
      />
    </div>
  )
}
