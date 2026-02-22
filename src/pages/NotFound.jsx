import React from 'react'
import { Link } from 'react-router-dom'
import Page from './Page.jsx'
import { FiArrowLeft } from 'react-icons/fi'

export default function NotFound() {
  return (
    <Page>
      <div className="container-page py-20">
        <div className="glass rounded-3xl p-8 text-center">
          <div className="text-6xl font-black tracking-tight">404</div>
          <div className="mt-2 text-lg font-bold">Page not found</div>
          <div className="mt-2 text-sm text-slate-300">
            The page you’re looking for doesn’t exist.
          </div>
          <div className="mt-6">
            <Link to="/" className="btn btn-primary">
              <FiArrowLeft /> Go Home
            </Link>
          </div>
        </div>
      </div>
    </Page>
  )
}
