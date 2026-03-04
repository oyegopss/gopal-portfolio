'use client'

import { motion } from 'framer-motion'
import { HiDownload } from 'react-icons/hi'

export default function ResumePage() {
  return (
    <div className="pb-20">
      <section className="pt-16 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-display font-bold text-warm mb-4"
          >
            Resume
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xl text-warm-muted"
          >
            View or download my resume.
          </motion.p>
        </div>
      </section>

      <section className="px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-charcoal-light bg-charcoal-light/20 overflow-hidden"
          >
            <div className="aspect-[8.5/11] max-h-[80vh] bg-charcoal flex items-center justify-center text-warm-muted">
              <div className="text-center p-8">
                <p className="text-lg mb-4">Resume viewer placeholder</p>
                <p className="text-sm">Upload your PDF or link to resume for live preview.</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex justify-center"
          >
            <a
              href="#"
              download
              className="inline-flex items-center gap-2 px-8 py-4 bg-crimson text-white font-semibold rounded-lg hover:bg-crimson-dark transition-colors"
              data-cursor
            >
              <HiDownload className="text-xl" /> Download Resume
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
