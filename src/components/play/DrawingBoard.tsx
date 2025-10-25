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

interface Props {
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
}: Props) {
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
        'flex items-start gap-6 rounded-[24px] border border-[#D3C9C1]',
        className,
      )}
      style={{
        width: 1024,
        height: 720,
        paddingTop: 158,
        paddingRight: 28,
        paddingBottom: 48,
        paddingLeft: 28,
        background:
          'repeating-linear-gradient(to right, var(--sub_color1,#FFEADA) 0px, var(--sub_color1,#FFEADA) 31px, var(--main_color1,#FFDEC5) 31px, var(--main_color1,#FFDEC5) 62px)',
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
