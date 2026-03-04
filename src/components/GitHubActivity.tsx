'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'

interface GitHubActivityResponse {
  totalContributions: number
  publicRepos: number
  starsReceived: number
  weeks: { contributionDays: { date: string; contributionCount: number }[] }[]
}

const GITHUB_USER = 'oyegopss'

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (count <= 3) return 1
  if (count <= 6) return 2
  if (count <= 9) return 3
  return 4
}

export function GitHubActivity() {
  const [data, setData] = useState<GitHubActivityResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/github/activity?username=${GITHUB_USER}`)
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load')
        return r.json()
      })
      .then((d) => {
        if (d.error) throw new Error(d.error)
        setData(d)
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="rounded-2xl border border-charcoal-light bg-charcoal-light/20 p-8 min-h-[320px] flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-warm-muted"
        >
          Loading activity…
        </motion.div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="rounded-2xl border border-charcoal-light bg-charcoal-light/20 p-8 text-center">
        <p className="text-warm-muted mb-4">Unable to load GitHub activity.</p>
        <Link
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-crimson hover:text-crimson-light font-semibold"
        >
          <FaGithub /> View GitHub Profile
        </Link>
      </div>
    )
  }

  const weeks = data.weeks
  const grid: number[][] = Array(7)
    .fill(null)
    .map(() => Array(weeks.length).fill(0))

  weeks.forEach((week, col) => {
    week.contributionDays.forEach((day) => {
      const d = new Date(day.date)
      const row = d.getDay()
      grid[row][col] = day.contributionCount
    })
  })

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="rounded-2xl border border-charcoal-light bg-charcoal-light/20 p-6 md:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
        <div className="grid grid-cols-2 sm:flex sm:gap-8 gap-4">
          <div>
            <p className="text-warm-muted text-sm">Total commits</p>
            <p className="text-2xl font-display font-bold text-warm">
              {data.totalContributions.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-warm-muted text-sm">Repositories</p>
            <p className="text-2xl font-display font-bold text-warm">
              {data.publicRepos}
            </p>
          </div>
          <div>
            <p className="text-warm-muted text-sm">Stars received</p>
            <p className="text-2xl font-display font-bold text-warm">
              {data.starsReceived}
            </p>
          </div>
        </div>
        <Link
          href={`https://github.com/${GITHUB_USER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="glow-hover inline-flex items-center gap-2 px-6 py-3 bg-charcoal-light border border-charcoal-light text-warm font-semibold rounded-lg hover:border-crimson/50 hover:text-crimson transition-all self-start"
          data-cursor
        >
          <FaGithub className="text-lg" /> View GitHub Profile
        </Link>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex gap-1 min-w-0">
          <div className="flex flex-col gap-[3px] justify-around pr-2 text-warm-muted/60 text-[10px] shrink-0">
            {dayLabels.map((label) => (
              <span key={label} className="h-3 leading-none flex items-center">
                {label}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }).map((_, row) => (
              <div key={row} className="flex gap-[3px]">
                {weeks.map((_, col) => {
                  const count = grid[row][col]
                  const level = getLevel(count)
                  return (
                    <motion.div
                      key={`${row}-${col}`}
                      className="w-3 h-3 rounded-sm shrink-0 cursor-default"
                      style={{
                        backgroundColor:
                          level === 0
                            ? 'rgba(255,255,255,0.06)'
                            : level === 1
                              ? 'rgba(220,38,38,0.35)'
                              : level === 2
                                ? 'rgba(220,38,38,0.55)'
                                : level === 3
                                  ? 'rgba(220,38,38,0.75)'
                                  : 'rgba(220,38,38,0.95)',
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: Math.min((row * weeks.length + col) * 0.0015, 0.8),
                        duration: 0.2,
                      }}
                      whileHover={{
                        scale: 1.35,
                        transition: { duration: 0.15 },
                      }}
                      title={`${count} contribution${count !== 1 ? 's' : ''}`}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 text-warm-muted/60 text-xs">
        <span>Less</span>
        <div className="flex gap-0.5">
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className="w-3 h-3 rounded-sm"
              style={{
                backgroundColor:
                  level === 0
                    ? 'rgba(255,255,255,0.06)'
                    : level === 1
                      ? 'rgba(220,38,38,0.35)'
                      : level === 2
                        ? 'rgba(220,38,38,0.55)'
                        : level === 3
                          ? 'rgba(220,38,38,0.75)'
                          : 'rgba(220,38,38,0.95)',
              }}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  )
}
