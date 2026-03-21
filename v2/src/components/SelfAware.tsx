import { siteConfig } from '@/lib/config'
import { RevealDiv } from './RevealDiv'

export function SelfAware() {
  const { tag, title, description, cards } = siteConfig.selfAware

  return (
    <section className="bg-surface py-section" id="selfaware">
      <div className="mx-auto max-w-[1180px] px-6">
        <RevealDiv className="mb-12 text-center">
          <span className="liquid-glass section-badge">{tag}</span>
          <h2 className="section-heading">{title}</h2>
          <p className="section-desc mt-4">{description}</p>
        </RevealDiv>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <RevealDiv key={i} delay={i * 0.1}
              className="liquid-glass rounded-2xl p-6 transition hover:bg-card-hover">
              <h3 className="mb-3 font-heading text-lg font-semibold text-text-primary">{card.title}</h3>
              <p className="text-sm font-light leading-relaxed text-text-secondary">{card.desc}</p>
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  )
}
