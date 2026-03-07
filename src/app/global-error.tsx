'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-charcoal text-warm min-h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-2xl font-bold text-warm mb-2">Something went wrong</h1>
        <p className="text-warm-muted mb-6 text-center max-w-md">{error.message || 'A critical error occurred.'}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 rounded-lg bg-gold/20 text-gold border border-gold/40 hover:bg-gold/30 transition-colors"
        >
          Try again
        </button>
      </body>
    </html>
  )
}
