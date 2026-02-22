import React from 'react'
import { motion } from 'framer-motion'

export default function Section({ title, kicker, children }) {
  return (
    <section className="py-12 sm:py-16">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {kicker && <div className="text-xs uppercase tracking-widest text-slate-400">{kicker}</div>}
          <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  )
}
