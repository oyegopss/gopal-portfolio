'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import type { GitHubReposResponse } from '@/app/api/github/repos/route'

interface StatConfig {
  label: string
  target: number
  suffix?: string
}

const STATIC_STATS: StatConfig[] = [
  { label: 'Projects Built', target: 4, suffix: '+' },
  { label: 'Hackathons Participated', target: 3, suffix: '+' },
  { label: 'Core Technologies', target: 8, suffix: '+' },
]

function useCountUp(target: number, inView: boolean, duration = 1200) {
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!inView || startedRef.current) return
    startedRef.current = true

    const start = performance.now()

    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(1, elapsed / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [inView, target, duration])

  return value
}

export function StatsBar() {
  const [repoCount, setRepoCount] = useState<number | null>(null)
  const [repoError, setRepoError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/github/repos?username=oyegopss')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to fetch repositories')
        return r.json() as Promise<GitHubReposResponse>
      })
      .then((data) => {
        if (data.error) throw new Error(data.error)
        setRepoCount(data.repos.length)
      })
      .catch((e) => setRepoError(e.message))
  }, [])

  const containerRef = useRef<HTMLDivElement | null>(null)
  const inView = useInView(containerRef, { once: true, margin: '-80px' })

  const stats: StatConfig[] = [
    ...STATIC_STATS,
    {
      label: 'GitHub Repositories',
      target: repoCount ?? 0,
      suffix: '+',
    },
  ]

  return (
    <section className="px-6 pb-12 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, idx) => {
            const value = useCountUp(stat.target, inView)
            const display = repoError && stat.label === 'GitHub Repositories' ? '-' : value || 0

            return (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="glass-card rounded-2xl px-4 py-4 sm:px-5 sm:py-5 border border-charcoal-light/70 hover:border-crimson/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] flex flex-col justify-center"
              >
                <div className="text-2xl md:text-3xl font-display font-bold text-warm mb-1">
                  {display}
                  <span className="text-crimson ml-0.5">{stat.suffix}</span>
                </div>
                <p className="text-xs md:text-sm text-warm-muted/90">{stat.label}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

