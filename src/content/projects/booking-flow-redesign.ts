import type { Project } from "../types";

// 목업 예시입니다. 실제 프로젝트 내용으로 바꿔주세요.
export const bookingFlowRedesign: Project = {
  slug: "booking-flow-redesign",
  title: "예약·결제 플로우 재설계",
  summary: "단계가 길고 예외 처리가 제각각이던 예약·결제 흐름을 유저 플로우와 IA부터 다시 설계했습니다.",
  positions: ["service-planner", "product-manager"],
  featured: true,
  role: "Service Planner",
  period: "[TODO] 2024.07 – 2024.10",
  team: "[TODO] 기획 1, 디자이너 2, 개발자 4",
  organization: "[TODO] 회사/서비스명",
  tags: ["유저 플로우", "IA", "와이어프레임", "화면 설계서"],
  thumbnail: { src: "/originkit/hover-2.jpg", alt: "[TODO] 예약 플로우 다이어그램 이미지" },
  overview: "[TODO] 서비스 소개 한 문장. 예약 완료까지 [TODO]단계를 거쳐야 했고, 결제 실패 시 처음부터 다시 시작해야 했습니다.",
  problem: {
    statement: "예약 과정이 길고, 결제 실패나 품절 같은 예외 상황에서 사용자가 길을 잃었습니다.",
    points: [
      "예약 시작 대비 완료율 [TODO]%",
      "CS 문의 중 예약·결제 관련 비중 [TODO]%",
      "화면마다 예외 메시지와 처리 방식이 달랐습니다.",
    ],
  },
  process: [
    {
      title: "현행 플로우 분석",
      description: "현재 흐름을 모든 분기와 예외 포함해 다시 그리고, 불필요한 단계와 막다른 길을 표시했습니다.",
      artifact: "유저 플로우 (AS-IS)",
    },
    {
      title: "IA와 플로우 재설계",
      description: "선택 → 확인 → 결제 3단계로 줄이고, 예외 상황마다 돌아갈 지점을 정의했습니다.",
      artifact: "유저 플로우 (TO-BE), IA",
    },
    {
      title: "와이어프레임과 설계서",
      description: "화면별 상태(기본, 로딩, 빈 값, 오류)와 동작을 설계서로 정리해 개발과 QA 기준으로 사용했습니다.",
      artifact: "와이어프레임, 화면 설계서",
    },
  ],
  outcome: {
    summary: "[TODO] 결과 요약 한두 문장",
    metrics: [
      { label: "예약 완료율", value: "[TODO]" },
      { label: "예약 관련 CS 문의", value: "[TODO]" },
      { label: "단계 수", value: "[TODO] → 3단계" },
    ],
  },
  retrospective: ["[TODO] 잘한 점", "[TODO] 아쉬운 점과 다음에 다르게 할 것"],
};
