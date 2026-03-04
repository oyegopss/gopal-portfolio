'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const skills = [
  'Python',
  'Java',
  'C',
  'JavaScript',
  'HTML',
  'CSS',
  'GitHub',
  'Google Cloud',
  'Data Structures',
  'Artificial Intelligence',
  'Machine Learning',
] as const

const orbitRadii = [70, 110, 150]

export function SkillsGalaxy() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = canvas.clientWidth || 500
    let height = canvas.clientHeight || 500
    const resize = () => {
      width = canvas.clientWidth || 500
      height = canvas.clientHeight || 500
      canvas.width = width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resize()
    window.addEventListener('resize', resize)

    const stars = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.4,
      alpha: Math.random() * 0.6 + 0.2,
      twinkle: Math.random() * 0.02 + 0.005,
    }))

    let animationFrame: number
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      ctx.fillStyle = '#020617'
      ctx.fillRect(0, 0, width, height)

      stars.forEach((star) => {
        star.alpha += star.twinkle * (Math.random() > 0.5 ? 1 : -1)
        if (star.alpha < 0.1) star.alpha = 0.1
        if (star.alpha > 0.8) star.alpha = 0.8
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(248,250,252,${star.alpha})`
        ctx.fill()
      })

      animationFrame = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-warm mb-3">
            Skills Galaxy
          </h2>
          <p className="text-warm-muted text-lg max-w-2xl mx-auto">
            Core technologies orbiting around what I use to build intelligent and scalable systems.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[480px] aspect-square">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full rounded-full overflow-hidden"
          />

          {/* Core nucleus */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-crimson via-charcoal-light to-orange/60 shadow-[0_0_60px_rgba(220,38,38,0.5)] border border-warm/20">
              <div className="absolute inset-3 rounded-full bg-charcoal/70 backdrop-blur-xl border border-warm/10" />
              <span className="relative text-sm font-semibold tracking-[0.18em] uppercase text-warm">
                Core Skills
              </span>
            </div>
          </div>

          {/* Orbits and planets */}
          <div className="absolute inset-0 flex items-center justify-center">
            {orbitRadii.map((radius, orbitIndex) => (
              <div
                key={radius}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  animation: `galaxyOrbit ${40 + orbitIndex * 12}s linear infinite`,
                  transformOrigin: '50% 50%',
                }}
              >
                <div
                  className="relative"
                  style={{
                    width: radius * 2,
                    height: radius * 2,
                  }}
                >
                  <div className="absolute inset-0 rounded-full border border-charcoal-light/40" />
                </div>
              </div>
            ))}

            {skills.map((skill, index) => {
              const orbitIndex = index % orbitRadii.length
              const radius = orbitRadii[orbitIndex]
              const angle = (index / skills.length) * Math.PI * 2
              const x = radius * Math.cos(angle)
              const y = radius * Math.sin(angle)

              const duration = 50 + orbitIndex * 15

              return (
                <motion.div
                  key={skill}
                  className="absolute"
                  style={{
                    animation: `galaxyOrbit ${duration}s linear infinite`,
                    transformOrigin: '50% 50%',
                  }}
                >
                  <motion.div
                    className="relative flex items-center justify-center"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-emerald-400 via-crimson to-orange shadow-[0_0_25px_rgba(52,211,153,0.7)]">
                      <div className="absolute inset-[3px] rounded-full bg-charcoal/80 border border-emerald-400/50" />
                      <span className="relative block h-full w-full rounded-full" />
                    </div>
                    <div className="absolute mt-12 text-[11px] md:text-xs text-warm-muted">
                      {skill}
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

