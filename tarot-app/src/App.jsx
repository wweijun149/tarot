import { useState, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TarotCard from './components/TarotCard'
import CardModal from './components/CardModal'
import { TOPICS } from './tarotData'
import { TarotDeck } from './tarotEngine'
import './index.css'

// ── Toast ─────────────────────────────────────
function Toast({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="toast"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Main App ──────────────────────────────────
export default function App() {
  // 同步建立 deck（純 JS，不需要非同步載入）
  const deckRef = useRef(new TarotDeck())

  const [drawnCards, setDrawnCards] = useState([])
  const [remaining, setRemaining] = useState(78)
  const [drawCount, setDrawCount] = useState(1)
  const [selectedCard, setSelectedCard] = useState(null)
  const [topic, setTopic] = useState('general')
  const [shuffled, setShuffled] = useState(false)
  const [status, setStatus] = useState('請先選擇占卜主題，再洗牌。')
  const [isError, setIsError] = useState(false)
  const [toast, setToast] = useState('')
  const [isShuffling, setIsShuffling] = useState(false)

  const showToast = useCallback((msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }, [])

  // ── Shuffle ───────────────────────────────
  const handleShuffle = useCallback(async () => {
    setIsShuffling(true)
    setDrawnCards([])
    await new Promise((r) => setTimeout(r, 350))
    deckRef.current.shuffle()
    setRemaining(deckRef.current.remaining())
    setShuffled(true)
    setIsError(false)
    const topicObj = TOPICS.find((t) => t.id === topic)
    setStatus(`牌已洗好，主題：${topicObj?.label}。靜心後點擊「抽牌」。`)
    setIsShuffling(false)
    showToast('🌀 洗牌完成')
  }, [topic, showToast])

  // ── Draw ──────────────────────────────────
  const handleDraw = useCallback(() => {
    if (!shuffled) {
      setStatus('請先洗牌再抽牌。')
      setIsError(true)
      return
    }
    if (deckRef.current.remaining() === 0) {
      setStatus('牌組已抽完，請洗牌重新開始。')
      setIsError(true)
      return
    }
    try {
      const newCards = deckRef.current.draw(drawCount)
      setDrawnCards((prev) => [...prev, ...newCards])
      setRemaining(deckRef.current.remaining())
      setIsError(false)
      setStatus(`抽出 ${newCards.length} 張牌，點擊牌面查看解讀。`)
    } catch (err) {
      setStatus(`抽牌失敗：${String(err)}`)
      setIsError(true)
    }
  }, [shuffled, drawCount])

  // ── Reset ─────────────────────────────────
  const handleReset = useCallback(() => {
    deckRef.current.reset()
    setDrawnCards([])
    setRemaining(78)
    setShuffled(false)
    setIsError(false)
    setStatus('牌組已重置。選擇主題後洗牌。')
    showToast('✨ 牌組已重置')
  }, [showToast])

  const currentTopic = TOPICS.find((t) => t.id === topic)

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="header">
        <p className="header__eyebrow">✦ 神諭塔羅 ✦</p>
        <h1 className="header__title">Tarot Oracle</h1>
        <p className="header__sub">
          靜心選擇主題，洗牌抽牌——讓星象為你揭示命運的軌跡
        </p>
      </header>

      {/* ── Topic Selector ── */}
      <div className="topic-bar" role="group" aria-label="占卜主題">
        {TOPICS.map((t) => (
          <button
            key={t.id}
            id={`topic-${t.id}`}
            className={`topic-btn${topic === t.id ? ' active' : ''}`}
            onClick={() => {
              setTopic(t.id)
              setShuffled(false)
              setDrawnCards([])
              setStatus(`主題已選：${t.label}。請洗牌後抽牌。`)
            }}
          >
            <span className="topic-btn__icon">{t.icon}</span>
            <span className="topic-btn__label">{t.label}</span>
          </button>
        ))}
      </div>

      {/* ── Controls ── */}
      <div className="controls">
        <button
          id="btn-shuffle"
          className="btn btn--primary"
          onClick={handleShuffle}
          disabled={isShuffling}
        >
          {isShuffling ? '洗牌中…' : '🌀 洗牌'}
        </button>

        <div className="draw-count">
          <label htmlFor="draw-count-select">抽牌數</label>
          <select
            id="draw-count-select"
            value={drawCount}
            onChange={(e) => setDrawCount(Number(e.target.value))}
          >
            {[1, 3, 5, 7, 10].map((n) => (
              <option key={n} value={n}>{n} 張</option>
            ))}
          </select>
        </div>

        <button
          id="btn-draw"
          className="btn btn--secondary"
          onClick={handleDraw}
          disabled={!shuffled || remaining === 0}
        >
          ✦ 抽牌
        </button>

        <button
          id="btn-reset"
          className="btn btn--danger"
          onClick={handleReset}
        >
          ↺ 重置
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="stats">
        <div className="stat">
          <div className="stat__value">{remaining}</div>
          <div className="stat__label">剩餘</div>
        </div>
        <div className="divider" />
        <div className="stat">
          <div className="stat__value">{drawnCards.length}</div>
          <div className="stat__label">已抽</div>
        </div>
        <div className="divider" />
        <div className="stat">
          <div className="stat__value">{currentTopic?.icon}</div>
          <div className="stat__label">{currentTopic?.label}</div>
        </div>
      </div>

      {/* ── Status ── */}
      <p className={`status-msg${isError ? ' error' : ''}`}>{status}</p>

      {/* ── Card Grid ── */}
      {drawnCards.length > 0 ? (
        <>
          <p className="spread-label">
            {currentTopic?.icon} {currentTopic?.label}牌陣 · 點擊牌面查看解讀
          </p>
          <div className="card-grid" role="list">
            <AnimatePresence>
              {drawnCards.map((card, i) => (
                <TarotCard
                  key={`${card.id}-${i}`}
                  card={card}
                  index={i}
                  onClick={setSelectedCard}
                />
              ))}
            </AnimatePresence>
          </div>
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-state__icon">
            {currentTopic?.icon || '🔮'}
          </div>
          <p className="empty-state__title">
            {shuffled ? '牌已洗好，點擊「抽牌」' : '選擇主題並洗牌'}
          </p>
          <p className="empty-state__text">
            {shuffled
              ? `${currentTopic?.label}占卜已就緒，靜心後抽牌`
              : '先選擇你想占卜的主題，再點擊洗牌'}
          </p>
        </div>
      )}

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedCard && (
          <CardModal
            card={selectedCard}
            topic={topic}
            onClose={() => setSelectedCard(null)}
          />
        )}
      </AnimatePresence>

      <Toast message={toast} />
    </div>
  )
}
