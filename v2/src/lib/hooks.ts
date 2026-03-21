import { useEffect, useRef, useState, useCallback } from 'react'

/** Adds .visible class when element enters viewport */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          obs.unobserve(el)
        }
      },
      { threshold: 0.12 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return ref
}

/** Animates a number from 0 to target with easeOutCubic */
export function useCounter(target: number | string, duration = 1800) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof target !== 'number') return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const start = performance.now()
          const animate = (now: number) => {
            const t = Math.min((now - start) / duration, 1)
            const ease = 1 - Math.pow(1 - t, 3)
            setValue(Math.round(ease * target))
            if (t < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
          obs.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])

  return { ref, value }
}

/** Scrolled state for nav */
export function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])

  return scrolled
}

/** Phone slideshow auto-rotation */
export function useSlideshow(count: number, interval = 4000) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive(i => (i + 1) % count), interval)
    return () => clearInterval(id)
  }, [count, interval])

  const goTo = useCallback((i: number) => setActive(i), [])

  return { active, goTo }
}
