import React, { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lottie from 'lottie-react'

/**
 * Splash screen shows only on first load OR hard refresh.
 * Hidden for normal navigation using sessionStorage.
 * Duration: 4 seconds
 * Lottie animation: /public/splash.json
 */
export default function SplashGate({ children }) {
  const [ready, setReady] = useState(false)
  const [show, setShow] = useState(false)
  const [animData, setAnimData] = useState(null)

  const shouldShow = useMemo(() => {
    try {
      return sessionStorage.getItem('splash_seen') !== '1'
    } catch {
      return true
    }
  }, [])

  // Load Lottie JSON from public folder
  useEffect(() => {
    if (!shouldShow) return
    fetch('/splash.json')
      .then((r) => r.json())
      .then(setAnimData)
      .catch(() => setAnimData(null))
  }, [shouldShow])

  useEffect(() => {
    if (!shouldShow) {
      setReady(true)
      return
    }

    setShow(true)

    const timer = setTimeout(() => {
      setShow(false)
      try {
        sessionStorage.setItem('splash_seen', '1')
      } catch {}
      setReady(true)
    }, 4000)

    return () => clearTimeout(timer)
  }, [shouldShow])

  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-[9999] grid place-items-center bg-slate-950"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              {/* Lottie Animation */}
              <motion.div
                className="mx-auto mb-4 w-44 sm:w-56"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              >
                {animData ? (
                  <Lottie animationData={animData} loop autoplay />
                ) : (
                  // Fallback if splash.json missing
                  <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl border border-white/10 bg-white/5 shadow-soft">
                    <span className="text-sm font-black tracking-tight"></span>
                  </div>
                )}
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {ready ? children : null}
    </>
  )
}
