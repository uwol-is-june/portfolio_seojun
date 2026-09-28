import type { Project } from "../types";

// 목업 예시입니다. 실제로 만든 AI 프로토타입으로 바꿔주세요.
export const aiPrototype: Project = {
  slug: "ai-prototype",
  title: "[TODO] LLM 기반 업무 자동화 프로토타입",
  summary: "[TODO] 반복 업무 하나를 골라 LLM으로 자동화하는 프로토타입을 만들고, 실제 사용자에게 써보게 하며 개선했습니다.",
  positions: ["ai-product-builder", "product-manager"],
  role: "기획 · 개발 (1인)",
  period: "[TODO]",
  tags: ["[TODO] Claude API", "프롬프트 설계", "평가 세트", "[TODO]"],
  thumbnail: { src: "/originkit/hover-4.jpg", alt: "[TODO] 프로토타입 데모 화면" },
  overview: "[TODO] 어떤 업무를, 누구를 위해 자동화했는지",
  problem: {
    statement: "[TODO] 자동화 전 업무에 걸리던 시간과 불편",
    points: ["[TODO] 문제 1", "[TODO] 문제 2"],
  },
  process: [
    {
      title: "업무 분해",
      description: "[TODO] 업무를 단계로 나누고 AI에게 맡길 부분과 사람이 확인할 부분을 구분했습니다.",
      artifact: "업무 흐름도",
    },
    {
      title: "프롬프트와 평가 기준",
      description: "[TODO] 실제 사례로 평가 세트를 만들고, 프롬프트를 바꿀 때마다 같은 기준으로 비교했습니다.",
      artifact: "평가 세트",
    },
    {
      title: "프로토타입과 사용자 테스트",
      description: "[TODO] 동작하는 데모를 만들어 사용자 [TODO]명에게 써보게 하고 피드백을 반영했습니다.",
      artifact: "데모",
    },
  ],
  outcome: {
    summary: "[TODO] 결과 요약",
    metrics: [
      { label: "처리 시간", value: "[TODO]" },
      { label: "정확도 (평가 세트)", value: "[TODO]" },
    ],
  },
  retrospective: ["[TODO] 잘한 점", "[TODO] 아쉬운 점과 다음에 다르게 할 것"],
  links: [{ label: "[TODO] 데모 보기", href: "[TODO]" }],
};
