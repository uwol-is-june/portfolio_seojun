import type { Project } from "../types";

export const portfolioSite: Project = {
  slug: "portfolio-site",
  title: "이 포트폴리오 사이트",
  subtitle: "Claude Code 에이전트와 태스크 문서로 만든 포트폴리오",
  summary:
    "역할별 AI 에이전트와 태스크 문서로 기획, 디자인 시스템, 구현, QA를 나눠 진행하며 이 사이트를 만들었습니다. 이력서와 포트폴리오 PDF, GitHub를 분석해 콘텐츠를 구성했습니다.",
  category: "ai",
  deployment: "live",
  positions: ["ai-product-builder"],
  status: "운영 중",
  role: "기획 · 디자인 · 개발 (1인)",
  period: "2026.09 – 현재",
  organization: "AI 사이드 프로젝트",
  team: [{ role: "PM", count: 1 }],
  tags: ["Next.js", "TypeScript", "Tailwind CSS", "Claude Code", "Playwright", "Vercel"],
  highlights: [
    "태스크 22개를 단계별로 나눠 역할별 에이전트에게 배정",
    "디자인 토큰 · 공통 컴포넌트 · 모션 프리셋부터 만들고 페이지 구성",
    "375 / 768 / 1440px 캡처와 정적 점검으로 매 단계 검증",
  ],
  problem: {
    statement: "하나의 사이트로 세 포지션을 설득하려면, 같은 프로젝트를 포지션마다 다른 관점으로 보여줄 구조가 필요했습니다",
    points: ["기획, 디자인, 개발, QA를 혼자 해야 했습니다", "모바일로 보는 채용 담당자를 위해 반응형 품질이 중요했습니다"],
  },
  actions: [
    {
      title: "태스크 문서와 에이전트 역할 설계",
      description:
        "작업을 단계별 태스크로 나누고, 태스크마다 난이도에 맞는 모델과 역할별 에이전트를 지정했습니다.",
      artifact: "docs/TASK.md, .claude/agents/",
      points: [
        "ui-builder: 섹션, 컴포넌트, 레이아웃, 애니메이션",
        "content-writer: 소개글, 프로젝트 설명",
        "qa-reviewer: 빌드, 린트, 반응형, 접근성",
        "seo-performance: 메타데이터, OG 이미지, 성능",
      ],
    },
    {
      title: "반응형 점검과 디자인 시스템",
      description:
        "Playwright로 375 / 768 / 1440px 화면을 캡처해 문제를 목록으로 정리한 뒤, 디자인 토큰, 공통 컴포넌트, 모션 프리셋을 먼저 만들었습니다.",
      artifact: "반응형 점검 문서, /design-system",
    },
    {
      title: "데이터 모델과 콘텐츠 구조",
      description:
        "프로젝트를 포지션과 분리된 데이터로 두고, 포트폴리오 PDF와 같은 순서(문제 → 가설 → 지표 → 결과 → 개선)로 케이스 스터디를 구성했습니다.",
      artifact: "docs/IA.md, src/content/",
    },
  ],
  outcome: {
    metrics: [
      { label: "완료 태스크", value: "22개", description: "1차 구축 (TASK-00 ~ 21)" },
      { label: "케이스 스터디", value: "6개", description: "포지션 3개에서 재사용" },
      { label: "텍스트 대비", value: "4.5:1 이상", description: "WCAG AA 기준 점검" },
    ],
  },
  retrospective: [
    "AI가 만든 결과물을 화면 캡처와 빌드 결과로 매번 확인해서, 격자 빈 칸 · 글자 대비 부족 · 공유 이미지의 한글 줄바꿈 같은 문제를 배포 전에 잡았습니다.",
    "콘텐츠 방향, 공개 범위, 수치 확인처럼 판단이 필요한 부분은 태스크로 분리해 직접 결정했습니다.",
  ],
  links: [
    { label: "사이트", href: "https://portfolio-seojun.vercel.app/" },
    { label: "GitHub", href: "https://github.com/uwol-is-june/portfolio_seojun" },
  ],
};
