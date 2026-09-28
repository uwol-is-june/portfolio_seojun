import type { Project } from "../types";

// 목업 예시입니다. 실제 프로젝트 내용으로 바꿔주세요.
export const adminPermissionPolicy: Project = {
  slug: "admin-permission-policy",
  title: "운영 어드민 권한·정책 설계",
  summary: "담당자마다 다르게 처리하던 운영 업무를 권한 체계와 상태 전이 정책으로 정리해 어드민을 설계했습니다.",
  positions: ["service-planner"],
  role: "Service Planner",
  period: "[TODO] 2023.04 – 2023.07",
  team: "[TODO] 기획 1, 개발자 2, 운영팀",
  organization: "[TODO] 회사/서비스명",
  tags: ["정책 설계", "권한 관리", "상태 다이어그램", "어드민"],
  thumbnail: { src: "/originkit/hover-5.png", alt: "[TODO] 어드민 화면 이미지" },
  overview: "[TODO] 배경 한 문장. 운영 인원이 늘면서 누가 무엇을 바꿀 수 있는지에 대한 기준이 없어 사고가 반복됐습니다.",
  problem: {
    statement: "권한과 처리 규칙이 문서 없이 사람에게 의존해 있어서, 실수와 중복 처리가 자주 발생했습니다.",
    points: ["[TODO] 월 평균 운영 실수 건수", "[TODO] 신규 운영자 온보딩 기간"],
  },
  process: [
    {
      title: "업무와 권한 인벤토리",
      description: "운영팀 인터뷰로 업무를 모두 나열하고, 역할별로 필요한 권한을 매트릭스로 정리했습니다.",
      artifact: "권한 매트릭스",
    },
    {
      title: "상태 전이 정책",
      description: "주문·회원 상태가 바뀌는 조건과 되돌릴 수 있는 범위를 상태 다이어그램으로 정의했습니다.",
      artifact: "상태 다이어그램, 정책서",
    },
    {
      title: "어드민 화면 설계",
      description: "권한에 따라 보이는 메뉴와 버튼, 변경 이력 조회 화면을 설계했습니다.",
      artifact: "와이어프레임",
    },
  ],
  outcome: {
    summary: "[TODO] 결과 요약 한두 문장",
    metrics: [
      { label: "운영 실수 건수", value: "[TODO]" },
      { label: "신규 운영자 온보딩 기간", value: "[TODO]" },
    ],
  },
  retrospective: ["[TODO] 잘한 점", "[TODO] 아쉬운 점과 다음에 다르게 할 것"],
};
