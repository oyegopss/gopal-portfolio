'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

const CONTACT_EMAIL = 'oyegopss@gmail.com'
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'e448636b-c574-4897-b68f-e61170a92057'

const socials = [
  { href: 'https://github.com/oyegopss', icon: FaGithub, label: 'GitHub' },
  { href: 'https://linkedin.com/in/gopaljidwivedi', icon: FaLinkedin, label: 'LinkedIn' },
  { href: `mailto:${CONTACT_EMAIL}`, icon: HiMail, label: 'Email' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: form.name,
          email: form.email,
          message: form.message,
          from_name: 'Gopal Portfolio Contact',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="pb-20">
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold text-warm mb-4"
          >
            Contact
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xl text-warm-muted"
          >
            Get in touch for opportunities or collaboration.
          </motion.p>
        </div>
      </section>

      <section className="px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-warm-muted mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-charcoal-light border border-charcoal-light text-warm placeholder-warm-muted/50 focus:border-crimson focus:outline-none transition-colors"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-warm-muted mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-charcoal-light border border-charcoal-light text-warm placeholder-warm-muted/50 focus:border-crimson focus:outline-none transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-warm-muted mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-charcoal-light border border-charcoal-light text-warm placeholder-warm-muted/50 focus:border-crimson focus:outline-none transition-colors resize-none"
                placeholder="Your message"
                required
              />
            </div>
            {status === 'success' && (
              <p className="text-emerald-400 text-sm font-medium">Message sent! I&apos;ll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="text-crimson text-sm font-medium">Something went wrong. Please try again or email directly.</p>
            )}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-4 bg-crimson text-white font-semibold rounded-lg hover:bg-crimson-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              data-cursor
            >
              {status === 'sending' ? 'Sending…' : 'Send Message'}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-2xl font-display font-bold text-warm mb-4">Social Links</h2>
            <div className="flex flex-col gap-4">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-warm-muted hover:text-gold transition-colors"
                  data-cursor
                >
                  <Icon size={28} />
                  <span className="text-lg">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
