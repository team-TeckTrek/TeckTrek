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
    <div className={clsx('grid grid-cols-4 gap-3', className)}>
      {colors.map((color) => {
        const isSelected = selectedColor.toLowerCase() === color.toLowerCase()
        return (
          <button
            key={color}
            type="button"
            style={{ backgroundColor: color }}
            onClick={() => onSelectColor(color)}
            className={clsx(
              'h-10 w-10 rounded-xl border border-transparent shadow-sm transition-transform hover:scale-105',
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
