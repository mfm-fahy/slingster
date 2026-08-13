'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Robust scroll-reveal detection.
 *
 * Progressive-enhancement behaviour so content can never get stuck at
 * `opacity: 0`:
 * - `inView` starts `true`, so the server-rendered HTML (and the first paint)
 *   ships the content visible — no blank sections even if JS is stale, cached,
 *   blocked or hydration is slow.
 * - Only once the element is confirmed to be below the fold does it switch to
 *   hidden so the scroll-in animation can play when it enters the viewport.
 * - Unlike framer-motion's `whileInView` + `once: true`, it also fires when the
 *   element is already inside the viewport at mount time (e.g. browser scroll
 *   restoration after a refresh/back navigation).
 * - `prefers-reduced-motion` is respected: content is never hidden/animated.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof window === 'undefined') return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let done = false
    const isOnScreen = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight
      return r.top < vh && r.bottom > 0
    }
    const reveal = () => {
      if (done) return
      if (!isOnScreen()) return
      done = true
      setInView(true)
    }

    if (!isOnScreen()) setInView(false)

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && reveal()),
      { threshold: 0.2 },
    )
    io.observe(el)
    window.addEventListener('scroll', reveal, { passive: true })
    window.addEventListener('resize', reveal, { passive: true })
    const fallback = window.setTimeout(reveal, 1200)

    return () => {
      io.disconnect()
      window.clearTimeout(fallback)
      window.removeEventListener('scroll', reveal)
      window.removeEventListener('resize', reveal)
    }
  }, [])

  return { ref, inView }
}
