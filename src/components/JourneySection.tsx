'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const steps = [
  {
    id: 1,
    title: 'The Beginning',
    text: 'Started exploring programming and problem solving.',
  },
  {
    id: 2,
    title: 'Learning Computer Science',
    text: 'Studying Computer Science & Engineering with focus on AI and ML.',
  },
  {
    id: 3,
    title: 'Building Real Projects',
    text: 'Developing systems like Scanura, GitHub Insight, and AgriSentinel.',
  },
  {
    id: 4,
    title: 'Hackathons & Innovation',
    text: 'Participating in competitive hackathons and building impactful solutions.',
  },
  {
    id: 5,
    title: 'Software Engineer Intern',
    text: 'Working at Yugayatra as a software developer intern building scalable applications.',
  },
]

export function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const lineProgress = useTransform(scrollYProgress, [0.05, 0.22, 0.42, 0.62, 0.82], [0, 0.25, 0.5, 0.75, 1])
  const bgY = useTransform(scrollYProgress, [0, 0.5], [0, 60])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Parallax background layer */}
      <motion.div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(220,38,38,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220,38,38,0.2) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl md:text-5xl font-display font-bold text-warm mb-4 text-center"
        >
          My Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="text-warm-muted text-lg text-center mb-20"
        >
          From first code to building at scale
        </motion.p>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Progress line with parallax fill */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-px bg-charcoal-light" />
          <motion.div
            className="absolute left-6 md:left-1/2 top-0 w-px -translate-x-px bg-crimson origin-top"
            style={{
              scaleY: lineProgress,
            }}
          />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px', amount: 0.3 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.12,
                    delayChildren: 0.05,
                  },
                },
              }}
              className="relative flex flex-col md:flex-row md:items-center gap-8 py-12 md:py-16 md:odd:flex-row-reverse"
            >
              {/* Spacer for centering content */}
              <div className="hidden md:block md:flex-1" />

              {/* Timeline node */}
              <div className="absolute left-6 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full border-2 border-crimson bg-charcoal z-10 shrink-0" />

              {/* Content card */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                  },
                }}
                className="md:flex-1 md:max-w-md pl-14 md:pl-0 md:pr-12 md:odd:pl-12 md:odd:pr-0"
              >
                <div className="rounded-2xl border border-charcoal-light bg-charcoal-light/20 p-6 md:p-8 hover:border-crimson/30 transition-colors duration-300">
                  <motion.span
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5 },
                      },
                    }}
                    className="text-gold text-sm font-semibold uppercase tracking-wider"
                  >
                    Step {step.id}
                  </motion.span>
                  <motion.h3
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, delay: 0.08 },
                      },
                    }}
                    className="text-2xl md:text-3xl font-display font-bold text-warm mt-2 mb-3"
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, delay: 0.15 },
                      },
                    }}
                    className="text-warm-muted leading-relaxed"
                  >
                    {step.text}
                  </motion.p>
                </div>
              </motion.div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
