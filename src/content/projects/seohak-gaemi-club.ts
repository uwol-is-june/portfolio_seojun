import type { Project } from "../types";

export const seohakGaemiClub: Project = {
  slug: "seohak-gaemi-club",
  title: "서학개미클럽",
  subtitle: "4대 거장 투자 전략 기반, AI 미국장 종목 분석 서비스",
  summary:
    "GitHub 14.7k★ 중국장 투자 분석 오픈소스를 미국장 버전으로 다시 만들고, 토스증권 API로 실계좌를 연동했습니다. 추천 종목을 실제로 매수해 2주 만에 수익률 +21.0%를 확인했습니다.",
  category: "ai",
  positions: ["ai-product-builder", "product-manager"],
  featured: true,
  status: "진행 중",
  role: "기획 · 개발 (1인)",
  period: "2026.06 – 현재",
  organization: "AI 사이드 프로젝트",
  team: [{ role: "AI PM", count: 1 }],
  tags: ["Claude Code", "멀티 에이전트", "토스증권 API", "SEC XBRL", "Next.js"],
  logo: { src: "/projects/seohak-gaemi-club/logo.webp", alt: "서학개미클럽 로고" },
  thumbnail: { src: "/projects/seohak-gaemi-club/cover.webp", alt: "서학개미클럽 포트폴리오 대시보드" },
  highlights: [
    "GitHub 14.7k★ 중국장 오픈소스를 미국장으로 재구축",
    "버핏 · 멍거 · 리루 · 단융핑 4대 거장 전략 시스템화",
    "토스증권 API 실계좌 연동 · 판단 → 기록 → 리뷰 루프 설계",
    "추천 종목 실투자 검증 · 수익률 +21.0%",
  ],
  background: {
    title: "미국 시장에 몰리는 서학개미, 두 달 새 16.5% 손실",
    stats: [
      "2026년 6~7월 두 달간 서학개미 미국주식 약 16.5% 손실",
      "같은 기간 S&P500(-1.9%) · 나스닥(-6.9%) 하락폭을 크게 상회",
    ],
    source: "2026.08 한국예탁결제원 세이브로 · 아주경제",
  },
  research: {
    title: "기준 없는 매매와 감정적 판단",
    stats: [
      "종목 선택에 명확한 기준이 없다고 응답 76.2%, 감정적 매수 · 매도 경험 85.7%",
      "개인투자자 17만 명 분석 결과, 매수 후 평균 9.67일 만에 매도 (절반은 3일 미만)",
    ],
    source: "2026.07 서학개미 21명 대상 심층 인터뷰 · 2025 자본시장연구원 개인투자자 거래 분석",
  },
  problem: {
    statement: "판단 기준의 부재가 인기 추종 · 감정 매매로 이어졌습니다",
    points: ["판단 기준의 부재 → 인기 추종 · 감정적 매매 → 손실"],
  },
  hypothesis:
    "4대 거장의 전략으로 종목을 분석하고 그 판단을 직접 기록 · 리뷰하면, 인기 추종 · 감정적 매매가 줄고 수익률이 개선될 것이다",
  metrics: [
    { name: "실투자 수익률", definitions: ["시스템 추천 종목을 실계좌로 매수한 뒤 보유 중인 수익률"] },
    { name: "벤치마크 대비 초과수익", definitions: ["같은 기간 S&P500 · 나스닥100 대비 추천 종목의 초과수익률"] },
    { name: "감정 매매 대비 개선폭", definitions: ["기존 직감 매매 수익률과 시스템 기반 투자 수익률의 차이"] },
  ],
  actions: [
    {
      title: "오픈소스를 미국장으로 재구축",
      description:
        "중화권(A주 · 홍콩)용 오픈소스 xbtlin/ai-berkshire(MIT)를 미국 주식에 맞게 다시 썼습니다. 스킬을 20개에서 12개로 정리하고, SEC XBRL 재무 데이터를 직접 읽도록 바꿨습니다.",
      artifact: "Claude Code 스킬 12개",
    },
    {
      title: "4대 거장 병렬 에이전트",
      description: "네 명의 가치투자 대가 기준을 각각 에이전트로 만들어 동시에 분석하고 서로 반박하게 했습니다.",
      points: [
        "단융핑: 사업 모델 (애초에 좋은 사업인가?)",
        "버핏: 재무 · 밸류에이션 (얼마면 싼가?)",
        "멍거: 산업 · 경쟁 (이 회사는 어떻게 죽는가?)",
        "리루: 리스크 (10년 뒤에도 존재할까?)",
      ],
    },
    {
      title: "판단 → 기록 → 리뷰 루프",
      description:
        "결론(매수 · 회피 · 관망)을 강제하고, 낸 판단은 수정할 수 없는 원장에 기록한 뒤 Yahoo 실측가로 자동 채점합니다. 근거마다 신뢰도 등급을 붙이고, 계산은 LLM 대신 Python Decimal로 합니다.",
      artifact: "콜 원장, 자동 채점",
    },
    {
      title: "실계좌 대시보드",
      description: "Next.js 대시보드에 토스증권 Open API로 실계좌 포트폴리오를 연동하고 보고서 · 트랙레코드 · 실적 캘린더를 모았습니다.",
    },
  ],
  outcome: {
    verdict: "추천 종목 실투자로 2주 만에 수익률 +21.0%",
    metrics: [
      { label: "실투자 수익률", value: "+21.0%", description: "추천 종목 실계좌 매수 (약 2주 보유)" },
      { label: "벤치마크 대비 초과수익", value: "약 20%", description: "같은 기간 S&P500 · 나스닥100 대비" },
      { label: "감정 매매 대비 개선폭", value: "45%", description: "감정 매매 −24.1% → 시스템 +21.0%" },
    ],
  },
  gallery: [
    { src: "/projects/seohak-gaemi-club/screen-test.webp", alt: "추천 종목 실계좌 수익률 화면", caption: "Metrics 1 · 실투자 수익률" },
    { src: "/projects/seohak-gaemi-club/screen-sp500.webp", alt: "같은 기간 S&P500 지수 수익률 화면", caption: "Metrics 2 · S&P500 비교" },
    { src: "/projects/seohak-gaemi-club/screen-nasdaq.webp", alt: "같은 기간 나스닥100 지수 수익률 화면", caption: "Metrics 2 · 나스닥100 비교" },
    { src: "/projects/seohak-gaemi-club/screen-before.webp", alt: "기존 감정 매매 수익률 화면", caption: "Metrics 3 · 기존 감정 매매" },
  ],
  links: [
    { label: "GitHub", href: "https://github.com/uwol-is-june/seohak-gaemi-club" },
    { label: "원본 오픈소스", href: "https://github.com/xbtlin/ai-berkshire" },
  ],
};
