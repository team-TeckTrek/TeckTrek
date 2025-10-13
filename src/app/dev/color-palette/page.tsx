'use client'

import React, { useMemo, useState } from 'react'
import ColorPalette from '@/components/play/ColorPalette'

const PRESET_COLORS = [
  '#1F1F1F',
  '#5C5C5C',
  '#9E9E9E',
  '#D6D6D6',
  '#F3F3F3',
  '#FFFFFF',
  '#F26B6B',
  '#F3966B',
  '#F5C16B',
  '#F6E06B',
  '#B26D40',
  '#6B4F2F',
  '#9BD36A',
  '#67B773',
  '#54C0C6',
  '#6AC8F3',
  '#3E8FE3',
  '#2B5BBA',
  '#A972E5',
  '#D46BD3',
  '#F58BD4',
  '#F5B6D9',
  '#F9C7EA',
  '#F9E1F5',
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
