'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

const socials = [
  { href: 'https://github.com', icon: FaGithub, label: 'GitHub' },
  { href: 'https://linkedin.com', icon: FaLinkedin, label: 'LinkedIn' },
  { href: 'mailto:contact@gopal.dev', icon: HiMail, label: 'Email' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submit (e.g. send to API)
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
            <button
              type="submit"
              className="w-full py-4 bg-crimson text-white font-semibold rounded-lg hover:bg-crimson-dark transition-colors"
              data-cursor
            >
              Send Message
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
