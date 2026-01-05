import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import clsx from 'clsx'

export type DrawingTool = 'pen' | 'eraser'

interface Props {
  width: number
  height: number
  strokeColor: string
  lineWidth: number
  tool: DrawingTool
  backgroundColor?: string
  className?: string
  onHistoryChange?: (state: { canUndo: boolean; canRedo: boolean }) => void
}

export interface DrawingCanvasHandle {
  undo: () => void
  redo: () => void
  clear: () => void
  exportImage: (
    type?: 'image/png' | 'image/jpeg',
    quality?: number,
  ) => string | null
  getCanvasElement: () => HTMLCanvasElement | null
}

type Point = {
  x: number
  y: number
}

function getDevicePixelRatio() {
  if (typeof window === 'undefined') {
    return 1
  }

  return window.devicePixelRatio ?? 1
}

const DrawingCanvas = forwardRef<DrawingCanvasHandle, Props>(
  function DrawingCanvas(
    {
      width,
      height,
      strokeColor,
      lineWidth,
      tool,
      backgroundColor = '#FFFFFF',
      className,
      onHistoryChange,
    },
    ref,
  ) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const contextRef = useRef<CanvasRenderingContext2D | null>(null)
    const isDrawingRef = useRef(false)
    const lastPointRef = useRef<Point | null>(null)
    const historyRef = useRef<ImageData[]>([])
    const historyIndexRef = useRef(-1)

    const notifyHistoryChange = useCallback(() => {
      if (!onHistoryChange) return

      const canUndo = historyIndexRef.current > 0
      const canRedo =
        historyIndexRef.current >= 0 &&
        historyIndexRef.current < historyRef.current.length - 1

      onHistoryChange({ canUndo, canRedo })
    }, [onHistoryChange])

    const saveSnapshot = useCallback(() => {
      const canvas = canvasRef.current
      const ctx = contextRef.current
      if (!canvas || !ctx) return

      try {
        const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height)
        historyRef.current = historyRef.current.slice(
          0,
          historyIndexRef.current + 1,
        )
        historyRef.current.push(snapshot)
        historyIndexRef.current = historyRef.current.length - 1
        notifyHistoryChange()
      } catch {}
    }, [notifyHistoryChange])

    const applyHistory = useCallback(() => {
      const ctx = contextRef.current
      const canvas = canvasRef.current
      if (!ctx || !canvas) return

      const snapshot = historyRef.current[historyIndexRef.current]
      if (snapshot) {
        ctx.putImageData(snapshot, 0, 0)
      }
    }, [])

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      contextRef.current = ctx
      const dpr = getDevicePixelRatio()

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      ctx.resetTransform?.()
      ctx.scale(dpr, dpr)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, width, height)

      historyRef.current = []
      historyIndexRef.current = -1
      saveSnapshot()
    }, [backgroundColor, height, saveSnapshot, width])

    useEffect(() => {
      const ctx = contextRef.current
      if (!ctx) return
      ctx.lineWidth = lineWidth
    }, [lineWidth])

    useEffect(() => {
      const ctx = contextRef.current
      if (!ctx) return
      ctx.strokeStyle = strokeColor
    }, [strokeColor])

    const finishStroke = useCallback(
      (event?: React.PointerEvent<HTMLCanvasElement>) => {
        if (!isDrawingRef.current) return

        const canvas = canvasRef.current
        const ctx = contextRef.current
        if (!canvas || !ctx) return

        isDrawingRef.current = false
        lastPointRef.current = null
        ctx.closePath()
        ctx.globalCompositeOperation = 'source-over'
        if (event && canvas.hasPointerCapture(event.pointerId)) {
          canvas.releasePointerCapture(event.pointerId)
        }
        saveSnapshot()
      },
      [saveSnapshot],
    )

    const getCanvasPoint = useCallback(
      (event: React.PointerEvent<HTMLCanvasElement>): Point => {
        const canvas = canvasRef.current
        if (!canvas) {
          return { x: 0, y: 0 }
        }

        const rect = canvas.getBoundingClientRect()
        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        }
      },
      [],
    )

    const handlePointerDown = useCallback(
      (event: React.PointerEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current
        const ctx = contextRef.current
        if (!canvas || !ctx) return

        event.preventDefault()
        canvas.setPointerCapture(event.pointerId)
        const point = getCanvasPoint(event)

        ctx.beginPath()
        ctx.moveTo(point.x, point.y)
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = strokeColor
        ctx.globalCompositeOperation =
          tool === 'eraser' ? 'destination-out' : 'source-over'

        isDrawingRef.current = true
        lastPointRef.current = point
      },
      [getCanvasPoint, lineWidth, strokeColor, tool],
    )

    const handlePointerMove = useCallback(
      (event: React.PointerEvent<HTMLCanvasElement>) => {
        if (!isDrawingRef.current) return

        event.preventDefault()

        const ctx = contextRef.current
        if (!ctx) return

        const point = getCanvasPoint(event)
        const lastPoint = lastPointRef.current
        if (!lastPoint) {
          lastPointRef.current = point
          return
        }

        ctx.beginPath()
        ctx.moveTo(lastPoint.x, lastPoint.y)
        ctx.lineTo(point.x, point.y)
        ctx.lineWidth = lineWidth
        if (tool !== 'eraser') {
          ctx.strokeStyle = strokeColor
        }
        ctx.stroke()

        lastPointRef.current = point
      },
      [getCanvasPoint, lineWidth, strokeColor, tool],
    )

    const undo = useCallback(() => {
      if (historyIndexRef.current <= 0) return
      historyIndexRef.current -= 1
      applyHistory()
      notifyHistoryChange()
    }, [applyHistory, notifyHistoryChange])

    const redo = useCallback(() => {
      if (historyIndexRef.current >= historyRef.current.length - 1) return
      historyIndexRef.current += 1
      applyHistory()
      notifyHistoryChange()
    }, [applyHistory, notifyHistoryChange])

    const clear = useCallback(() => {
      const ctx = contextRef.current
      if (!ctx) return

      ctx.save()
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, width, height)
      ctx.restore()
      saveSnapshot()
    }, [backgroundColor, height, saveSnapshot, width])

    useImperativeHandle(
      ref,
      () => ({
        undo,
        redo,
        clear,
        exportImage: (type = 'image/png', quality) => {
          const canvas = canvasRef.current
          if (!canvas) return null
          return canvas.toDataURL(type, quality)
        },
        getCanvasElement: () => canvasRef.current,
      }),
      [clear, redo, undo],
    )

    useEffect(() => {
      notifyHistoryChange()
    }, [notifyHistoryChange])

    return (
      <canvas
        ref={canvasRef}
        className={clsx(className)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishStroke}
        onPointerLeave={finishStroke}
        onPointerCancel={finishStroke}
      />
    )
  },
)

export default DrawingCanvas
