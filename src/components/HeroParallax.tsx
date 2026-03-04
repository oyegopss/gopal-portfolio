'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface HeroParallaxProps {
  children: React.ReactNode
}

export function HeroParallax({ children }: HeroParallaxProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const yBg = useTransform(scrollYProgress, [0, 1], [0, 120])
  const yGrid = useTransform(scrollYProgress, [0, 1], [0, 80])
  const yOrb1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const yOrb2 = useTransform(scrollYProgress, [0, 1], [0, 150])
  const yOrb3 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scaleHero = useTransform(scrollYProgress, [0, 0.5], [1, 0.98])

  return (
    <section
      ref={sectionRef}
      className="tech-grid-bg relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Floating 3D-style shapes */}
      <motion.div
        className="absolute top-1/5 left-1/4 w-72 h-72 rounded-2xl border border-crimson/20 opacity-30"
        style={{
          y: yOrb1,
          transform: 'rotateX(15deg) rotateY(-20deg)',
          transformStyle: 'preserve-3d',
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/5 w-48 h-48 rounded-full border border-gold/25 opacity-25"
        style={{
          y: yOrb2,
          transform: 'rotateX(-10deg) rotateY(15deg)',
          animation: 'float 6s ease-in-out infinite 1.5s',
        }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-32 h-32 rounded-lg border border-orange/20 opacity-20"
        style={{
          y: yOrb3,
          transform: 'rotateX(20deg) rotateY(10deg)',
          animation: 'float 7s ease-in-out infinite 0.5s',
        }}
      />

      {/* Soft orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-crimson/10 rounded-full blur-3xl animate-float"
        style={{ y: yOrb1 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-float"
        style={{ y: yOrb2, animationDelay: '2s' }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-orange/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-float"
        style={{ animationDelay: '1s' }}
      />

      {/* Hero content */}
      <motion.div
        style={{ opacity: opacityHero, scale: scaleHero }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center w-full flex flex-col items-center"
      >
        {children}
      </motion.div>
    </section>
  )
}
