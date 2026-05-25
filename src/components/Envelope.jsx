import { motion, useReducedMotion } from 'framer-motion'

export function Envelope({ title, photoUrl, isOpen, onToggle, floatDelay = 0 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      className={`envelope ${isOpen ? 'open' : ''}`}
      onClick={(e) => onToggle?.(e)}
      aria-expanded={isOpen}
      aria-label={isOpen ? `Close envelope: ${title}` : `Open envelope: ${title}`}
      whileHover={reduceMotion ? undefined : { y: -6, rotate: -0.25 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.5, delay: floatDelay }}
    >
      <motion.div
        aria-hidden="true"
        className="envFloat"
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -10, 0],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 3.6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: floatDelay,
              }
        }
      />

      <div
        aria-hidden="true"
        className="envWatermark"
        style={{ backgroundImage: `url(${photoUrl})` }}
      />

      <motion.div
        aria-hidden="true"
        className="envFlap"
        animate={reduceMotion ? undefined : { rotateX: isOpen ? 180 : 0 }}
        transition={
          reduceMotion
            ? undefined
            : { type: 'spring', stiffness: 260, damping: 22 }
        }
      />

      <motion.div
        className="envLetter"
        animate={
          reduceMotion
            ? undefined
            : {
                y: isOpen ? -44 : 18,
                opacity: isOpen ? 1 : 0,
                scale: isOpen ? 1 : 0.98,
              }
        }
        transition={
          reduceMotion
            ? undefined
            : { type: 'spring', stiffness: 260, damping: 26 }
        }
        style={reduceMotion ? { opacity: isOpen ? 1 : 0 } : undefined}
      >
        <div className="envLetterInner">
          <img
            className="envPhoto"
            src={photoUrl}
            alt=""
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      </motion.div>

      <div aria-hidden="true" className="envFront" />

      <div className="envHint">{isOpen ? 'click to tuck it back in' : 'click to open'}</div>
    </motion.button>
  )
}
