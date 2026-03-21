import { Check } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { RevealDiv } from './RevealDiv'

const phaseColors = {
  now: 'bg-emerald-500',
  next: 'bg-amber-500',
  future: 'bg-blue-500',
} as const

export function Roadmap() {
  const { tag, title, columns } = siteConfig.roadmap

  return (
    <section className="py-section" id="roadmap">
      <div className="mx-auto max-w-[1180px] px-6">
        <RevealDiv className="mb-12 text-center">
          <span className="liquid-glass section-badge">{tag}</span>
          <h2 className="section-heading">{title}</h2>
        </RevealDiv>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {columns.map((col, i) => (
            <RevealDiv key={i} delay={i * 0.12} className="liquid-glass rounded-2xl p-6">
              <div className="mb-4 flex items-center gap-2.5">
                <span className={`h-2.5 w-2.5 rounded-full ${phaseColors[col.phase]}`} />
                <span className="font-heading text-sm font-semibold text-text-primary">
                  {col.label}{col.phase === 'now' && ' ✅'}
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {col.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm font-light text-text-secondary">
                    {col.phase === 'now'
                      ? <Check size={14} className="mt-0.5 shrink-0 text-emerald-500" />
                      : <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/20" />}
                    {item}
                  </li>
                ))}
              </ul>
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  )
}
