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
            className="stroke-slider absolute left-0 top-1/2 -translate-y-1/2"
          />
        </div>
        <span
          aria-hidden
          className="h-[35px] w-[35px] rounded-full border border-[#4B2E0F] bg-[#462C05]"
        />
      </div>
      <style jsx>{`
        .stroke-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 102px;
          height: 0;
          background: transparent;
          border-bottom: 2px solid #462c05;
          cursor: pointer;
        }
        .stroke-slider:focus {
          outline: none;
        }
        .stroke-slider::-webkit-slider-runnable-track {
          height: 0;
          background: transparent;
        }
        .stroke-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 15px;
          height: 15px;
          border-radius: 9999px;
          background: #ffffff;
          border: 2px solid #462c05;
          transform: translateY(-7.5px);
        }
        .stroke-slider::-moz-range-track {
          height: 0;
          background: transparent;
          border-bottom: 2px solid #462c05;
        }
        .stroke-slider::-moz-range-thumb {
          width: 15px;
          height: 15px;
          border-radius: 9999px;
          background: #ffffff;
          border: 2px solid #462c05;
        }
        .stroke-slider::-ms-track {
          height: 0;
          background: transparent;
          border-color: transparent;
          color: transparent;
        }
        .stroke-slider::-ms-thumb {
          width: 15px;
          height: 15px;
          border-radius: 9999px;
          background: #ffffff;
          border: 2px solid #462c05;
        }
        .stroke-slider::-ms-fill-lower,
        .stroke-slider::-ms-fill-upper {
          background: transparent;
          border-bottom: 2px solid #462c05;
        }
      `}</style>
    </div>
  )
}
