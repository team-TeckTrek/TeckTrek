'use client'

import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

type Props = {
  className?: string
}

export default function CatIcon({ className }: Props) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-full border-[3px] border-[var(--green,#60BD00)] bg-[#D6FFFD]',
        className,
        (className = 'p-1 sm:p-1.5'),
      )}
    >
      <Image
        src="/image/cat.png"
        alt="cat"
        fill
        sizes="80px"
        className="origin-center h-full w-full object-contain object-center -translate-x-[4%]"
        priority
      />
    </div>
  )
}
