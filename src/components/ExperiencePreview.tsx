'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export function ExperiencePreview() {
  return (
    <>
      <h2 className="text-4xl md:text-5xl font-display font-bold text-warm mb-4">
        Experience Preview
      </h2>
      <p className="text-warm-muted mb-10">Recent professional experience.</p>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="border-l-2 border-crimson pl-8 py-4"
      >
        <h3 className="text-xl font-display font-bold text-warm">Software Engineer Intern</h3>
        <p className="text-gold font-medium">Yugayatra OPC Pvt. Limited</p>
        <p className="text-warm-muted text-sm">March 2026 – Present</p>
        <p className="text-warm-muted mt-2 text-sm">
          Developing scalable software features, writing clean code, and collaborating with development teams.
        </p>
      </motion.div>
      <Link href="/experience" className="inline-block mt-6 text-crimson hover:text-crimson-light font-semibold">
        Full experience →
      </Link>
    </>
  )
}
