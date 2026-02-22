import Page from './Page.jsx'
import Section from '../components/Section.jsx'
import Card from '../components/Card.jsx'
import { site, highlights } from '../data/site.js'
import { FiMapPin, FiBookOpen } from 'react-icons/fi'

export default function About() {
  return (
    <Page>
      <div className="container-page py-10">
        <div className="glass rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">About</h1>
              <p className="mt-3 max-w-2xl text-slate-300">
                I’m {site.name}, a {site.role} from {site.location}. I enjoy building modern,
                responsive UIs and structured projects with clean components.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="chip">
                  <FiMapPin /> {site.location}
                </span>
                <span className="chip">
                  <FiBookOpen /> Software Engineering
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map((h) => (
                <div
                  key={h.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="font-semibold">{h.title}</div>
                  <div className="mt-1 text-sm text-slate-300">{h.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Section title="Story" kicker="Profile">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <div className="text-lg font-bold">What I focus on</div>
            <ul className="mt-3 list-disc pl-5 text-sm text-slate-300 space-y-2">
              <li>Responsive UI (mobile-first) + clean design systems</li>
              <li>Reusable components, folder structure, maintainability</li>
              <li>Animations and user experience polish</li>
            </ul>
          </Card>

          <Card>
            <div className="text-lg font-bold">What I’m learning</div>
            <ul className="mt-3 list-disc pl-5 text-sm text-slate-300 space-y-2">
              <li>DSA + Java fundamentals</li>
              <li>API integration patterns and best practices</li>
              <li>Testing + deployment workflows</li>
            </ul>
          </Card>
        </div>
      </Section>
    </Page>
  )
}
