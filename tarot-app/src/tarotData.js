// 主題列表
export const TOPICS = [
    { id: 'general', label: '綜合', icon: '🔮' },
    { id: 'love', label: '愛情', icon: '💕' },
    { id: 'career', label: '工作', icon: '💼' },
    { id: 'wealth', label: '財運', icon: '💰' },
    { id: 'health', label: '健康', icon: '🌿' },
    { id: 'spirit', label: '靈性', icon: '✨' },
]

// 每張牌的主題解讀 (upright / reversed)
const readings = {
    // ── 大阿爾克那 ──
    0: { // The Fool
        general: { upright: '一段嶄新旅程即將展開，懷抱開放心態勇敢前行。', reversed: '魯莽行事可能招致風險，請謹慎評估後再決定。' },
        love: { upright: '感情充滿可能性，勇敢表達心意，開啟新戀情。', reversed: '感情中過於衝動，需要放慢腳步思考。' },
        career: { upright: '適合開創新事業或嘗試新職位，勇於冒險。', reversed: '衝動跳槽或決策前請多方評估。' },
        wealth: { upright: '意外之財可能降臨，但也要避免盲目投機。', reversed: '財務計畫欠缺考量，避免衝動消費。' },
        health: { upright: '身體狀態輕盈，嘗試新的運動或健康習慣。', reversed: '忽略身體警訊，注意不要過度疲勞。' },
        spirit: { upright: '靈魂渴望探索，放下恐懼踏入未知領域。', reversed: '需要接地氣，過度幻想脫離現實。' },
    },
    1: { // The Magician
        general: { upright: '你擁有實現目標所需的一切能力，充分發揮潛力。', reversed: '才能被浪費，或有欺騙、操弄的傾向需警惕。' },
        love: { upright: '魅力四射，主動出擊必有收穫，關係進展順利。', reversed: '感情中有欺騙或不真誠，需重建信任。' },
        career: { upright: '技能與機遇俱備，是展現才華的最佳時機。', reversed: '能力未能發揮，或遭遇欺詐，謹慎合作對象。' },
        wealth: { upright: '善用資源和技能創造財富，投資眼光獨到。', reversed: '小心財務詐騙，避免高風險投機。' },
        health: { upright: '意志力強，積極的態度有助於身體恢復。', reversed: '健康問題被忽視或誤判，尋求第二意見。' },
        spirit: { upright: '意念與現實相連，意志力能創造奇蹟。', reversed: '濫用靈性力量，需要回歸真誠。' },
    },
    2: { // The High Priestess
        general: { upright: '傾聽內心直覺，答案藏在潛意識深處。', reversed: '忽略直覺訊號，過度依賴外在意見。' },
        love: { upright: '深層的靈魂連結，感情需要時間醞釀。', reversed: '情感秘密被壓抑，溝通不足導致誤解。' },
        career: { upright: '依靠直覺做決策，內部資訊助你一臂之力。', reversed: '情報不足或有隱藏的職場秘密需注意。' },
        wealth: { upright: '謹慎保守的財務策略，等待最佳時機。', reversed: '財務資訊不透明，留意隱藏的費用。' },
        health: { upright: '傾聽身體的細微訊號，重視直覺警示。', reversed: '忽略隱藏的健康問題，建議定期檢查。' },
        spirit: { upright: '深化冥想與內省，靈性智慧正在覺醒。', reversed: '靈性探索受阻，需要重新建立與內在的連結。' },
    },
    3: { // The Empress
        general: { upright: '豐盛與創造力旺盛，享受人生的美好與富足。', reversed: '過度依賴他人，或創造力受阻，找回自我滋養。' },
        love: { upright: '感情溫暖滋潤，關係和諧，或有喜訊到來。', reversed: '感情中過度付出或依賴，需要設立健康界限。' },
        career: { upright: '創意工作大放異彩，團隊氛圍和諧融洽。', reversed: '創意受阻，職場關係需要修復。' },
        wealth: { upright: '財富穩健增長，豐收之象，適合長期投資。', reversed: '過度揮霍或財務依賴他人，建立獨立財務意識。' },
        health: { upright: '身體狀態豐盛，女性健康尤其良好。', reversed: '需要多照顧自己，避免為他人忽略自身健康。' },
        spirit: { upright: '與大地連結，感恩自然的豐盛饋贈。', reversed: '與自然脫節，需要回到大地療癒自己。' },
    },
    4: { // The Emperor
        general: { upright: '建立穩固結構與秩序，以權威和紀律達成目標。', reversed: '過度控制或缺乏彈性，需要學習放手。' },
        love: { upright: '關係穩定成熟，雙方建立安全感與承諾。', reversed: '關係中過於強勢或控制，需要平等對話。' },
        career: { upright: '展現領導力，建立制度與規範，獲得上級認可。', reversed: '職場中遭遇獨裁管理，或自身過於獨斷。' },
        wealth: { upright: '財務規劃嚴謹，長期穩定的財富積累。', reversed: '財務管理過於死板，或遭遇權威帶來的財務限制。' },
        health: { upright: '規律的生活作息是健康基石，維持紀律。', reversed: '過度控制導致壓力，注意緊繃的身體狀態。' },
        spirit: { upright: '建立靈性修行的結構與紀律。', reversed: '靈性修行過於教條，缺少靈活與慈悲。' },
    },
    5: { // The Hierophant
        general: { upright: '遵循傳統智慧與既有制度，尋求精神導師指引。', reversed: '打破傳統，走一條非傳統的道路。' },
        love: { upright: '傳統穩定的感情，可能走向婚姻。', reversed: '打破常規的感情關係，或拒絕社會期待。' },
        career: { upright: '遵循業界規範，在傳統機構中穩定發展。', reversed: '對體制感到不滿，考慮突破行業框架。' },
        wealth: { upright: '保守傳統的理財方式最為穩妥。', reversed: '非傳統的投資方式，高風險高報酬。' },
        health: { upright: '遵循醫師建議，採用經過驗證的療法。', reversed: '考慮整合傳統與另類醫療方法。' },
        spirit: { upright: '靈性修行在傳統信仰中找到歸屬。', reversed: '脫離傳統宗教，探索個人靈性道路。' },
    },
    6: { // The Lovers
        general: { upright: '面臨重要選擇，遵循內心的價值觀做決定。', reversed: '關係失衡或面臨錯誤的選擇，需要誠實面對。' },
        love: { upright: '深刻的靈魂伴侶連結，感情和諧美滿。', reversed: '感情不和諧，可能面臨分手或溝通危機。' },
        career: { upright: '與理想工作產生連結，找到熱情所在。', reversed: '工作與價值觀不符，重新評估職業方向。' },
        wealth: { upright: '與合夥人共同創造財富，合作帶來收益。', reversed: '財務合夥出現裂痕，謹慎簽署合約。' },
        health: { upright: '身心靈平衡帶來健康，生活和諧。', reversed: '內心衝突影響身體健康，需要做出選擇。' },
        spirit: { upright: '找到靈魂的真實呼召，與更高自我連結。', reversed: '靈性價值觀受到動搖，重新審視信仰。' },
    },
    7: { // The Chariot
        general: { upright: '以強大意志力克服阻礙，勝利就在眼前。', reversed: '缺乏方向感或自我控制失調，暫時停下重整旗鼓。' },
        love: { upright: '主動追求愛情，以行動展現誠意。', reversed: '感情中過於控制或方向不明，需要調整。' },
        career: { upright: '強力推進目標，克服競爭取得晉升。', reversed: '工作推進受阻，需要重新調整策略。' },
        wealth: { upright: '積極進取帶來財務突破，主動出擊。', reversed: '財務目標分散，缺乏執行力。' },
        health: { upright: '強勁的恢復力，積極對抗疾病。', reversed: '意志力不足影響康復，需要外部支持。' },
        spirit: { upright: '以意志力駕馭高我，靈性修行有所突破。', reversed: '靈性方向迷失，需要重新找到焦點。' },
    },
    8: { // Strength
        general: { upright: '以溫柔與耐心面對挑戰，內在力量是你最大的資產。', reversed: '自我懷疑削弱力量，找回內心的勇氣。' },
        love: { upright: '以愛和耐心化解感情衝突，關係更加穩固。', reversed: '感情中的不安全感需要被療癒。' },
        career: { upright: '以專業和耐心贏得信任，適合長期深耕。', reversed: '職場自信心不足，需要重建自我價值。' },
        wealth: { upright: '穩健持續的財務積累，以耐心等待回報。', reversed: '財務焦慮影響判斷，保持冷靜。' },
        health: { upright: '身體恢復力強，心理素質支撐健康。', reversed: '心理壓力影響身體，需要情緒疏導。' },
        spirit: { upright: '駕馭本能欲望，靈性力量超越物質限制。', reversed: '內心野獸失控，需要靈性自律。' },
    },
    9: { // The Hermit
        general: { upright: '獨處與內省帶來智慧，向內探尋真理。', reversed: '過度孤立或逃避現實，適時走出舒適圈。' },
        love: { upright: '需要獨處時間思考感情，單身期是自我成長的契機。', reversed: '過度孤立導致感情疏離，主動建立連結。' },
        career: { upright: '獨立工作或深度研究帶來突破。', reversed: '過度封閉自己，錯失合作機會。' },
        wealth: { upright: '謹慎保守的投資策略，避免跟風。', reversed: '財務過於保守，錯失良機。' },
        health: { upright: '靜養與休息有益健康，傾聽身體的需求。', reversed: '過度孤立影響心理健康，需要社交支持。' },
        spirit: { upright: '深度靈修與冥想，智慧在孤寂中升起。', reversed: '靈性孤立，尋求社群與導師的支持。' },
    },
    10: { // Wheel of Fortune
        general: { upright: '命運轉機到來，好運降臨，把握時機。', reversed: '逆境期，但輪子終將轉動，保持耐心。' },
        love: { upright: '感情出現轉機，邂逅新緣分或關係提升。', reversed: '感情低潮期，等待時機轉變。' },
        career: { upright: '職業運勢上升，意想不到的機遇湧現。', reversed: '職場逆境，調整心態靜待轉機。' },
        wealth: { upright: '財運旺盛，投資與機遇帶來收益。', reversed: '財運低落，避免高風險操作。' },
        health: { upright: '健康狀況轉好，康復進程加速。', reversed: '健康起伏，需要適應新的身體狀況。' },
        spirit: { upright: '理解業力循環，接受命運的流動。', reversed: '抗拒命運轉變，需要臣服與接受。' },
    },
    11: { // Justice
        general: { upright: '公平正義將還你一個公道，誠實面對後果。', reversed: '不公正的結果，或逃避責任帶來的後果。' },
        love: { upright: '感情需要公平對待，平等關係帶來穩固。', reversed: '感情中有不公平，需要坦誠溝通。' },
        career: { upright: '努力將得到公正的回報，法律或合約事宜順利。', reversed: '職場不公，考慮申訴或尋求法律協助。' },
        wealth: { upright: '財務交易公正，合法合規帶來穩定收益。', reversed: '財務糾紛，注意合約細節。' },
        health: { upright: '健康問題與生活習慣直接相關，因果清晰。', reversed: '健康問題被誤判，尋求第二意見。' },
        spirit: { upright: '靈性修行中理解因果法則。', reversed: '逃避業力責任，需要誠實面對。' },
    },
    12: { // The Hanged Man
        general: { upright: '暫停等待帶來新的視角，放下執著換得智慧。', reversed: '無謂的犧牲或拖延，是時候採取行動。' },
        love: { upright: '感情需要等待，放下強求讓關係自然發展。', reversed: '感情停滯不前，需要做出決定。' },
        career: { upright: '暫時的等待期，利用此時提升技能。', reversed: '職業發展僵持，主動打破現狀。' },
        wealth: { upright: '財務暫緩，不是行動的時機，靜觀其變。', reversed: '財務拖延造成損失，必須盡快決斷。' },
        health: { upright: '休養生息是最好的療癒，給身體時間。', reversed: '拒絕休息導致恢復緩慢。' },
        spirit: { upright: '透過臣服與等待獲得靈性頓悟。', reversed: '靈性修行中的停滯，需要新的方法。' },
    },
    13: { // Death
        general: { upright: '一個重要時代的結束，蛻變後將迎來新生。', reversed: '抗拒必要的改變，導致停滯不前。' },
        love: { upright: '舊感情模式的終結，關係進入全新階段。', reversed: '不願放下舊關係，阻礙新緣分到來。' },
        career: { upright: '職業生涯重大轉變，舊的不去新的不來。', reversed: '抗拒職業轉型，在不適合的工作中苦撐。' },
        wealth: { upright: '財務狀況大幅轉變，舊的財務模式需要調整。', reversed: '財務轉型困難，需要接受改變。' },
        health: { upright: '舊的健康習慣需要終結，迎接更健康的生活方式。', reversed: '不願改變不良習慣，健康因此受損。' },
        spirit: { upright: '舊自我的瓦解是靈魂進化的必要過程。', reversed: '靈性蛻變受阻，需要放下舊有信念。' },
    },
    14: { // Temperance
        general: { upright: '耐心、平衡與適度是最佳策略，中庸之道帶來和諧。', reversed: '過度或失衡，需要重新找到生活的節律。' },
        love: { upright: '感情平穩和諧，相互包容讓關係長久。', reversed: '感情中有極端情緒，需要冷靜調節。' },
        career: { upright: '工作與生活平衡，穩健推進帶來成果。', reversed: '工作狀態失衡，過勞或效率低下。' },
        wealth: { upright: '理性平衡的財務管理，收支調和。', reversed: '財務失衡，過度消費或過度節省。' },
        health: { upright: '均衡飲食和生活規律帶來健康。', reversed: '生活作息失調，需要調整日常習慣。' },
        spirit: { upright: '靈性修行中達到身心靈的整合。', reversed: '靈性道路上的失衡，需要回到中心。' },
    },
    15: { // The Devil
        general: { upright: '面對陰暗面，意識到束縛你的是什麼。', reversed: '掙脫枷鎖，從上癮或負面模式中解放。' },
        love: { upright: '感情中有不健康的依附或控制，需要覺察。', reversed: '從有毒關係中解脫，找回自由。' },
        career: { upright: '工作中感到被困，或有不道德的誘惑需要警覺。', reversed: '從束縛的工作環境中解脫。' },
        wealth: { upright: '過度物質主義，檢視財務欲望是否合理。', reversed: '擺脫財務困境，從債務或惡性循環中解放。' },
        health: { upright: '上癮或不良習慣影響健康，需要正視。', reversed: '成功戒除壞習慣，健康狀況改善。' },
        spirit: { upright: '靈性成長需要正視自身的陰影面。', reversed: '靈性覺醒，從物質束縛中解脫。' },
    },
    16: { // The Tower
        general: { upright: '突如其來的改變打破舊結構，混亂後將迎來清明。', reversed: '避免了危機，或改變以更溫和的方式到來。' },
        love: { upright: '感情關係突然崩解，但這是重建的契機。', reversed: '感情危機被化解，或改變中找到新平衡。' },
        career: { upright: '職場出現重大變動，公司或職位有突發改變。', reversed: '職場動盪有所緩解，做好準備應對變化。' },
        wealth: { upright: '財務出現意外衝擊，做好應急準備。', reversed: '財務危機被及時控制，損失降至最低。' },
        health: { upright: '健康出現突發狀況，立即尋求醫療協助。', reversed: '健康警示被及時發現，預防優於治療。' },
        spirit: { upright: '舊有信仰體系的崩塌帶來更深的靈性真理。', reversed: '靈性危機以較平緩的方式展現，是成長機會。' },
    },
    17: { // The Star
        general: { upright: '希望重燃，相信宇宙的美好計畫，療癒與平靜到來。', reversed: '失去希望感，需要重新找到生命的意義。' },
        love: { upright: '感情充滿希望，療癒過去的傷痛，迎接美好的愛。', reversed: '對感情感到失望，需要重建對愛的信心。' },
        career: { upright: '工作帶來靈感與希望，創意蓬勃發展。', reversed: '對事業方向感到茫然，尋找重新啟動的動力。' },
        wealth: { upright: '財務狀況好轉，長期前景樂觀。', reversed: '財務期望過高，需要回歸現實規劃。' },
        health: { upright: '身體狀況正在恢復，保持樂觀加速療癒。', reversed: '對健康狀況感到悲觀，需要找回希望。' },
        spirit: { upright: '與宇宙連結，感受到靈性的滋養與指引。', reversed: '靈性連結感薄弱，重新建立與高我的橋樑。' },
    },
    18: { // The Moon
        general: { upright: '事情並不如表面所見，直覺引導你穿越迷霧。', reversed: '混亂與恐懼逐漸消散，真相浮出水面。' },
        love: { upright: '感情中有未說出的心事，溝通帶來清晰。', reversed: '感情謊言或誤解正在被揭露。' },
        career: { upright: '職場狀況不明朗，暫時觀望，避免倉促決定。', reversed: '職場迷霧消散，可以開始採取行動。' },
        wealth: { upright: '財務資訊不透明，謹慎投資，避免被誤導。', reversed: '財務真相逐漸明朗，做出更明智的決策。' },
        health: { upright: '情緒和心理健康需要重視，關注潛意識的訊息。', reversed: '心理健康問題逐漸好轉，走出陰霾。' },
        spirit: { upright: '深入潛意識探索，夢境帶來重要的靈性訊息。', reversed: '靈性幻覺消散，回歸清醒的靈性覺知。' },
    },
    19: { // The Sun
        general: { upright: '成功、喜悅與活力充滿生活，一切都在最佳狀態。', reversed: '喜悅被遮蔽，需要找回生命中的光明。' },
        love: { upright: '感情幸福美滿，快樂和充實感充滿關係。', reversed: '感情中的喜悅感下降，需要重燃熱情。' },
        career: { upright: '事業蒸蒸日上，工作帶來巨大的成就感。', reversed: '工作成就感不足，重新找到熱情。' },
        wealth: { upright: '財務豐盛，投資回報豐厚，財富增長。', reversed: '財務表現未達預期，調整策略。' },
        health: { upright: '精力充沛，免疫力強，非常適合戶外活動。', reversed: '活力下降，補充維生素D，多曬太陽。' },
        spirit: { upright: '靈魂充滿光與喜悅，意識清晰提升。', reversed: '靈性之光暫時被遮蔽，即將重新綻放。' },
    },
    20: { // Judgement
        general: { upright: '靈魂的呼召唤醒你，是時候做出重要的人生決定。', reversed: '忽略內心的呼召，或逃避應有的責任。' },
        love: { upright: '感情來到關鍵轉折點，做出深思熟慮的承諾。', reversed: '感情中的猶豫不決阻礙關係深化。' },
        career: { upright: '職業生涯的重要召喚，接受更高的使命。', reversed: '逃避職業轉型，固守不再適合的角色。' },
        wealth: { upright: '財務決策的重要時刻，重新評估長期財務目標。', reversed: '財務決策拖延，錯失改變的機會。' },
        health: { upright: '健康覺醒，做出改變生活方式的決定。', reversed: '忽視身體的健康警訊，需要認真面對。' },
        spirit: { upright: '靈魂的覺醒與更高意識的連結，揚升時刻到來。', reversed: '靈性喚醒被抗拒，需要放下批判接受轉化。' },
    },
    21: { // The World
        general: { upright: '一個完整循環的圓滿達成，成就感滿溢。', reversed: '目標尚未完全達成，還差最後一步。' },
        love: { upright: '感情達到圓滿，長久穩固的幸福關係。', reversed: '感情尚有未竟之事，繼續努力完成。' },
        career: { upright: '職業目標完美達成，享受成功的果實。', reversed: '事業尚未到達終點，持續努力。' },
        wealth: { upright: '財富目標達成，財務自由近在咫尺。', reversed: '財務目標接近完成，不要功虧一簣。' },
        health: { upright: '身體完全康復，健康達到最佳狀態。', reversed: '健康目標還需最後的努力。' },
        spirit: { upright: '靈性修行達到整合，靈魂的圓滿完成。', reversed: '靈性旅程還有最後一哩路，持續前行。' },
    },
}

// 小阿爾克那通用解讀生成器 (針對 id 22~77)
const minorBase = {
    Wands: {
        general: ['行動與熱情', '意志受阻或衝動過度'],
        love: ['熱情奔放的感情', '感情衝突或熱情消退'],
        career: ['積極進取的事業運', '動力不足或衝動決策'],
        wealth: ['積極擴展財富', '財務冒險需謹慎'],
        health: ['活力充沛，適合積極運動', '過度消耗體力，注意休息'],
        spirit: ['靈性熱情高漲', '靈性方向需要釐清'],
    },
    Cups: {
        general: ['情感流動與直覺', '情緒化或自我欺騙'],
        love: ['深情的感情連結', '感情幻想或失落'],
        career: ['以熱情和直覺引導工作', '工作情緒化，缺乏理性'],
        wealth: ['情感驅動的財務決策', '因情緒衝動而財務失控'],
        health: ['情緒健康得到滋養', '情緒問題影響身體健康'],
        spirit: ['靈性感知與同理心開啟', '情緒化的靈性混亂'],
    },
    Swords: {
        general: ['清晰的思維與果斷行動', '衝突與思維混亂'],
        love: ['以理性溝通解決感情問題', '感情中的衝突與傷痛'],
        career: ['清晰的邏輯帶來職場優勢', '職場衝突或過度批判'],
        wealth: ['分析性財務決策', '財務衝突或判斷失誤'],
        health: ['心理清晰有助康復', '精神壓力影響健康'],
        spirit: ['以真理與洞察力提升靈性', '思維干擾靈性直覺'],
    },
    Pentacles: {
        general: ['物質成就與穩定', '物質主義或停滯不前'],
        love: ['穩定踏實的感情基礎', '感情趨於物質化或停滯'],
        career: ['穩健實際的職業发展', '職業固化或物質主義'],
        wealth: ['穩定的財富積累', '財務停滯或過度保守'],
        health: ['注重日常習慣帶來健康', '物質主義忽略精神健康'],
        spirit: ['將靈性落實於生活實踐', '過度專注物質忽略靈性'],
    },
}

// 動態生成小阿爾克那解讀
function generateMinorReading(id, suit, number) {
    const base = minorBase[suit]
    const pip = number <= 10 ? `第${number}張` : ['侍者', '騎士', '王后', '國王'][number - 11]
    const r = {}
    for (const topic of ['general', 'love', 'career', 'wealth', 'health', 'spirit']) {
        r[topic] = {
            upright: `${suit}${pip}（正位）：${base[topic][0]}，在此領域帶來積極的能量與推進。`,
            reversed: `${suit}${pip}（逆位）：${base[topic][1]}，需要調整方向，重新評估當前狀態。`,
        }
    }
    return r
}

// 整合讀取函數
export function getReading(card, topic) {
    const topicKey = topic || 'general'
    const id = card.id
    const isReversed = card.orientation === 'Reversed'

    let src
    if (readings[id]) {
        src = readings[id]
    } else {
        // 小阿爾克那動態生成
        const suitMap = { Wands: 'Wands', Cups: 'Cups', Swords: 'Swords', Pentacles: 'Pentacles' }
        const suit = suitMap[card.suit] || 'Wands'
        const number = card.number
        src = generateMinorReading(id, suit, number)
    }

    const topicData = src[topicKey] || src['general']
    return isReversed ? topicData.reversed : topicData.upright
}

// 78 張牌的符文與主題色
export function getCardSigil(card) {
    const majorSigils = {
        0: '🃏', 1: '🪄', 2: '🌙', 3: '🌸', 4: '👑', 5: '⛪',
        6: '💞', 7: '🏆', 8: '🦁', 9: '🏮', 10: '☸️', 11: '⚖️',
        12: '🙃', 13: '💀', 14: '🏺', 15: '😈', 16: '⚡', 17: '✨',
        18: '🌕', 19: '☀️', 20: '📯', 21: '🌍',
    }
    if (card.arcana === 'Major') return majorSigils[card.id] ?? '🔮'
    return { Wands: '🪵', Cups: '🏆', Swords: '⚔️', Pentacles: '⭐' }[card.suit] ?? '🔮'
}
