import { siteConfig } from '@/lib/config'
import { RevealDiv } from './RevealDiv'

export function Comparison() {
  const { tag, title, description, headers, rows } = siteConfig.comparison

  return (
    <section className="bg-surface py-section" id="comparison">
      <div className="mx-auto max-w-[1180px] px-6">
        <RevealDiv className="mb-12 text-center">
          <span className="liquid-glass section-badge">{tag}</span>
          <h2 className="section-heading">{title}</h2>
          <p className="section-desc mt-4">{description}</p>
        </RevealDiv>

        <RevealDiv className="overflow-x-auto rounded-2xl liquid-glass">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10">
                {headers.map((h, i) => (
                  <th key={i} className={`px-6 py-4 font-heading font-semibold ${
                    i === 2 ? 'text-primary' : 'text-text-primary'
                  }`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className={`border-b border-white/5 transition hover:bg-white/[0.02] ${
                  i % 2 === 0 ? 'bg-white/[0.01]' : ''
                }`}>
                  <td className="px-6 py-3.5 font-medium text-text-primary">{row[0]}</td>
                  <td className="px-6 py-3.5 text-text-muted">
                    {row[1].startsWith('✗') ? <span className="text-text-muted">✗</span> : row[1]}
                  </td>
                  <td className="px-6 py-3.5">
                    {row[2].startsWith('✓') ? (
                      <><span className="text-primary">✓</span><span className="text-text-secondary">{row[2].slice(1)}</span></>
                    ) : row[2]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </RevealDiv>
      </div>
    </section>
  )
}
