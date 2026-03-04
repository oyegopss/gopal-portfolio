'use client'

import { motion } from 'framer-motion'

const wordVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

interface AnimatedTextRevealProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'p' | 'span'
  delay?: number
}

/** Reveals text word-by-word with staggered animation */
export function AnimatedTextReveal({
  text,
  className = '',
  as = 'h1',
  delay = 0,
}: AnimatedTextRevealProps) {
  const words = text.split(' ')
  const Component = motion[as]

  return (
    <Component
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  )
}

/** Single line reveal with clip/opacity - for subtitles */
export function AnimatedLineReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
