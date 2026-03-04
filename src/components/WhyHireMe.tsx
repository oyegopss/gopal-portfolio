'use client'

import { motion } from 'framer-motion'
import { FaBrain, FaCode, FaRocket, FaBook } from 'react-icons/fa'

const cards = [
  {
    title: 'Strong Problem Solver',
    description:
      'Experienced in solving complex technical challenges through hackathons, real-world projects, and computer science fundamentals.',
    icon: FaBrain,
  },
  {
    title: 'Real Project Experience',
    description:
      'Built multiple working systems including Scanura (QR-based menu startup), GitHub Insight analytics platform, and AgriSentinel AI monitoring system.',
    icon: FaCode,
  },
  {
    title: 'Startup Mindset',
    description:
      'Not just a coder — focused on building scalable products and real-world solutions with strong technical architecture.',
    icon: FaRocket,
  },
  {
    title: 'Continuous Learner',
    description:
      'Actively improving skills through projects, hackathons, and hands-on development while pursuing Computer Science with specialization in AI & ML.',
    icon: FaBook,
  },
]

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function WhyHireMe() {
  return (
    <section className="py-24 px-6 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-warm mb-3">
            Why Hire Me
          </h2>
          <p className="text-warm-muted text-lg max-w-3xl mx-auto">
            What makes me a strong software developer and problem solver.
          </p>
        </div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {cards.map((card, idx) => {
            const Icon = card.icon
            return (
              <motion.article
                key={card.title}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative rounded-2xl glass-card p-6 flex flex-col justify-between border border-charcoal-light/70 hover:border-crimson/60 hover:shadow-[0_0_40px_rgba(220,38,38,0.35)] transition-all"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-crimson/20 text-crimson border border-crimson/40 mb-4">
                    <Icon className="text-xl" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-warm mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-warm-muted leading-relaxed">{card.description}</p>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

