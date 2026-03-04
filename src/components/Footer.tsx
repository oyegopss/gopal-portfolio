'use client'

import Link from 'next/link'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { motion } from 'framer-motion'

const socials = [
  { href: 'https://github.com', icon: FaGithub, label: 'GitHub' },
  { href: 'https://linkedin.com', icon: FaLinkedin, label: 'LinkedIn' },
  { href: 'mailto:contact@gopal.dev', icon: HiMail, label: 'Email' },
]

export function Footer() {
  return (
    <footer className="border-t border-charcoal-light bg-charcoal/80">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-warm-muted text-sm">
            © {new Date().getFullYear()} Gopal Ji Dwivedi. Built with Next.js & Tailwind.
          </div>
          <div className="flex gap-6">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-warm-muted hover:text-gold transition-colors"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
