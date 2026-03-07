'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
      <h2 className="text-2xl font-display font-bold text-warm mb-2">Something went wrong</h2>
      <p className="text-warm-muted mb-6 text-center max-w-md">{error.message || 'An error occurred.'}</p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-gold/20 text-gold border border-gold/40 hover:bg-gold/30 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-4 py-2 rounded-lg bg-charcoal-light text-warm border border-charcoal-light hover:bg-charcoal-light/80 transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
