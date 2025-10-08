'use client'

import { Button } from '@/components/ui/button'

export default function ExitButton() {
  const handleExit = () => {
    console.log('退出しました')
  }

  return (
    <Button
      onClick={handleExit}
      className="
        text-[#4B2B07]
        border-[3px] border-[#4B2B07]
        bg-white
        rounded-2xl
        px-6 py-5
        font-bold text-[22px]
        shadow-[2px_3px_0_#4B2B07]/30
        hover:bg-[#fdf9f6]
        active:scale-95
        transition-all duration-150 ease-in-out transform
        focus-visible:ring-2 focus-visible:ring-[#4B2B07]/40 focus-visible:border-transparent
      "
    >
      退出
    </Button>
  )
}
