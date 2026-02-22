import React from 'react'

export default function GradientBlob() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute top-24 left-10 h-[360px] w-[360px] rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-rose-500/15 blur-3xl" />
    </div>
  )
}
