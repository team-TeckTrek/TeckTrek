import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface Props {
  className?: string
}

export default function CatIcon({ className }: Props) {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-full border-[3px] border-[var(--green,#60BD00)] bg-[#D6FFFD]',
        'p-1 sm:p-1.5',
        className,
      )}
    >
      <Image
        src="/image/cat.png"
        alt="cat"
        fill
        sizes="80px"
        className="origin-center h-full w-full object-contain object-center -translate-x-[10%] translate-y-[32%] scale-[1.2]"
        priority
      />
    </div>
  )
}
