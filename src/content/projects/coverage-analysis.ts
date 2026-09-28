import type { Project } from "../types";

export const coverageAnalysis: Project = {
  slug: "coverage-analysis",
  title: "보장분석 프로그램",
  subtitle: "흩어진 보험 계약을 모아 부족한 보장을 보여주는 서비스",
  summary:
    "고객이 가입한 보험을 한 번에 불러와 보장 현황을 시각화하고, 권장 보장액과 비교해 부족한 부분을 보여주는 서비스입니다. 금융감독원 공인 '내보험다보여' 연동(CODEF API)과 보장분석 PDF 업로드 두 가지 방식을 설계했습니다.",
  cardPoints: [
    "가입한 보험을 한 번에 불러와 보장 현황을 시각화",
    "권장 보장액과 비교해 부족한 보장을 표시",
    "'내보험다보여' 연동(CODEF API)과 PDF 업로드 두 경로 설계",
  ],
  category: "ai",
  deployment: "live",
  positions: ["ai-product-builder"],
  featured: true,
  role: "기획 · 개발 (1인)",
  period: "2026.05 – 2026.06",
  affiliation: "company",
  organization: "인카금융서비스 · AI Lab",
  tags: ["Next.js 16", "TypeScript", "CODEF API", "데이터 시각화"],
  thumbnail: { src: "/projects/coverage-analysis/cover.webp", alt: "보장분석 결과: 보장 점수와 가입 보험 목록 (데모 데이터)" },
  highlights: [
    "내보험다보여(CODEF) 연동: 기존 계정 로그인 · 신규 가입 · SMS / PASS 2차 인증 흐름",
    "보장분석 PDF 직접 업로드 경로",
    "권장 보장액 대비 부족한 보장(갭) 분석과 시각화",
    "API 키가 없으면 데모 데이터로 동작하는 데모 모드",
  ],
  problem: {
    statement: "고객의 보험 계약이 여러 보험사에 흩어져 있어, 무엇이 부족한지 한눈에 보기 어려웠습니다",
  },
  actions: [
    {
      title: "연동 방식 설계",
      description:
        "전 보험사 계약을 한 번에 모으는 내보험다보여 연동을 추천 경로로, 보험사 · 금감원에서 받은 보장분석 PDF 업로드를 대체 경로로 두었습니다.",
      artifact: "연동 플로우, 화면 설계",
    },
    {
      title: "CODEF API 연동",
      description: "계정 연결 · 가입 · 인증 확인 · 계약 조회를 서버 API로 나누고, 캡차와 응답 매핑을 별도 모듈로 분리했습니다.",
      artifact: "/api/codef/*",
    },
    {
      title: "갭 분석 대시보드",
      description: "보험 카드, 보장 항목별 진행바, 권장 보장액 대비 부족분 요약 표로 보장 현황을 보여줍니다.",
    },
  ],
  architecture: {
    stages: [
      {
        title: "랜딩 · 연동 방식 선택",
        items: ["내보험다보여 연동 (추천)", "보장분석 PDF 업로드"],
        kind: "screen",
      },
      {
        title: "인증",
        items: ["기존 계정 로그인 / 신규 가입", "SMS 또는 PASS 2차 인증"],
        tech: ["connect", "register", "verify"],
        kind: "screen",
      },
      {
        title: "계약 조회",
        items: ["서버 API에서 CODEF 호출", "캡차 처리 · 응답 매핑", "키가 없으면 데모 데이터"],
        tech: ["CODEF API", "axios"],
        kind: "system",
      },
      {
        title: "갭 분석",
        items: ["권장 보장액과 현재 보장 비교"],
        kind: "system",
      },
      {
        title: "대시보드",
        items: ["보험 카드", "보장 항목별 진행바", "갭 요약 표"],
        kind: "screen",
      },
    ],
    caption: "incar_ca_test 저장소 코드 기준 (비공개 저장소)",
  },
  outcome: { metrics: [] },
  galleryLayout: "wide",
  gallery: [
    { src: "/projects/coverage-analysis/screen-method.webp", alt: "보장분석 연동 방식 선택 화면", caption: "연동 방식 선택 · 내보험다보여 / PDF 업로드" },
    { src: "/projects/coverage-analysis/screen-login.webp", alt: "내보험다보여 계정 연동과 2차 인증 입력 화면", caption: "계정 연동 · SMS / PASS 2차 인증" },
    { src: "/projects/coverage-analysis/cover.webp", alt: "보장 점수, 가입 보험 수, 월 보험료와 가입 보험 목록", caption: "결과 · 보장 점수와 가입 보험 목록 (데모 데이터)" },
    { src: "/projects/coverage-analysis/screen-coverage.webp", alt: "보장 항목별 진행바와 갭 분석 표", caption: "보장 현황 · 갭 분석 (데모 데이터)" },
  ],
  links: [{ label: "서비스", href: "https://incar-ca-test.vercel.app" }],
};
