import type { Project } from "../types";

export const incarStockReport: Project = {
  slug: "incar-stock-report",
  title: "경영진 주가 보고 자동화",
  subtitle: "주가 · 재무 · 투자자 동향 자동 수집과 AI 분석 대시보드",
  summary:
    "경영진에게 매일 올리던 주가 보고를 자동화했습니다. 평일 장 마감 후 데이터를 모으고 Gemini로 분석해 대시보드와 PDF로 보여주며, 보고 업무를 연 16 영업일 줄였습니다.",
  cardPoints: [
    "경영진에게 매일 올리던 주가 보고를 자동화",
    "장 마감 후 수집 → Gemini 분석 → 대시보드 · PDF",
    "보고 업무 연 16 영업일 절감",
  ],
  category: "ai",
  deployment: "live",
  positions: ["ai-product-builder"],
  featured: true,
  role: "기획 · 개발 (1인)",
  period: "2026.05 – 2026.09",
  affiliation: "company",
  organization: "인카금융서비스 · AI Lab",
  tags: ["Python", "GitHub Actions", "Gemini", "pykrx · DART", "Chart.js"],
  thumbnail: { src: "/projects/incar-stock-report/cover.webp", alt: "인카금융서비스 주가 모니터 대시보드" },
  highlights: [
    "평일 16:10 자동 수집 · 분석 · 배포, 사람 손이 가지 않는 보고",
    "시세 · 종목 정보 · 투자자 동향 · 차트 · AI 분석 6개 탭 대시보드와 PDF 출력",
    "보고 업무 연 16 영업일, 약 410만 원 절감",
    "커밋 307개 · GitHub 공개 저장소",
  ],
  problem: {
    statement: "경영진 주가 보고를 매일 사람이 직접 모으고 정리해야 했습니다",
    points: ["시세, 재무, 투자자 동향처럼 출처가 다른 데이터를 매번 따로 확인"],
  },
  actions: [
    {
      title: "데이터 수집 자동화",
      description: "KRX 시세 · 펀더멘털 · 투자자 · 지수는 pykrx로, 분기 재무(TTM 당기순이익, 자본총액)는 DART에서 가져옵니다.",
      artifact: "collector.py",
    },
    {
      title: "AI 분석",
      description: "Gemini로 시장 요약과 가격 · 투자자 · 거래량 · 시장 비교 · 종합 5개 항목의 종목 분석을 만듭니다.",
      artifact: "analyzer.py",
    },
    {
      title: "무인 배포",
      description:
        "GitHub Actions가 평일 16:10에 수집과 분석을 돌리고, 결과 JSON을 커밋하면 Vercel이 대시보드를 자동으로 다시 배포합니다.",
      artifact: "daily-collect.yml",
    },
  ],
  architecture: {
    stages: [
      {
        title: "스케줄 실행",
        items: ["평일 16:10 KST 자동 실행", "수동 실행도 가능"],
        tech: ["GitHub Actions"],
        kind: "system",
      },
      {
        title: "수집",
        items: ["시세 · 펀더멘털 · 투자자 · 지수", "DART 분기 재무"],
        tech: ["pykrx", "dart-fss"],
        kind: "system",
      },
      {
        title: "AI 분석",
        items: ["시장 요약", "종목 분석 5항목"],
        tech: ["Gemini 2.5 Flash Lite"],
        kind: "system",
      },
      {
        title: "저장 · 배포",
        items: ["날짜별 JSON + 인덱스 커밋", "커밋되면 자동 재배포"],
        tech: ["JSON", "Vercel"],
        kind: "store",
      },
      {
        title: "대시보드",
        items: ["6개 탭 · 날짜 선택", "PDF 출력"],
        tech: ["Chart.js", "marked.js"],
        kind: "screen",
      },
    ],
  },
  infra: {
    client: [
      { name: "정적 대시보드", note: "HTML · Chart.js 주가 보고 화면" },
    ],
    runtime: [
      { name: "GitHub Actions", note: "평일 16:10 수집 · 리포트 커밋" },
      { name: "Vercel", note: "대시보드 배포 · AI 갱신 트리거 함수" },
    ],
    data: [
      { name: "저장소 JSON", note: "DB 대신 reports/에 커밋" },
      { name: "pykrx · DART", note: "주가 · 공시 데이터" },
      { name: "Gemini", note: "수집한 데이터 분석" },
    ],
  },
  outcome: {
    metrics: [
      { label: "보고 업무 절감", value: "연 16 영업일", description: "약 410만 원" },
      { label: "자동 실행", value: "평일 매일", description: "16:10 KST" },
      { label: "커밋", value: "307", description: "2026.05 – 2026.09" },
    ],
  },
  galleryLayout: "wide",
  gallery: [
    { src: "/projects/incar-stock-report/cover.webp", alt: "시세 현황 탭: 현재가와 최근 7거래일", caption: "시세 현황 · AI 종합 의견" },
    { src: "/projects/incar-stock-report/screen-chart.webp", alt: "주가 차트 탭: 7거래일 캔들 · 거래량 · 1년 추이", caption: "주가 차트" },
    { src: "/projects/incar-stock-report/screen-ai.webp", alt: "AI 분석 탭: 가격 · 투자자 · 거래량 · 시장 비교 · 종합 의견", caption: "AI 분석 · 종목 분석 5항목" },
  ],
  links: [
    { label: "대시보드", href: "https://incar-stock.vercel.app" },
  ],
};
