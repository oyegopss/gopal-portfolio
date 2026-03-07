'use client'

import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const INTRO_DURATION_MS = 5000
const ease = [0.25, 0.46, 0.45, 0.94] as const

export function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  const dismiss = useCallback(() => setVisible(false), [])

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [visible])

  useEffect(() => {
    const timer = setTimeout(dismiss, INTRO_DURATION_MS)
    return () => clearTimeout(timer)
  }, [dismiss])

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)', transition: { duration: 0.9, ease } }}
          className="fixed inset-0 z-[100] overflow-hidden bg-charcoal"
          onClick={dismiss}
        >
          {/* Ambient orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson/15 blur-[100px]"
              animate={{ scale: [0.8, 1.2, 0.9], opacity: [0.3, 0.55, 0.25] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute right-[8%] top-[15%] h-48 w-48 rounded-full bg-gold/8 blur-[80px]"
              animate={{ y: [0, -30, 0], opacity: [0.12, 0.28, 0.12] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute left-[8%] bottom-[10%] h-56 w-56 rounded-full bg-orange/8 blur-[80px]"
              animate={{ y: [0, 25, 0], opacity: [0.08, 0.2, 0.08] }}
              transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Particle dots */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-warm/20"
                style={{
                  left: `${10 + (i * 7) % 80}%`,
                  top: `${15 + (i * 11) % 70}%`,
                }}
                animate={{
                  y: [0, -20 - (i % 3) * 10, 0],
                  opacity: [0.15, 0.5, 0.15],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
            {/* Profile photo with ring animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease }}
              className="relative mb-10"
            >
              <div className="relative h-32 w-32 sm:h-36 sm:w-36 overflow-hidden rounded-full border-2 border-white/10 shadow-[0_0_50px_rgba(220,38,38,0.25)]">
                <img
                  src="/images/gopal-profile.png"
                  alt="Gopal Ji Dwivedi"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-crimson/15 via-transparent to-gold/10" />
              </div>
              <motion.div
                className="absolute -inset-3 rounded-full border border-crimson/30"
                animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.15, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -inset-6 rounded-full border border-gold/15"
                animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.08, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease }}
              className="mb-5 text-xs font-medium uppercase tracking-[0.4em] text-gold"
            >
              Portfolio Experience
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease }}
              className="text-4xl font-display font-bold text-warm sm:text-5xl md:text-7xl"
            >
              Gopal Ji Dwivedi
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8, ease }}
              className="mt-5 max-w-xl text-base text-warm-muted sm:text-lg leading-relaxed"
            >
              Software Developer &bull; AI Builder &bull; Startup Innovator
            </motion.p>

            {/* Skill pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6, ease }}
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              {['Full-Stack Development', 'AI Systems', 'Startup Products'].map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 + i * 0.15, duration: 0.4, ease }}
                  className="rounded-full border border-white/10 bg-charcoal-light/50 px-4 py-2 text-xs uppercase tracking-[0.18em] text-warm-muted sm:text-sm backdrop-blur-sm"
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>

            {/* Progress bar */}
            <div className="mt-14 h-[2px] w-60 overflow-hidden rounded-full bg-charcoal-light sm:w-80">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-crimson via-gold to-orange"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4.4, ease: 'linear', delay: 0.2 }}
              />
            </div>

            {/* Skip hint */}
            <motion.button
              type="button"
              onClick={dismiss}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="mt-5 text-xs uppercase tracking-[0.3em] text-warm-muted/40 hover:text-warm-muted/70 transition-colors"
            >
              Click anywhere to skip
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
