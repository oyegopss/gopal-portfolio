'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChatAlt2, HiX, HiPaperAirplane } from 'react-icons/hi'

type Sender = 'user' | 'bot'

interface Message {
  id: number
  sender: Sender
  text: string
}

const initialMessages: Message[] = [
  {
    id: 1,
    sender: 'bot',
    text: 'Hi, I am DevAssistant. Ask me anything about Gopal Ji Dwivedi, his projects, skills, or experience.',
  },
]

function getBotResponse(input: string): string {
  const q = input.toLowerCase()

  if (q.includes('who') && (q.includes('gopal') || q.includes('you'))) {
    return 'Gopal Ji Dwivedi is a software developer and AI & ML enthusiast from Kanpur, Uttar Pradesh. He focuses on building scalable software systems, intelligent products, and startup ideas.'
  }

  if (q.includes('project') || q.includes('built') || q.includes('work on')) {
    return 'Some of Gopal’s key projects include Scanura (QR-based smart menu system), GitHub Insight (repository analytics platform), AgriSentinel (AI agriculture monitoring), and ThermoCare Pack (heat therapy system presented at IIT Roorkee).'
  }

  if (q.includes('tech') || q.includes('stack') || q.includes('technolog') || q.includes('skills')) {
    return 'Gopal works with Python, Java, C, JavaScript, HTML/CSS, React, Next.js, Tailwind, GitHub, Google Cloud, REST APIs, and core CS concepts like Data Structures, OOP, OS, Networks, AI, and Machine Learning.'
  }

  if (q.includes('hackathon') || q.includes('competition') || q.includes('innovation')) {
    return 'Gopal actively participates in hackathons and innovation events, building prototypes and systems around AI, web platforms, and startup-style products like Scanura and AgriSentinel.'
  }

  if (q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('connect')) {
    return 'You can contact Gopal via the Contact page on this portfolio or connect with him on GitHub and LinkedIn. Use the Contact section for a direct message.'
  }

  if (q.includes('role') || q.includes('intern') || q.includes('experience') || q.includes('current')) {
    return 'Gopal is working as a Software Engineer Intern at Yugayatra, focusing on building scalable application features, writing clean code, and collaborating with dev teams.'
  }

  return 'I may not have a perfect answer to that, but I can tell you about Gopal’s projects, skills, hackathons, and how to contact him. Try asking, for example: “What projects has he built?”'
}

export function DevAssistantChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const nextIdRef = useRef(2)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [messages, typing, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return

    const userMessage: Message = {
      id: nextIdRef.current++,
      sender: 'user',
      text: trimmed,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setTyping(true)

    const replyText = getBotResponse(trimmed)
    setTimeout(() => {
      const botMessage: Message = {
        id: nextIdRef.current++,
        sender: 'bot',
        text: replyText,
      }
      setMessages((prev) => [...prev, botMessage])
      setTyping(false)
    }, 650)
  }

  return (
    <>
      {/* Floating bubble */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-crimson text-white p-3.5 shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:bg-crimson-dark transition-all flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Open DevAssistant chat"
      >
        <HiChatAlt2 className="text-2xl" />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-20 right-4 z-40 w-[320px] sm:w-[360px] rounded-2xl border border-charcoal-light bg-charcoal shadow-[0_20px_60px_rgba(0,0,0,0.75)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-charcoal-light bg-charcoal-light/40">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-crimson text-xs font-bold">
                    DA
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-warm">DevAssistant</p>
                    <p className="text-[11px] text-emerald-400">Portfolio Q&A</p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-warm-muted hover:text-warm transition-colors"
                aria-label="Close chat"
              >
                <HiX className="text-lg" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 px-3 pt-3 pb-2 overflow-y-auto space-y-2 bg-gradient-to-b from-charcoal to-charcoal-light/10">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-crimson text-white rounded-br-sm'
                        : 'bg-charcoal-light/60 text-warm rounded-bl-sm border border-charcoal-light/80'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="px-3 py-2 rounded-2xl bg-charcoal-light/60 text-warm rounded-bl-sm border border-charcoal-light/80 flex items-center gap-1">
                    <span className="sr-only">DevAssistant is typing…</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-3 py-2 border-t border-charcoal-light bg-charcoal">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Gopal, projects, tech..."
                className="flex-1 bg-transparent text-xs text-warm placeholder:text-warm-muted/50 focus:outline-none"
              />
              <button
                type="submit"
                className="p-1.5 rounded-full bg-crimson text-white hover:bg-crimson-dark transition-colors disabled:opacity-50"
                disabled={!input.trim()}
                aria-label="Send message"
              >
                <HiPaperAirplane className="text-base" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

