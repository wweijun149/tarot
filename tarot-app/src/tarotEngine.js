/**
 * tarotEngine.js
 * 純 JavaScript 塔羅牌引擎
 * - Fisher-Yates 洗牌（使用 crypto.getRandomValues 取得真隨機）
 * - 正逆位判定
 * - 完整 78 張牌資料
 */

// ── 78 張牌資料 ──────────────────────────────

const MAJOR_ARCANA = [
    { id: 0, name: 'The Fool', name_zh: '愚者', number: 0 },
    { id: 1, name: 'The Magician', name_zh: '魔術師', number: 1 },
    { id: 2, name: 'The High Priestess', name_zh: '女祭司', number: 2 },
    { id: 3, name: 'The Empress', name_zh: '女皇', number: 3 },
    { id: 4, name: 'The Emperor', name_zh: '皇帝', number: 4 },
    { id: 5, name: 'The Hierophant', name_zh: '教皇', number: 5 },
    { id: 6, name: 'The Lovers', name_zh: '戀人', number: 6 },
    { id: 7, name: 'The Chariot', name_zh: '戰車', number: 7 },
    { id: 8, name: 'Strength', name_zh: '力量', number: 8 },
    { id: 9, name: 'The Hermit', name_zh: '隱者', number: 9 },
    { id: 10, name: 'Wheel of Fortune', name_zh: '命運之輪', number: 10 },
    { id: 11, name: 'Justice', name_zh: '正義', number: 11 },
    { id: 12, name: 'The Hanged Man', name_zh: '倒吊人', number: 12 },
    { id: 13, name: 'Death', name_zh: '死神', number: 13 },
    { id: 14, name: 'Temperance', name_zh: '節制', number: 14 },
    { id: 15, name: 'The Devil', name_zh: '惡魔', number: 15 },
    { id: 16, name: 'The Tower', name_zh: '塔', number: 16 },
    { id: 17, name: 'The Star', name_zh: '星星', number: 17 },
    { id: 18, name: 'The Moon', name_zh: '月亮', number: 18 },
    { id: 19, name: 'The Sun', name_zh: '太陽', number: 19 },
    { id: 20, name: 'Judgement', name_zh: '審判', number: 20 },
    { id: 21, name: 'The World', name_zh: '世界', number: 21 },
]

const KEYWORDS = {
    0: ['自由', '開始', '冒險'], 1: ['意志力', '技巧', '創造'],
    2: ['直覺', '神秘', '智慧'], 3: ['豐收', '母性', '繁榮'],
    4: ['權威', '穩定', '父性'], 5: ['傳統', '信仰', '制度'],
    6: ['愛情', '選擇', '結合'], 7: ['勝利', '意志', '前進'],
    8: ['勇氣', '耐心', '內在力量'], 9: ['沉思', '孤獨', '智慧'],
    10: ['命運', '轉機', '循環'], 11: ['公正', '真理', '因果'],
    12: ['犧牲', '等待', '新視角'], 13: ['結束', '轉化', '重生'],
    14: ['平衡', '耐心', '調和'], 15: ['束縛', '慾望', '陰暗面'],
    16: ['突變', '崩潰', '啟示'], 17: ['希望', '靈感', '平靜'],
    18: ['幻覺', '恐懼', '潛意識'], 19: ['喜悅', '成功', '活力'],
    20: ['覺醒', '復活', '召喚'], 21: ['完成', '整合', '成就'],
}

const SUITS = [
    { suit: 'Wands', suit_zh: '權杖' },
    { suit: 'Cups', suit_zh: '聖杯' },
    { suit: 'Swords', suit_zh: '寶劍' },
    { suit: 'Pentacles', suit_zh: '星幣' },
]

const PIPS = [
    'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven',
    'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King',
]

const MINOR_KW = ['新開始', '計畫', '合作', '穩定', '衝突', '成功', '決心', '行動', '完成', '責任', '學習', '衝勁', '成熟', '領導']

function buildDeck() {
    const deck = []

    // 大阿爾克那
    for (const m of MAJOR_ARCANA) {
        deck.push({
            id: m.id,
            name: m.name,
            name_zh: m.name_zh,
            arcana: 'Major',
            suit: null,
            number: m.number,
            keywords: KEYWORDS[m.id] || [],
            orientation: 'Upright',
        })
    }

    // 小阿爾克那
    let id = 22
    for (const { suit, suit_zh } of SUITS) {
        for (let i = 0; i < PIPS.length; i++) {
            deck.push({
                id,
                name: `${PIPS[i]} of ${suit}`,
                name_zh: `${suit_zh}之${PIPS[i]}`,
                arcana: 'Minor',
                suit,
                number: i + 1,
                keywords: [MINOR_KW[i], suit_zh, PIPS[i]],
                orientation: 'Upright',
            })
            id++
        }
    }

    return deck
}

// ── 隨機數工具（crypto.getRandomValues）──────

/** 回傳 [0, max) 的安全隨機整數 */
function secureRandInt(max) {
    const arr = new Uint32Array(1)
    crypto.getRandomValues(arr)
    return arr[0] % max
}

/** 回傳 true/false 各 50% */
function secureFlip() {
    const arr = new Uint8Array(1)
    crypto.getRandomValues(arr)
    return (arr[0] & 1) === 0
}

// ── TarotDeck class ───────────────────────────

export class TarotDeck {
    constructor() {
        this._cards = buildDeck()
        this._drawn = []
    }

    /** Fisher-Yates shuffle + 隨機正逆位 */
    shuffle() {
        const cards = this._cards
        for (let i = cards.length - 1; i > 0; i--) {
            const j = secureRandInt(i + 1)
                ;[cards[i], cards[j]] = [cards[j], cards[i]]
        }
        for (const card of cards) {
            card.orientation = secureFlip() ? 'Upright' : 'Reversed'
        }
        this._drawn = []
    }

    /** 從頂部抽 n 張 */
    draw(n) {
        if (n > this._cards.length) {
            throw new Error('Not enough cards in deck')
        }
        const drawn = this._cards.splice(0, n)
        this._drawn.push(...drawn)
        return drawn
    }

    remaining() { return this._cards.length }
    drawnCount() { return this._drawn.length }

    reset() {
        this._cards = buildDeck()
        this._drawn = []
    }
}
