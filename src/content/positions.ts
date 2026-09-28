import type { Position, PositionId } from "./types";

/** 배열 순서 = 홈 메뉴, 헤더 메뉴 순서 */
export const positions: Position[] = [
  {
    id: "product-manager",
    title: "Product Manager",
    shortTitle: "PRODUCT MANAGER",
    tagline: "문제 정의 → 가설 → 지표 → 검증, 실패하면 원인을 찾아 다시 설계하는 PM",
    intro: [
      "창업한 포도상점에서 MVP 개발부터 출시, 초기 그로스까지 전 단계를 주도했습니다. 출시 후 거래가 0건이었을 때 고객 인터뷰로 '플랫폼 신뢰 부족'이라는 원인을 찾았고, 신뢰를 쌓는 액션으로 거래 13건과 매출 1,595,000원을 만들었습니다.",
      "지금은 인카금융서비스 AI Lab에서 현업 요건 약 50건을 분류해 우선순위를 정하고, AI 서비스를 기획해 POC에서 본사업으로 넘기는 일을 했습니다.",
    ],
    competencies: [
      {
        title: "문제 정의와 가설",
        description: "통계와 사용자 인터뷰를 함께 보고 문제를 한 문장으로 정의한 뒤, 검증 가능한 가설로 바꿉니다. (포도상점 작가 58명 인터뷰, 멍멍멍멍멍 86명 설문)",
      },
      {
        title: "지표 정의",
        description: "실행 전에 지표 이름과 정의(def.)를 먼저 정하고, 같은 지표로 개선 전후를 비교합니다.",
      },
      {
        title: "실패 분석과 재설계",
        description: "가설 검증에 실패하면 고객에게 직접 물어 원인을 찾고, 인사이트에서 나온 액션으로 다시 검증합니다.",
      },
      {
        title: "우선순위와 실행",
        description: "절감 임팩트로 과제 순서를 정하고(AX 요건 약 50건), OKR 스프린트로 12인 팀의 실행을 맞춥니다.",
      },
    ],
    emphasis: ["문제 정의", "가설 검증", "지표 정의", "우선순위", "OKR"],
    cover: { src: "/projects/podo-store/cover.webp", alt: "포도상점 서비스 화면" },
    cta: { label: "이력서와 경력 보기", href: "/about" },
  },
  {
    id: "service-planner",
    title: "Service Planner",
    shortTitle: "SERVICE PLANNER",
    tagline: "현장의 흐름을 뜯어보고, 사용자가 판단하지 않아도 되게 설계하는 기획자",
    intro: [
      "포도티켓을 공연 현장에서 직접 운영하며 관객이 '사전 예매와 현장 예매 중 뭘 골라야 하는지' 헤매는 것을 봤습니다. 선택지를 없애고 시스템이 판별하도록 플로우를 바꿔 현장 혼선 VOC를 80% 줄였습니다.",
      "12인 팀의 기획자로 PRD와 화면설계서를 쓰고 앱을 출시했고, 결제 도입을 위해 PG사 비교부터 결제 예외 처리, 약관 개정까지 정책을 설계했습니다.",
    ],
    competencies: [
      {
        title: "유저 플로우 개선",
        description: "AS-IS 흐름에서 사용자가 판단해야 하는 지점을 찾아, TO-BE에서는 시스템이 대신하도록 바꿉니다.",
      },
      {
        title: "화면 설계와 문서화",
        description: "PRD, 화면설계서, 요구사항 정의서로 개발 · 디자인과 같은 기준을 만듭니다.",
      },
      {
        title: "결제 · 정책 설계",
        description: "PG사 정책과 수수료를 비교하고, 결제 플로우와 예외 처리, 이용약관 · 개인정보 처리방침까지 정리합니다.",
      },
      {
        title: "QA",
        description: "Test Case를 설계하고 외주 개발사 대상 4차 QA를 운영해 정합성 100%를 확인했습니다.",
      },
    ],
    emphasis: ["유저 플로우", "화면 설계", "정책 설계", "현장 운영", "QA"],
    cover: { src: "/projects/podo-ticket/cover.webp", alt: "포도티켓 모바일 화면" },
    cta: { label: "이력서와 경력 보기", href: "/about" },
  },
  {
    id: "ai-product-builder",
    title: "AI Product Builder",
    shortTitle: "AI PRODUCT BUILDER",
    tagline: "AI로 직접 만들고, 실제로 써서 검증하는 AI PM",
    intro: [
      "GitHub 14.7k★ 투자 분석 오픈소스를 미국장 버전으로 다시 만들고 토스증권 API로 실계좌를 연동해, 추천 종목을 실제로 매수해 수익률 +21.0%로 검증했습니다.",
      "회사에서는 DX 과제 3종을 Claude Code로 직접 개발 · 배포했고, 개인적으로도 카드뉴스 에이전트, DevTier, 포도위키 같은 서비스를 만들어 운영하고 있습니다.",
    ],
    competencies: [
      {
        title: "AI 에이전트 설계",
        description: "역할이 다른 에이전트를 나눠 동시에 돌리고 서로 반박하게 합니다. (서학개미클럽 4대 거장 에이전트)",
      },
      {
        title: "LLM의 경계 설계",
        description: "계산은 코드가, 해석만 LLM이 하도록 나눕니다. 판단은 원장에 기록해 실제 결과로 채점합니다.",
      },
      {
        title: "AI 서비스 기획 · QA",
        description: "RAG 기반 보험상품 비교 · 추천 서비스를 기획하고 정합성 · 인텐트 파악률로 품질을 검증했습니다.",
      },
      {
        title: "직접 만들고 배포",
        description: "Next.js, Supabase, GitHub Actions, Vercel로 기획한 것을 직접 만들어 배포하고 운영합니다.",
      },
    ],
    emphasis: ["실투자 검증", "멀티 에이전트", "RAG", "자동화", "직접 배포"],
    cover: { src: "/projects/seohak-gaemi-club/cover.webp", alt: "서학개미클럽 대시보드" },
    cta: { label: "GitHub에서 더 보기", href: "https://github.com/uwol-is-june" },
  },
];

export const positionIds = positions.map((p) => p.id) as PositionId[];
