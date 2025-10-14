'use client'

import React, { useMemo, useState } from 'react'
import ColorPalette from '@/components/play/ColorPalette'

const PRESET_COLORS = [
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

export default function ColorPalettePreviewPage() {
  const colors = useMemo(() => PRESET_COLORS, [])
  const [selectedColor, setSelectedColor] = useState(colors[0] ?? '#1F1F1F')

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F0EB] p-8">
      <div className="flex min-h-[520px] w-[320px] flex-col gap-6 rounded-3xl border border-[#D3C9C1] bg-[#FFEFDC] p-6 shadow-lg">
        <h1 className="text-center text-xl font-semibold text-[#4B2E0F]">
          カラーパレットプレビュー
        </h1>
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
        <div className="flex flex-col gap-2 rounded-2xl border border-[#D3C9C1] bg-white p-4 text-sm text-[#4B2E0F]">
          <span className="font-semibold">使い方</span>
          <span>・色をクリックすると選択状態を確認できます。</span>
          <span>・背景や枠線はプレイ画面想定の配色です。</span>
        </div>
      </div>
    </main>
  )
}
