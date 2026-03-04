'use client'

import { motion } from 'framer-motion'

export function SkillPill({ name, delay = 0 }: { name: string; delay?: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      className="px-4 py-2 rounded-full border border-charcoal-light bg-charcoal/50 text-warm-muted hover:border-gold/50 hover:text-gold transition-colors cursor-default"
    >
      {name}
    </motion.span>
  )
}
