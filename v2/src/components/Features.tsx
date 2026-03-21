import { Brain, Clock, MessageCircle, Smartphone, Globe, Wrench } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { RevealDiv } from './RevealDiv'

const iconMap = { Brain, Clock, MessageCircle, Smartphone, Globe, Wrench } as const

export function Features() {
  const { tag, title, description, items } = siteConfig.features

  return (
    <section className="bg-surface py-section" id="features">
      <div className="mx-auto max-w-[1180px] px-6">
        <RevealDiv className="mb-12 text-center">
          <span className="liquid-glass section-badge">{tag}</span>
          <h2 className="section-heading">{title}</h2>
          <p className="section-desc mt-4">{description}</p>
        </RevealDiv>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <RevealDiv key={i} delay={i * 0.08}
                className="liquid-glass rounded-2xl p-6 transition hover:bg-card-hover">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full liquid-glass-strong">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-text-primary">{item.title}</h3>
                <p className="text-sm font-light leading-relaxed text-text-secondary">{item.desc}</p>
              </RevealDiv>
            )
          })}
        </div>
      </div>
    </section>
  )
}
