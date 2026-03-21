import { ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { RevealDiv } from './RevealDiv'

export function HowItWorks() {
  const { tag, title, steps } = siteConfig.howItWorks

  return (
    <section className="py-section" id="howitworks">
      <div className="mx-auto max-w-[1180px] px-6">
        <RevealDiv className="mb-12 text-center">
          <span className="liquid-glass section-badge">{tag}</span>
          <h2 className="section-heading">{title}</h2>
        </RevealDiv>

        <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-4 lg:flex-1">
              <RevealDiv delay={i * 0.15} className="liquid-glass rounded-2xl p-8 lg:w-full">
                <div className="mb-3 font-heading text-4xl font-bold text-primary/20">{step.number}</div>
                <h3 className="mb-2 font-heading text-lg font-semibold text-text-primary">{step.title}</h3>
                <p className="text-sm font-light text-text-secondary">{step.desc}</p>
              </RevealDiv>
              {i < steps.length - 1 && (
                <div className="hidden text-text-muted lg:block"><ArrowRight size={24} /></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
