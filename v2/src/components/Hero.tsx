import { Download, Github, ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { siteConfig } from '@/lib/config'
import { useSlideshow, useCounter } from '@/lib/hooks'

function StatItem({ stat }: { stat: (typeof siteConfig.stats)[number] }) {
  const isNumeric = typeof stat.value === 'number'
  const { ref, value } = useCounter(isNumeric ? (stat.value as number) : 0)

  const formatted = isNumeric
    ? value.toLocaleString()
    : stat.value

  return (
    <div className="text-center px-4" ref={ref as React.RefObject<HTMLDivElement>}>
      <div className="font-[var(--font-heading)] text-2xl font-bold text-[var(--text-primary)] md:text-3xl">
        {formatted}
        {stat.suffix && <span className="text-[var(--primary)]">{stat.suffix}</span>}
      </div>
      <div className="mt-1 text-xs text-[var(--text-muted)]">{stat.label}</div>
    </div>
  )
}

export function Hero() {
  const { hero, stats, links } = siteConfig
  const { active, goTo } = useSlideshow(hero.screenshots.length)

  return (
    <header className="relative min-h-screen overflow-hidden pt-24 pb-12" id="hero">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Red orb */}
        <div
          className="absolute -top-20 -right-20 h-[500px] w-[500px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(228,31,40,0.15), transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        {/* Blue orb */}
        <div
          className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, rgba(11,15,26,0.8), transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[var(--container-max)] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        {/* Left — Text */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="liquid-glass inline-block rounded-full px-4 py-1.5 text-xs font-medium text-[var(--text-primary)]">
              {hero.tag}
            </span>
          </motion.div>

          <motion.h1
            className="font-[var(--font-heading)] text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-[var(--text-primary)]"
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {hero.titleLine1}
            <br />
            <span className="gradient-text">{hero.titleLine2}</span>
          </motion.h1>

          <motion.p
            className="max-w-lg text-sm font-light leading-relaxed text-[var(--text-secondary)]"
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {hero.description}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <a
              href={links.dappStore}
              className="flex items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-medium text-white transition hover:brightness-110 hover:shadow-[var(--glow-sm)]"
            >
              <Download size={16} />
              {hero.ctaPrimary}
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-[var(--text-primary)] liquid-glass-strong transition hover:bg-white/5"
            >
              <Github size={16} />
              {hero.ctaGithub}
            </a>
            <a
              href={links.apk}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-[var(--text-primary)] liquid-glass transition hover:bg-white/5"
            >
              <Download size={16} />
              {hero.ctaApk}
            </a>
            <a
              href="/setup.html"
              className="flex items-center gap-1.5 px-2 py-3 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
            >
              {hero.ctaSetup} <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>

        {/* Right — Phone */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative w-[280px] md:w-[320px]">
            <div
              className="overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--bg-card)]"
              style={{ boxShadow: 'var(--glow-lg), var(--shadow-card)' }}
            >
              {hero.screenshots.map((s, i) => (
                <img
                  key={i}
                  src={s.src}
                  alt={s.alt}
                  className={`w-full transition-opacity duration-500 ${
                    i === active ? 'block opacity-100' : 'hidden opacity-0'
                  }`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              ))}
            </div>
            {/* Tab dots */}
            <div className="mt-4 flex justify-center gap-2">
              {hero.screenshots.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Screenshot ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === active
                      ? 'w-6 bg-[var(--primary)]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div
        className="relative z-10 mx-auto mt-16 max-w-[var(--container-max)] px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.2 }}
      >
        <div className="flex items-center justify-center divide-x divide-white/10 rounded-2xl py-6 liquid-glass">
          {stats.map((s, i) => (
            <StatItem key={i} stat={s} />
          ))}
        </div>
      </motion.div>

      {/* Product Hunt badge */}
      <motion.div
        className="relative z-10 mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <a
          href={links.productHunt}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt="SeekerClaw on Product Hunt"
            width="250"
            height="54"
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1099773&theme=dark&t=1773756464650"
          />
        </a>
      </motion.div>
    </header>
  )
}
