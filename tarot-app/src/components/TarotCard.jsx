import { motion } from 'framer-motion'
import { getCardSigil } from '../tarotData'

const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateY: 90, scale: 0.8 },
    visible: (i) => ({
        opacity: 1, y: 0, rotateY: 0, scale: 1,
        transition: { delay: i * 0.12, duration: 0.6, type: 'spring', stiffness: 100 },
    }),
}

export default function TarotCard({ card, index, onClick }) {
    const isReversed = card.orientation === 'Reversed'
    const sigil = getCardSigil(card)

    return (
        <motion.div
            className={`tarot-card${isReversed ? ' is-reversed' : ''}`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            whileHover={{ y: -10, transition: { duration: 0.25 } }}
            onClick={() => onClick(card)}
            role="button"
            tabIndex={0}
            aria-label={`${card.name_zh} - ${isReversed ? '逆位' : '正位'}`}
            onKeyDown={(e) => e.key === 'Enter' && onClick(card)}
        >
            <div className="tarot-card__inner">
                <div className="tarot-card__face">
                    <div className="tarot-card__frame" />
                    <div className="tarot-card__art">
                        <span className="tarot-card__number">
                            {card.arcana === 'Major'
                                ? String(card.number).padStart(2, '0')
                                : card.suit?.slice(0, 3).toUpperCase()}
                        </span>
                        <span className="tarot-card__sigil" role="img" aria-hidden="true">
                            {sigil}
                        </span>
                    </div>
                    <div className="tarot-card__info">
                        <div className="tarot-card__name-zh">{card.name_zh}</div>
                        <div className="tarot-card__name-en">{card.name}</div>
                        <span className={`tarot-card__orientation ${isReversed ? 'reversed' : 'upright'}`}>
                            {isReversed ? '逆位' : '正位'}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
