'use client'

import React, { useEffect, useState } from 'react'
import ColorPalette from '@/components/play/ColorPalette'
import { fetchPalette } from '@/feature/palette/request'
import { isError } from '@/feature/fetcher/errors'

export default function ColorPalettePreviewPage() {
  const [colors, setColors] = useState<string[]>([])
  const [selectedColor, setSelectedColor] = useState<string>('#1F1F1F')

  useEffect(() => {
    const controller = new AbortController()
    let cancelled = false

    const load = async () => {
      const response = await fetchPalette(controller)
      if (isError(response)) {
        console.error(response)
        return
      }
      if (cancelled) return
      setColors(response.colors)
      setSelectedColor(response.colors[0] ?? '#1F1F1F')
    }

    load()

    return () => {
      cancelled = true
      controller.abort()
    }
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F0EB] p-8">
      <div className="flex min-h-[520px] w-[320px] flex-col gap-6 rounded-3xl border border-[#D3C9C1] bg-[#FFEFDC] p-6 shadow-lg">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold text-[#4B2E0F]">
            選択中の色: <span className="font-bold">{selectedColor}</span>
          </span>
          <div className="rounded-2xl border border-[#D3C9C1] bg-white p-4">
            <ColorPalette
              colors={colors}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
