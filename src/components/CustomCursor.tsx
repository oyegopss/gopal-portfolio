'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY })
      const target = e.target as HTMLElement
      setHovering(!!(target?.closest?.('a, button, [data-cursor]')))
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  if (!mounted || typeof window === 'undefined') return null

  return (
    <>
      <motion.div
        className="fixed w-8 h-8 pointer-events-none z-[70] hidden lg:block"
        animate={{
          x: mouse.x - 16,
          y: mouse.y - 16,
          scale: hovering ? 1.5 : 1,
          borderColor: hovering ? 'rgba(212, 175, 55, 0.8)' : 'rgba(250, 250, 248, 0.5)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        style={{
          left: 0,
          top: 0,
          border: '2px solid',
          borderRadius: '50%',
        }}
      />
      <motion.div
        className="fixed w-2 h-2 pointer-events-none z-[71] hidden lg:block bg-crimson rounded-full"
        animate={{
          x: mouse.x - 4,
          y: mouse.y - 4,
          scale: hovering ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        style={{ left: 0, top: 0 }}
      />
    </>
  )
}
