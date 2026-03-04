'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { HiExternalLink, HiDownload } from 'react-icons/hi'

export interface Project {
  slug: string
  title: string
  tagline: string
  description: string
  tech: string[]
  image: string
  github: string
  live: string
  pdfUrl?: string
}

const TILT_MAX = 14
const SPRING = { stiffness: 350, damping: 30 }

export function ProjectCard({ project, index }: { project: Project; index?: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const rawRotateX = useTransform(mouseY, [0, 1], [TILT_MAX, -TILT_MAX])
  const rawRotateY = useTransform(mouseX, [0, 1], [-TILT_MAX, TILT_MAX])
  const rotateX = useSpring(rawRotateX, SPRING)
  const rotateY = useSpring(rawRotateY, SPRING)

  const glowX = useMotionValue('50%')
  const glowY = useMotionValue('50%')

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      mouseX.set(px)
      mouseY.set(py)
      glowX.set(`${(px * 100).toFixed(1)}%`)
      glowY.set(`${(py * 100).toFixed(1)}%`)
    },
    [mouseX, mouseY, glowX, glowY],
  )

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const unsubX = glowX.on('change', (v) => el.style.setProperty('--glow-x', v))
    const unsubY = glowY.on('change', (v) => el.style.setProperty('--glow-y', v))
    return () => { unsubX(); unsubY() }
  }, [glowX, glowY])

  const handleMouseEnter = useCallback(() => setHovered(true), [])
  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    mouseX.set(0.5)
    mouseY.set(0.5)
    glowX.set('50%')
    glowY.set('50%')
  }, [mouseX, mouseY, glowX, glowY])

  return (
    <motion.article
      initial={{ opacity: 0, y: 55 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        delay: (index ?? 0) * 0.12,
        duration: 0.65,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative"
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="relative rounded-2xl overflow-hidden card-glow-wrapper"
      >
        {/* Animated glowing border - follows cursor position */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: hovered
              ? `radial-gradient(600px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(220,38,38,0.35), rgba(212,175,55,0.12) 40%, transparent 70%)`
              : 'none',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1.5px',
          }}
        />

        {/* Radial spotlight under cursor */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl z-[5] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: hovered
              ? `radial-gradient(400px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(220,38,38,0.06), transparent 60%)`
              : 'none',
          }}
        />

        {/* Card body - glassmorphism */}
        <div className="relative rounded-2xl glass-card overflow-hidden transition-[border-color,box-shadow,background] duration-500 group-hover:border-crimson/50">
          {/* Image area */}
          <div className="relative aspect-video bg-charcoal border-b border-charcoal-light overflow-hidden">
            <div
              className="absolute inset-0 flex items-center justify-center text-warm-muted/40 text-sm"
              style={{ transform: 'translateZ(10px)' }}
            >
              [Project image]
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>

          {/* Content - lifted in 3D space */}
          <div className="p-6 relative" style={{ transform: 'translateZ(30px)' }}>
            <h3 className="text-xl font-display font-bold text-warm mb-1 group-hover:text-crimson-light transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-gold text-sm font-medium mb-2">{project.tagline}</p>
            <p className="text-warm-muted text-sm mb-4 leading-relaxed">{project.description}</p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs rounded-md bg-charcoal border border-charcoal-light text-warm-muted group-hover:border-crimson/20 transition-colors duration-300"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-warm-muted hover:text-crimson transition-colors duration-200 text-sm"
                data-cursor
              >
                <FaGithub className="text-base" /> GitHub
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-warm-muted hover:text-gold transition-colors duration-200 text-sm"
                data-cursor
              >
                <HiExternalLink className="text-base" /> Live Demo
              </a>
              {project.pdfUrl && (
                <a
                  href={project.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-warm-muted hover:text-emerald-400 transition-colors duration-200 text-sm"
                  data-cursor
                >
                  <HiDownload className="text-base" /> Download PDF
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ambient glow underneath card on hover */}
      <div className="absolute -inset-4 rounded-3xl bg-crimson/0 group-hover:bg-crimson/[0.04] blur-2xl transition-all duration-700 -z-10" />
    </motion.article>
  )
}
