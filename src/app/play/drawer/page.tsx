'use client'

import DrawingBoard from '@/components/play/DrawingBoard'

export default function DrawerPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--main_color1,#FFDEC5)] py-8">
      <DrawingBoard />
    </div>
  )
}
