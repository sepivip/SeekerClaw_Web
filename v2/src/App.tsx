import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { HowItWorks } from '@/components/HowItWorks'
import { SelfAware } from '@/components/SelfAware'
import { UseCases } from '@/components/UseCases'
import { Comparison } from '@/components/Comparison'
import { Roadmap } from '@/components/Roadmap'
import { Vision } from '@/components/Vision'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'

export default function App() {
  return (
    <div className="bg-[var(--background)] overflow-visible">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <SelfAware />
        <UseCases />
        <Comparison />
        <Roadmap />
        <Vision />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
