'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

const items = [
  {
    label: 'LinkedIn',
    description: 'Professional network and career updates',
    href: 'https://linkedin.com/in/gopaljidwivedi',
    icon: FaLinkedin,
    accent: '#0A66C2',
  },
  {
    label: 'GitHub',
    description: 'View my projects and code repositories',
    href: 'https://github.com/oyegopss',
    icon: FaGithub,
    accent: '#F9FAFB',
  },
  {
    label: 'Email',
    description: 'Send me an email',
    href: 'mailto:oyegopss@gmail.com',
    icon: HiMail,
    accent: '#FACC15',
  },
  {
    label: 'WhatsApp',
    description: 'Direct message for quick communication',
    href: 'https://wa.me/919140070535',
    icon: FaWhatsapp,
    accent: '#22C55E',
  },
  {
    label: 'Instagram',
    description: 'Connect and follow my journey',
    href: 'https://instagram.com/',
    icon: FaInstagram,
    accent: '#E11D48',
  },
]

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function ConnectWithMe() {
  return (
    <section className="py-24 px-6 bg-charcoal">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-warm mb-3">
            Connect With Me
          </h2>
          <p className="text-warm-muted text-lg max-w-3xl mx-auto">
            Feel free to reach out for collaborations, internships, or tech discussions.
          </p>
        </div>

        <motion.div
          className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {items.map((item) => {
            const Icon = item.icon
            return (
              <motion.article
                key={item.label}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="glass-card rounded-2xl p-5 border border-charcoal-light/80 hover:border-crimson/60 hover:shadow-[0_0_35px_rgba(220,38,38,0.35)] transition-all flex items-center gap-4"
              >
                <div className="relative flex-shrink-0">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-charcoal border border-charcoal-light/80 shadow-[0_0_25px_rgba(248,250,252,0.35)]"
                    style={{ color: item.accent }}
                  >
                    <Icon className="text-xl" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-semibold text-warm hover:text-crimson-light transition-colors"
                  >
                    {item.label}
                  </Link>
                  <p className="text-xs text-warm-muted/90 mt-0.5 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </motion.div>

        <p className="mt-10 text-center text-xs md:text-sm text-warm-muted/70">
          Open to internships, collaborations, and exciting tech opportunities.
        </p>
      </div>
    </section>
  )
}

