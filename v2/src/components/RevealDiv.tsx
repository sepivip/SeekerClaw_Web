import { type ReactNode } from 'react'
import { motion } from 'motion/react'

interface Props {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
}

export function RevealDiv({ children, className = '', style, delay = 0 }: Props) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
