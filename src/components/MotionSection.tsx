'use client'

import { motion } from 'framer-motion'

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: 'blur(12px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const scaleInVariants = {
  hidden: {
    opacity: 0,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

type VariantType = 'fadeUp' | 'scaleIn'

interface MotionSectionProps {
  children: React.ReactNode
  className?: string
  variant?: VariantType
  delay?: number
  as?: 'section' | 'div'
}

export function MotionSection({
  children,
  className = '',
  variant = 'fadeUp',
  delay = 0,
  as = 'section',
}: MotionSectionProps) {
  const variants = variant === 'scaleIn' ? scaleInVariants : fadeUpVariants
  const Component = motion[as]

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px', amount: 0.2 }}
      variants={variants}
      transition={{ delay, duration: variant === 'scaleIn' ? 0.7 : 0.85, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </Component>
  )
}

export function StaggerChildren({
  children,
  className = '',
  staggerDelay = 0.08,
}: {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            staggerDirection: 1,
          },
        },
        hidden: {},
      }}
    >
      {children}
    </motion.div>
  )
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}
