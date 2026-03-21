import { Plus } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { RevealDiv } from './RevealDiv'

export function CTA() {
  const { tag, title, description, buttonLabel } = siteConfig.cta

  return (
    <section className="relative py-[var(--section-pad)]" id="cta-setup">
      {/* Red glow bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(228,31,40,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[var(--container-max)] px-6">
        <RevealDiv className="mx-auto max-w-2xl text-center">
          <span className="liquid-glass section-badge">{tag}</span>
          <h2 className="section-heading mb-4">{title}</h2>
          <p className="section-desc mb-8">{description}</p>
          <a
            href="/setup.html"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)] px-8 py-3.5 text-sm font-medium text-white transition hover:brightness-110 hover:shadow-[var(--glow-sm)]"
          >
            <Plus size={18} />
            {buttonLabel}
          </a>
        </RevealDiv>
      </div>
    </section>
  )
}
