import React from 'react'
import clsx from 'clsx'

interface ColorPaletteProps {
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
}: ColorPaletteProps) {
  return (
    <div
      className={clsx(
        'grid grid-cols-4 gap-x-3 gap-y-3 justify-between pt-6 pr-4 pb-6 pl-4',
        className,
      )}
      style={{ background: '#FFFFFFB2' }}
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
