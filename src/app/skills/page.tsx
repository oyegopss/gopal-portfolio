'use client'

import { motion } from 'framer-motion'
import { TechRadar, TechRadarCategories } from '@/components/TechRadar'
import { SkillsGalaxy } from '@/components/SkillsGalaxy'
import { MotionSection } from '@/components/MotionSection'

export default function SkillsPage() {
  return (
    <div className="pb-20">
      {/* Header */}
      <section className="pt-16 pb-8 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold text-warm mb-4"
          >
            Tech Stack Radar
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xl text-warm-muted max-w-2xl"
          >
            Technologies I Use To Build Scalable Systems
          </motion.p>
        </div>
      </section>

      {/* Radar visualization */}
      <MotionSection className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-2xl border border-charcoal-light bg-charcoal-light/10 p-8 md:p-12 overflow-hidden">
            {/* Background grid effect */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 50% 50%, rgba(220,38,38,0.15) 0%, transparent 70%),
                  linear-gradient(rgba(250,250,248,0.2) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(250,250,248,0.2) 1px, transparent 1px)
                `,
                backgroundSize: '100% 100%, 40px 40px, 40px 40px',
              }}
            />
            <div className="relative z-10">
              <TechRadar />
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Category breakdown */}
      <MotionSection className="px-6 py-12" delay={0.2}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-warm mb-2">Skill Breakdown</h2>
          <p className="text-warm-muted mb-6">Detailed proficiency across domains.</p>
          <TechRadarCategories />
        </div>
      </MotionSection>

      {/* Skills Galaxy - orbiting skills visualization */}
      <SkillsGalaxy />
    </div>
  )
}
