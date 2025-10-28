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
        'relative overflow-hidden rounded-full border-[3px] border-[var(--green,#60BD00)] bg-[var(--green_light,#EFFFDF)]',
        className,
      )}
    >
      <Image
        src="/image/cat.png"
        alt="cat"
        fill
        sizes="80px"
        className="object-cover"
        priority
      />
    </div>
  )
}
