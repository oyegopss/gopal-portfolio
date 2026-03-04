'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingScreen() {
  const [mounted, setMounted] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setMounted(false), 2400)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {mounted && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal overflow-hidden"
        >
          <div className="flex flex-col items-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-3xl md:text-4xl font-display font-semibold tracking-tight text-warm"
            >
              Gopal Ji Dwivedi
            </motion.span>
            <div className="mt-8 w-32 h-px bg-charcoal-light overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-warm rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
              />
            </div>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-warm-muted/40 text-xs tracking-widest uppercase"
          >
            Loading
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
