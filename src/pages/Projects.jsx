import React, { useMemo, useState } from 'react'
import Page from './Page.jsx'
import Section from '../components/Section.jsx'
import Card from '../components/Card.jsx'
import { projects } from '../data/projects.js'
import { FiExternalLink, FiGithub, FiSearch } from 'react-icons/fi'

const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]

export default function Projects() {
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const byCat = cat === 'All' ? projects : projects.filter(p => p.category === cat)
    const byQ = q.trim()
      ? byCat.filter(p => (p.title + ' ' + p.desc + ' ' + p.tags.join(' ')).toLowerCase().includes(q.toLowerCase()))
      : byCat
    return byQ
  }, [cat, q])

  return (
    <Page>
      <Section title="Projects" kicker="Portfolio">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={'chip transition ' + (cat === c ? 'bg-white/10 border-white/20 text-white' : '')}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 pl-10 pr-3 py-2 text-sm outline-none focus:border-white/20"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <Card key={p.id} className="flex flex-col">
              <div className="text-xs uppercase tracking-wide text-slate-400">{p.category}</div>
              <div className="mt-2 text-lg font-bold">{p.title}</div>
              <div className="mt-2 text-sm text-slate-300">{p.desc}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => <span key={t} className="chip">{t}</span>)}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2">
                <a className="btn" href={p.links.code} target="_blank" rel="noreferrer">
                  <FiGithub /> Code
                </a>
                <a className="btn btn-primary" href={p.links.demo} target="_blank" rel="noreferrer">
                  <FiExternalLink /> Demo
                </a>
              </div>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-10 text-center text-slate-300">
            No projects found. Try another search.
          </div>
        )}
      </Section>
    </Page>
  )
}
