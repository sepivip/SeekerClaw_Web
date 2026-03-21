import { type CSSProperties, type ReactNode } from 'react'
import { useReveal } from '@/lib/hooks'

interface Props {
  children: ReactNode
  className?: string
  style?: CSSProperties
  as?: 'div' | 'section'
}

export function RevealDiv({ children, className = '', style, as: Tag = 'div' }: Props) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <Tag ref={ref as React.RefObject<never>} className={`reveal ${className}`} style={style}>
      {children}
    </Tag>
  )
}
