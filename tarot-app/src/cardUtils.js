// 根據牌的屬性回傳對應的 Emoji 符文
export function getCardSigil(card) {
    if (card.arcana === 'Major') {
        const majorSigils = {
            0: '🃏', // The Fool
            1: '🪄', // The Magician
            2: '🌙', // The High Priestess
            3: '🌸', // The Empress
            4: '👑', // The Emperor
            5: '⛪', // The Hierophant
            6: '💞', // The Lovers
            7: '🏆', // The Chariot
            8: '🦁', // Strength
            9: '🏮', // The Hermit
            10: '☸️',  // Wheel of Fortune
            11: '⚖️',  // Justice
            12: '🙃', // The Hanged Man
            13: '💀', // Death
            14: '🏺', // Temperance
            15: '😈', // The Devil
            16: '⚡', // The Tower
            17: '✨', // The Star
            18: '🌕', // The Moon
            19: '☀️',  // The Sun
            20: '📯', // Judgement
            21: '🌍', // The World
        };
        return majorSigils[card.id] ?? '🔮';
    }

    // Minor Arcana
    const suitSigils = {
        Wands: '🪵',
        Cups: '🏆',
        Swords: '⚔️',
        Pentacles: '⭐',
    };

    return suitSigils[card.suit] ?? '🔮';
}

// 依 arcana / suit 回傳漸層主題色
export function getCardTheme(card) {
    if (card.arcana === 'Major') {
        return { from: '#9b59f5', to: '#e86080' };
    }
    const themes = {
        Wands: { from: '#f5a623', to: '#e86060' },
        Cups: { from: '#4fa3e0', to: '#9b59f5' },
        Swords: { from: '#c0c0c0', to: '#4fa3e0' },
        Pentacles: { from: '#d4a843', to: '#7cefb5' },
    };
    return themes[card.suit] ?? { from: '#9b59f5', to: '#d4a843' };
}
