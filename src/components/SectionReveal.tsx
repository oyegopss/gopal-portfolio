'use client'

import { motion } from 'framer-motion'

const defaultVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
}

export function SectionReveal({
  children,
  className = '',
  delay = 0,
  as = 'section',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'section' | 'div'
}) {
  const Component = motion[as]
  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={defaultVariants}
      custom={delay}
      className={className}
    >
      {children}
    </Component>
  )
}
