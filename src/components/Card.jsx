import React from 'react'

export default function Card({ children, className = '' }) {
  return (
    <div className={'glass rounded-3xl p-5 sm:p-6 ' + className}>
      {children}
    </div>
  )
}
