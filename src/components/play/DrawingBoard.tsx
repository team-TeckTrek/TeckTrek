import React, { useEffect, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import DrawingCanvas, {
  DrawingCanvasHandle,
  DrawingTool,
} from './DrawingCanvas'
import ToolPalettePanel from './ToolPalettePanel'

const DEFAULT_COLORS = [
  '#1F1F1F',
  '#5C5C5C',
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
  width = 640,
  height = 420,
  colors,
  className,
}: DrawingBoardProps) {
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
        'flex gap-6 rounded-[24px] border border-[#D3C9C1] bg-[#FFEEDD] p-6',
        className,
      )}
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
        className="flex-shrink-0"
      />

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
