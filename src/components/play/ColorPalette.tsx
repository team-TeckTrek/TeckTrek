import React from 'react'
import clsx from 'clsx'

interface Props {
  colors: string[]
  selectedColor: string
  onSelectColor: (color: string) => void
  className?: string
}

export default function ColorPalette({
  colors,
  selectedColor,
  onSelectColor,
  className,
}: Props) {
  return (
    <div
      className={clsx(
        'grid h-[265px] w-[193px] grid-cols-4 gap-x-2 gap-y-4',
        className,
      )}
      style={{ background: 'rgba(255, 238, 221, 0.3)' }}
    >
      {colors.map((color) => {
        const isSelected = selectedColor.toLowerCase() === color.toLowerCase()
        return (
          <button
            key={color}
            type="button"
            style={{
              backgroundColor: color,
              width: 42,
              height: 30,
              borderRadius: 6,
              boxShadow:
                '-2px -2px 5px 0px #00000040 inset, 1px 1px 2px 0px #00000080',
            }}
            onClick={() => onSelectColor(color)}
            className={clsx(
              'border border-transparent transition-transform hover:scale-105',
              isSelected ? 'ring-2 ring-offset-2 ring-[#2556EB]' : '',
            )}
            aria-label={`色 ${color}`}
            aria-pressed={isSelected}
          />
        )
      })}
    </div>
  )
}
