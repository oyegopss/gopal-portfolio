'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINES = [
  '> whoami',
  'Gopal Ji Dwivedi',
  '',
  '> role',
  'Software Developer | AI & ML Enthusiast',
  '',
  '> location',
  'Kanpur, Uttar Pradesh',
  '',
  '> education',
  'B.Tech CSE (AI & ML), Axis College',
  '',
  '> current_role',
  'Software Engineer Intern at Yugayatra',
  '',
  '> interests',
  'AI Systems',
  'Startup Building',
  'Hackathons',
  'Scalable Software',
]

const TYPE_DELAY = 40
const LINE_PAUSE = 450

export function DeveloperTerminal() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [completedLines, setCompletedLines] = useState<string[]>([])
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (isDone) return

    const fullLine = LINES[currentLineIndex] ?? ''

    // Instantly add empty spacer lines
    if (fullLine.length === 0 && currentText.length === 0) {
      setCompletedLines((prev) => [...prev, ''])
      if (currentLineIndex === LINES.length - 1) {
        setIsDone(true)
      } else {
        setCurrentLineIndex((idx) => idx + 1)
      }
      return
    }

    if (currentText.length < fullLine.length) {
      const timeout = setTimeout(() => {
        setCurrentText(fullLine.slice(0, currentText.length + 1))
      }, TYPE_DELAY)
      return () => clearTimeout(timeout)
    }

    const pause = setTimeout(() => {
      setCompletedLines((prev) => [...prev, fullLine])
      setCurrentText('')
      if (currentLineIndex === LINES.length - 1) {
        setIsDone(true)
      } else {
        setCurrentLineIndex((idx) => idx + 1)
      }
    }, LINE_PAUSE)

    return () => clearTimeout(pause)
  }, [currentLineIndex, currentText, isDone])

  const showCursor = !isDone
  const activeLine = isDone ? '' : currentText

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="max-w-5xl mx-auto px-6 pb-10"
    >
      <div className="mb-6">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-warm mb-2">
          Developer Terminal
        </h2>
        <p className="text-warm-muted text-sm md:text-base">
          A quick peek into who I am, in terminal form.
        </p>
      </div>

      <div className="rounded-2xl border border-charcoal-light bg-[#020617] shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Terminal header bar */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-charcoal-light bg-[#020617]/90">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
          <span className="ml-3 text-xs text-warm-muted/60 font-mono">
            gopal@portfolio:~$
          </span>
        </div>

        {/* Terminal body */}
        <div className="px-4 py-4 md:px-6 md:py-5 font-mono text-[12px] md:text-[13px] leading-relaxed text-emerald-400/90 bg-gradient-to-br from-black via-[#020617] to-[#020617]">
          {completedLines.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap">
              {line}
            </div>
          ))}

          {!isDone && (
            <div className="whitespace-pre-wrap inline-flex items-center">
              {activeLine}
              <span className="terminal-cursor" />
            </div>
          )}

          {isDone && (
            <div className="whitespace-pre-wrap inline-flex items-center">
              <span>&gt; </span>
              <span className="terminal-cursor" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

