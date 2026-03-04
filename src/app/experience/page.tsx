'use client'

import { motion } from 'framer-motion'

const experience = [
  {
    role: 'Software Engineer Intern',
    company: 'Yugayatra OPC Pvt. Limited',
    period: 'March 2026 – Present',
    responsibilities: [
      'Developing scalable software features',
      'Writing clean and maintainable code',
      'Debugging and optimizing applications',
      'Collaborating with development teams',
    ],
  },
]

export default function ExperiencePage() {
  return (
    <div className="pb-20">
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold text-warm mb-4"
          >
            Experience
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xl text-warm-muted"
          >
            Professional timeline.
          </motion.p>
        </div>
      </section>

      <section className="px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-charcoal-light" />
            {experience.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative pl-12 pb-16"
              >
                <div className="absolute left-0 w-6 h-6 rounded-full bg-crimson border-4 border-charcoal" />
                <div className="rounded-xl border border-charcoal-light bg-charcoal-light/30 p-6 hover:border-crimson/30 transition-colors">
                  <h2 className="text-2xl font-display font-bold text-warm">{exp.role}</h2>
                  <p className="text-gold font-semibold mt-1">{exp.company}</p>
                  <p className="text-warm-muted text-sm mt-1">{exp.period}</p>
                  <ul className="mt-4 space-y-2">
                    {exp.responsibilities.map((r, j) => (
                      <li key={j} className="flex gap-2 text-warm-muted">
                        <span className="text-crimson mt-1.5">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
