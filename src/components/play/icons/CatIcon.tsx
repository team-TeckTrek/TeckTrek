'use client'

import type { SVGProps } from 'react'
import React from 'react'

export default function CatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <circle
        cx="40"
        cy="40"
        r="38.5"
        fill="#D6FFFD"
        stroke="var(--green,#60BD00)"
        strokeWidth="3"
      />
    </svg>
  )
}
