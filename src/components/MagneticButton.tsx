'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const spring = { stiffness: 300, damping: 25 }

interface MagneticButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
}

export function MagneticButton({
  href,
  children,
  variant = 'primary',
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, spring)
  const springY = useSpring(y, spring)

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distance = 80
    const relX = (e.clientX - centerX) / (rect.width / 2)
    const relY = (e.clientY - centerY) / (rect.height / 2)
    const dist = Math.sqrt(relX * relX + relY * relY)
    if (dist < 1.8) {
      const pull = (1 - dist / 1.8) * distance
      x.set(relX * pull)
      y.set(relY * pull)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const base =
    'glow-hover inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all cursor-none'
  const variants = {
    primary: 'bg-crimson text-white hover:bg-crimson-dark',
    secondary: 'border border-gold text-gold hover:bg-gold/10 glow-hover-gold',
    outline: 'border border-warm-muted text-warm-muted hover:border-crimson hover:text-crimson',
  }

  return (
    <motion.div style={{ x: springX, y: springY }}>
      <Link
        ref={ref}
        href={href}
        className={`${base} ${variants[variant]} ${className}`}
        data-cursor
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </Link>
    </motion.div>
  )
}
