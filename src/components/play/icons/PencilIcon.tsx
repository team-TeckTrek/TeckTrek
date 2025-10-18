import React from 'react'

interface PencilIconProps extends React.SVGProps<SVGSVGElement> {
  title?: string
  color?: string
}

export default function PencilIcon({
  title = 'Pencil',
  color = '#462C05',
  className,
  ...props
}: PencilIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
      {...props}
    >
      <title>{title}</title>
      <g fill="none" fillRule="evenodd">
        <path d="M9.3 54.7 5.5 58.5l-1.5 4.9 4.9-1.5 3.8-3.8z" fill="#FFFFFF" />
        <path
          d="m54.5 9.5 4 4c1.7 1.7 1.7 4.4 0 6.1l-5.8 5.8-10.1-10.1 5.8-5.8a4.3 4.3 0 0 1 6.1 0z"
          fill={color}
        />
        <path
          d="M9.3 54.7 45.7 18.3 55.8 28.4 19.3 64.9 9.3 54.7z"
          fill={color}
        />
        <path
          d="m44.3 16.9 4.2 4.2-28.6 28.6-6.8 2.1 2.1-6.8z"
          fill="#FFFFFF"
        />
        <path
          d="m36.9 9.5 8.8-8.8c1.7-1.7 4.4-1.7 6.1 0l5.2 5.2c1.7 1.7 1.7 4.4 0 6.1l-8.8 8.8z"
          fill={color}
        />
        <path
          d="m19.9 41.3 18.5-18.5 4.2 4.2-18.5 18.5c-0.7 0.7-1.7 1-2.7 0.8l-6.2-1.3 1.3 6.2c0.2 1 0 2-0.8 2.7l-3.3 3.3c-1.4 1.4-4.2 2.6-5.7 2.6l-0.7-3.2 4.2-4.2c0.7-0.7 1.7-1 2.7-0.8l6.2 1.3-1.3-6.2c-0.2-1 0-2 0.8-2.7z"
          fill={color}
        />
        <path d="m38.3 23.8 3.5 3.5-15.7 15.7-3.5-3.5z" fill={color} />
      </g>
    </svg>
  )
}
