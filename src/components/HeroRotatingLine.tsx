'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const phrases = ['AI Systems', 'Web Platforms', 'Startup Products', 'Automation Tools']

export function HeroRotatingLine() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mb-10 flex justify-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal/60 border border-charcoal-light/70 shadow-[0_0_25px_rgba(15,23,42,0.7)] backdrop-blur-xl">
        <span className="uppercase tracking-[0.22em] text-[10px] md:text-xs text-warm-muted">
          I build
        </span>
        <span className="h-4 w-px bg-charcoal-light/60" />
        <div className="relative min-w-[9rem] text-left">
          <AnimatePresence mode="wait">
            <motion.span
              key={phrases[index]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="block text-xs md:text-sm font-mono text-emerald-400"
            >
              {phrases[index]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

