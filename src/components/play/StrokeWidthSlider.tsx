import React from 'react'
import clsx from 'clsx'

interface Props {
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
}: Props) {
  return (
    <div className={clsx('flex flex-col items-center gap-2', className)}>
      <div className="flex h-[40px] items-center">
        <span
          aria-hidden
          className="h-[20px] w-[20px] rounded-full border border-[#4B2E0F] bg-[#462C05]"
        />
        <div className="relative ml-[18px] mr-2 h-full w-[102px]">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(event) => onChange(Number(event.target.value))}
            className={clsx(
              'absolute left-0 top-1/2 h-0 w-[102px] -translate-y-1/2 cursor-pointer appearance-none border-b-2 border-[#462C05] bg-transparent',
              'focus-visible:outline-none',
              '[&::-webkit-slider-runnable-track]:h-0 [&::-webkit-slider-runnable-track]:bg-transparent',
              '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-[15px] [&::-webkit-slider-thumb]:-translate-y-1/2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#462C05] [&::-webkit-slider-thumb]:bg-white',
              '[&::-moz-range-track]:h-0 [&::-moz-range-track]:border-b-2 [&::-moz-range-track]:border-[#462C05] [&::-moz-range-track]:bg-transparent',
              '[&::-moz-range-thumb]:size-[15px] [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#462C05] [&::-moz-range-thumb]:bg-white',
              '[&::-ms-track]:h-0 [&::-ms-track]:bg-transparent [&::-ms-track]:text-transparent [&::-ms-track]:border-transparent',
              '[&::-ms-thumb]:size-[15px] [&::-ms-thumb]:rounded-full [&::-ms-thumb]:border-2 [&::-ms-thumb]:border-[#462C05] [&::-ms-thumb]:bg-white',
              '[&::-ms-fill-lower]:border-b-2 [&::-ms-fill-lower]:border-[#462C05] [&::-ms-fill-upper]:border-b-2 [&::-ms-fill-upper]:border-[#462C05]',
            )}
          />
        </div>
        <span
          aria-hidden
          className="h-[35px] w-[35px] rounded-full border border-[#4B2E0F] bg-[#462C05]"
        />
      </div>
    </div>
  )
}
