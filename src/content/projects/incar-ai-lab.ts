import type { Project } from "../types";

export const incarAiLab: Project = {
  slug: "incar-ai-lab",
  title: "인카금융서비스 AI Lab",
  subtitle: "전사 AX 과제 정의와 AI 서비스 기획 · 개발",
  summary:
    "AI전략총괄 AI Lab의 AI PM으로 현업 요건 약 50건을 분류해 우선순위를 정하고, 보험상품 비교 · 추천 RAG 서비스를 기획해 POC에서 본사업으로 넘겼습니다. DX 과제 3종은 Claude Code로 직접 개발 · 배포했습니다.",
  category: "ai",
  deployment: "live",
  positions: ["product-manager", "ai-product-builder"],
  featured: true,
  role: "AI PM · AI전략총괄 AI Lab (사원, 계약직)",
  period: "2026.03 – 2026.10",
  organization: "(주)인카금융서비스",
  tags: ["AX", "RAG", "PRD", "QA 운영", "Claude Code", "AI 교육"],
  thumbnail: { src: "/projects/incar-ai-lab/cover.webp", alt: "직접 개발한 인카금융서비스 주가 보고 자동화 대시보드" },
  highlights: [
    "현업 부서 요건 약 50건을 RPA · 전산 · AI로 분류하고 절감 임팩트순으로 우선순위화",
    "보험상품 비교 · 추천 RAG 서비스 기획, 4차 QA로 정합성 100% · 인텐트 파악률 90%+ → 본사업 전환",
    "DX 과제 3종 직접 개발 · 배포 · 주가 보고 자동화로 연 16 영업일, 약 410만 원 절감",
    "전사 AI 교육 온라인 14회차 · 오프라인 3회 기획 · 운영",
  ],
  problem: {
    statement: "현업 부서에서 올라온 약 50건의 요건을 어떤 방식(RPA · 전산 · AI)으로, 어떤 순서로 풀지 정해야 했습니다",
  },
  actions: [
    {
      title: "전사 AX 과제 정의",
      description: "현업 부서 요건 약 50건을 RPA · 전산 · AI로 분류하고, 절감 임팩트 순으로 우선순위를 정했습니다.",
      artifact: "과제 분류표, 우선순위",
    },
    {
      title: "보험상품 비교 · 추천 서비스 (RAG) 기획",
      description: "FGI와 FA 인터뷰로 요구를 모으고 PRD와 요구사항 정의서를 작성했습니다.",
      artifact: "PRD, 요구사항 정의서",
    },
    {
      title: "외주 개발사 대상 4차 QA 운영",
      description: "답변 정합성과 인텐트 파악률을 기준으로 4차에 걸쳐 QA를 운영해 POC를 본사업으로 전환했습니다.",
      artifact: "Test Case, 버그 리포트",
    },
    {
      title: "FA 위촉 문의 응대 AI 에이전트 기획 (진행 중)",
      description: "영업센터에 반복되는 위촉 문의를 AI 응대로 전환하는 에이전트를 기획하고 있습니다.",
    },
    {
      title: "DX 과제 3종 직접 개발 · 배포",
      description: "Claude Code로 직접 만들어 배포했습니다.",
      points: [
        "경영진 주가 보고 자동화: 평일 장 마감 후 주가 · 재무 · 투자자 동향을 자동 수집하고 Gemini로 요약하는 대시보드 (연 16 영업일, 약 410만 원 절감)",
        "보장분석 프로그램",
        "FA 위촉 시뮬레이터",
      ],
    },
    {
      title: "전사 AI 교육 기획 · 운영",
      description: "온라인 14회차, 오프라인 3회 교육을 운영하고 AI 영상 툴로 교육 콘텐츠를 만들었습니다.",
    },
  ],
  outcome: {
    metrics: [
      { label: "AX 요건 분류 · 우선순위화", value: "약 50건", description: "RPA · 전산 · AI" },
      { label: "RAG 서비스 답변 정합성", value: "100%", description: "4차 QA 기준" },
      { label: "인텐트 파악률", value: "90%+", description: "POC 후 본사업 전환" },
      { label: "주가 보고 자동화 절감", value: "연 16 영업일", description: "약 410만 원" },
      { label: "전사 AI 교육", value: "17회", description: "온라인 14회차 · 오프라인 3회" },
    ],
  },
  links: [
    { label: "주가 보고 대시보드", href: "https://incar-stock.vercel.app" },
    { label: "GitHub", href: "https://github.com/uwol-is-june/incar_stock" },
  ],
};
