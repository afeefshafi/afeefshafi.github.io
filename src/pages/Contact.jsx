import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import Page from './Page.jsx'
import Section from '../components/Section.jsx'
import Card from '../components/Card.jsx'
import { site } from '../data/site.js'
import { FiMail, FiSend, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import { AiFillMobile } from 'react-icons/ai'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | ok | err
  const [errorMsg, setErrorMsg] = useState('')

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('idle')
    setErrorMsg('')

    // ✅ Save form reference immediately (prevents currentTarget null issue)
    const formEl = e.currentTarget

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus('err')
      setErrorMsg('EmailJS keys missing. Please set .env values and restart the dev server.')
      return
    }

    const form = new FormData(formEl)
    const name = String(form.get('name') || '').trim()
    const email = String(form.get('email') || '').trim()
    const message = String(form.get('message') || '').trim()

    if (!name || !email || !message) {
      setStatus('err')
      setErrorMsg('Please fill all fields.')
      return
    }

    try {
      setStatus('sending')

      // ✅ MUST match your EmailJS template variables:
      // {{title}} {{name}} {{email}} {{message}}
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          title: 'Portfolio Contact Form',
          name,
          email,
          message,
        },
        { publicKey: PUBLIC_KEY }
      )

      setStatus('ok')
      formEl.reset()
    } catch (err) {
      console.error('EmailJS Error:', err)
      setStatus('err')

      // show useful error from EmailJS
      setErrorMsg(err?.text || err?.message || 'Failed to send. Please try again later.')
    }
  }

  return (
    <Page>
      <Section title="Contact" kicker="Let’s talk">
        <div className="grid gap-4 lg:grid-cols-12">
          <Card className="lg:col-span-5">
            <div className="text-lg font-bold">Get in touch</div>
            <p className="mt-2 text-sm text-slate-300">Use the form or email me directly.</p>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <FiMail className="text-slate-200" />
                {site.email}
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <AiFillMobile className="text-slate-200" />
                {site.Mobile}
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-7">
            <div className="text-lg font-bold">Message</div>

            <form className="mt-4 grid gap-3" onSubmit={onSubmit}>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  name="name"
                  placeholder="Enter your name"
                  autoComplete="name"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-white/20"
                />
                <input
                  name="email"
                  placeholder="name@gmail.com"
                  type="email"
                  autoComplete="email"
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-white/20"
                />
              </div>

              <textarea
                name="message"
                placeholder="Write your message..."
                rows={6}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-white/20"
              />

              <button className="btn btn-primary w-fit" type="submit" disabled={status === 'sending'}>
                <FiSend /> {status === 'sending' ? 'Sending...' : 'Send'}
              </button>

              {status === 'ok' && (
                <div className="mt-2 flex items-center gap-2 text-sm text-emerald-200">
                  <FiCheckCircle /> Message sent successfully!
                </div>
              )}

              {status === 'err' && (
                <div className="mt-2 flex items-center gap-2 text-sm text-rose-200">
                  <FiAlertCircle /> {errorMsg || 'Something went wrong.'}
                </div>
              )}
            </form>
          </Card>
        </div>
      </Section>
    </Page>
  )
}
