import React, { type CSSProperties } from 'react'
import clsx from 'clsx'
import { Button } from '@/components/ui/button'

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
        'grid h-[265px] w-[193px] grid-cols-4 gap-x-2 gap-y-4 rounded-lg bg-[rgba(255,238,221,0.3)]',
        className,
      )}
    >
      {colors.map((color) => {
        const isSelected = selectedColor.toLowerCase() === color.toLowerCase()
        const swatchStyle = {
          '--swatch-color': color,
        } as CSSProperties

        return (
          <Button
            key={color}
            type="button"
            onClick={() => onSelectColor(color)}
            variant="ghost"
            size="icon-sm"
            className={clsx(
              'h-[30px] w-[42px] rounded-md border border-transparent bg-[color:var(--swatch-color)] p-0 shadow-[inset_-2px_-2px_5px_rgba(0,0,0,0.25),1px_1px_2px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 hover:bg-[color:var(--swatch-color)]',
              isSelected ? 'ring-2 ring-offset-2 ring-[#2556EB]' : '',
            )}
            aria-label={`色 ${color}`}
            aria-pressed={isSelected}
            style={swatchStyle}
          />
        )
      })}
    </div>
  )
}
