import type { Project } from "../types";

// 목업 예시입니다. 실제 프로젝트 내용으로 바꿔주세요.
export const roadmapPrioritization: Project = {
  slug: "roadmap-prioritization",
  title: "분기 로드맵 수립과 우선순위 프레임워크 도입",
  summary: "요청이 쌓이기만 하던 백로그를 임팩트 기준으로 정리하고, 이해관계자가 납득하는 우선순위 결정 방식을 만들었습니다.",
  positions: ["product-manager"],
  featured: true,
  role: "Product Manager",
  period: "[TODO] 2023.10 – 2023.12",
  team: "[TODO] 제품팀 [TODO]명, 사업/운영 이해관계자",
  organization: "[TODO] 회사/서비스명",
  tags: ["로드맵", "RICE", "이해관계자 관리", "OKR"],
  thumbnail: { src: "/originkit/hover-4.jpg", alt: "[TODO] 로드맵 문서 이미지" },
  overview:
    "[TODO] 배경 한 문장. 여러 부서의 요청이 한꺼번에 들어오면서 무엇을 먼저 할지에 대한 논쟁이 반복되고 있었습니다.",
  problem: {
    statement: "우선순위 기준이 없어서 목소리가 큰 요청부터 처리되고, 팀은 목표와 무관한 일에 시간을 쓰고 있었습니다.",
    points: [
      "백로그 [TODO]건 중 목표(OKR)와 연결된 항목이 [TODO]%에 불과했습니다.",
      "결정 근거가 남지 않아 같은 논의가 분기마다 반복됐습니다.",
    ],
  },
  process: [
    {
      title: "목표와 지표 정렬",
      description: "분기 OKR을 기준으로 모든 백로그 항목이 어떤 지표를 움직이는지 태깅했습니다.",
      artifact: "OKR 트리",
    },
    {
      title: "우선순위 프레임워크",
      description: "RICE를 팀 상황에 맞게 조정해 점수화하고, 점수와 다른 결정을 할 때는 이유를 기록하도록 했습니다.",
      artifact: "우선순위 스프레드시트",
    },
    {
      title: "로드맵 공유",
      description: "Now / Next / Later 형태의 로드맵으로 이해관계자와 합의하고 격주로 갱신했습니다.",
      artifact: "로드맵 문서",
    },
  ],
  outcome: {
    summary: "[TODO] 결과 요약 한두 문장",
    metrics: [
      { label: "OKR 연결 백로그 비율", value: "[TODO]" },
      { label: "분기 목표 달성률", value: "[TODO]" },
    ],
  },
  retrospective: [
    "[TODO] 잘한 점",
    "[TODO] 아쉬운 점과 다음에 다르게 할 것",
  ],
};
