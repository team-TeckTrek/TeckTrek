'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function MusicToggleButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/sounds/bo-tto_hidamari.mp3')
      audioRef.current.loop = true
      audioRef.current.volume = 0.5
    }
  }, [])

  const toggleMute = () => {
    if (!audioRef.current) return
    if (!isPlaying) {
      audioRef.current.play().catch((err) => {
        console.log('再生エラー:', err)
      })
      setIsPlaying(true)
    }
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <Button
      type="button"
      onClick={toggleMute}
      variant="ghost"
      size="icon-lg"
      className="fixed bottom-6 right-6 z-50 size-[56px] rounded-full p-0 shadow-md transition-transform hover:scale-110 text-[#352107] bg-white hover:bg-white"
      aria-pressed={isMuted}
      aria-label={isMuted ? '音楽オフ' : '音楽オン'}
    >
      <Image
        src={isMuted ? '/icons/music-off.svg' : '/icons/music-on.svg'}
        alt={isMuted ? 'music off' : 'music on'}
        width={48}
        height={48}
        priority
      />
    </Button>
  )
}
