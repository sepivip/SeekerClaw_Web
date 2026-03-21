import { ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { RevealDiv } from './RevealDiv'

export function HowItWorks() {
  const { tag, title, steps } = siteConfig.howItWorks

  return (
    <section className="py-[var(--section-pad)]" id="howitworks">
      <div className="mx-auto max-w-[var(--container-max)] px-6">
        <RevealDiv className="mb-12 text-center">
          <span className="liquid-glass section-badge">{tag}</span>
          <h2 className="section-heading">{title}</h2>
        </RevealDiv>

        <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-4 lg:flex-1">
              <RevealDiv
                className="liquid-glass rounded-2xl p-8 lg:w-full"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="mb-3 font-[var(--font-heading)] text-4xl font-bold text-[var(--primary)] opacity-20">
                  {step.number}
                </div>
                <h3 className="mb-2 font-[var(--font-heading)] text-lg font-semibold text-[var(--text-primary)]">
                  {step.title}
                </h3>
                <p className="text-sm font-light text-[var(--text-secondary)]">
                  {step.desc}
                </p>
              </RevealDiv>
              {i < steps.length - 1 && (
                <div className="hidden text-[var(--text-muted)] lg:block">
                  <ArrowRight size={24} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
