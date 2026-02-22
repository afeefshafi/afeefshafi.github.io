import React, { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiGithub, FiLinkedin, FiInstagram } from 'react-icons/fi'
import { site } from '../data/site'
import { cn } from '../lib/utils'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

function LinkItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'relative rounded-2xl px-3 py-2 text-sm font-semibold transition',
          isActive ? 'text-white' : 'text-slate-300 hover:text-white'
        )
      }
    >
      {({ isActive }) => (
        <>
          {label}
          {isActive && (
            <motion.span
              layoutId="nav-pill"
              className="absolute inset-0 -z-10 rounded-2xl bg-white/10 border border-white/10"
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            />
          )}
        </>
      )}
    </NavLink>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu open (mobile)
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open])

  const socials = useMemo(() => ([
    { href: site.socials.github, icon: <FiGithub />, label: 'GitHub' },
    { href: site.socials.linkedin, icon: <FiLinkedin />, label: 'LinkedIn' },
  ]), [])

  return (
    <header className={cn('sticky top-0 z-50', scrolled ? 'backdrop-blur-xl' : '')}>
      <div className={cn('border-b border-white/10', scrolled ? 'bg-slate-950/70' : 'bg-transparent')}>
        <div className="container-page">
          <div className="flex h-16 items-center justify-between">
            <NavLink to="/" className="flex items-center gap-2">

              <div className="leading-tight">
                <div className="text-sm font-bold">{site.name}</div>
                <div className="text-xs text-white/60">{site.role}</div>
              </div>
            </NavLink>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 md:flex">
              <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 p-1">
                {navItems.map((it) => (
                  <LinkItem key={it.to} to={it.to} label={it.label} />
                ))}
              </div>

              <div className="ml-3 flex items-center gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="btn"
                    aria-label={s.label}
                    title={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </nav>

            {/* Mobile button */}
            <button
              className="btn md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <FiX /> : <FiMenu />}
              <span className="text-sm"></span>
            </button>
          </div>
        </div>
      </div>

{/* Mobile menu */}
<AnimatePresence>
  {open && (
    <>
      {/* Overlay */}
      <motion.div
        className="fixed inset-0 z-[9998] bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <motion.aside
        className="fixed right-0 top-0 z-[9999] h-[100dvh] w-[85%] max-w-sm border-l border-white/10 bg-slate-950"
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Make drawer content scrollable */}
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
            <div className="text-sm font-bold"></div>
            <button className="btn" onClick={() => setOpen(false)} aria-label="Close menu">
              <FiX />
            </button>
          </div>

          {/* Scroll area */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid gap-2">
              {navItems.map((it) => (
                <NavLink
                  key={it.to}
                  to={it.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'rounded-2xl border px-4 py-3 text-sm font-semibold transition',
                      isActive
                        ? 'border-white/15 bg-white/10 text-white'
                        : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
                    )
                  }
                >
                  {it.label}
                </NavLink>
              ))}
            </div>

            <div className="mt-6 glass rounded-2xl p-4">
              <div className="text-xs uppercase tracking-wide text-slate-400">Social</div>
              <div className="mt-3 flex gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="btn w-full"
                  >
                    {s.icon} {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* bottom space so last item not hidden */}
            <div className="h-6" />
          </div>
        </div>
      </motion.aside>
    </>
  )}
</AnimatePresence>

    </header>
  )
}
