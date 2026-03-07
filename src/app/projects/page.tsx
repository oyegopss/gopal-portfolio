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
    image: '/images/scanura.png',
    github: 'https://github.com/oyegopss/scanura',
    live: '',
  },
  {
    slug: 'github-insight',
    title: 'GitHub Insight',
    tagline: 'Repository Analytics Platform',
    description: 'GitHub API integration, commit history analysis, contributor insights, and code contributions heatmap.',
    tech: ['React', 'GitHub API', 'Analytics'],
    image: '/images/github-insight.png',
    github: 'https://github.com/oyegopss/github-insight',
    live: 'https://githire-insight-tkefqnaghl8mpxf3pawj7q.streamlit.app/',
  },
  {
    slug: 'agrisentinel',
    title: 'AgriSentinel',
    tagline: 'AI Agriculture Intelligence Platform',
    description: 'Crop disease detection, yield prediction, and Mandi intelligence using AI and Government Open Data API.',
    tech: ['AI/ML', 'Python', 'Agriculture'],
    image: '/images/agrisentinel.png',
    github: 'https://github.com/oyegopss/agrisentinel-ai',
    live: 'https://agrisentinel-ai.vercel.app/',
    pdfUrl: '/docs/agrisentinel.pdf',
  },
  {
    slug: 'thermocare-pack',
    title: 'ThermoCare Pack',
    tagline: 'Zeolite-Based Non-Electrical Heat Therapy System',
    description: 'Water-activated therapeutic warmth (45–60°C), reusable and portable. Presented at IIT Roorkee.',
    tech: ['Hardware', 'Zeolite', 'IIT Roorkee'],
    image: '/images/thermocare-pack.png',
    github: 'https://github.com/oyegopss/thermocare-pack',
    live: '',
  },
  {
    slug: 'auditsentinel',
    title: 'AuditSentinel',
    tagline: 'Agentic AI Governance with Human Oversight & On-Chain Audit Logging',
    description: 'AI decision engine with risk detection, human-in-the-loop approval/denial, and blockchain audit logging.',
    tech: ['AI', 'Blockchain', 'Governance'],
    image: '/images/auditsentinel.png',
    github: 'https://github.com/oyegopss/auditsentinel',
    live: '',
    pdfUrl: '/docs/auditsentinel.pdf',
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
