import React from 'react'
import { site } from '../data/site'

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="container-page py-10 text-sm text-slate-400">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} <span className="text-slate-200 font-semibold">Developed by {site.name}</span>. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}
