import React from 'react'

export type TrashIconProps = React.SVGProps<SVGSVGElement> & {
  title?: string
}

export default function TrashIcon({ title, ...props }: TrashIconProps) {
  const ariaProps = title
    ? { role: 'img', 'aria-label': title }
    : { 'aria-hidden': 'true' as const }

  return (
    <svg
      viewBox="0 0 32 35"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      {...ariaProps}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M19.2365 15.6892V26.3311M12.1419 15.6892V26.3311M5.0473 8.59459V29.8784C5.0473 30.8192 5.42103 31.7214 6.08628 32.3867C6.75152 33.0519 7.65379 33.4257 8.59459 33.4257H22.7838C23.7246 33.4257 24.6269 33.0519 25.2921 32.3867C25.9573 31.7214 26.3311 30.8192 26.3311 29.8784V8.59459M1.5 8.59459H29.8784M6.82095 8.59459L10.3682 1.5H21.0101L24.5574 8.59459"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
