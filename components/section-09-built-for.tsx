'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useReveal } from '@/lib/use-reveal'

gsap.registerPlugin(ScrollTrigger)

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Audience = {
  number: string
  title: string
  description: string
  services: string[]
  visual: 'startups' | 'small' | 'd2c' | 'entrepreneurs' | 'local' | 'teams'
}

const audiences: Audience[] = [
  {
    number: '01',
    title: 'STARTUPS',
    description: 'Move from idea to launch with a digital presence designed to grow with you.',
    services: ['WEBSITES', 'BRANDING', 'MVPS', 'WEB APPS'],
    visual: 'startups',
  },
  {
    number: '02',
    title: 'SMALL BUSINESSES',
    description: 'Build a stronger online presence without the complexity of managing multiple vendors.',
    services: ['WEBSITES', 'SEO', 'MARKETING', 'CHATBOTS'],
    visual: 'small',
  },
  {
    number: '03',
    title: 'D2C BRANDS',
    description: 'Create a storefront and digital experience that turns attention into customers.',
    services: ['E-COMMERCE', 'BRANDING', 'MARKETING', 'SEO'],
    visual: 'd2c',
  },
  {
    number: '04',
    title: 'ENTREPRENEURS',
    description: 'Turn your idea into something people can see, use and remember.',
    services: ['LANDING PAGES', 'WEB APPS', 'BRANDING', 'AUTOMATION'],
    visual: 'entrepreneurs',
  },
  {
    number: '05',
    title: 'LOCAL BUSINESSES',
    description: 'Bring your business online with a modern digital presence built around your customers.',
    services: ['WEBSITES', 'SEO', 'LEAD GENERATION', 'CHATBOTS'],
    visual: 'local',
  },
  {
    number: '06',
    title: 'GROWING TEAMS',
    description: 'Build scalable systems that keep up as your business becomes more ambitious.',
    services: ['MANAGEMENT SYSTEMS', 'WEB APPS', 'AUTOMATION', 'INTEGRATIONS'],
    visual: 'teams',
  },
]

const floatPos: [number, number][] = [
  [-330, -190],
  [340, -170],
  [-380, 60],
  [390, 80],
  [-190, 240],
  [280, 220],
]

function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  disabled,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  disabled?: boolean
}) {
  const { ref, inView } = useReveal<HTMLDivElement>()
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={disabled ? false : inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      animate={disabled || inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeader({ reduced }: { reduced: boolean }) {
  return (
    <Reveal className="hb-header" disabled={reduced}>
      <p className="hb-eyebrow">
        09 | BUILT FOR... <span className="hb-circuit" aria-hidden="true" />
      </p>
      <h2 className="hb-title">
        <span className="hb-title-line">BUILT FOR</span>
        <span className="hb-title-line hb-title-purple">PEOPLE WHO</span>
        <span className="hb-title-line hb-title-purple">BUILD.</span>
      </h2>
      <p className="hb-sub">Whether you&rsquo;re launching your first idea or scaling an established business, we build the digital systems that move you forward.</p>
    </Reveal>
  )
}

function AudienceVisual({ visual }: { visual: Audience['visual'] }) {
  if (visual === 'startups') {
    return (
      <svg className="hb-visual-svg" viewBox="0 0 260 260" aria-hidden="true">
        <path className="hb-vline2" d="M70,130 L120,70 L190,90 L190,180 L120,200 L70,130" />
        <path className="hb-vline2" d="M120,70 L120,40 M190,90 L225,70 M190,180 L225,200 M120,200 L120,230" />
        <circle className="hb-vdot" cx="70" cy="130" r="5" />
        <circle className="hb-vdot" cx="120" cy="70" r="5" />
        <circle className="hb-vdot" cx="190" cy="90" r="5" />
        <circle className="hb-vdot" cx="190" cy="180" r="5" />
        <circle className="hb-vdot" cx="120" cy="200" r="5" />
        <circle className="hb-vdot hb-vdot-hot" cx="120" cy="130" r="4" />
        <circle className="hb-vdot-ghost" cx="120" cy="40" r="3" />
        <circle className="hb-vdot-ghost" cx="225" cy="70" r="3" />
        <circle className="hb-vdot-ghost" cx="225" cy="200" r="3" />
        <circle className="hb-vdot-ghost" cx="120" cy="230" r="3" />
      </svg>
    )
  }
  if (visual === 'small') {
    return (
      <svg className="hb-visual-svg" viewBox="0 0 260 260" aria-hidden="true">
        <g className="hb-vline2">
          <path d="M90,120 h80 v80 h-80 z M90,120 l40,-34 l40,34 M130,86 v114 M110,140 h40 M110,160 h40" />
        </g>
        <g className="hb-vline2">
          <path d="M90,200 v16 M170,200 v16 M90,120 v-16 M170,120 v-16" />
        </g>
        <circle className="hb-vdot" cx="130" cy="86" r="4" />
      </svg>
    )
  }
  if (visual === 'd2c') {
    return (
      <svg className="hb-visual-svg" viewBox="0 0 260 260" aria-hidden="true">
        <path className="hb-vline2" d="M70,70 h120 l20,40 v80 l-20,20 h-120 l-20,-20 v-80 z" />
        <path className="hb-vline2" d="M70,70 l10,32 h120 l10,-32 M70,150 h140" />
        <path className="hb-vline2" d="M50,70 h20 M70,50 v20 M190,50 v20 M210,70 h20" />
        <circle className="hb-vdot" cx="130" cy="130" r="5" />
        <path className="hb-vline2" d="M110,118 l20,24 M150,118 l-20,24" />
      </svg>
    )
  }
  if (visual === 'entrepreneurs') {
    return (
      <svg className="hb-visual-svg" viewBox="0 0 260 260" aria-hidden="true">
        <path className="hb-vline2" d="M140,40 l-30,90 h26 l-16,90 l70,-120 h-30 l18,-60 z" />
        <circle className="hb-vdot" cx="130" cy="130" r="4" />
        <path className="hb-vline2" d="M40,130 h40 M180,130 h40 M130,40 v-12 M130,244 v-12" />
        <circle className="hb-vdot-ghost" cx="80" cy="130" r="3" />
        <circle className="hb-vdot-ghost" cx="180" cy="130" r="3" />
      </svg>
    )
  }
  if (visual === 'local') {
    return (
      <svg className="hb-visual-svg" viewBox="0 0 260 260" aria-hidden="true">
        <path className="hb-vline2" d="M130,52 a44,44 0 1,1 -0.01,0 z M130,96 l0,56 M104,184 h52" />
        <circle className="hb-vdot hb-vdot-hot" cx="130" cy="82" r="5" />
        <path className="hb-vline2" d="M40,210 h50 M170,210 h50 M130,152 v34 M130,230 v14" />
        <circle className="hb-vdot-ghost" cx="130" cy="210" r="3" />
      </svg>
    )
  }
  return (
    <svg className="hb-visual-svg" viewBox="0 0 260 260" aria-hidden="true">
      <circle className="hb-vdot" cx="130" cy="130" r="5" />
      <path className="hb-vline2" d="M130,130 L70,70 M130,130 L210,70 M130,130 L210,190 M130,130 L70,190 M130,130 L130,50 M130,130 L50,130 M130,130 L130,210 M130,130 L210,130" />
      <g className="hb-vline2">
        <circle cx="70" cy="70" r="12" />
        <circle cx="210" cy="70" r="12" />
        <circle cx="210" cy="190" r="12" />
        <circle cx="70" cy="190" r="12" />
        <circle cx="130" cy="50" r="9" />
        <circle cx="50" cy="130" r="9" />
        <circle cx="130" cy="210" r="9" />
        <circle cx="210" cy="130" r="9" />
      </g>
      <circle className="hb-vdot-ghost" cx="70" cy="70" r="3" />
      <circle className="hb-vdot-ghost" cx="210" cy="190" r="3" />
    </svg>
  )
}

function Journey({
  active,
  reduced,
  onGoTo,
}: {
  active: number
  reduced: boolean
  onGoTo: (i: number) => void
}) {
  return (
    <div className="hb-journey">
      <div className="hb-trigger">
        <div className="hb-pin">
          <div className="hb-layout">
            <aside className="hb-side">
              <p className="hb-count" aria-hidden="true">
                <strong>0{active + 1}</strong> / 06
              </p>
              <div className="hb-side-main">
                <div className="hb-robot" aria-hidden="true">
                  <img src="/section-3/robot.png" alt="" width={1391} height={1131} loading="lazy" draggable={false} />
                </div>
                <nav className="hb-nav" aria-label="Audience categories">
                {audiences.map((a, i) => (
                  <button
                    key={a.number}
                    type="button"
                    className={`hb-nav-btn${i === active ? ' is-active' : ''}`}
                    onClick={() => onGoTo(i)}
                    aria-label={`Go to ${a.title} stage`}
                  >
                    <span className="hb-nav-no">{a.number}</span>
                    <span className="hb-nav-title">{a.title}</span>
                  </button>
                ))}
              </nav>
              </div>
              <span className="hb-vline" aria-hidden="true" />
            </aside>

            <div className="hb-center">
              <div className="hb-visuals" aria-hidden="true">
                {audiences.map((a, i) => (
                  <div key={a.number} className={`hb-visual hb-visual-${i}`}>
                    <AudienceVisual visual={a.visual} />
                  </div>
                ))}
              </div>

              <div className="hb-words" aria-hidden="true">
                {audiences.map((a, i) => (
                  <h3 key={a.number} className={`hb-word hb-word-${i}`}>
                    {a.title}
                  </h3>
                ))}
              </div>

              <span className="hb-sr-live" aria-live="polite" role="status">
                {audiences[active].title}
              </span>

              <div className="hb-floats" aria-hidden="true">
                {audiences.map((a, i) => (
                  <span key={a.number} className={`hb-float hb-float-${i}`}>
                    {a.title}
                  </span>
                ))}
              </div>

              <div className="hb-seal" aria-hidden="true">
                <span className="hb-seal-s">S</span>
                <p>SLINGSTER</p>
                <small>WE BUILD. YOU GROW.</small>
              </div>

              <p className="hb-center-meta hb-center-meta-bl">AUDIENCE / 06</p>
            </div>

            <div className="hb-detail" aria-hidden="true">
              {audiences.map((a, i) => (
                <div key={a.number} className={`hb-detail-block hb-detail-block-${i}`}>
                  <p className="hb-detail-kicker">
                    {a.number} / 06 <span className="hb-detail-dot" />
                  </p>
                  <p className="hb-detail-desc">&ldquo;{a.description}&rdquo;</p>
                  <ul className="hb-detail-services">
                    {a.services.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="hb-progress" aria-hidden="true">
            {audiences.map((a, i) => (
              <span key={a.number} className={`hb-tick${i <= active ? ' is-active' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Stacked({ reduced }: { reduced: boolean }) {
  return (
    <div className={`hb-stack${reduced ? ' is-static' : ''}`}>
      {audiences.map((a, i) => (
        <article key={a.number} className="hb-stack-item">
          <p className="hb-stack-kicker">
            {a.number} / 06 <span className="hb-detail-dot" />
          </p>
          <h3 className="hb-stack-title">{a.title}</h3>
          <p className="hb-stack-desc">{a.description}</p>
          <ul className="hb-stack-services">
            {a.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          {i < audiences.length - 1 && <span className="hb-stack-rule" aria-hidden="true" />}
        </article>
      ))}
    </div>
  )
}

function FinalStatement({ reduced }: { reduced: boolean }) {
  return (
    <div className="hb-final">
      <Reveal disabled={reduced}>
        <p className="hb-final-one">WHOEVER YOU ARE.</p>
        <p className="hb-final-two">WHATEVER YOU&rsquo;RE BUILDING.</p>
        <p className="hb-final-three">
          WE CAN HELP YOU <span>MOVE IT FORWARD.</span>
        </p>
        <div className="hb-final-ctas">
          <a className="hb-final-cta" href="#contact">
            START A PROJECT <ArrowRight />
          </a>
          <a className="hb-final-cta-ghost" href="#services">
            SEE OUR SERVICES <ArrowUpRight />
          </a>
        </div>
      </Reveal>
    </div>
  )
}

export default function Section09BuiltFor() {
  const rootRef = useRef<HTMLElement>(null)
  const [reduced, setReduced] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const onGoTo = (i: number) => {
    const section = rootRef.current
    const trigger = section?.querySelector<HTMLElement>('.hb-trigger')
    if (!trigger || typeof window === 'undefined') return
    const top = trigger.getBoundingClientRect().top + window.scrollY
    const h = trigger.offsetHeight
    window.scrollTo({ top: top + h * (i / audiences.length), behavior: 'smooth' })
  }

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)
    const section = rootRef.current
    if (!section) return

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)

    const ctx = gsap.context(() => {
      if (reduced) return

      if (isDesktop) {
        const B = [0, 100 / 6, 200 / 6, 300 / 6, 400 / 6, 500 / 6, 100]
        const TW = 2.2

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.hb-trigger',
            start: 'top top',
            end: 'bottom bottom',
            pin: '.hb-pin',
            scrub: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress
              const idx = Math.min(audiences.length - 1, Math.floor(p * audiences.length))
              if (idx !== activeRef.current) {
                activeRef.current = idx
                setActive(idx)
              }
            },
          },
        })

        tl.set('.hb-word-0', { autoAlpha: 1 }, 0)
        for (let i = 0; i < audiences.length; i++) {
          if (i > 0) {
            tl.fromTo(
              `.hb-word-${i}`,
              { autoAlpha: 0, scale: 0.92 },
              { autoAlpha: 1, scale: 1, duration: TW, ease: 'power2.out' },
              B[i]
            )
          }
          if (i < audiences.length - 1) {
            tl.fromTo(
              `.hb-word-${i}`,
              { autoAlpha: 1, scale: 1 },
              { autoAlpha: 0, scale: 0.92, duration: TW, ease: 'power2.in' },
              B[i + 1] - TW
            )
          }
          if (i > 0) {
            tl.fromTo(
              `.hb-visual-${i}`,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: TW, ease: 'power2.out' },
              B[i]
            )
          }
          if (i < audiences.length - 1) {
            tl.fromTo(`.hb-visual-${i}`, { autoAlpha: 1 }, { autoAlpha: 0, duration: TW, ease: 'power2.in' }, B[i + 1] - TW)
          }
          if (i > 0) {
            tl.fromTo(
              `.hb-detail-block-${i}`,
              { autoAlpha: 0, y: 20 },
              { autoAlpha: 1, y: 0, duration: TW, ease: 'power2.out' },
              B[i]
            )
          }
          if (i < audiences.length - 1) {
            tl.fromTo(
              `.hb-detail-block-${i}`,
              { autoAlpha: 1, y: 0 },
              { autoAlpha: 0, y: -20, duration: TW, ease: 'power2.in' },
              B[i + 1] - TW
            )
          }
        }

        tl.fromTo('.hb-vline', { scaleY: 0 }, { scaleY: 1, duration: 100, ease: 'none' }, 0)

        const floatEls = section.querySelectorAll<HTMLElement>('.hb-float')
        floatEls.forEach((el, i) => {
          const [fx, fy] = floatPos[i]
          tl.set(el, { x: fx, y: fy, autoAlpha: 0 }, 86)
          tl.to(el, { autoAlpha: 0.85, duration: 2, ease: 'power2.out' }, 87)
          tl.to(el, { x: 0, y: 0, autoAlpha: 0, scale: 0.5, duration: 4, ease: 'power2.in' }, 91)
        })
        tl.fromTo('.hb-seal', { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 3, ease: 'power2.out' }, 93.5)
      } else {
        gsap.fromTo(
          '.hb-stack-item',
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.08,
            scrollTrigger: { trigger: '.hb-stack', start: 'top 80%', once: true },
          }
        )
      }
    }, section)

    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [reduced, isDesktop])

  return (
    <section id="built-for" className={`hb-section${reduced ? ' is-reduced' : ''}`} ref={rootRef}>
      <div className="hb-grid" aria-hidden="true" />

      <SectionHeader reduced={reduced} />

      <Journey active={active} reduced={reduced} onGoTo={onGoTo} />

      <Stacked reduced={reduced} />

      <FinalStatement reduced={reduced} />
    </section>
  )
}
