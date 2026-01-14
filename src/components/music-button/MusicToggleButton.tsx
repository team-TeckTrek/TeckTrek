'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

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
    <button
      onClick={toggleMute}
      className="z-50 rounded-full p-0 shadow-md hover:scale-110 transition text-[#352107] bg-white"
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
    </button>
  )
}
