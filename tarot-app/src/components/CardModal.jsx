import { motion, AnimatePresence } from 'framer-motion'
import { getCardSigil, getReading, TOPICS } from '../tarotData'

export default function CardModal({ card, topic, onClose }) {
    if (!card) return null

    const isReversed = card.orientation === 'Reversed'
    const sigil = getCardSigil(card)
    const reading = getReading(card, topic)
    const topicObj = TOPICS.find((t) => t.id === topic)

    return (
        <AnimatePresence>
            <motion.div
                className="modal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="modal"
                    initial={{ opacity: 0, scale: 0.85, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: 'spring', stiffness: 120 }}
                    onClick={(e) => e.stopPropagation()}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <button className="modal__close" onClick={onClose} aria-label="關閉">✕</button>

                    {/* Sigil */}
                    <motion.div
                        className="modal__sigil"
                        animate={isReversed ? { rotate: 180 } : { rotate: 0 }}
                        transition={{ duration: 0.6, type: 'spring' }}
                    >
                        {sigil}
                    </motion.div>

                    {/* Orientation */}
                    <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                        <span className={`tarot-card__orientation ${isReversed ? 'reversed' : 'upright'}`}>
                            {isReversed ? '▼ 逆位' : '▲ 正位'}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="modal__title" id="modal-title">{card.name_zh}</h2>
                    <p className="modal__subtitle">{card.name}</p>

                    <div className="modal__divider" />

                    {/* Topic Reading */}
                    <div className="modal__reading">
                        <p className="modal__section-title">
                            {topicObj?.icon} {topicObj?.label}解讀
                        </p>
                        <p className="modal__reading-text">{reading}</p>
                    </div>

                    <div className="modal__divider" />

                    {/* Keywords */}
                    <p className="modal__section-title">關鍵字</p>
                    <div className="modal__keywords">
                        {card.keywords.map((kw) => (
                            <span key={kw} className="modal__keyword">{kw}</span>
                        ))}
                    </div>

                    {/* Meta */}
                    <div className="modal__meta">
                        <div className="modal__meta-item">
                            <div className="modal__meta-label">阿爾克那</div>
                            <div className="modal__meta-value">{card.arcana}</div>
                        </div>
                        <div className="modal__meta-item">
                            <div className="modal__meta-label">{card.suit ? '花色' : '牌號'}</div>
                            <div className="modal__meta-value">
                                {card.suit || String(card.number).padStart(2, '0')}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
