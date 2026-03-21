import { Eye, TrendingUp, Bell, Home, Terminal, Globe } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { RevealDiv } from './RevealDiv'

const iconMap = { Eye, TrendingUp, Bell, Home, Terminal, Globe } as const

export function UseCases() {
  const { tag, title, description, items } = siteConfig.useCases

  return (
    <section className="py-[var(--section-pad)]" id="usecases">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealDiv className="mb-12 text-center">
          <span className="liquid-glass section-badge">{tag}</span>
          <h2 className="section-heading">{title}</h2>
          <p className="section-desc mt-4">{description}</p>
        </RevealDiv>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <RevealDiv
                key={i}
                className="liquid-glass rounded-[var(--radius-card)] p-6 transition hover:bg-[var(--bg-card-hover)]"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <Icon size={18} className="text-[var(--primary)]" />
                  <h3 className="font-[var(--font-heading)] text-base font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                </div>
                <div className="flex flex-col gap-2">
                  {item.messages.map((msg, j) => (
                    <div
                      key={j}
                      className="flex gap-2 text-sm font-light text-[var(--text-secondary)]"
                    >
                      <span className="font-[var(--font-mono)] text-[var(--primary)] shrink-0">&gt;</span>
                      <span className="font-[var(--font-mono)]">{msg}</span>
                    </div>
                  ))}
                </div>
              </RevealDiv>
            )
          })}
        </div>
      </div>
    </section>
  )
}
