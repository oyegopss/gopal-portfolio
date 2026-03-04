'use client'

import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/ProjectCard'

const projects = [
  {
    slug: 'scanura',
    title: 'Scanura',
    tagline: 'QR Based Smart Menu System Startup',
    description: 'Contactless restaurant menu with dynamic menu updates and scalable system architecture.',
    tech: ['Next.js', 'QR', 'Real-time', 'Startup'],
    image: '',
    github: '#',
    live: '#',
    pdfUrl: '/docs/scanura.pdf',
  },
  {
    slug: 'github-insight',
    title: 'GitHub Insight',
    tagline: 'Repository analytics platform',
    description: 'GitHub API integration, commit history analysis, and contributor insights.',
    tech: ['React', 'GitHub API', 'Analytics'],
    image: '',
    github: '#',
    live: '#',
    pdfUrl: '/docs/github-insight.pdf',
  },
  {
    slug: 'agrisentinel',
    title: 'AgriSentinel',
    tagline: 'AI agriculture monitoring system',
    description: 'Crop risk prediction and smart agriculture monitoring.',
    tech: ['AI/ML', 'Python', 'Agriculture'],
    image: '',
    github: '#',
    live: '#',
    pdfUrl: '/docs/agrisentinel.pdf',
  },
  {
    slug: 'thermocare-pack',
    title: 'ThermoCare Pack',
    tagline: 'Heat therapy system',
    description: 'Zeolite-based reaction heat pack. Presented at IIT Roorkee.',
    tech: ['Hardware', 'Zeolite', 'IIT Roorkee'],
    image: '',
    github: '#',
    live: '#',
    pdfUrl: '/docs/thermocare-pack.pdf',
  },
]

export default function ProjectsPage() {
  return (
    <div className="pb-20">
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold text-warm mb-4"
          >
            Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xl text-warm-muted"
          >
            Software, AI, and hardware projects.
          </motion.p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <div key={project.slug} id={project.slug}>
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
