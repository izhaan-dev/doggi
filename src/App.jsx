import { useEffect, useMemo, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { BackgroundPhoto } from './components/BackgroundPhoto'
import { Envelope } from './components/Envelope'
import './App.css'

const PHOTO_FILENAME = 'photo.jpg'

function rand(min, max) {
  return Math.random() * (max - min) + min
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function burstConfetti({ x, y } = {}) {
  try {
    confetti({
      particleCount: 70,
      spread: 70,
      startVelocity: 34,
      origin: {
        x: typeof x === 'number' ? clamp(x, 0.05, 0.95) : 0.5,
        y: typeof y === 'number' ? clamp(y, 0.05, 0.95) : 0.65,
      },
    })
  } catch {
    // no-op
  }
}

function App() {
  const reduceMotion = useReducedMotion()
  const heroRef = useRef(null)
  const popIdRef = useRef(0)

  const photoUrl = `${import.meta.env.BASE_URL}${PHOTO_FILENAME}`

  const [pops, setPops] = useState([])

  const envelopes = useMemo(
    () => [
      {
        id: 'chaos',
        title: 'Exhibit A: chaotic behavior',
      },
      {
        id: 'goat',
        title: 'Official confirmation',
      },
      {
        id: 'chopped',
        title: 'P.S. important update',
      },
      {
        id: 'reset',
        title: 'The reset button',
      },
      {
        id: 'coupon',
        title: 'Redeemable coupon',
      },
      {
        id: 'tiny',
        title: 'Small but sincere',
      },
      {
        id: 'laugh',
        title: 'If you laugh, I win',
      },
      {
        id: 'kruthi',
        title: 'To: Kruthi',
      },
    ],
    [],
  )

  const [openIds, setOpenIds] = useState(() => new Set())

  const allOpen = openIds.size === envelopes.length

  const toggleOne = (id, evt) => {
    setOpenIds((prev) => {
      const next = new Set(prev)

      const wasOpen = next.has(id)
      if (wasOpen) next.delete(id)
      else next.add(id)

      if (!wasOpen && !reduceMotion) {
        const viewportW = typeof window !== 'undefined' ? window.innerWidth : 0
        const viewportH = typeof window !== 'undefined' ? window.innerHeight : 0
        const ox = evt?.clientX && viewportW ? evt.clientX / viewportW : 0.5
        const oy = evt?.clientY && viewportH ? evt.clientY / viewportH : 0.65
        requestAnimationFrame(() => burstConfetti({ x: ox, y: oy }))
      }

      return next
    })
  }

  const toggleAll = () => {
    setOpenIds((prev) => {
      const willOpenAll = prev.size !== envelopes.length

      if (willOpenAll && !reduceMotion) {
        requestAnimationFrame(() => {
          burstConfetti({ x: 0.5, y: 0.65 })
        })
      }

      if (!willOpenAll) return new Set()
      return new Set(envelopes.map((e) => e.id))
    })
  }

  useEffect(() => {
    if (reduceMotion) return
    if (typeof window === 'undefined') return

    const tick = () => {
      const id = `pop-${Date.now()}-${popIdRef.current++}`

      const viewportW = window.innerWidth || 0
      const viewportH = window.innerHeight || 0
      const size = Math.round(clamp(viewportW * 0.22, 96, 168))
      const margin = 10

      const heroBottom = heroRef.current
        ? heroRef.current.getBoundingClientRect().bottom
        : 0

      const minX = margin
      const maxX = Math.max(margin, viewportW - size - margin)

      const safeTop = clamp(heroBottom + 8, margin, viewportH - size - margin)
      const minY = safeTop
      const maxY = Math.max(minY, viewportH - size - margin)

      const x = rand(minX, maxX)
      const y = rand(minY, maxY)
      const rotate = rand(-16, 16)
      const opacity = rand(0.72, 0.95)

      setPops((prev) => {
        const next = [...prev, { id, x, y, size, rotate, opacity }]
        if (next.length > 5) next.splice(0, next.length - 5)
        return next
      })
    }

    tick()
    const interval = window.setInterval(tick, 3000)
    return () => window.clearInterval(interval)
  }, [reduceMotion])

  return (
    <div className="page" style={{ '--photo-url': `url(${photoUrl})` }}>
      <BackgroundPhoto photoUrl={photoUrl} />

      <div className="popLayer" aria-hidden="true">
        <AnimatePresence initial={false}>
          {pops.map((p) => (
            <motion.img
              key={p.id}
              className="popPhoto"
              src={photoUrl}
              alt=""
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: Math.round((p.size * 4) / 3),
                rotate: p.rotate,
                opacity: p.opacity,
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: p.opacity, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              draggable={false}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      <header className="heroCard" ref={heroRef}>
        <motion.p
          className="toLine"
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          To: <span className="toName">kruthi</span>
        </motion.p>

        <motion.h1
          className="heroTitle"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.06 }}
        >
          a very serious apology website.
        </motion.h1>

        <motion.p
          className="lead"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          sorry for being chaotic. u the goat (youre not boring). P.S. you are
          still chopped.
        </motion.p>

        <div className="actions">
          <motion.button
            type="button"
            className="cta"
            onClick={toggleAll}
            whileHover={reduceMotion ? undefined : { y: -2 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            {allOpen ? 'close all envelopes' : 'open all envelopes'}
          </motion.button>
          <div className="subtle">
            (open them in any order.)
          </div>
        </div>
      </header>

      <main className="stage">
        <div className="sectionTitle">openable envelopes</div>
        <div className="sectionSub">
          each one is the same photo. because yes.
        </div>

        <div className="envelopeGrid">
          {envelopes.map((e, idx) => (
            <Envelope
              key={e.id}
              title={e.title}
              isOpen={openIds.has(e.id)}
              onToggle={(evt) => toggleOne(e.id, evt)}
              floatDelay={idx * 0.06}
              photoUrl={photoUrl}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
