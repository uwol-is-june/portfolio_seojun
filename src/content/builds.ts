import type { Build } from "./types";

/**
 * 직접 만들어 배포한 작은 결과물 (AI Product Builder 페이지)
 * 커밋 수는 2026.09 GitHub 기준입니다.
 */
export const builds: Build[] = [
  {
    name: "다시 DASII",
    deployment: "live",
    positions: ["product-manager", "service-planner"],
    description: "다이어트 제품 성분 분석 및 후기 앱",
    category: "startup",
    status: "운영 중",
    role: "PM · 서비스 기획",
    points: [
      "iOS · Android 앱 출시 후 운영 중",
      "제조사 표시사항과 식약처 자료로 함량 · 복용법을 정리한 성분 매거진 랜딩",
      "직접 만든 카드뉴스 에이전트로 인스타그램 콘텐츠 운영",
    ],
    stack: ["App Store", "Google Play", "Vercel"],
    links: [
      { label: "App Store", href: "https://apps.apple.com/kr/app/id6754357876" },
      { label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.dasii" },
      { label: "성분 매거진", href: "https://dasii-landing-page.vercel.app" },
    ],
  },
  {
    name: "카드뉴스 에이전트",
    deployment: "local",
    positions: ["ai-product-builder"],
    description: "인스타그램 카드뉴스 제작 에이전트",
    category: "ai",
    status: "운영 중",
    points: [
      "cards.json 한 벌로 1080×1350 PNG와 캡션을 생성, Claude Code 스킬로도 호출",
      "줄표 금지 · 문장 길이 · 줄바꿈 위치 같은 'AI 티' 규칙을 코드로 검사",
      "[다시] 인스타그램 카드뉴스 제작 · 운영에 사용",
    ],
    stack: ["Claude Code", "Node.js", "Headless Edge"],
    links: [{ label: "GitHub", href: "https://github.com/uwol-is-june/cardnews-agent" }],
    stat: "커밋 30",
  },
  {
    name: "다이어트 사주",
    deployment: "live",
    positions: ["ai-product-builder"],
    description: "Gemini 기반 다이어트 사주 분석 서비스",
    category: "ai",
    points: [
      "사주 계산(간지 · 오행 · 십신)은 코드로, 해석문 생성만 LLM에게 맡기도록 경계를 나눔",
      "만세력 계산을 Vitest로 교차 검증, IP 기준 분당 요청 제한",
    ],
    stack: ["Next.js", "TypeScript", "Gemini API", "Vitest"],
    links: [
      { label: "서비스", href: "https://diet-saju.vercel.app" },
      { label: "GitHub", href: "https://github.com/uwol-is-june/diet-saju" },
    ],
    stat: "커밋 101",
  },
  {
    name: "DevTier",
    deployment: "live",
    positions: ["ai-product-builder"],
    description: "GitHub 잔디로 측정하는 개발자 전투력 · 티어",
    category: "ai",
    points: [
      "GitHub 공개 활동 데이터 수집을 자동화하고, 개발자 평가 지표와 점수 공식을 직접 정의",
      "티어 뱃지(SVG), 유저 비교, 언어별 랭킹, 봇 계정 탐지까지 v0.4.37 운영",
    ],
    stack: ["Next.js", "Supabase", "GitHub GraphQL API", "GitHub Actions"],
    links: [
      { label: "서비스", href: "https://devtier-brown.vercel.app" },
      { label: "GitHub", href: "https://github.com/uwol-is-june/devtier" },
    ],
    stat: "커밋 69",
  },
  {
    name: "포도위키",
    deployment: "live",
    positions: ["ai-product-builder"],
    description: "공연단체 인수인계 KMS",
    category: "startup",
    status: "운영 중",
    points: ["공연단체의 인수인계 문서를 모으는 위키, 네이티브 앱 · 웹 동시 배포", "현재 3개 공연단체 사용 중"],
    stack: ["Next.js", "TypeScript"],
    links: [
      { label: "서비스", href: "https://podo-wiki.vercel.app" },
      { label: "GitHub", href: "https://github.com/uwol-is-june/Podo-Wiki" },
    ],
    stat: "커밋 178",
  },
  {
    name: "인카 주가 모니터",
    deployment: "live",
    positions: ["ai-product-builder"],
    description: "경영진 주가 보고 자동화 (인카금융서비스 DX 과제)",
    category: "ai",
    points: [
      "평일 장 마감 후 주가 · 재무 · 투자자 동향을 자동 수집하고 Gemini로 시장 요약 · 종목 분석",
      "보고 업무 연 16 영업일, 약 410만 원 절감",
    ],
    stack: ["Python", "pykrx", "DART API", "Gemini", "GitHub Actions"],
    links: [
      { label: "대시보드", href: "https://incar-stock.vercel.app" },
      { label: "GitHub", href: "https://github.com/uwol-is-june/incar_stock" },
    ],
    stat: "커밋 307",
  },
];
