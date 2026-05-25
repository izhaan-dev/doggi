import { motion } from 'framer-motion'

export function BackgroundPhoto({ photoUrl }) {
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="bgTiles"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.28,
          x: [0, 80, 0],
          y: [0, -60, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="bgPhoto"
        style={{ backgroundImage: `url(${photoUrl})` }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 0.22,
          scale: [1.08, 1.12, 1.09],
          rotate: [-1.2, 1.2, -1.2],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div aria-hidden="true" className="bgScrim" />
    </>
  )
}
