import React from 'react'
import clsx from 'clsx'

interface StrokeWidthSliderProps {
  value: number
  min?: number
  max?: number
  step?: number
  onChange: (value: number) => void
  className?: string
}

export default function StrokeWidthSlider({
  value,
  min = 1,
  max = 24,
  step = 1,
  onChange,
  className,
}: StrokeWidthSliderProps) {
  return (
    <div className={clsx('flex flex-col gap-3', className)}>
      <div className="flex items-center justify-between text-[#4B2E0F]">
        <span className="text-sm">細</span>
        <div className="relative flex h-5 w-full items-center px-6">
          <span className="absolute left-0 h-3 w-3 rounded-full border border-[#4B2E0F] bg-white" />
          <span className="absolute right-0 h-5 w-5 rounded-full border border-[#4B2E0F] bg-white" />
        </div>
        <span className="text-sm">太</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full appearance-none rounded-full bg-[#D5C6B5]"
      />
    </div>
  )
}
