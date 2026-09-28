/**
 * 카드뉴스 에이전트 처리 과정 데모 (/demo/cardnews)
 * 모두 cardnews-agent 저장소의 실제 결과물입니다: episodes/2026-09-05 (무가당 편) cards.json · out/ · caption.txt,
 * src/check-text.mjs 규칙, cards.json facts 에 기록된 고친 전후 사례.
 */

const img = (n: string) => `/projects/cardnews-agent/card-sugarlabel-${n}.webp`;

export const cardnewsDemo = {
  episode: {
    title: "무가당은 당이 없다는 뜻이 아니에요",
    date: "2026.09.05",
    cover: img("01"),
    stats: [
      { label: "카드", value: "7장" },
      { label: "크기", value: "1080×1350" },
      { label: "검수", value: "3단계" },
    ],
  },

  plan: {
    thesis:
      "저당 · 무설탕은 당 함량 기준을 통과해야 붙는 말이고, 무가당은 설탕을 넣었는지만 보는 말이라 재료의 당이 그대로 남는다.",
    skeleton: [
      "표지: 무가당이 당이 없다는 뜻이 아니라는 사실만 던진다",
      "저당 · 무설탕은 식약처가 정한 함량 기준이 있다",
      "무가당의 진짜 뜻: 설탕을 넣지 않았다는 말 (반전)",
      "설탕을 안 넣어도 과일 · 우유의 당은 남는다 (이유)",
      "무가당 주스 한 잔의 당이 저당 기준의 세 배가 넘는다 (근거)",
      "당을 줄이려면 저당을 고른다 (수단)",
      "마무리",
    ],
  },

  manuscript: {
    image: img("03"),
    json: `{
  "layout": "b-text",
  "place": "top",
  "title": "무가당의 진짜 뜻은 다르다",
  "body": "무가당도 저당이나 무설탕처럼\\n당이 적다는 뜻으로 오해하기 쉽습니다.\\n하지만 무가당은 설탕을 넣지 않고\\n만들었다는 말입니다.\\n\\n**설탕을 넣지 않았으면**\\n**당이 많아도 무가당입니다.**",
  "source": "식약처 「식품등의 표시기준」 당류 무첨가 표시 조건",
  "photo": "assets/sugarlabel-03.jpg"
}`,
  },

  checkRules: [
    { rule: "본문 한 줄 28자 이하", kind: "fail" as const },
    { rule: "줄표(—) 금지", kind: "fail" as const },
    { rule: "단위 뒤 조사 (100mL에 · 2.5g 미만)", kind: "fail" as const },
    { rule: "같은 종결어미 세 문장 연속", kind: "warn" as const },
    { rule: "제목이 접속사로 시작", kind: "warn" as const },
    { rule: "번역투 수량 표현", kind: "warn" as const },
    { rule: "캡션 다섯 덩어리 · 💡 사인오프", kind: "warn" as const },
  ],

  readText: [
    {
      before: "저당과 무설탕 옆의 무가당도",
      after: "무가당도 저당이나 무설탕처럼",
      why: "'옆의'가 무엇과 무엇을 나란히 놓는지 안 잡힌다",
    },
    {
      before: "설탕을 넣었는지 안 넣었는지를 적은 말입니다",
      after: "설탕을 넣지 않고 만들었다는 말입니다",
      why: "'넣었는지 안 넣었는지'를 '적은 말'로 받는 연결이 번역투로 들린다",
    },
  ],

  review: [
    {
      before: "무가당에 당 기준은 없다",
      after: "무가당의 진짜 뜻은 다르다",
      why: "'당 기준'이 제도 쪽 말이라 한 번 되짚게 한다",
    },
    {
      before: "앞면의 저당은 숫자로 정해진다",
      after: "저당은 당이 적은 음료에만 붙는다",
      why: "'숫자'가 무엇을 가리키는지 카드 어디에도 없다",
    },
  ],
  reviewNote:
    "발행 전에는 식품표시광고법 제8조의 아홉 유형(질병 효능 암시 · 의약품 오인 · 절대적 표현 등)을 최종 문안으로 한 번 더 짚습니다.",

  render: {
    caption: `무가당은 당이 없다는 뜻이 아니에요 👀

음료 앞면에서 제일 먼저 눈에 들어오는 그 말이에요 🌿

얼마나 당이 적어야 이런 표현을 할 수 있는지 식약처가 정해 뒀어요. …

무가당, 안 넣었다는 말이지 없다는 뜻은 아니에요. 💡

#무가당 #무설탕 #저당 #식품표시 #다이어트팁`,
    cards: ["01", "02", "03", "04", "05", "06", "07"].map((n, i) => ({
      src: img(n),
      alt: [
        "무가당은 당이 없다는 뜻이 아니에요",
        "저당은 당이 적은 음료에만 붙는다",
        "무가당의 진짜 뜻은 다르다",
        "설탕을 안 넣어도 재료의 당은 그대로다",
        "무가당 주스 한 잔의 당이 저당 기준의 세 배가 넘는다",
        "당을 줄이려면 저당을 고른다",
        "'다시' 로고가 있는 마무리 카드",
      ][i],
    })),
  },

  covers: { src: "/projects/cardnews-agent/covers.webp", alt: "9월 5일부터 18일까지 발행한 카드뉴스 14편의 표지" },
};
