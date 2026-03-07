'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { HiArrowDown, HiDownload, HiMail } from 'react-icons/hi'
import { MotionSection } from '@/components/MotionSection'
import { HeroParallax } from '@/components/HeroParallax'
import { AnimatedTextReveal, AnimatedLineReveal } from '@/components/AnimatedTextReveal'
import { HeroRotatingLine } from '@/components/HeroRotatingLine'
import { MagneticButton } from '@/components/MagneticButton'
import { ProjectCard } from '@/components/ProjectCard'
import { TechRadar } from '@/components/TechRadar'
import { GitHubActivity } from '@/components/GitHubActivity'
import { DeveloperTerminal } from '@/components/DeveloperTerminal'
import { LiveGitHubProjects } from '@/components/LiveGitHubProjects'
import { WhyHireMe } from '@/components/WhyHireMe'
import { StatsBar } from '@/components/StatsBar'
import { ConnectWithMe } from '@/components/ConnectWithMe'
import { JourneySection } from '@/components/JourneySection'
import { ExperiencePreview } from '@/components/ExperiencePreview'

const featuredProjects = [
  {
    slug: 'agrisentinel',
    title: 'AgriSentinel',
    tagline: 'AI Agriculture Intelligence Platform',
    description: 'Crop disease detection, yield prediction, and Mandi intelligence using AI and Government Open Data API.',
    tech: ['AI/ML', 'Python', 'Agriculture'],
    image: '/images/agrisentinel.png',
    github: 'https://github.com/oyegopss/agrisentinel-ai',
    live: 'https://agrisentinel-ai.vercel.app/',
  },
  {
    slug: 'github-insight',
    title: 'GitHub Insight',
    tagline: 'Repository Analytics Platform',
    description: 'GitHub API integration, commit history analysis, contributor insights, and code contributions heatmap.',
    tech: ['React', 'GitHub API', 'Analytics'],
    image: '/images/github-insight.png',
    github: 'https://github.com/oyegopss/github-insight',
    live: 'https://githire-insight-tkefqnaghl8mpxf3pawj7q.streamlit.app/',
  },
  {
    slug: 'scanura',
    title: 'Scanura',
    tagline: 'QR Based Smart Menu System Startup',
    description: 'Contactless restaurant menu with dynamic menu updates and scalable system architecture.',
    tech: ['Next.js', 'QR', 'Real-time', 'Startup'],
    image: '/images/scanura.png',
    github: 'https://github.com/oyegopss/scanura',
    live: '',
  },
]


export default function HomePage() {
  return (
    <div>
      {/* Hero with parallax + 3D background */}
      <HeroParallax>
        <AnimatedLineReveal delay={0.2}>
          <p className="text-gold uppercase tracking-[0.25em] text-sm font-medium mb-6">
            Software Developer | AI & ML Enthusiast | Startup Builder
          </p>
        </AnimatedLineReveal>
        <AnimatedTextReveal
          text="Gopal Ji Dwivedi"
          as="h1"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold text-warm mb-6 leading-tight"
          delay={0.35}
        />
        <AnimatedLineReveal delay={0.9}>
          <p className="text-xl md:text-2xl lg:text-3xl text-warm-muted max-w-3xl mx-auto mb-6 leading-relaxed">
            Building scalable software, intelligent systems, and real-world digital products.
          </p>
        </AnimatedLineReveal>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative mb-8"
        >
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="relative mx-auto w-56 h-72 sm:w-64 sm:h-80 rounded-[2rem] overflow-hidden border border-white/10 bg-charcoal-light/40 shadow-[0_0_50px_rgba(220,38,38,0.18)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-crimson/20 via-transparent to-gold/10 z-10" />
            <img
              src="/images/gopal-profile.png"
              alt="Gopal Ji Dwivedi"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute -left-4 sm:-left-10 top-6 px-3 py-2 rounded-full border border-gold/30 bg-charcoal/80 backdrop-blur text-xs sm:text-sm text-gold shadow-lg"
          >
            Software Developer
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.7, duration: 0.5 }}
            className="absolute -right-4 sm:-right-10 bottom-8 px-3 py-2 rounded-full border border-crimson/30 bg-charcoal/80 backdrop-blur text-xs sm:text-sm text-warm shadow-lg"
          >
            AI + Startup Builder
          </motion.div>
          <motion.div
            className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-r from-crimson/20 via-gold/10 to-orange/20 blur-2xl"
            animate={{ opacity: [0.45, 0.9, 0.45], scale: [0.96, 1.03, 0.96] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
        <HeroRotatingLine />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-wrap justify-center gap-4"
        >
          <MagneticButton href="/projects" variant="primary">
            View Projects
          </MagneticButton>
          <MagneticButton href="/resume" variant="secondary">
            <HiDownload className="text-lg" /> Download Resume
          </MagneticButton>
          <MagneticButton href="/contact" variant="outline">
            <HiMail className="text-lg" /> Contact Me
          </MagneticButton>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <HiArrowDown className="text-warm-muted/60 text-3xl animate-bounce" />
        </motion.div>
      </HeroParallax>

      {/* Developer Terminal – storytelling via commands */}
      <section className="py-16 md:py-20 bg-charcoal">
        <DeveloperTerminal />
      </section>

      {/* Why Hire Me - value proposition */}
      <WhyHireMe />

      {/* Stats bar under Why Hire Me */}
      <StatsBar />

      {/* CTA under stats */}
      <section className="py-16 px-6 bg-charcoal">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-2xl md:text-3xl font-display font-bold text-warm mb-4"
          >
            Interested in working together?
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link
              href="/contact"
              className="glow-hover inline-flex items-center justify-center px-8 py-4 rounded-full bg-crimson text-white font-semibold hover:bg-crimson-dark transition-all"
              data-cursor
            >
              Let&apos;s Build Something Great
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Connect With Me - social links */}
      <ConnectWithMe />

      {/* Contact - get in touch CTA */}
      <section className="py-24 px-6 bg-charcoal-light/20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl md:text-5xl font-display font-bold text-warm mb-4"
          >
            Contact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-warm-muted text-lg mb-8"
          >
            Get in touch for opportunities or collaboration.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link
              href="/contact"
              className="glow-hover inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-crimson text-white font-semibold hover:bg-crimson-dark transition-all"
              data-cursor
            >
              <HiMail className="text-xl" /> Start a conversation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects - motion section */}
      <MotionSection className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-warm mb-4"
          >
            Featured Projects
          </motion.h2>
          <p className="text-warm-muted text-lg mb-12 max-w-2xl">
            Selected work in software, AI, and startups.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-crimson hover:text-crimson-light font-semibold"
            >
              View all projects <HiArrowDown className="rotate-[-90deg]" />
            </Link>
          </div>
        </div>
      </MotionSection>

      {/* Tech Stack Radar Preview */}
      <section className="py-24 px-6 bg-charcoal-light/30">
        <div className="max-w-7xl mx-auto">
          <MotionSection>
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1">
                <h2 className="text-4xl md:text-5xl font-display font-bold text-warm mb-4">
                  Tech Stack Radar
                </h2>
                <p className="text-warm-muted mb-6 text-lg">
                  Technologies I use to build scalable systems — from programming languages to AI/ML concepts.
                </p>
                <Link href="/skills" className="text-gold hover:text-gold-light font-semibold">
                  Explore full radar →
                </Link>
              </div>
              <div className="flex-1 w-full max-w-md">
                <TechRadar />
              </div>
            </div>
          </MotionSection>
        </div>
      </section>

      {/* Live GitHub Projects */}
      <LiveGitHubProjects />

      {/* Open Source Activity - GitHub */}
      <section className="py-24 px-6 bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <MotionSection>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-warm mb-4">
              GitHub Activity
            </h2>
            <p className="text-warm-muted text-lg mb-8">
              My Development Consistency
            </p>
            <GitHubActivity />
          </MotionSection>
        </div>
      </section>

      {/* My Journey - storytelling */}
      <section className="bg-charcoal-light/20">
        <JourneySection />
      </section>

      {/* Experience Preview */}
      <MotionSection className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <ExperiencePreview />
        </div>
      </MotionSection>

      {/* Startup Highlight - Scanura */}
      <section className="py-24 px-6 bg-gradient-to-b from-charcoal to-charcoal-light">
        <div className="max-w-7xl mx-auto">
          <MotionSection variant="scaleIn">
            <div className="rounded-2xl border border-charcoal-light bg-charcoal-light/40 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <span className="text-gold font-medium uppercase tracking-wider text-sm">Startup Highlight</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-warm mt-2 mb-4">
                  Scanura
                </h2>
                <p className="text-warm-muted text-lg mb-4">
                  QR-based smart menu system for contactless dining. Dynamic menu updates and scalable system architecture for restaurants.
                </p>
                <Link
                  href="/projects#scanura"
                  className="inline-flex items-center gap-2 text-crimson hover:text-crimson-light font-semibold"
                >
                  Learn more <HiArrowDown className="rotate-[-90deg]" />
                </Link>
              </div>
              <div className="w-full md:w-80 h-48 rounded-xl overflow-hidden border border-charcoal-light">
                <img src="/images/scanura.png" alt="Scanura" className="w-full h-full object-cover" />
              </div>
            </div>
          </MotionSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <MotionSection>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-warm mb-4">
              Let&apos;s Build Something
            </h2>
            <p className="text-warm-muted text-lg mb-8">
              Open to opportunities in software development, AI/ML, and startup innovation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="glow-hover px-8 py-4 bg-crimson text-white font-semibold rounded-lg hover:bg-crimson-dark transition-all"
                data-cursor
              >
                Get in Touch
              </Link>
              <Link
                href="/resume"
                className="glow-hover glow-hover-gold px-8 py-4 border border-gold text-gold font-semibold rounded-lg hover:bg-gold/10 transition-all"
                data-cursor
              >
                Download Resume
              </Link>
            </div>
          </MotionSection>
        </div>
      </section>
    </div>
  )
}
