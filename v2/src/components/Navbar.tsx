import { useState } from 'react'
import { Menu, X, Github, Download } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { useScrolled } from '@/lib/hooks'

export function Navbar() {
  const scrolled = useScrolled()
  const [open, setOpen] = useState(false)
  const { brand, links, nav } = siteConfig

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'liquid-glass py-3' : 'py-4'
      }`}
    >
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2.5">
          <img src={brand.logo} alt={brand.name} className="h-10 w-10" />
          <span className="font-heading text-lg font-bold text-text-primary">
            Seeker<span className="text-primary">Claw</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-full px-2 py-1.5 liquid-glass md:flex">
          {nav.anchors.map(l => (
            <a key={l.href} href={l.href} className="rounded-full px-4 py-1.5 text-sm font-medium text-fg/90 transition hover:bg-white/5">
              {l.label}
            </a>
          ))}
          {nav.pages.map(l => (
            <a key={l.href} href={l.href} className="rounded-full px-4 py-1.5 text-sm font-medium text-fg/90 transition hover:bg-white/5">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a href={links.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-text-primary liquid-glass-strong transition hover:bg-white/5">
            <Github size={16} /> GitHub
          </a>
          <a href={links.dappStore}
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:brightness-110">
            <Download size={16} /> dApp Store
          </a>
        </div>

        <button className="text-text-primary md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="mt-2 mx-4 rounded-2xl p-4 liquid-glass-strong md:hidden">
          <div className="flex flex-col gap-2">
            {[...nav.anchors, ...nav.pages].map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-fg/90 transition hover:bg-white/5">
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
              <a href={links.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-text-primary liquid-glass-strong">
                <Github size={16} /> GitHub
              </a>
              <a href={links.dappStore}
                className="flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-white">
                <Download size={16} /> dApp Store
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
