import type { Project } from "../types";

export const cardnewsAgent: Project = {
  slug: "cardnews-agent",
  title: "카드뉴스 에이전트",
  subtitle: "인스타그램 카드뉴스를 만드는 Claude Code 스킬",
  summary:
    "cards.json 한 벌로 1080×1350 카드 이미지와 캡션을 만드는 도구입니다. Claude Code 스킬로 불러 쓰며, '다시(DASII)' 인스타그램 카드뉴스 20편을 이 도구로 만들어 운영하고 있습니다.",
  cardPoints: [
    "cards.json 한 벌로 1080×1350 카드 이미지와 캡션을 만드는 도구",
    "Claude Code 스킬로 불러 쓰고, 규칙 검사 → GPT 읽기 검사 → 사람 검토로 검수",
    "'다시(DASII)' 인스타그램 카드뉴스 20편을 이 도구로 운영",
  ],
  category: "ai",
  deployment: "local",
  status: "운영 중",
  positions: ["ai-product-builder"],
  role: "기획 · 개발 (1인)",
  period: "2026.08 – 2026.09",
  affiliation: "personal",
  organization: "사이드 프로젝트 · 다시(DASII)",
  tags: ["Claude Code 스킬", "Node.js", "Headless Edge", "GPT 검수"],
  thumbnail: { src: "/projects/cardnews-agent/cover.webp", alt: "카드뉴스 에이전트로 만든 '다시' 카드뉴스 표지 모음" },
  highlights: [
    "'다시(DASII)' 인스타그램 카드뉴스 20편 운영",
    "규칙 검사 → GPT 읽기 검사 → 사람 검토, 3단계 검수",
    "수치마다 논문 · 기관 출처, 관찰연구는 인과를 단정하지 않음",
    "글은 데이터(cards.json)로, 스타일 · 폰트는 공유 템플릿으로",
  ],
  problem: {
    statement: "카드뉴스를 매번 디자인 툴로 만들면 시간이 오래 걸리고, AI가 쓴 문장은 티가 났습니다",
    points: [
      "편마다 레이아웃을 새로 잡느라 글보다 디자인에 시간이 더 들었습니다",
      "AI에게 글을 맡기면 번역투 · 완충 어미가 섞여 계정의 말투가 무너졌습니다",
      "건강 정보라 수치 하나가 틀리거나 과장되면 신뢰를 잃고 광고 규정에도 걸립니다",
    ],
  },
  actions: [
    {
      title: "데이터와 템플릿 분리",
      description: "한 편을 cards.json 하나와 사진 몇 장으로 관리하고, 스크립트 · CSS · 폰트는 모든 편이 공유합니다.",
      artifact: "src/render.mjs, src/styles",
    },
    {
      title: "편 구성을 골격으로 고정",
      description:
        "한 편은 5~7장이고, 주제와 야마(한 문장 결론)를 먼저 정한 뒤 장마다 할 말을 한 줄씩 적어 통과시키고 나서 문안을 씁니다.",
      points: [
        "표지: 사실만 던지고 이유는 말하지 않음",
        "통념: 독자가 알고 있는 것",
        "근거: 수치와 출처",
        "이유: 왜 그런지",
        "수단: 그래서 무엇을 하면 되는지",
        "마무리",
      ],
    },
    {
      title: "3단계 검수",
      description: "문장을 만드는 일은 규칙을 쥔 쪽이, 귀로 듣는 일은 다른 모델이 맡도록 역할을 나눴습니다.",
      points: [
        "1단계 check-text: 줄표 · 문장 길이 · 줄바꿈 · 단위 뒤 조사처럼 기계로 셀 수 있는 규칙을 렌더 전에 검사",
        "2단계 read-text: GPT가 소리 내어 읽고 걸리는 자리만 짚음 (고쳐 쓰지 않고, 문체 규칙도 알려주지 않음)",
        "3단계 사람 검토: 두 검사가 못 잡는 일곱 갈래를 훑고, 발행 전 식품표시광고법 제8조 아홉 유형으로 심의 검토",
      ],
      artifact: "src/check-text.mjs, src/read-text.mjs",
    },
    {
      title: "근거 규칙",
      description: "카드마다 출처 줄을 달고, 연구가 잰 것까지만 결론으로 씁니다.",
      points: [
        "수치마다 논문 · 기관 출처 (예: Am J Clin Nutr 1983, PNAS 2022, 식약처 표시기준)",
        "환산값에도 출처를 대고, 숫자의 조건(체중 · 대상 인원)을 출처 줄에 붙임",
        "관찰연구는 '~해서 쪘다'로 단정하지 않고 '~한 쪽이 더 늘어 있었다'까지만 적음",
      ],
    },
    {
      title: "판단 기록",
      description:
        "편마다 사용자에게 물린 문장과 고친 이유를 기록하고, 반복되는 것은 규칙 문서로 올렸습니다. 다음 편은 그 문서를 먼저 읽고 시작합니다.",
      artifact: "docs/CLAUDE.md (규칙) · docs/README.md (근거) · 회고",
    },
    {
      title: "Claude Code 스킬",
      description: "스킬로 등록해 대화로 카드뉴스를 만들고, 주제 · 골격 · 문안 세 자리에서 멈춰 사람이 통과시킨 뒤 다음으로 넘어갑니다.",
      artifact: ".claude/skills/cardnews",
    },
  ],
  architecture: {
    stages: [
      { title: "기획", items: ["주제 · 야마 한 문장", "장별 한 줄 골격"], tech: ["Claude Code"], kind: "screen" },
      { title: "원고", items: ["cards.json 작성", "카드마다 출처 줄"], tech: ["Claude Code 스킬"], kind: "screen" },
      { title: "검수", items: ["규칙 검사", "GPT 읽기 검사", "사람 검토 · 심의"], tech: ["check-text", "read-text"], kind: "system" },
      { title: "사진", items: ["사진 검색 · 다운로드"], tech: ["Pexels API"], kind: "system" },
      { title: "렌더", items: ["1080×1350 PNG", "캡션 생성"], tech: ["Headless Edge"], kind: "system" },
      { title: "발행", items: ["인스타그램 업로드"], kind: "store" },
    ],
    caption: "cardnews-agent 저장소 코드 기준 · 로컬에서 실행하는 도구",
  },
  outcome: {
    verdict: "'다시' 인스타그램 카드뉴스 20편 운영",
    metrics: [
      { label: "운영 편수", value: "20편", description: "8월 6편 + 9월 14편" },
      { label: "9월 렌더 카드", value: "89장", description: "9/05 ~ 9/18 14편, 편당 5~7장" },
      { label: "커밋", value: "30개", description: "편을 낼 때마다 규칙 문서를 함께 갱신" },
    ],
  },
  gallery: [
    { src: "/projects/cardnews-agent/card-sugarlabel-01.webp", alt: "무가당은 당이 없다는 뜻이 아니에요", caption: "01 표지" },
    { src: "/projects/cardnews-agent/card-sugarlabel-02.webp", alt: "저당은 당이 적은 음료에만 붙는다", caption: "02 통념" },
    { src: "/projects/cardnews-agent/card-sugarlabel-03.webp", alt: "무가당의 진짜 뜻은 다르다", caption: "03 반전" },
    { src: "/projects/cardnews-agent/card-sugarlabel-04.webp", alt: "설탕을 안 넣어도 재료의 당은 그대로다", caption: "04 이유" },
    { src: "/projects/cardnews-agent/card-sugarlabel-05.webp", alt: "무가당 주스 한 잔의 당이 저당 기준의 세 배가 넘는다", caption: "05 근거" },
    { src: "/projects/cardnews-agent/card-sugarlabel-06.webp", alt: "당을 줄이려면 저당을 고른다", caption: "06 수단" },
    { src: "/projects/cardnews-agent/card-sugarlabel-07.webp", alt: "'다시' 로고가 있는 마무리 카드", caption: "07 마무리" },
    { src: "/projects/cardnews-agent/covers.webp", alt: "9월 5일부터 18일까지 발행한 카드뉴스 14편의 표지", caption: "9/05 ~ 9/18 표지 14편" },
  ],
  retrospective: [
    "GPT에게 글을 쓰게 하는 네 방식을 시험했는데, 값이 나온 것은 사람이 쓰고 GPT가 걸리는 자리만 짚는 방식 하나였습니다. 글쓰기를 넘기는 순간 쌓아 온 문체 규칙이 사라졌습니다.",
    "검사 둘이 모두 통과한 편에서도 사람이 여러 자리를 되돌렸습니다. 자동 검사는 기계로 셀 수 있는 것만 잡는다는 걸 전제로, 사람이 훑을 항목을 문서로 남겼습니다.",
    "피드 조회수를 갈래별로 읽어 보니 '행동' 주제가 평균 254로 '기준' 주제(160)보다 높았습니다. 이후 주제 후보를 낼 때 갈래가 연속되는지부터 봅니다.",
  ],
  links: [{ label: "GitHub", href: "https://github.com/uwol-is-june/cardnews-agent" }],
};
