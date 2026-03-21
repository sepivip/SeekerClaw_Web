import { siteConfig } from '@/lib/config'
import { RevealDiv } from './RevealDiv'

export function Vision() {
  const { title, text, tagline, taglineBold } = siteConfig.vision

  return (
    <section className="bg-[var(--bg-surface)] py-[var(--section-pad)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealDiv className="mx-auto max-w-2xl text-center">
          <h2 className="section-heading gradient-text mb-6">{title}</h2>
          <p className="mb-4 text-base font-light leading-relaxed text-[var(--text-secondary)]">
            {text}
          </p>
          <p className="text-base font-light text-[var(--text-muted)]">
            {tagline} <strong className="font-semibold text-[var(--text-primary)]">{taglineBold}</strong>.
          </p>
        </RevealDiv>
      </div>
    </section>
  )
}
