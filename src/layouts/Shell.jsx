import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import GradientBlob from '../components/GradientBlob.jsx'

export default function Shell({ children }) {
  return (
    <div className="min-h-screen">
      <GradientBlob />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
