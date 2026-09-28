import type { Project } from "../types";

// 목업 예시입니다. 실제 프로젝트 내용으로 바꿔주세요.
export const onboardingConversion: Project = {
  slug: "onboarding-conversion",
  title: "신규 가입 온보딩 전환율 개선",
  summary: "가입 퍼널에서 이탈이 가장 큰 단계를 찾아 입력 항목과 순서를 다시 설계하고, 실험으로 전환율 개선을 검증했습니다.",
  positions: ["product-manager", "service-planner"],
  featured: true,
  role: "Product Manager",
  period: "[TODO] 2024.03 – 2024.06",
  team: "[TODO] PM 1, 디자이너 1, 개발자 3",
  organization: "[TODO] 회사/서비스명",
  tags: ["퍼널 분석", "A/B 테스트", "사용자 인터뷰", "PRD"],
  thumbnail: { src: "/originkit/hover-1.jpg", alt: "[TODO] 온보딩 화면 이미지" },
  overview:
    "[TODO] 서비스 소개 한 문장. 신규 사용자의 가입 완료율이 낮아 마케팅 비용 대비 획득 효율이 떨어지고 있었습니다.",
  problem: {
    statement: "가입을 시작한 사용자 중 [TODO]%만 가입을 완료하고 있었습니다.",
    points: [
      "퍼널 분석 결과 [TODO] 단계에서 이탈이 가장 컸습니다.",
      "사용자 인터뷰에서 '왜 이 정보가 필요한지 모르겠다'는 응답이 반복됐습니다.",
      "[TODO] 추가로 확인한 문제",
    ],
  },
  process: [
    {
      title: "문제 좁히기",
      description: "단계별 이탈률과 인터뷰 내용을 함께 정리해 가설 3개를 세우고, 임팩트와 검증 비용으로 우선순위를 매겼습니다.",
      artifact: "퍼널 대시보드, 가설 목록",
    },
    {
      title: "성공 지표 합의",
      description: "가입 완료율을 주 지표로, 7일 리텐션을 가드레일 지표로 정하고 팀과 판단 기준을 먼저 합의했습니다.",
      artifact: "PRD",
    },
    {
      title: "실험 설계와 실행",
      description: "필수 입력 항목을 줄이고 나머지는 가입 후 단계로 옮긴 안을 A/B 테스트로 [TODO]주간 검증했습니다.",
      artifact: "실험 설계서",
    },
  ],
  outcome: {
    summary: "[TODO] 결과 요약 한두 문장",
    metrics: [
      { label: "가입 완료율", value: "[TODO]", description: "실험군 vs 대조군" },
      { label: "7일 리텐션", value: "[TODO]", description: "가드레일 지표 유지 여부" },
      { label: "[TODO] 지표", value: "[TODO]" },
    ],
  },
  retrospective: [
    "[TODO] 잘한 점: 예) 실험 전에 판단 기준을 합의해서 결과 해석에 이견이 없었다.",
    "[TODO] 아쉬운 점과 다음에 다르게 할 것",
  ],
};
