import type { Project } from "../types";

// 실제 프로젝트(이 사이트)입니다. [TODO] 부분만 채워주세요.
export const portfolioSite: Project = {
  slug: "portfolio-site",
  title: "AI 에이전트와 함께 만든 포트폴리오 사이트",
  summary: "Claude Code의 역할별 에이전트와 태스크 문서로 기획, 디자인 시스템, 구현, QA를 나눠 진행하며 이 사이트를 만들었습니다.",
  positions: ["ai-product-builder"],
  featured: true,
  role: "기획 · 디자인 · 개발 (1인)",
  period: "[TODO] 2026.09 – 진행 중",
  team: "1인 + AI 에이전트",
  tags: ["Next.js", "TypeScript", "Tailwind CSS", "Claude Code", "Originkit", "Vercel"],
  thumbnail: { src: "/originkit/hover-3.jpg", alt: "[TODO] 포트폴리오 사이트 화면 캡처" },
  overview:
    "지원 포지션(PM, 서비스 기획, AI Product Builder)마다 다른 근거를 보여주는 포트폴리오가 필요했습니다. 기획 문서만이 아니라 직접 만든 결과물로 보여주기 위해 사이트 자체를 AI와 함께 만들었습니다.",
  problem: {
    statement: "하나의 포트폴리오로 세 포지션을 설득하려면, 포지션마다 강조점이 다른 구조와 빠르게 콘텐츠를 채울 수 있는 틀이 필요했습니다.",
    points: [
      "포지션별로 같은 프로젝트를 다른 관점에서 보여줄 수 있어야 했습니다.",
      "혼자서 기획, 디자인, 개발, QA를 모두 해야 했습니다.",
      "모바일에서 보는 채용 담당자가 많아 반응형 품질이 중요했습니다.",
    ],
  },
  process: [
    {
      title: "태스크 문서와 에이전트 역할 설계",
      description:
        "작업을 단계별 태스크로 나누고, 태스크마다 난이도에 맞는 모델과 역할별 에이전트(ui-builder, content-writer, qa-reviewer, seo-performance)를 지정했습니다.",
      artifact: "docs/TASK.md, .claude/agents/",
    },
    {
      title: "반응형 점검과 디자인 시스템",
      description:
        "Playwright로 375 / 768 / 1440px 화면을 캡처해 문제를 목록으로 정리한 뒤, 디자인 토큰, 공통 컴포넌트, 모션 프리셋을 먼저 만들었습니다.",
      artifact: "반응형 점검 문서, /design-system",
    },
    {
      title: "데이터 모델과 콘텐츠 구조",
      description: "프로젝트를 포지션과 분리된 데이터로 두고, 포지션 페이지가 필요한 프로젝트를 골라 보여주도록 설계했습니다.",
      artifact: "docs/IA.md, src/content/",
    },
  ],
  outcome: {
    summary: "[TODO] 배포 후 결과 요약 (예: 제작 기간, 태스크 수, Lighthouse 점수)",
    metrics: [
      { label: "제작 기간", value: "[TODO]" },
      { label: "완료 태스크", value: "[TODO]" },
      { label: "Lighthouse 성능", value: "[TODO]" },
    ],
  },
  retrospective: [
    "[TODO] AI 에이전트와 일하면서 잘 된 점",
    "[TODO] 사람이 직접 판단해야 했던 부분과 배운 점",
  ],
  links: [
    { label: "사이트 보기", href: "https://portfolio-seojun.vercel.app/" },
    { label: "[TODO] GitHub 저장소", href: "[TODO]" },
  ],
};
