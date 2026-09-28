/**
 * 포지션 페이지마다 다른 강조 섹션의 콘텐츠 (TASK-15~17)
 * 목업 예시가 섞여 있습니다. [TODO]는 실제 내용으로 바꿔주세요.
 */

/** Product Manager: 문제 정의, 지표, 로드맵, 우선순위 결정 과정 */
export const pmShowcase = {
  process: [
    { step: "01", title: "문제 정의", description: "VOC, 인터뷰, 퍼널 데이터를 교차해 문제 후보를 모으고 영향 범위로 좁힙니다." },
    { step: "02", title: "지표 설계", description: "North Star와 입력 지표, 가드레일 지표를 나누고 성공 기준을 먼저 합의합니다." },
    { step: "03", title: "우선순위 결정", description: "임팩트 · 확신도 · 비용으로 점수화하고, 점수와 다른 결정은 이유를 남깁니다." },
    { step: "04", title: "실행과 회고", description: "실험 결과를 지표로 확인하고, 배운 점을 다음 로드맵에 반영합니다." },
  ],
  metricTree: {
    northStar: { label: "North Star", value: "[TODO] 주간 핵심 행동 사용자 수" },
    inputs: [
      { label: "신규 활성화", value: "[TODO] 가입 완료율" },
      { label: "재방문", value: "[TODO] 7일 리텐션" },
      { label: "핵심 행동 빈도", value: "[TODO] 1인당 주간 핵심 행동 수" },
    ],
    guardrails: ["[TODO] 이탈률", "[TODO] CS 문의 수"],
  },
  prioritization: {
    caption: "예시: RICE 점수로 정리한 분기 백로그 (목업)",
    columns: ["항목", "Reach", "Impact", "Confidence", "Effort", "Score", "결정"],
    rows: [
      ["가입 입력 항목 축소", "8,000", "2", "80%", "2", "6,400", "Now"],
      ["결제 실패 재시도", "3,000", "3", "70%", "3", "2,100", "Now"],
      ["추천 알림 개인화", "12,000", "1", "50%", "5", "1,200", "Next"],
      ["다크 모드", "5,000", "0.5", "90%", "3", "750", "Later"],
    ],
  },
  roadmap: [
    { horizon: "Now", items: ["[TODO] 이번 분기 핵심 과제", "[TODO] 과제 2"] },
    { horizon: "Next", items: ["[TODO] 다음 분기 후보", "[TODO] 후보 2"] },
    { horizon: "Later", items: ["[TODO] 장기 탐색 과제"] },
  ],
};

/** Service Planner: 유저 플로우, IA, 와이어프레임, 정책 설계 */
export const plannerShowcase = {
  userFlow: {
    caption: "예시: 예약 플로우 (목업)",
    steps: [
      { title: "상품 선택", exception: null },
      { title: "옵션 · 일정 선택", exception: "품절 → 대체 일정 제안" },
      { title: "예약 확인", exception: "로그인 만료 → 입력 유지한 채 재로그인" },
      { title: "결제", exception: "결제 실패 → 확인 단계로 복귀" },
      { title: "완료 · 알림", exception: null },
    ],
  },
  ia: {
    caption: "예시: 서비스 IA (목업)",
    tree: [
      { label: "홈", children: ["추천", "이벤트"] },
      { label: "탐색", children: ["카테고리", "검색", "필터"] },
      { label: "예약", children: ["예약 내역", "취소 · 변경"] },
      { label: "마이", children: ["프로필", "결제 수단", "알림 설정"] },
    ],
  },
  wireframeStates: [
    { state: "기본", description: "데이터가 있을 때의 기본 화면" },
    { state: "로딩", description: "스켈레톤으로 레이아웃 유지" },
    { state: "빈 값", description: "다음 행동을 안내하는 빈 화면" },
    { state: "오류", description: "원인과 재시도 방법 안내" },
  ],
  policy: {
    caption: "예시: 예약 상태 정책 (목업)",
    columns: ["상태", "진입 조건", "사용자 가능 액션", "운영자 가능 액션"],
    rows: [
      ["예약 대기", "결제 완료 직후", "취소", "확정 · 거절"],
      ["예약 확정", "운영자 확정", "변경 요청 · 취소(수수료)", "변경 · 취소"],
      ["이용 완료", "이용일 경과", "후기 작성", "-"],
      ["취소", "사용자 · 운영자 취소", "-", "환불 처리"],
    ],
  },
};

/** AI Product Builder: 프로토타입과 데모, 사용 기술, AI 활용 방식 */
export const aiShowcase = {
  stack: [
    { category: "Frontend", items: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { category: "AI", items: ["Claude Code", "[TODO] Claude API", "[TODO] 사용한 다른 모델 · 도구"] },
    { category: "Deploy · QA", items: ["Vercel", "Playwright", "ESLint"] },
  ],
  workflow: [
    {
      title: "태스크로 쪼개기",
      description: "요청을 단계별 태스크로 나누고, 난이도에 따라 모델(Opus · Sonnet · Haiku)을 다르게 배정합니다.",
    },
    {
      title: "역할별 에이전트",
      description: "UI 구현, 카피 작성, QA, SEO를 각각 맡는 에이전트를 정의해 맥락이 섞이지 않게 합니다.",
    },
    {
      title: "사람이 판단하는 지점",
      description: "문제 정의, 우선순위, 최종 품질 기준은 직접 정하고, AI 결과물은 화면 캡처와 빌드로 검증합니다.",
    },
    {
      title: "빠른 배포와 피드백",
      description: "main에 푸시하면 Vercel로 바로 배포하고, 실제 화면에서 확인한 문제를 다음 태스크로 등록합니다.",
    },
  ],
  agents: [
    { name: "ui-builder", role: "섹션, 컴포넌트, 레이아웃, 애니메이션 구현" },
    { name: "content-writer", role: "소개글, 프로젝트 설명 등 카피" },
    { name: "qa-reviewer", role: "빌드, 린트, 반응형, 접근성 점검" },
    { name: "seo-performance", role: "메타데이터, OG 이미지, 성능, 배포 설정" },
  ],
};
