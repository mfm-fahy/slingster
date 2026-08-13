'use client'

import { useEffect, useLayoutEffect, useRef, useState, type FormEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { submitProjectInquiry, type ProjectInquiry } from '@/lib/project-inquiry'

gsap.registerPlugin(ScrollTrigger)

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const projectTypes = ['LANDING PAGE', 'WEBSITE', 'E-COMMERCE', 'WEB APP', 'MANAGEMENT SYSTEM', 'BRANDING', 'OTHER']

const projectKinds = [
  'STARTING FROM SCRATCH',
  'UPGRADING AN EXISTING SITE',
  'BUILDING A NEW PRODUCT',
  'AUTOMATING A BUSINESS',
  'GROWING AN EXISTING BRAND',
  'OTHER',
]

const budgets = ['₹5K – ₹15K', '₹15K – ₹25K', '₹25K – ₹50K', '₹50K+', 'NOT SURE YET']

const LOG_STEPS = ['validating_project...', 'checking_requirements...', 'connecting_to_slingster...']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type FieldName = 'name' | 'email' | 'projectType' | 'description'
type Phase = 'idle' | 'running' | 'success'
type Errors = Partial<Record<FieldName, string>>

/* ---------- terminal header ---------- */

function TerminalHeader() {
  return (
    <header className="ct-term-head">
      <span className="ct-term-h-left">SLINGSTER / PROJECT INITIALIZER</span>
      <span className="ct-term-h-status">
        <i className="ct-status-dot" aria-hidden="true" />
        SYSTEM READY
      </span>
      <span className="ct-term-h-ver">v1.0 / 2026</span>
    </header>
  )
}

/* ---------- reusable option controls ---------- */

function OptionChip({
  label,
  active,
  disabled,
  onSelect,
}: {
  label: string
  active: boolean
  disabled: boolean
  onSelect: (label: string) => void
}) {
  return (
    <button
      type="button"
      className={`ct-opt${active ? ' is-active' : ''}`}
      aria-pressed={active}
      disabled={disabled}
      onClick={() => onSelect(label)}
    >
      <span className="ct-opt-bracket" aria-hidden="true">[</span>
      {active && <Check className="ct-opt-check" aria-hidden="true" />}
      {label}
      <span className="ct-opt-bracket" aria-hidden="true">]</span>
    </button>
  )
}

function CommandButton({
  label,
  active,
  disabled,
  onSelect,
}: {
  label: string
  active: boolean
  disabled: boolean
  onSelect: (label: string) => void
}) {
  return (
    <button
      type="button"
      className={`ct-cmd${active ? ' is-active' : ''}`}
      aria-pressed={active}
      disabled={disabled}
      onClick={() => onSelect(label)}
    >
      {label}
    </button>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="ct-error" role="alert">
      ! {message}
    </p>
  )
}

/* ---------- project form ---------- */

function ProjectForm() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [projectType, setProjectType] = useState('')
  const [projectKind, setProjectKind] = useState('')
  const [budget, setBudget] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [logStep, setLogStep] = useState(0)
  const timersRef = useRef<number[]>([])
  const mountedRef = useRef(true)

  const disabled = phase !== 'idle'

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t))
    timersRef.current = []
  }

  useEffect(
    () => () => {
      mountedRef.current = false
      clearTimers()
    },
    []
  )

  const validate = (): Errors => {
    const next: Errors = {}
    if (!name.trim()) next.name = 'Please enter your name.'
    if (!email.trim()) next.email = 'Please enter your email.'
    else if (!EMAIL_RE.test(email.trim())) next.email = 'Please enter a valid email.'
    if (!projectType) next.projectType = 'Please choose what you are building.'
    if (!description.trim()) next.description = 'Please tell us about the project.'
    return next
  }

  const reset = () => {
    clearTimers()
    setName('')
    setEmail('')
    setProjectType('')
    setProjectKind('')
    setBudget('')
    setDescription('')
    setErrors({})
    setLogStep(0)
    setPhase('idle')
  }

  const runSubmit = async () => {
    setPhase('running')
    setLogStep(0)
    LOG_STEPS.forEach((_, i) => {
      timersRef.current.push(window.setTimeout(() => setLogStep(i + 1), 650 * (i + 1)))
    })
    const payload: ProjectInquiry = {
      name: name.trim(),
      email: email.trim(),
      projectType,
      projectKind,
      budget: budget || 'NOT SURE YET',
      description: description.trim(),
    }
    const result = await submitProjectInquiry(payload)
    if (!mountedRef.current) return
    timersRef.current.push(
      window.setTimeout(
        () => {
          if (!result.ok) {
            setErrors({ name: result.error || 'Something went wrong. Please try again.' })
            setPhase('idle')
            return
          }
          setPhase('success')
        },
        650 * LOG_STEPS.length + 450
      )
    )
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (phase !== 'idle') return
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return
    void runSubmit()
  }

  return (
    <div className="ct-terminal">
      <TerminalHeader />
      <div className="ct-term-body">
        <p className="ct-term-logline">
          <span className="ct-term-prompt">$</span>
          <span className="ct-term-cmd">slingster init project</span>
        </p>
        <p className="ct-term-welcome">&gt; Let&apos;s build something.</p>

        {phase === 'success' ? (
          <div className="ct-success" role="status">
            <div className="ct-success-pulse" aria-hidden="true" />
            <p className="ct-success-check">
              <Check aria-hidden="true" />
              PROJECT REQUEST RECEIVED
            </p>
            <h3 className="ct-success-title">We&apos;ll be in touch.</h3>
            <p className="ct-success-sub">Your project details are in the Slingster queue. Expect a reply during support hours.</p>
            <p className="ct-success-demo">SLINGSTER / INIT SEQUENCE COMPLETE</p>
            <button type="button" className="ct-success-reset" onClick={reset}>
              INITIALIZE ANOTHER / 01
            </button>
          </div>
        ) : (
          <form className="ct-form" onSubmit={handleSubmit} noValidate>
            <fieldset className="ct-field">
              <legend className="ct-legend">
                <span className="ct-field-label">INPUT / 01</span>
                <span className="ct-question">What&apos;s your name?</span>
              </legend>
              <span className={`ct-input-row${errors.name ? ' is-error' : ''}`}>
                <span className="ct-prompt" aria-hidden="true">&gt;</span>
                <i className="ct-cursor" aria-hidden="true" />
                <input
                  className="ct-input"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  aria-label="Your name"
                  value={name}
                  disabled={disabled}
                  onChange={(e) => setName(e.target.value)}
                />
              </span>
              <FieldError message={errors.name} />
            </fieldset>

            <fieldset className="ct-field">
              <legend className="ct-legend">
                <span className="ct-field-label">INPUT / 02</span>
                <span className="ct-question">What&apos;s your email?</span>
              </legend>
              <span className={`ct-input-row${errors.email ? ' is-error' : ''}`}>
                <span className="ct-prompt" aria-hidden="true">&gt;</span>
                <i className="ct-cursor" aria-hidden="true" />
                <input
                  className="ct-input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  aria-label="Your email"
                  value={email}
                  disabled={disabled}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>
              <FieldError message={errors.email} />
            </fieldset>

            <fieldset className="ct-field">
              <legend className="ct-legend">
                <span className="ct-field-label">PROJECT / TYPE</span>
                <span className="ct-question">What are we building?</span>
              </legend>
              <div className="ct-opts">
                {projectTypes.map((t) => (
                  <OptionChip key={t} label={t} active={projectType === t} disabled={disabled} onSelect={setProjectType} />
                ))}
              </div>
              <FieldError message={errors.projectType} />
            </fieldset>

            <fieldset className="ct-field">
              <legend className="ct-legend">
                <span className="ct-field-label">PROJECT / KIND</span>
                <span className="ct-question">What best describes your project?</span>
              </legend>
              <div className="ct-cmds">
                {projectKinds.map((k) => (
                  <CommandButton key={k} label={k} active={projectKind === k} disabled={disabled} onSelect={setProjectKind} />
                ))}
              </div>
            </fieldset>

            <fieldset className="ct-field">
              <legend className="ct-legend">
                <span className="ct-field-label">PROJECT / BUDGET</span>
                <span className="ct-question">What&apos;s your approximate budget?</span>
              </legend>
              <div className="ct-opts">
                {budgets.map((b) => (
                  <OptionChip key={b} label={b} active={budget === b} disabled={disabled} onSelect={setBudget} />
                ))}
              </div>
            </fieldset>

            <fieldset className="ct-field">
              <legend className="ct-legend">
                <span className="ct-field-label">MESSAGE / BODY</span>
                <span className="ct-question">Tell us about the project.</span>
              </legend>
              <span className={`ct-input-row ct-textarea-row${errors.description ? ' is-error' : ''}`}>
                <span className="ct-prompt" aria-hidden="true">&gt;</span>
                <i className="ct-cursor" aria-hidden="true" />
                <textarea
                  className="ct-textarea"
                  name="description"
                  placeholder="Describe what you're building..."
                  rows={4}
                  aria-label="Tell us about the project"
                  value={description}
                  disabled={disabled}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </span>
              <FieldError message={errors.description} />
            </fieldset>

            <div className="ct-submit">
              <p className="ct-ready-line">$ ready_to_build?</p>
              {phase === 'running' ? (
                <div className="ct-log" role="status" aria-live="polite">
                  {LOG_STEPS.slice(0, logStep).map((step) => (
                    <p key={step} className="ct-log-line is-ok">
                      $ {step}
                    </p>
                  ))}
                  {logStep < LOG_STEPS.length && (
                    <p className="ct-log-line">
                      <span className="ct-log-block" aria-hidden="true" />
                    </p>
                  )}
                  {logStep >= LOG_STEPS.length && (
                    <p className="ct-log-pulse">
                      <i aria-hidden="true" />
                      ESTABLISHING CONNECTION
                    </p>
                  )}
                </div>
              ) : (
                <div className="ct-submit-row">
                  <button className="ct-execute" type="submit">
                    EXECUTE PROJECT <ArrowRight aria-hidden="true" />
                  </button>
                  <span className="ct-enter-hint">PRESS ENTER TO SEND</span>
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

/* ---------- contact details ---------- */

function ContactDetails() {
  return (
    <div className="ct-info">
      <div className="ct-info-grid">
        <div className="ct-info-cell">
          <p className="ct-info-label">EMAIL</p>
          <p className="ct-info-value">
            <a className="ct-info-link" href="mailto:slingster.org@gmail.com">
              slingster.org@gmail.com
            </a>
            <span className="ct-info-sub">DIRECT SUPPORT</span>
          </p>
        </div>
        <div className="ct-info-cell">
          <p className="ct-info-label">PHONE</p>
          <p className="ct-info-value">
            <a className="ct-info-link" href="tel:+919943949439">
              +91 99439 49439
            </a>
            <span className="ct-info-sub">MON — SUN</span>
          </p>
        </div>
        <div className="ct-info-cell">
          <p className="ct-info-label">WEBSITE</p>
          <p className="ct-info-value">
            <a className="ct-info-link" href="https://www.slingster.com" target="_blank" rel="noopener noreferrer">
              www.slingster.com <ArrowUpRight className="ct-info-ext" aria-hidden="true" />
            </a>
            <span className="ct-info-sub">SLINGSTER HQ</span>
          </p>
        </div>
        <div className="ct-info-cell">
          <p className="ct-info-label">SUPPORT HOURS</p>
          <p className="ct-info-value">Monday – Sunday</p>
          <p className="ct-info-value ct-info-hours">6:00 PM – 11:30 PM</p>
        </div>
      </div>

      <aside className="ct-status-panel">
        <p className="ct-status-title">SLINGSTER HQ</p>
        <div className="ct-status-row">
          <span className="ct-status-k">SYSTEM STATUS</span>
          <span className="ct-status-v ct-status-online">
            <i aria-hidden="true" />
            ONLINE
          </span>
        </div>
        <div className="ct-status-row">
          <span className="ct-status-k">SUPPORT</span>
          <span className="ct-status-v">MON — SUN</span>
        </div>
        <div className="ct-status-row">
          <span className="ct-status-k">TIME</span>
          <span className="ct-status-v">18:00 — 23:30</span>
        </div>
        <div className="ct-status-row">
          <span className="ct-status-k">RESPONSE</span>
          <span className="ct-status-v">DIRECT SUPPORT</span>
        </div>
      </aside>
    </div>
  )
}

/* ---------- final cta ---------- */

function FinalCTA() {
  return (
    <div className="ct-final">
      <p className="ct-final-kicker">READY TO BUILD?</p>
      <h3 className="ct-final-title">
        YOUR NEXT BIG THING
        <span className="ct-final-line">STARTS WITH <em className="ct-final-highlight">A CONVERSATION.</em></span>
      </h3>
      <div className="ct-final-ctas">
        <a className="ct-final-cta" href="mailto:slingster.org@gmail.com">
          START A PROJECT <ArrowRight aria-hidden="true" />
        </a>
        <a className="ct-final-top" href="#top">
          BACK TO TOP <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}

/* ---------- footer ---------- */

function Footer() {
  return (
    <footer className="ct-footer">
      <div className="ct-footer-mark">
        <p className="ct-footer-s">SLINGSTER<span>.</span></p>
        <p className="ct-footer-tag">WE BUILD. YOU GROW.</p>
      </div>
      <nav className="ct-footer-nav" aria-label="Footer navigation">
        <a href="#build-system">WORK</a>
        <a href="#services">SERVICES</a>
        <a href="#pricing">PRICING</a>
        <a href="#how-we-build">PROCESS</a>
        <a href="#contact">CONTACT</a>
      </nav>
      <div className="ct-footer-bottom">
        <span>© 2026 SLINGSTER</span>
      </div>
    </footer>
  )
}

/* ---------- section ---------- */

export default function Section10Contact() {
  const rootRef = useRef<HTMLElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(ScrollTrigger)
    const section = rootRef.current
    if (!section) return

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 85%',
        once: true,
        onEnter: () => section.classList.add('is-entered'),
      })

      if (reduced) {
        section.classList.add('is-entered')
        return
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
        defaults: { ease: 'power3.out' },
      })

      tl.from('.ct-eyebrow', { autoAlpha: 0, y: 18, duration: 0.6 }, 0.05)
        .from('.ct-title-line', { autoAlpha: 0, y: 36, duration: 0.85, stagger: 0.12 }, 0.25)
        .from('.ct-intro-copy', { autoAlpha: 0, y: 22, duration: 0.7 }, '-=0.55')
        .from('.ct-terminal-wrap', { autoAlpha: 0, y: 70, duration: 1.05 }, '-=0.4')
        .from('.ct-info', { autoAlpha: 0, y: 44, duration: 0.85 }, '-=0.6')
        .from('.ct-final', { autoAlpha: 0, y: 36, duration: 0.85 }, '-=0.55')
    }, section)

    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [reduced])

  return (
    <section id="contact" className={`ct-section${reduced ? ' is-reduced' : ''}`} ref={rootRef} aria-label="Contact Slingster">
      <div className="ct-bgfx" aria-hidden="true">
        <div className="ct-grid" />
        <svg className="ct-circuit" viewBox="0 0 760 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120 H140 L200 60 H360" />
          <path d="M0 240 H90 L150 300 H330" />
          <path d="M760 90 H600 L540 150 H380" />
          <path d="M760 330 H640 L580 390 H440" />
          <path d="M220 60 V20 H320" />
          <path d="M150 300 V340 H260" />
          <path d="M540 150 V110 H460" />
          <path d="M580 390 V430 H500" />
          <circle cx="200" cy="60" r="5" />
          <circle cx="150" cy="300" r="5" />
          <circle cx="540" cy="150" r="5" />
          <circle cx="580" cy="390" r="5" />
          <circle cx="320" cy="20" r="3" />
          <circle cx="260" cy="340" r="3" />
          <circle cx="460" cy="110" r="3" />
          <circle cx="500" cy="430" r="3" />
        </svg>
        <div className="ct-particles">
          <span className="ct-particle" />
          <span className="ct-particle" />
          <span className="ct-particle" />
          <span className="ct-particle" />
          <span className="ct-particle" />
          <span className="ct-particle" />
          <span className="ct-particle" />
          <span className="ct-particle" />
        </div>
        <div className="ct-hlines">
          <span />
          <span />
        </div>
      </div>

      <p className="ct-coord ct-coord-tl" aria-hidden="true">SYS.GRID / 10 — 000</p>
      <p className="ct-coord ct-coord-tr" aria-hidden="true">41.0082° N / 28.9784° E</p>

      <header className="ct-intro">
        <p className="ct-eyebrow">
          10 | CONTACT
          <span className="ct-eyebrow-line" aria-hidden="true" />
          <span className="ct-eyebrow-dot" aria-hidden="true" />
        </p>
        <h2 className="ct-title">
          <span className="ct-title-line">LET&apos;S BUILD</span>
          <span className="ct-title-line ct-title-primary">SOMETHING.</span>
          <span className="ct-title-line">THAT MATTERS.</span>
        </h2>
        <p className="ct-intro-copy">Have an idea, a business that needs a digital presence, or a system that needs to be built? Tell us what you&apos;re thinking.</p>
      </header>

      <div className="ct-terminal-wrap">
        <ProjectForm />
      </div>

      <ContactDetails />
      <FinalCTA />
      <Footer />
    </section>
  )
}
