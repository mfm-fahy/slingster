'use client'

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Clock, Headset, Infinity, ShieldCheck } from 'lucide-react'
import { useReveal } from '@/lib/use-reveal'

gsap.registerPlugin(ScrollTrigger)

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Guarantee = {
  number: string
  title: string
  description: string
  footnote?: boolean
  Icon: typeof ShieldCheck
}

const guarantees: Guarantee[] = [
  { number: '01', title: '100% SATISFACTION', description: "We're not happy until you're happy.", Icon: ShieldCheck },
  { number: '02', title: 'ON-TIME DELIVERY', description: 'We respect your time as much as you do.', Icon: Clock },
  { number: '03', title: 'UNLIMITED REVISIONS', description: 'Because your vision deserves perfection.', footnote: true, Icon: Infinity },
  { number: '04', title: 'DEDICATED SUPPORT', description: "We're here before, during and after delivery.", Icon: Headset },
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
    <div className="hg-header">
      <p className="hg-eyebrow">
        07 | OUR GUARANTEE <span className="hg-circuit" aria-hidden="true" />
      </p>
      <h2 className="hg-title">
        <span className="hg-title-line">WE DON&rsquo;T JUST</span>
        <span className="hg-title-line">SHIP.</span>
        <span className="hg-title-line hg-title-purple">WE STAND</span>
        <span className="hg-title-line hg-title-purple">BEHIND IT.</span>
      </h2>
      <p className="hg-sub">Every Slingster project is built with clear expectations, quality standards and support beyond delivery.</p>
    </div>
  )
}

function CertificationStamp() {
  return (
    <div className="hg-stamp" aria-hidden="true">
      <span className="hg-ripple" aria-hidden="true" />
      <svg className="hg-stamp-svg" viewBox="0 0 200 200">
        <defs>
          <path id="hg-arc-top" d="M 100,100 m -74,0 a 74,74 0 1,0 148,0" />
          <path id="hg-arc-bot" d="M 100,100 m -74,0 a 74,74 0 1,1 148,0" />
        </defs>
        <circle className="hg-stamp-ring" cx="100" cy="100" r="97" />
        <circle className="hg-stamp-ring-ghost" cx="101" cy="99" r="97" />
        <circle className="hg-stamp-ring-inner" cx="100" cy="100" r="70" />
        <circle className="hg-stamp-ring-dash" cx="100" cy="100" r="65" />
        <text className="hg-stamp-text" dy="9">
          <textPath href="#hg-arc-top" textLength="232">
            SLINGSTER &bull; QUALITY GUARANTEE
          </textPath>
        </text>
        <text className="hg-stamp-text" dy="-9">
          <textPath href="#hg-arc-bot" textLength="232">
            SLINGSTER &bull; QUALITY GUARANTEE
          </textPath>
        </text>
        <image className="hg-stamp-logo" href="/logo.png" x="77" y="52" width="46" height="46" preserveAspectRatio="xMidYMid meet" />
        <text className="hg-stamp-cert" x="100" y="124" textAnchor="middle">
          CERTIFIED
        </text>
      </svg>
    </div>
  )
}

function GuaranteeCertificate({ hover }: { hover: number }) {
  return (
    <div className={`hg-cert${hover >= 0 ? ` hg-hover-${hover}` : ''}`}>
      <div className="hg-cert-grid" aria-hidden="true" />
      <svg className="hg-cert-frame" viewBox="0 0 600 760" aria-hidden="true">
        <path
          className="hg-cert-frame-path"
          d="M 16,0 L 584,0 L 600,16 L 600,744 L 584,760 L 16,760 L 0,744 L 0,16 Z"
        />
        <path className="hg-cert-frame-path-inner" d="M 22,8 L 578,8 L 592,22 L 592,738 L 578,752 L 22,752 L 8,738 L 8,22 Z" />
        <path className="hg-cert-trace hg-cert-trace-1" d="M 0,120 L 22,120 L 30,128 L 30,140" />
        <path className="hg-cert-trace hg-cert-trace-2" d="M 600,620 L 578,620 L 570,612 L 570,600" />
        <path className="hg-cert-trace hg-cert-trace-3" d="M 30,640 L 30,628 L 38,620 L 60,620" />
        <circle className="hg-cert-dot" cx="30" cy="140" r="3" />
        <circle className="hg-cert-dot" cx="570" cy="600" r="3" />
        <circle className="hg-cert-dot" cx="60" cy="620" r="3" />
        <g className="hg-reg">
          <path d="M 8,8 m -5,0 h 10 M 8,8 m 0,-5 v 10" />
        </g>
        <g className="hg-reg">
          <path d="M 592,8 m -5,0 h 10 M 592,8 m 0,-5 v 10" />
        </g>
        <g className="hg-reg">
          <path d="M 8,752 m -5,0 h 10 M 8,752 m 0,-5 v 10" />
        </g>
        <g className="hg-reg">
          <path d="M 592,752 m -5,0 h 10 M 592,752 m 0,-5 v 10" />
        </g>
      </svg>

      <div className="hg-cert-inner">
        <header className="hg-cert-head">
          <div className="hg-cert-brand">
            <span className="hg-cert-badge">
              <img src="/logo.png" alt="" className="hg-cert-badge-img" loading="lazy" />
            </span>
            <span className="hg-cert-brandtext">
              <b>SLINGSTER</b>
              <small>PROJECT QUALITY CERTIFICATE</small>
            </span>
          </div>
          <div className="hg-cert-cert">
            <b>CERTIFIED</b>
            <span>07 / 04</span>
            <span className="hg-cert-status">
              <i aria-hidden="true" />
              ACTIVE
            </span>
          </div>
        </header>

        <p className="hg-cert-line">BUILD / DELIVER / SUPPORT</p>

        <div className="hg-cert-statement">
          <p className="hg-cert-standfirst">YOUR PROJECT.</p>
          <p className="hg-cert-standfirst hg-cert-standfirst-2">OUR COMMITMENT.</p>
          <p className="hg-cert-quote">&ldquo;Built with care. Delivered with accountability.&rdquo;</p>
        </div>

        <footer className="hg-cert-sign">
          <p className="hg-cert-signlabel">SLINGSTER TEAM</p>
          <span className="hg-cert-signline" aria-hidden="true" />
          <p className="hg-cert-signbold">BUILD WITH CONFIDENCE</p>
          <p className="hg-cert-meta">PROJECT STANDARD / 2026</p>
        </footer>

        <p className="hg-cert-docno" aria-hidden="true">
          DOC / SLG-2026-0714
        </p>

        {guarantees.map((g, i) => (
          <span key={g.number} className={`hg-zone hg-zone-${i}`} aria-hidden="true">
            <b>{g.number}</b>
          </span>
        ))}
      </div>

      <CertificationStamp />
    </div>
  )
}

function GuaranteeItem({
  guarantee,
  index,
  onEnter,
  onLeave,
}: {
  guarantee: Guarantee
  index: number
  onEnter: (i: number) => void
  onLeave: () => void
}) {
  const Icon = guarantee.Icon
  return (
    <button
      type="button"
      className="hg-module"
      onMouseEnter={() => onEnter(index)}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(index)}
      onBlur={onLeave}
      aria-label={`${guarantee.number} ${guarantee.title} guarantee`}
    >
      <span className="hg-mod-no">{guarantee.number}</span>
      <Icon className="hg-mod-icon" aria-hidden="true" />
      <span className="hg-mod-body">
        <b className="hg-mod-title">
          {guarantee.title}
          {guarantee.footnote && <sup aria-hidden="true">*</sup>}
        </b>
        <span className="hg-mod-line" aria-hidden="true" />
        <span className="hg-mod-desc">{guarantee.description}</span>
      </span>
    </button>
  )
}

function FinalStatement({ reduced }: { reduced: boolean }) {
  return (
    <div className="hg-final">
      <Reveal disabled={reduced}>
        <p className="hg-final-kicker">
          QUALITY / VERIFIED <span className="hg-circuit" aria-hidden="true" />
        </p>
        <p className="hg-final-title">
          BUILT WITH <span>CONFIDENCE.</span>
        </p>
        <p className="hg-final-sub">From first conversation to final delivery, we&rsquo;re committed to building work you can trust.</p>
        <a className="hg-final-cta" href="#contact">
          LET&rsquo;S BUILD <ArrowRight />
        </a>
      </Reveal>
    </div>
  )
}

export default function Section07Guarantee() {
  const rootRef = useRef<HTMLElement>(null)
  const [reduced, setReduced] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [hover, setHover] = useState(-1)

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

  const onEnter = (i: number) => setHover(i)
  const onLeave = () => setHover(-1)

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
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.hg-trigger',
            start: 'top top',
            end: 'bottom bottom',
            pin: '.hg-pin',
            scrub: 0.5,
            anticipatePin: 1,
          },
        })

        tl.fromTo('.hg-grid', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.03, ease: 'none' }, 0)
          .fromTo('.hg-header > *', { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.025, stagger: 0.006, ease: 'power3.out' }, 0)
          .fromTo('.hg-cert', { y: 130, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.05, ease: 'power3.out' }, 0.06)
          .fromTo('.hg-cert-frame-path', { strokeDashoffset: 2800 }, { strokeDashoffset: 0, duration: 0.07, ease: 'power2.inOut' }, 0.13)
          .fromTo('.hg-cert-head', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.018, ease: 'power2.out' }, 0.2)
          .fromTo('.hg-cert-line', { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.014, ease: 'power2.out' }, 0.215)
          .fromTo('.hg-cert-statement', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.018, ease: 'power2.out' }, 0.23)
          .fromTo('.hg-cert-sign', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.018, ease: 'power2.out' }, 0.26)
          .fromTo('.hg-zone', { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.014, stagger: 0.004, ease: 'power2.out' }, 0.275)
          .fromTo('.hg-module', { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.03, stagger: 0.03, ease: 'power3.out' }, 0.31)
          .fromTo('.hg-asterisk', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.014, ease: 'power2.out' }, 0.45)
          .fromTo(
            '.hg-stamp',
            { y: -150, rotation: -14, autoAlpha: 0 },
            { y: 0, rotation: 2, autoAlpha: 1, duration: 0.045, ease: 'back.out(1.6)' },
            0.53
          )
          .fromTo('.hg-ripple', { scale: 0.25, autoAlpha: 0.9 }, { scale: 1.7, autoAlpha: 0, duration: 0.035, ease: 'power2.out' }, 0.56)
          .fromTo('.hg-stamp-cert', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.02, ease: 'power2.out' }, 0.575)
      } else {
        gsap.fromTo(
          '.hg-header > *',
          { autoAlpha: 0, y: 26 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.07, scrollTrigger: { trigger: '.hg-header', start: 'top 80%', once: true } }
        )
        gsap.fromTo(
          '.hg-cert',
          { y: 46, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.hg-cert', start: 'top 82%', once: true } }
        )
        gsap.fromTo(
          '.hg-stamp',
          { y: -30, rotation: -10, autoAlpha: 0 },
          { y: 0, rotation: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: '.hg-cert', start: 'top 78%', once: true } }
        )
        gsap.fromTo(
          '.hg-module',
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.09, scrollTrigger: { trigger: '.hg-mod-col-a', start: 'top 84%', once: true } }
        )
        gsap.fromTo(
          '.hg-asterisk',
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: '.hg-asterisk', start: 'top 95%', once: true } }
        )
      }
    }, section)

    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [reduced, isDesktop])

  return (
    <section id="guarantee" className={`hg-section${reduced ? ' is-reduced' : ''}`} ref={rootRef}>
      <div className="hg-grid" aria-hidden="true" />

      <span className="hg-cb hg-cb-tl" aria-hidden="true" />
      <span className="hg-cb hg-cb-tr" aria-hidden="true" />
      <span className="hg-cb hg-cb-bl" aria-hidden="true" />
      <span className="hg-cb hg-cb-br" aria-hidden="true" />

      <p className="hg-coords" aria-hidden="true">
        SYSTEM / 07 &mdash; 12.972&deg; N, 77.594&deg; E
      </p>

      <div className="hg-trigger">
        <div className="hg-pin">
          <div className="hg-layout">
            <SectionHeader reduced={reduced} />

            <div className="hg-stage">
              <div className="hg-mod-col hg-mod-col-a">
                <p className="hg-mod-col-label">GUARANTEES</p>
                {guarantees.slice(0, 2).map((g, i) => (
                  <GuaranteeItem key={g.number} guarantee={g} index={i} onEnter={onEnter} onLeave={onLeave} />
                ))}
              </div>

              <GuaranteeCertificate hover={hover} />

              <div className="hg-mod-col hg-mod-col-b">
                <p className="hg-mod-col-label">COVERAGE</p>
                {guarantees.slice(2, 4).map((g, i) => (
                  <GuaranteeItem key={g.number} guarantee={g} index={i + 2} onEnter={onEnter} onLeave={onLeave} />
                ))}
              </div>

              <p className="hg-asterisk">*Within agreed project scope.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hg-meta-row" aria-hidden="true">
        <span>QUALITY / VERIFIED</span>
        <span>DELIVERY / COMMITTED</span>
        <span>SUPPORT / ACTIVE</span>
        <span>STANDARD / SLINGSTER</span>
      </div>

      <FinalStatement reduced={reduced} />
    </section>
  )
}
