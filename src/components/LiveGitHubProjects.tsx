'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { GitHubRepo } from '@/app/api/github/repos/route'

type Filter = 'all' | 'web' | 'ai' | 'hackathon'

const GITHUB_USER = 'oyegopss'

function categorizeRepo(repo: GitHubRepo): Filter[] {
  const name = repo.name.toLowerCase()
  const desc = (repo.description || '').toLowerCase()
  const lang = (repo.language || '').toLowerCase()

  const tags: Filter[] = ['all']

  const isWeb =
    /web|site|next|react|frontend|portfolio|ui/.test(name) ||
    /web|frontend|react|next/.test(desc) ||
    ['javascript', 'typescript', 'tsx'].includes(lang)

  const isAI =
    /ai|ml|machine-learning|neural|vision|nlp|model/.test(name) ||
    /ai|ml|machine learning|neural/.test(desc) ||
    ['python'].includes(lang)

  const isHack =
    /hackathon|hack|devfest|hackdays|challenge/.test(name) ||
    /hackathon|hack|challenge/.test(desc)

  if (isWeb) tags.push('web')
  if (isAI) tags.push('ai')
  if (isHack) tags.push('hackathon')

  return Array.from(new Set(tags))
}

const filterLabels: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web Projects' },
  { id: 'ai', label: 'AI Projects' },
  { id: 'hackathon', label: 'Hackathon Projects' },
]

export function LiveGitHubProjects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    fetch(`/api/github/repos?username=${GITHUB_USER}`)
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load repositories')
        return r.json()
      })
      .then((data) => {
        if (data.error) throw new Error(data.error)
        setRepos(data.repos || [])
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const categorized = useMemo(
    () =>
      repos.map((r) => ({
        repo: r,
        categories: categorizeRepo(r),
      })),
    [repos],
  )

  const visible = categorized.filter((item) =>
    filter === 'all' ? true : item.categories.includes(filter),
  )

  return (
    <section className="py-24 px-6 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-warm mb-3">
              Live GitHub Projects
            </h2>
            <p className="text-warm-muted">
              Fetched in real-time from{' '}
              <span className="font-mono text-emerald-400">github.com/{GITHUB_USER}</span>.
            </p>
          </div>
          <div className="inline-flex flex-wrap gap-2 rounded-full bg-charcoal-light/40 p-1 border border-charcoal-light/60">
            {filterLabels.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={`px-3.5 py-1.5 text-xs md:text-sm rounded-full transition-all ${
                  filter === f.id
                    ? 'bg-crimson text-white shadow-[0_0_20px_rgba(220,38,38,0.45)]'
                    : 'bg-transparent text-warm-muted hover:text-warm hover:bg-charcoal-light/40'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content area */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-charcoal-light/70 bg-charcoal-light/10 p-5 animate-pulse space-y-4"
              >
                <div className="h-4 w-2/3 rounded bg-charcoal-light" />
                <div className="h-3 w-full rounded bg-charcoal-light" />
                <div className="h-3 w-4/5 rounded bg-charcoal-light" />
                <div className="flex gap-2 mt-4">
                  <div className="h-5 w-16 rounded-full bg-charcoal-light" />
                  <div className="h-5 w-12 rounded-full bg-charcoal-light" />
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="h-3 w-16 rounded bg-charcoal-light" />
                  <div className="h-3 w-20 rounded bg-charcoal-light" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-charcoal-light bg-charcoal-light/10 p-8 text-center">
            <p className="text-warm-muted mb-4">Unable to load repositories: {error}</p>
            <Link
              href={`https://github.com/${GITHUB_USER}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-crimson hover:text-crimson-light font-semibold"
            >
              View on GitHub
            </Link>
          </div>
        ) : visible.length === 0 ? (
          <div className="rounded-2xl border border-charcoal-light bg-charcoal-light/10 p-8 text-center text-warm-muted">
            No repositories match this filter right now.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map(({ repo, categories }) => {
              const updated = new Date(repo.updated_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
              const primaryCategory = categories.find((c) => c !== 'all')
              return (
                <motion.article
                  key={repo.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="rounded-2xl border border-charcoal-light bg-charcoal-light/10 p-5 flex flex-col justify-between hover:border-crimson/40 hover:shadow-[0_0_40px_rgba(220,38,38,0.18)] transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg font-display font-semibold text-warm truncate">
                        {repo.name}
                      </h3>
                      {primaryCategory && (
                        <span className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full bg-charcoal-light/50 text-warm-muted border border-charcoal-light/80">
                          {primaryCategory === 'web'
                            ? 'Web'
                            : primaryCategory === 'ai'
                              ? 'AI'
                              : 'Hackathon'}
                        </span>
                      )}
                    </div>
                    <p className="text-warm-muted/80 text-sm line-clamp-3 mb-3 min-h-[3.5rem]">
                      {repo.description || 'No description provided.'}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.language && (
                        <span className="px-2 py-1 text-[11px] rounded-full bg-charcoal border border-charcoal-light text-warm-muted">
                          {repo.language}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-warm-muted/80">
                    <div className="flex items-center gap-3">
                      <span>★ {repo.stargazers_count}</span>
                      <span>⑂ {repo.forks_count}</span>
                    </div>
                    <span>Updated {updated}</span>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-crimson hover:text-crimson-light text-sm font-semibold"
                    >
                      View on GitHub →
                    </Link>
                  </div>
                </motion.article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

