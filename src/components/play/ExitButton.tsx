'use client'

export default function ExitButton() {
  const handleExit = () => {
    console.log('退出しました')
  }

  return (
    <button
      onClick={handleExit}
      className="px-4 py-2 border-2 border-[#352107] text-[#352107] rounded-lg shadow-sm bg-white hover:bg-neutral-100"
    >
      退出
    </button>
  )
}
