import { siteConfig } from '@/lib/config'
import { RevealDiv } from './RevealDiv'

export function SelfAware() {
  const { tag, title, description, cards } = siteConfig.selfAware

  return (
    <section className="bg-[var(--bg-surface)] py-[var(--section-pad)]" id="selfaware">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealDiv className="mb-12 text-center">
          <span className="liquid-glass section-badge">{tag}</span>
          <h2 className="section-heading">{title}</h2>
          <p className="section-desc mt-4">{description}</p>
        </RevealDiv>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <RevealDiv
              key={i}
              className="liquid-glass rounded-[var(--radius-card)] p-6 transition hover:bg-[var(--bg-card-hover)]"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <h3 className="mb-3 font-[var(--font-heading)] text-lg font-semibold text-[var(--text-primary)]">
                {card.title}
              </h3>
              <p className="text-sm font-light leading-relaxed text-[var(--text-secondary)]">
                {card.desc}
              </p>
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  )
}
