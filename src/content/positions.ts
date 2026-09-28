import type { Position, PositionId } from "./types";

/** 배열 순서 = 홈 메뉴, 헤더 메뉴 순서 */
export const positions: Position[] = [
  {
    id: "product-manager",
    title: "Product Manager",
    shortTitle: "PRODUCT MANAGER",
    tagline: "문제를 정의하고, 지표로 검증하고, 우선순위로 말하는 PM",
    intro: [
      "좋은 제품은 해결할 문제를 정확히 고르는 데서 시작한다고 생각합니다. 사용자 인터뷰와 데이터를 함께 보며 문제를 좁히고, 성공 지표를 먼저 정한 뒤 실행합니다.",
      "[TODO] PM으로서의 경력 요약 한두 문장 (예: 어떤 도메인에서 몇 년, 어떤 규모의 팀과 일했는지)",
    ],
    competencies: [
      {
        title: "문제 정의",
        description: "정성(인터뷰, VOC)과 정량(퍼널, 코호트) 데이터를 교차해 해결할 가치가 큰 문제를 고릅니다.",
      },
      {
        title: "지표 설계",
        description: "North Star와 보조 지표를 나누고, 실험 전에 성공과 실패의 기준을 합의합니다.",
      },
      {
        title: "우선순위 결정",
        description: "임팩트, 확신도, 비용을 기준으로 로드맵을 정하고 결정 근거를 문서로 남깁니다.",
      },
      {
        title: "협업과 실행",
        description: "디자인, 개발, 비즈니스 팀이 같은 목표를 보도록 PRD와 스프린트 리뷰로 맥락을 맞춥니다.",
      },
    ],
    emphasis: ["문제 정의", "지표", "로드맵", "우선순위 결정 과정"],
    cover: { src: "/originkit/hover-1.jpg", alt: "[TODO] Product Manager 대표 이미지" },
    cta: { label: "이력서와 경력 보기", href: "/about" },
  },
  {
    id: "service-planner",
    title: "Service Planner",
    shortTitle: "SERVICE PLANNER",
    tagline: "사용자의 흐름과 운영 정책까지 설계하는 서비스 기획자",
    intro: [
      "화면 하나보다 사용자가 목적을 이루기까지의 전체 흐름을 먼저 그립니다. 예외 상황과 운영 정책까지 정의해야 기획이 끝난다고 생각합니다.",
      "[TODO] 서비스 기획 경력 요약 한두 문장 (예: 담당한 서비스, 플랫폼, 기획 범위)",
    ],
    competencies: [
      {
        title: "유저 플로우",
        description: "진입부터 완료, 이탈과 예외까지 사용자의 경로를 빠짐없이 그립니다.",
      },
      {
        title: "정보 구조(IA)",
        description: "메뉴와 화면 구조를 사용자의 멘탈 모델에 맞춰 정리합니다.",
      },
      {
        title: "와이어프레임과 화면 설계서",
        description: "개발과 디자인이 바로 작업할 수 있는 수준으로 화면과 동작을 정의합니다.",
      },
      {
        title: "정책 설계",
        description: "권한, 상태 전이, 예외 처리 규칙을 문서로 정리해 운영 비용을 줄입니다.",
      },
    ],
    emphasis: ["유저 플로우", "IA", "와이어프레임", "정책 설계"],
    cover: { src: "/originkit/hover-2.jpg", alt: "[TODO] Service Planner 대표 이미지" },
    cta: { label: "이력서와 경력 보기", href: "/about" },
  },
  {
    id: "ai-product-builder",
    title: "AI Product Builder",
    shortTitle: "AI PRODUCT BUILDER",
    tagline: "AI로 직접 만들고, 써보고, 검증하는 빌더",
    intro: [
      "아이디어를 문서로만 설명하지 않고 동작하는 프로토타입으로 보여줍니다. LLM과 AI 코딩 도구를 활용해 기획부터 배포까지 혼자서도 빠르게 검증합니다.",
      "[TODO] AI 활용 경험 요약 한두 문장 (예: 사용해 본 모델과 도구, 만들어 본 서비스 수)",
    ],
    competencies: [
      {
        title: "빠른 프로토타이핑",
        description: "Next.js와 AI 코딩 에이전트로 아이디어를 며칠 안에 배포 가능한 형태로 만듭니다.",
      },
      {
        title: "LLM 기능 설계",
        description: "프롬프트, 컨텍스트, 평가 기준을 설계해 AI 기능의 품질을 관리합니다.",
      },
      {
        title: "AI 워크플로 설계",
        description: "에이전트와 자동화를 업무 흐름에 맞게 나누고 역할을 정의합니다.",
      },
    ],
    emphasis: ["직접 만든 프로토타입과 데모", "사용 기술", "AI 활용 방식"],
    cover: { src: "/originkit/hover-3.jpg", alt: "[TODO] AI Product Builder 대표 이미지" },
    cta: { label: "만든 것 더 보기 (GitHub)", href: "https://github.com/uwol-is-june" },
  },
];

export const positionIds = positions.map((p) => p.id) as PositionId[];
