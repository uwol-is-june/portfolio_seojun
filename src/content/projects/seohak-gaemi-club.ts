import type { Project } from "../types";

export const seohakGaemiClub: Project = {
  slug: "seohak-gaemi-club",
  title: "서학개미클럽",
  subtitle: "4대 거장 투자 전략 기반, AI 미국장 종목 분석 서비스",
  localNote:
    "로컬에서 실행하는 프로젝트라 공개 데모를 이 사이트에 붙였습니다. 실계좌를 불러오는 토스증권 API만 목업 데이터로 바꿨고, 데모 속 종목 보고서와 본문은 제가 직접 에이전트를 돌려 만든 실제 결과물입니다. 코드와 문서는 GitHub에서 볼 수 있습니다.",
  summary:
    "GitHub 14.7k★ 중국장 투자 분석 오픈소스를 미국장 버전으로 다시 만들고, 토스증권 API로 실계좌를 연동했습니다. 추천 종목을 실제로 매수해 2주 만에 수익률 +21.0%를 확인했습니다.",
  cardPoints: [
    "14.7k★ 중국장 분석 오픈소스를 미국장용으로 재구축",
    "토스증권 API로 실계좌 연동",
    "추천 종목 실매수 2주 만에 수익률 +21.0%",
  ],
  category: "ai",
  deployment: "local",
  positions: ["ai-product-builder", "product-manager"],
  featured: true,
  status: "진행 중",
  role: "기획 · 개발 (1인)",
  period: "2026.06 – 현재",
  affiliation: "personal",
  organization: "사이드 프로젝트",
  team: [{ role: "AI PM", count: 1 }],
  tags: ["Claude Code", "멀티 에이전트", "토스증권 API", "SEC XBRL", "Next.js"],
  logo: { src: "/projects/seohak-gaemi-club/logo.webp", alt: "서학개미클럽 로고" },
  thumbnail: { src: "/projects/seohak-gaemi-club/cover-dashboard.webp", alt: "서학개미클럽 대시보드 포트폴리오 화면 (목 데이터)" },
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
  architecture: {
    stages: [
      {
        title: "명령",
        items: ["스킬 12개 중 하나를 호출", "예: /investment-team AAPL"],
        tech: ["Claude Code 스킬"],
        kind: "screen",
      },
      {
        title: "데이터 수집",
        items: ["SEC XBRL 재무 수치 직접 추출", "시세 · 뉴스 · 공시 원문", "근거마다 신뢰도 등급"],
        tech: ["SEC EDGAR", "Yahoo Finance", "fetch_financials.py"],
        kind: "system",
      },
      {
        title: "4대 거장 병렬 분석",
        items: ["단융핑 · 버핏 · 멍거 · 리루 에이전트 동시 실행", "서로 반박 → 종합 보고서", "계산은 Python Decimal"],
        tech: ["서브에이전트 4개", "financial_rigor.py"],
        kind: "system",
      },
      {
        title: "기록",
        items: ["보고서 Markdown 저장 · 훅이 로컬 git 커밋", "매수 · 관망 · 회피 콜을 원장에 append (수정 불가)"],
        tech: ["reports/*.md", "calls.jsonl", "Stop 훅"],
        kind: "store",
      },
      {
        title: "채점",
        items: ["콜 시점가와 Yahoo 실측가 비교", "방향 적중 · 목표 도달 · 오차"],
        tech: ["score_calls.py"],
        kind: "system",
      },
      {
        title: "대시보드",
        items: ["포트폴리오 · 트랙레코드 · 종목별 보고서", "아티클 · 실적 점검 · 병목 신호"],
        tech: ["Next.js", "토스증권 Open API"],
        kind: "screen",
      },
    ],
  },
  infra: {
    client: [
      { name: "Claude Code", note: "분석 스킬 · 서브에이전트 4개" },
      { name: "Next.js 대시보드", note: "로컬에서 리포트 · 보유 종목 확인" },
    ],
    runtime: [
      { name: "로컬 PC", note: "npm run dev · Python 도구" },
    ],
    data: [
      { name: "reports · data 파일", note: "리포트 md · 추천 기록 calls.jsonl" },
      { name: "SEC EDGAR · Yahoo Finance", note: "재무제표 · 시세" },
      { name: "토스증권 Open API", note: "실계좌 보유 종목 · 환율" },
    ],
  },
  outcome: {
    verdict: "추천 종목 실투자로 2주 만에 수익률 +21.0%",
    metrics: [
      { label: "실투자 수익률", value: "+21.0%", description: "추천 종목 실계좌 매수 (약 2주 보유)" },
      { label: "벤치마크 대비 초과수익", value: "약 20%", description: "같은 기간 S&P500 · 나스닥100 대비" },
      { label: "감정 매매 대비 개선폭", value: "45%", description: "감정 매매 −24.1% → 시스템 +21.0%" },
    ],
  },
  gallery: [
    {
      src: "/projects/seohak-gaemi-club/dash-portfolio.webp",
      alt: "대시보드 포트폴리오 탭: 보유 종목 카드와 당일 변동 표",
      caption: "대시보드 · 포트폴리오 (목 데이터: 토스증권 실계좌 대신 목업 응답)",
      wide: true,
    },
    {
      src: "/projects/seohak-gaemi-club/dash-track-record.webp",
      alt: "대시보드 트랙레코드 탭: 종목별 콜과 진입가까지 남은 거리",
      caption: "대시보드 · 트랙레코드 (콜 원장 · Yahoo 실측가, 보유 정보는 목 데이터)",
      wide: true,
    },
    {
      src: "/projects/seohak-gaemi-club/dash-reports.webp",
      alt: "대시보드 종목별 보고서 탭: 테크/AI 분야의 AI 인프라 산업 리서치 보고서",
      caption: "대시보드 · 종목별 보고서 (분야 → 섹터 → 종목)",
      wide: true,
    },
    {
      src: "/projects/seohak-gaemi-club/dash-articles.webp",
      alt: "대시보드 아티클 탭: 발행 현황과 스페이스X 주가 변동 아티클",
      caption: "대시보드 · 아티클",
      wide: true,
    },
    {
      src: "/projects/seohak-gaemi-club/dash-earnings.webp",
      alt: "대시보드 실적 점검 탭: 보유 종목별 다음 실적 발표일",
      caption: "대시보드 · 실적 캘린더 (보유 종목은 목 데이터)",
      wide: true,
    },
    { src: "/projects/seohak-gaemi-club/screen-test.webp", alt: "추천 종목 실계좌 수익률 화면", caption: "Metrics 1 · 실투자 수익률" },
    { src: "/projects/seohak-gaemi-club/screen-sp500.webp", alt: "같은 기간 S&P500 지수 수익률 화면", caption: "Metrics 2 · S&P500 비교" },
    { src: "/projects/seohak-gaemi-club/screen-nasdaq.webp", alt: "같은 기간 나스닥100 지수 수익률 화면", caption: "Metrics 2 · 나스닥100 비교" },
    { src: "/projects/seohak-gaemi-club/screen-before.webp", alt: "기존 감정 매매 수익률 화면", caption: "Metrics 3 · 기존 감정 매매" },
  ],
  links: [
    { label: "Web", href: "/demo/seohak" },
    { label: "GitHub", href: "https://github.com/uwol-is-june/seohak-gaemi-club" },
    { label: "원본 오픈소스", href: "https://github.com/xbtlin/ai-berkshire" },
  ],
};
