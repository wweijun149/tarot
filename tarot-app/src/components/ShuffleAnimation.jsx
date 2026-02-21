import { motion } from 'framer-motion'

const CARD_COUNT = 5
const duration = 0.5

const cardVariants = {
  initial: (i) => ({
    x: -120 + i * 55,
    y: 0,
    rotate: -15 + i * 8,
    scale: 0.85,
    opacity: 0.6,
  }),
  mix: (i) => ({
    x: [null, -80 + i * 40 + (i % 2 === 0 ? 30 : -20), -100 + i * 50],
    y: [null, 20 - i * 5, -10 + i * 3],
    rotate: [null, 10 - i * 5, -8 + i * 6],
    scale: [null, 0.9, 0.85],
    opacity: [null, 1, 0.9],
    transition: {
      duration: duration * 0.6,
      times: [0, 0.5, 1],
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.25 },
  },
}

export default function ShuffleAnimation() {
  return (
    <motion.div
      className="shuffle-animation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      <div className="shuffle-animation__deck" aria-hidden="true">
        {Array.from({ length: CARD_COUNT }).map((_, i) => (
          <motion.div
            key={i}
            className="shuffle-animation__card"
            custom={i}
            variants={cardVariants}
            initial="initial"
            animate="mix"
            exit="exit"
            transition={{
              mix: { duration: duration * 0.7, ease: 'easeInOut' },
            }}
          />
        ))}
      </div>
      <p className="shuffle-animation__text">洗牌中…</p>
    </motion.div>
  )
}
