use rand::rngs::OsRng;
use rand::seq::SliceRandom;
use rand::Rng;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

// ─────────────────────────────────────────────
// 資料結構定義
// ─────────────────────────────────────────────

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub enum Orientation {
    Upright,
    Reversed,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Card {
    pub id: u8,
    pub name: String,
    pub name_zh: String,
    pub arcana: String,       // "Major" or "Minor"
    pub suit: Option<String>, // Minor Arcana 專屬
    pub number: u8,
    pub keywords: Vec<String>,
    pub orientation: Orientation,
}

// ─────────────────────────────────────────────
// 78 張塔羅牌資料
// ─────────────────────────────────────────────

fn build_full_deck() -> Vec<Card> {
    let mut cards: Vec<Card> = Vec::with_capacity(78);

    // ── 大阿爾克那 22 張 ──
    let major: &[(&str, &str, &[&str])] = &[
        ("The Fool", "愚者", &["自由", "開始", "冒險"]),
        ("The Magician", "魔術師", &["意志力", "技巧", "創造"]),
        ("The High Priestess", "女祭司", &["直覺", "神秘", "智慧"]),
        ("The Empress", "女皇", &["豐收", "母性", "繁榮"]),
        ("The Emperor", "皇帝", &["權威", "穩定", "父性"]),
        ("The Hierophant", "教皇", &["傳統", "信仰", "制度"]),
        ("The Lovers", "戀人", &["愛情", "選擇", "結合"]),
        ("The Chariot", "戰車", &["勝利", "意志", "前進"]),
        ("Strength", "力量", &["勇氣", "耐心", "內在力量"]),
        ("The Hermit", "隱者", &["沉思", "孤獨", "智慧"]),
        ("Wheel of Fortune", "命運之輪", &["命運", "轉機", "循環"]),
        ("Justice", "正義", &["公正", "真理", "因果"]),
        ("The Hanged Man", "倒吊人", &["犧牲", "等待", "新視角"]),
        ("Death", "死神", &["結束", "轉化", "重生"]),
        ("Temperance", "節制", &["平衡", "耐心", "調和"]),
        ("The Devil", "惡魔", &["束縛", "慾望", "陰暗面"]),
        ("The Tower", "塔", &["突變", "崩潰", "啟示"]),
        ("The Star", "星星", &["希望", "靈感", "平靜"]),
        ("The Moon", "月亮", &["幻覺", "恐懼", "潛意識"]),
        ("The Sun", "太陽", &["喜悅", "成功", "活力"]),
        ("Judgement", "審判", &["覺醒", "復活", "召喚"]),
        ("The World", "世界", &["完成", "整合", "成就"]),
    ];

    for (i, (name, name_zh, kws)) in major.iter().enumerate() {
        cards.push(Card {
            id: i as u8,
            name: name.to_string(),
            name_zh: name_zh.to_string(),
            arcana: "Major".to_string(),
            suit: None,
            number: i as u8,
            keywords: kws.iter().map(|s| s.to_string()).collect(),
            orientation: Orientation::Upright,
        });
    }

    // ── 小阿爾克那 56 張 ──
    let suits: &[(&str, &str)] = &[
        ("Wands", "權杖"),
        ("Cups", "聖杯"),
        ("Swords", "寶劍"),
        ("Pentacles", "星幣"),
    ];

    let pips: &[(&str, &[&str])] = &[
        ("Ace", &["新開始", "潛力", "種子"]),
        ("Two", &["平衡", "選擇", "等待"]),
        ("Three", &["合作", "計畫", "創造"]),
        ("Four", &["穩定", "休息", "停滯"]),
        ("Five", &["衝突", "挑戰", "損失"]),
        ("Six", &["成功", "前進", "贈予"]),
        ("Seven", &["決心", "評估", "防衛"]),
        ("Eight", &["行動", "速度", "進展"]),
        ("Nine", &["完成", "智慧", "獨立"]),
        ("Ten", &["負擔", "完結", "責任"]),
        ("Page", &["學習", "好奇", "訊息"]),
        ("Knight", &["行動", "衝勁", "冒險"]),
        ("Queen", &["成熟", "內在力", "智慧"]),
        ("King", &["領導", "掌控", "權威"]),
    ];

    let mut id = 22u8;
    for (suit_en, suit_zh) in suits.iter() {
        for (num_idx, (pip_name, kws)) in pips.iter().enumerate() {
            cards.push(Card {
                id,
                name: format!("{} of {}", pip_name, suit_en),
                name_zh: format!("{}之{}", suit_zh, pip_name),
                arcana: "Minor".to_string(),
                suit: Some(suit_en.to_string()),
                number: (num_idx + 1) as u8,
                keywords: kws.iter().map(|s| s.to_string()).collect(),
                orientation: Orientation::Upright,
            });
            id += 1;
        }
    }

    cards
}

// ─────────────────────────────────────────────
// TarotDeck (wasm-bindgen 暴露給 JS)
// ─────────────────────────────────────────────

#[wasm_bindgen]
pub struct TarotDeck {
    cards: Vec<Card>,
    drawn: Vec<Card>,
}

#[wasm_bindgen]
impl TarotDeck {
    /// 建立一副完整 78 張牌
    #[wasm_bindgen(constructor)]
    pub fn new() -> TarotDeck {
        TarotDeck {
            cards: build_full_deck(),
            drawn: Vec::new(),
        }
    }

    /// 使用 Fisher-Yates 洗牌並隨機分配正逆位
    /// 使用 OsRng（getrandom js feature）以相容 Wasm 環境
    pub fn shuffle(&mut self) {
        let mut rng = OsRng;
        self.cards.shuffle(&mut rng);
        for card in self.cards.iter_mut() {
            card.orientation = if rng.gen_bool(0.5) {
                Orientation::Upright
            } else {
                Orientation::Reversed
            };
        }
        self.drawn.clear();
    }

    /// 從牌堆頂部抽取 n 張牌，回傳 JSON 字串
    pub fn draw(&mut self, n: usize) -> Result<JsValue, JsValue> {
        if n > self.cards.len() {
            return Err(JsValue::from_str("Not enough cards in deck"));
        }
        let drawn: Vec<Card> = self.cards.drain(0..n).collect();
        self.drawn.extend(drawn.clone());

        serde_wasm_bindgen::to_value(&drawn).map_err(|e| JsValue::from_str(&e.to_string()))
    }

    /// 剩餘牌數
    pub fn remaining(&self) -> usize {
        self.cards.len()
    }

    /// 已抽出的牌數
    pub fn drawn_count(&self) -> usize {
        self.drawn.len()
    }

    /// 重置牌組（不洗牌）
    pub fn reset(&mut self) {
        self.cards = build_full_deck();
        self.drawn.clear();
    }
}

// ─────────────────────────────────────────────
// 單元測試
// ─────────────────────────────────────────────

#[cfg(test)]
mod tests {
    use super::*;
    use rand::seq::SliceRandom;

    fn native_draw(deck: &mut TarotDeck, n: usize) -> Vec<Card> {
        deck.cards.drain(0..n).collect()
    }

    #[test]
    fn deck_has_78_cards() {
        let deck = TarotDeck::new();
        assert_eq!(deck.cards.len(), 78);
    }

    #[test]
    fn major_arcana_count() {
        let deck = TarotDeck::new();
        let major = deck.cards.iter().filter(|c| c.arcana == "Major").count();
        assert_eq!(major, 22);
    }

    #[test]
    fn minor_arcana_count() {
        let deck = TarotDeck::new();
        let minor = deck.cards.iter().filter(|c| c.arcana == "Minor").count();
        assert_eq!(minor, 56);
    }

    #[test]
    fn shuffle_preserves_count() {
        let mut deck = TarotDeck::new();
        // 測試環境用 OsRng（與 Wasm 一致）
        deck.cards.shuffle(&mut OsRng);
        assert_eq!(deck.cards.len(), 78);
    }

    #[test]
    fn draw_reduces_deck() {
        let mut deck = TarotDeck::new();
        let drawn = native_draw(&mut deck, 3);
        deck.drawn.extend(drawn);
        assert_eq!(deck.cards.len(), 75);
        assert_eq!(deck.drawn.len(), 3);
    }

    #[test]
    fn reset_restores_78() {
        let mut deck = TarotDeck::new();
        let drawn = native_draw(&mut deck, 10);
        deck.drawn.extend(drawn);
        deck.reset();
        assert_eq!(deck.cards.len(), 78);
        assert_eq!(deck.drawn.len(), 0);
    }

    #[test]
    fn all_ids_unique() {
        let deck = TarotDeck::new();
        let mut ids: Vec<u8> = deck.cards.iter().map(|c| c.id).collect();
        ids.sort();
        ids.dedup();
        assert_eq!(ids.len(), 78);
    }
}
