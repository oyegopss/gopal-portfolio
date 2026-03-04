'use client'

import { useRef, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'

interface Category {
  label: string
  color: string
  skills: { name: string; level: number }[]
}

const categories: Category[] = [
  {
    label: 'Programming',
    color: '#DC2626',
    skills: [
      { name: 'Python', level: 0.9 },
      { name: 'Java', level: 0.8 },
      { name: 'C', level: 0.75 },
      { name: 'JavaScript', level: 0.85 },
    ],
  },
  {
    label: 'Frontend',
    color: '#D4AF37',
    skills: [
      { name: 'HTML', level: 0.9 },
      { name: 'CSS', level: 0.85 },
      { name: 'Tailwind', level: 0.8 },
      { name: 'React', level: 0.8 },
    ],
  },
  {
    label: 'Backend / Tools',
    color: '#EA580C',
    skills: [
      { name: 'GitHub', level: 0.85 },
      { name: 'Google Cloud', level: 0.7 },
      { name: 'REST APIs', level: 0.8 },
    ],
  },
  {
    label: 'Computer Science',
    color: '#FAFAF8',
    skills: [
      { name: 'Data Structures', level: 0.85 },
      { name: 'OOP', level: 0.9 },
      { name: 'Operating Systems', level: 0.75 },
      { name: 'Computer Networks', level: 0.7 },
      { name: 'AI', level: 0.8 },
      { name: 'Machine Learning', level: 0.75 },
    ],
  },
]

const SIZE = 500
const CENTER = SIZE / 2
const RINGS = 4
const MAX_R = 180

function polarToCartesian(angle: number, radius: number) {
  const rad = (angle - 90) * (Math.PI / 180)
  return { x: CENTER + radius * Math.cos(rad), y: CENTER + radius * Math.sin(rad) }
}

function buildPolygonPath(points: { x: number; y: number }[]) {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z'
}

export function TechRadar() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const axes = categories.length
  const angleStep = 360 / axes

  const avgLevels = useMemo(
    () =>
      categories.map((cat) => {
        const avg = cat.skills.reduce((sum, s) => sum + s.level, 0) / cat.skills.length
        return avg
      }),
    [],
  )

  const dataPoints = avgLevels.map((level, i) =>
    polarToCartesian(i * angleStep, level * MAX_R),
  )
  const dataPath = buildPolygonPath(dataPoints)

  return (
    <div ref={ref} className="relative w-full max-w-[540px] mx-auto aspect-square">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full h-full">
        <defs>
          <radialGradient id="radar-center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(220,38,38,0.12)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="radar-fill-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(220,38,38,0.25)" />
            <stop offset="50%" stopColor="rgba(212,175,55,0.15)" />
            <stop offset="100%" stopColor="rgba(234,88,12,0.2)" />
          </linearGradient>
        </defs>

        {/* Center glow */}
        <circle cx={CENTER} cy={CENTER} r={MAX_R + 20} fill="url(#radar-center-glow)" />

        {/* Concentric rings */}
        {Array.from({ length: RINGS }).map((_, i) => {
          const r = ((i + 1) / RINGS) * MAX_R
          return (
            <motion.circle
              key={`ring-${i}`}
              cx={CENTER}
              cy={CENTER}
              r={r}
              fill="none"
              stroke="rgba(250,250,248,0.06)"
              strokeWidth={1}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.15 * i, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
            />
          )
        })}

        {/* Axis lines + labels */}
        {categories.map((cat, i) => {
          const angle = i * angleStep
          const outerPt = polarToCartesian(angle, MAX_R + 8)
          const labelPt = polarToCartesian(angle, MAX_R + 32)
          return (
            <g key={cat.label}>
              <motion.line
                x1={CENTER}
                y1={CENTER}
                x2={outerPt.x}
                y2={outerPt.y}
                stroke="rgba(250,250,248,0.08)"
                strokeWidth={1}
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              />
              <motion.text
                x={labelPt.x}
                y={labelPt.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={cat.color}
                fontSize={11}
                fontWeight={600}
                className="font-display"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
              >
                {cat.label}
              </motion.text>
            </g>
          )
        })}

        {/* Data polygon fill */}
        <motion.path
          d={dataPath}
          fill="url(#radar-fill-grad)"
          stroke="none"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        />

        {/* Data polygon stroke */}
        <motion.path
          d={dataPath}
          fill="none"
          stroke="rgba(220,38,38,0.7)"
          strokeWidth={2}
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ delay: 0.9, duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Data points */}
        {dataPoints.map((pt, i) => (
          <motion.circle
            key={`dp-${i}`}
            cx={pt.x}
            cy={pt.y}
            r={4}
            fill={categories[i].color}
            stroke={categories[i].color}
            strokeWidth={2}
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 1.3 + i * 0.1, duration: 0.3, type: 'spring', stiffness: 400 }}
            style={{ transformOrigin: `${pt.x}px ${pt.y}px` }}
          />
        ))}

        {/* Rotating scan line */}
        {inView && (
          <motion.line
            x1={CENTER}
            y1={CENTER}
            x2={CENTER}
            y2={CENTER - MAX_R}
            stroke="rgba(220,38,38,0.25)"
            strokeWidth={1.5}
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
          />
        )}

        {/* Center dot */}
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r={3}
          fill="#DC2626"
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.5, type: 'spring', stiffness: 400 }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        />
      </svg>
    </div>
  )
}

export function TechRadarCategories() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
      {categories.map((cat, catIdx) => (
        <motion.div
          key={cat.label}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 + catIdx * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="rounded-xl border border-charcoal-light bg-charcoal-light/20 p-5 hover:border-crimson/20 transition-colors duration-300"
        >
          <h3
            className="text-sm font-display font-bold uppercase tracking-wider mb-3"
            style={{ color: cat.color }}
          >
            {cat.label}
          </h3>
          <div className="space-y-2.5">
            {cat.skills.map((skill, sIdx) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-warm-muted text-sm">{skill.name}</span>
                  <span className="text-warm-muted/50 text-xs">
                    {Math.round(skill.level * 100)}%
                  </span>
                </div>
                <div className="h-1 rounded-full bg-charcoal overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: cat.color }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level * 100}%` } : {}}
                    transition={{
                      delay: 0.5 + catIdx * 0.12 + sIdx * 0.06,
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
