'use client' //onClickとuseEffectを使うので必要

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Props = {
  className?: string
}

export default function MusicToggleButton({ className = '' }: Props) {
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

    //初回クリックで再生開始する処理(chromeとsafariの仕様で自動再生が禁止されているため)
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
      className={`rounded-full p-0 shadow-md hover:scale-110 transition text-[#352107] ${className}`}
    >
      <Image
        src={isMuted ? '/icons/music-off.svg' : '/icons/music-on.svg'}
        alt={isMuted ? 'music off' : 'music on'}
        width={48}
        height={48}
        priority={true}
      />
    </button>
  )
}
