import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Page from './Page.jsx'
import Section from '../components/Section.jsx'
import Card from '../components/Card.jsx'
import { site } from '../data/site.js'
import { FiArrowRight, FiCheckCircle, FiDownload } from 'react-icons/fi'
import { projects } from '../data/projects.js'

export default function Home() {
  return (
    <Page>
      <header className="relative">
        <div className="container-page py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">

            {/* ✅ IMAGE — Mobile 1st | Desktop Left (NO CARD/BOX) */}
            <div className="lg:col-span-5 order-1 lg:order-1">
                  <img
                  src="me.jpg"   // ✅ CHANGE HERE
                  alt="Afeef Shafi"
                  className="h-[360px] w-full object-contain sm:h-[420px] lg:h-[520px]"
                />
            </div>

            {/* ✅ TEXT — Mobile 2nd | Desktop Right */}
            <div className="lg:col-span-7 order-2 lg:order-2">
              <motion.p
                className="chip w-fit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                <FiCheckCircle /> Available for internships / projects
              </motion.p>

              <motion.h1
                className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 }}
              >
                Hi there! I’m <span className="text-indigo-200">{site.name}</span>.
                <br />
              </motion.h1>

              <motion.p
                className="mt-5 max-w-2xl text-slate-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
              >
                I'm a tech enthusiast specializing in crafting responsive and user-friendly web
                applications. With a passion for innovation, I aim to deliver seamless digital
                experiences that captivate users and drive engagement.
              </motion.p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link className="btn btn-primary" to="/projects">
                  View Projects <FiArrowRight />
                </Link>

                <Link className="btn" to="/contact">
                  Contact Me
                </Link>

              <a
                  className="btn"
                  href="/CV.pdf"
                  download
                  target="_blank"
                  rel="noreferrer"
                >
                  <FiDownload /> Download CV
                </a>

              </div>
            </div>

          </div>
        </div>
      </header>

      <Section title="Featured Projects" kicker="Work">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <Card key={p.id} className="group">
              <div className="text-xs uppercase tracking-wide text-slate-400">{p.category}</div>
              <div className="mt-2 text-lg font-bold">{p.title}</div>
              <div className="mt-2 text-sm text-slate-300">{p.desc}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
              <div className="mt-5">
                <Link to="/projects" className="btn w-full">
                  See Details <FiArrowRight />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="What I can do" kicker="Skills">
        <div className="grid gap-4 lg:grid-cols-3">
          <Card>
            <div className="text-lg font-bold">Frontend</div>
            <p className="mt-2 text-sm text-slate-300">
              React, routing, reusable components, responsive UI, animations.
            </p>
          </Card>
          <Card>
            <div className="text-lg font-bold">Backend (optional)</div>
            <p className="mt-2 text-sm text-slate-300">
              Node / PHP / Java basics. Can connect APIs and databases when needed.
            </p>
          </Card>
          <Card>
            <div className="text-lg font-bold">Tools</div>
            <p className="mt-2 text-sm text-slate-300">
              GitHub, VS Code, Postman, Figma, deployment on Vercel/Netlify.
            </p>
          </Card>
        </div>
      </Section>
    </Page>
  )
}