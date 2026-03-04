'use client'

import { motion } from 'framer-motion'
import { SectionReveal } from '@/components/SectionReveal'
import { HiLocationMarker, HiAcademicCap } from 'react-icons/hi'

const focusAreas = [
  'Software Development',
  'Artificial Intelligence',
  'Startup Innovation',
  'Hackathon Projects',
]

export default function AboutPage() {
  return (
    <div className="pb-20">
      <section className="pt-16 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold text-warm mb-6"
          >
            About Me
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-warm-muted"
          >
            Personal introduction, journey, and vision.
          </motion.p>
        </div>
      </section>

      <SectionReveal className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-warm mb-6">Personal Introduction</h2>
          <p className="text-warm-muted text-lg leading-relaxed mb-6">
            I&apos;m <span className="text-gold font-semibold">Gopal Ji Dwivedi</span>, a software developer based in Kanpur, Uttar Pradesh.
            Passionate about building scalable software systems, participating in hackathons, and creating startup products that make an impact.
          </p>
          <div className="flex flex-wrap items-center gap-6 text-warm-muted">
            <span className="inline-flex items-center gap-2">
              <HiLocationMarker className="text-crimson" /> Kanpur, Uttar Pradesh
            </span>
          </div>
        </div>
      </SectionReveal>

      <section className="py-20 px-6 bg-charcoal-light/20">
        <div className="max-w-4xl mx-auto">
          <SectionReveal>
            <h2 className="text-3xl font-display font-bold text-warm mb-6">Developer Journey</h2>
            <p className="text-warm-muted text-lg leading-relaxed">
              From B.Tech in Computer Science & Engineering with a focus on AI & ML at Axis College, Kanpur (AKTU),
              to building real-world systems and startup products—I focus on clean code, scalable architecture,
              and continuous learning. Hackathons and side projects keep me sharp and connected to the community.
            </p>
          </SectionReveal>
        </div>
      </section>

      <SectionReveal className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-warm mb-6 flex items-center gap-3">
            <HiAcademicCap className="text-gold" /> Education
          </h2>
          <div className="rounded-xl border border-charcoal-light bg-charcoal-light/30 p-6">
            <p className="text-warm font-semibold text-lg">B.Tech Computer Science & Engineering (AI & ML)</p>
            <p className="text-gold font-medium">Axis College, Kanpur (AKTU)</p>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-warm mb-6">Focus Areas</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
            {focusAreas.map((area, i) => (
              <motion.li
                key={area}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 text-warm-muted"
              >
                <span className="w-2 h-2 rounded-full bg-crimson" />
                {area}
              </motion.li>
            ))}
          </ul>
        </div>
      </SectionReveal>

      <SectionReveal className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-warm mb-6">Vision</h2>
          <p className="text-warm-muted text-lg leading-relaxed">
            To build software that scales, AI that helps, and products that matter—whether in an MNC, a startup, or on the hackathon floor.
            I aim to keep learning in public and contribute to the developer community.
          </p>
        </div>
      </SectionReveal>
    </div>
  )
}
